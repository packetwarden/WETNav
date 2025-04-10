import json
import os
from datetime import datetime

# --- Configuration ---
INPUT_STIX_FILE = "enterprise-attack.json"
OUTPUT_DIR = "mitre_processed_output"
OUTPUT_TECHNIQUES_FILE = os.path.join(OUTPUT_DIR, "techniques.json")
OUTPUT_DC_TO_TECHNIQUE_MAP_FILE = os.path.join(OUTPUT_DIR, "dc_to_technique_map.json")
# --- End Configuration ---

def get_attack_id(stix_object):
    """Extracts the ATT&CK ID (e.g., T1548) from external_references."""
    if "external_references" in stix_object:
        for ref in stix_object["external_references"]:
            if ref.get("source_name") == "mitre-attack":
                return ref.get("external_id")
    return None

def get_attack_url(stix_object):
    """Extracts the ATT&CK URL from external_references."""
    if "external_references" in stix_object:
        for ref in stix_object["external_references"]:
            if ref.get("source_name") == "mitre-attack":
                return ref.get("url")
    return None

def get_tactics(stix_object):
    """Extracts tactic shortnames (phase_name) from kill_chain_phases."""
    tactics = []
    if "kill_chain_phases" in stix_object:
        for phase in stix_object["kill_chain_phases"]:
            if phase.get("kill_chain_name") == "mitre-attack":
                # Convert kebab-case to Title Case for readability
                tactic_name = phase.get("phase_name", "unknown-tactic")
                tactics.append(tactic_name.replace('-', ' ').title())
    return sorted(list(set(tactics))) # Ensure unique and sorted

def main():
    print(f"Starting STIX data processing: {datetime.now()}")
    print(f"Loading STIX data from: {INPUT_STIX_FILE}")

    if not os.path.exists(INPUT_STIX_FILE):
        print(f"ERROR: Input STIX file not found: {INPUT_STIX_FILE}")
        print("Please download it from https://github.com/mitre-attack/attack-stix-data/blob/master/enterprise-attack/enterprise-attack.json")
        return

    try:
        with open(INPUT_STIX_FILE, 'r', encoding='utf-8') as f:
            stix_bundle = json.load(f)
    except Exception as e:
        print(f"ERROR: Failed to load or parse STIX JSON: {e}")
        return

    stix_objects = stix_bundle.get("objects", [])
    print(f"Loaded {len(stix_objects)} STIX objects.")

    techniques = {} # Key: STIX ID, Value: Technique details object
    data_components = {} # Key: STIX ID, Value: Data Component details object
    # Map DC STIX ID -> List of Technique STIX IDs that use it
    dc_stix_id_to_technique_stix_ids = {}

    print("Processing STIX objects (Techniques and Data Components)...")

    # --- Process Objects ---
    for obj in stix_objects:
        obj_type = obj.get("type")
        stix_id = obj.get("id")
        is_revoked = obj.get("revoked", False)
        is_deprecated = obj.get("x_mitre_deprecated", False)

        if not stix_id or is_revoked or is_deprecated:
            continue # Skip invalid, revoked or deprecated objects

        # Process Techniques (attack-pattern)
        if obj_type == "attack-pattern":
            attack_id = get_attack_id(obj)
            if attack_id: # Only include if it has a valid ATT&CK ID
                technique_details = {
                    "id": attack_id, # Txxxx or Txxxx.xxx
                    "stix_id": stix_id,
                    "name": obj.get("name", "Unknown Technique"),
                    "description": obj.get("description", "").strip(),
                    "tactics": get_tactics(obj),
                    "platforms": sorted(list(set(obj.get("x_mitre_platforms", [])))), # Ensure unique & sorted
                    "url": get_attack_url(obj),
                    # Store the direct references to Data Component STIX IDs
                    "data_component_stix_ids": sorted(list(set(obj.get("x_mitre_data_components", [])))) # Ensure unique & sorted
                }
                techniques[stix_id] = technique_details

                # --- Build the reverse map (DC -> Techniques) ---
                for dc_stix_id in technique_details["data_component_stix_ids"]:
                    if dc_stix_id not in dc_stix_id_to_technique_stix_ids:
                        dc_stix_id_to_technique_stix_ids[dc_stix_id] = []
                    # Add technique STIX ID to the list for this DC
                    if stix_id not in dc_stix_id_to_technique_stix_ids[dc_stix_id]:
                         dc_stix_id_to_technique_stix_ids[dc_stix_id].append(stix_id)

        # Process Data Components (x-mitre-data-component)
        elif obj_type == "x-mitre-data-component":
             # Store basic details for lookup later
             data_components[stix_id] = {
                 "id": stix_id,
                 "name": obj.get("name", "Unknown Data Component"),
                 # Add data source ref if needed: 'x_mitre_data_source_ref'
             }

    print(f"Processed {len(techniques)} active techniques.")
    print(f"Processed {len(data_components)} active data components.")
    print(f"Built initial map for {len(dc_stix_id_to_technique_stix_ids)} Data Components based on technique definitions.")

    # --- Prepare Final Outputs ---

    # 1. Final Techniques List (structured for the app)
    final_techniques_output = []
    for tech_stix_id, tech_details in techniques.items():
        # Structure matches MitreAttackInfo interface in types.ts
        final_techniques_output.append({
             "id": tech_details["id"],
             "name": tech_details["name"],
             "tactic": ", ".join(tech_details["tactics"]), # Join tactics into a string
             "url": tech_details["url"],
             # Optionally include description, platforms etc. if needed in UI
             # "description": tech_details["description"],
             # "platforms": tech_details["platforms"],
        })
    # Sort the final list by ATT&CK ID
    final_techniques_output.sort(key=lambda x: x['id'])


    # 2. Final DC Name -> Technique ATT&CK ID Map
    final_dc_name_to_technique_attack_ids = {}
    for dc_stix_id, tech_stix_ids_list in dc_stix_id_to_technique_stix_ids.items():
        dc_info = data_components.get(dc_stix_id)
        if dc_info and dc_info.get("name"):
            dc_name = dc_info["name"]
            # Get the ATT&CK IDs (Txxxx) for the techniques
            technique_attack_ids = []
            for tech_stix_id in tech_stix_ids_list:
                technique_info = techniques.get(tech_stix_id)
                if technique_info and technique_info.get("id"):
                    technique_attack_ids.append(technique_info["id"])

            if technique_attack_ids: # Only add if we found valid techniques
                 # Use DC Name as the key, store sorted list of ATT&CK IDs
                 final_dc_name_to_technique_attack_ids[dc_name] = sorted(list(set(technique_attack_ids)))

    print(f"Created final map linking {len(final_dc_name_to_technique_attack_ids)} Data Component Names to Technique IDs.")

    # --- Write Output Files ---
    print(f"Writing output files to directory: {OUTPUT_DIR}")
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    try:
        # Write techniques.json (list of objects matching MitreAttackInfo structure)
        with open(OUTPUT_TECHNIQUES_FILE, 'w', encoding='utf-8') as f:
            json.dump(final_techniques_output, f, indent=2, ensure_ascii=False)
        print(f"Successfully wrote techniques data to: {OUTPUT_TECHNIQUES_FILE}")

        # Write dc_to_technique_map.json (Map: DC Name -> List of ATT&CK IDs)
        with open(OUTPUT_DC_TO_TECHNIQUE_MAP_FILE, 'w', encoding='utf-8') as f:
            json.dump(final_dc_name_to_technique_attack_ids, f, indent=2, ensure_ascii=False, sort_keys=True)
        print(f"Successfully wrote DC Name-to-Technique ID map to: {OUTPUT_DC_TO_TECHNIQUE_MAP_FILE}")

    except Exception as e:
        print(f"ERROR: Failed to write output JSON files: {e}")

    print(f"Processing finished: {datetime.now()}")

if __name__ == "__main__":
    main()
