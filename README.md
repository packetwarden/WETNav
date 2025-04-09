# Windows Event Threat Navigator 🧭✨

**An experimental, vibe-coded quick reference tool for Windows Security & Sysmon events, built with Gemini 2.5 Pro Preview.**

<!-- <<< Add a compelling screenshot/GIF of the application here! >>> -->
<!-- Example: ![App Screenshot](link/to/your/screenshot.png) -->
[![Vercel Deployment](https://vercel.com/button)](https://wetn.patelhari.com/)
---

## About This Project: The Vibe ✨

This project started as a "vibe coding" session – an exploration into building a simple, yet genuinely useful tool for security analysts, particularly those in SOC roles or involved in threat hunting and incident response. The core idea was to create a fast, accessible way to look up Windows Security and Sysmon event IDs and get immediate context, including potential links to adversary tactics via MITRE ATT&CK®.

A significant part of this project involved collaborating with Google's **Gemini 2.5 Pro Preview (03-25)** AI model. From initial concept brainstorming based on Microsoft documentation to generating code snippets, refining UI/UX, debugging build errors, and even structuring data processing logic, Gemini served as a pair programmer and sounding board.

**This is not intended as a production-ready, fully validated security product.** Instead, think of it as a helpful utility born from experimentation, designed to speed up the common analyst task of looking up event details and understanding their potential significance.

## Core Functionality ⚡

At its heart, this tool provides a searchable interface to:

1.  **Look up** Windows Security and Sysmon event IDs.
2.  See the event's **name/description**.
3.  View potential **MITRE ATT&CK® technique mappings**.
4.  Access **notes on common scenarios** or analysis considerations.
5.  **Filter** events by source (Windows/Sysmon).

## Key Features 🚀

*   **Unified Event Data:** Includes a broad range of Windows Security events and standard Sysmon events.
*   **Fast Client-Side Search:** Instantly search across Event ID, Name, Category, MITRE ID/Name, and Notes.
*   **Source Filtering:** Easily switch between Windows Security, Sysmon, or all events.
*   **Interactive List-Detail View:** Clean list presentation with a dedicated panel showing full details for the selected event.
*   **MITRE ATT&CK® Integration:**
    *   Displays potential technique mappings within the detail view.
    *   Uses **tabs with horizontal scrolling** for events mapped to multiple techniques.
    *   Shows Technique ID, Name, Tactics (as tags), and cleaned Description derived from processed STIX data.
    *   Includes important disclaimers about mapping interpretation.
*   **Contextual Notes:** Displays event categories and analyst-curated notes/scenarios where available.
*   **Responsive Dark UI:** Clean, professional interface inspired by modern security tools, built with Tailwind CSS.

## Tech Stack & Build Process 🛠️

*   **Framework:** [Next.js](https://nextjs.org/) (React - App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) (with `@tailwindcss/typography`)
*   **Icons:** [React Icons](https://react-icons.github.io/react-icons/)
*   **AI Collaboration:** [Gemini 2.5 Pro Preview (03-25)](https://deepmind.google/technologies/gemini/)
*   **Deployment:** [Vercel](https://vercel.com/)
*   **Code:** [GitHub](https://github.com/)

## Data: Sources & The Mapping Process 📊

The tool relies on several data sources, processed and merged during the build:

1.  **Base Event Data (`/src/data/*.json`):**
    *   Contains Event ID, Source, Name, Description (often same as Name), and Official Link.
    *   Derived primarily from Microsoft documentation (Security Events, Sysmon) and user-provided datasets based on these sources.

2.  **Manual Mappings (`/src/data/mappings/*.ts`):**
    *   **`categories.ts`:** Manually assigns a category (e.g., "Authentication", "Process Execution") to each Event ID.
    *   **`scenarios.ts`:** Manually curated notes, common legitimate uses, or analysis "gotchas" for specific Event IDs.
    *   **`mitre.ts`:** **Crucially, this file manually maps specific Event IDs to one or more MITRE ATT&CK® Technique IDs (e.g., "T1059", "T1110.003").** This requires analyst research and judgment.

3.  **Processed MITRE ATT&CK® Data (`/src/data/mitre_processed/techniques.json`):**
    *   **Source:** Generated *offline* using a separate Python script (`process_stix.py` - available in repo history, requires manual execution) that parses the official `enterprise-attack.json` STIX bundle from [mitre-attack/attack-stix-data](https://github.com/mitre-attack/attack-stix-data/).
    *   **Content:** Contains structured details (ID, Name, Description, Tactics, URL) for ATT&CK techniques referenced in the manual mapping. Descriptions are cleaned to remove citation markers.

4.  **Merging Logic (`/src/app/page.tsx`):**
    *   The Next.js app (server-side) loads all the above data.
    *   It iterates through the base events.
    *   For each event, it looks up its Category and Scenarios from the mapping files.
    *   It uses the manual `mitre.ts` mapping to find relevant Technique IDs.
    *   It then looks up the *full details* for those Technique IDs in the processed `techniques.json` data.
    *   This merged `EventDetail` object (including the rich MITRE data) is passed to the client-side components.

## Usage / Live Demo 🌐

Explore the deployed tool here:

**>>> [Windows Event Threat Navigator](<<<YOUR_VERCEL_DEPLOYMENT_URL>>>) <<<**

1.  **Search:** Type an Event ID, keyword, category, or MITRE ID/Name.
2.  **Filter:** Click "Windows" or "Sysmon" buttons.
3.  **Select:** Click an event row in the left list.
4.  **Explore:** View details in the right panel. Use the tabs and scrollbars as needed.

## Running Locally (Experimentation) 🧪

Want to play around with the code?

1.  **Prerequisites:** Node.js (v18.17+), npm/yarn/pnpm.
2.  **Clone:** `https://github.com/packetwarden/WETNav.git && cd WETNav`
3.  **Install:** `npm install` (or yarn/pnpm)
4.  **Run:** `npm run dev` (or yarn/pnpm)
5.  Open [http://localhost:3000](http://localhost:3000).

*(Note: To update the MITRE technique details (`techniques.json`), you need Python 3 and the `enterprise-attack.json` STIX file to run the `process_stix.py` script manually.)*

## Important Disclaimers ⚠️

*   **Experimental:** This is a side project ("vibe coding") and NOT a production-ready security tool. Use it as a reference aid only.
*   **Data Accuracy:** Event descriptions and mappings are based on public data and manual interpretation. They may contain errors, omissions, or become outdated. **Always verify information** against official documentation and your own analysis.
*   **MITRE Mapping Context:** The ATT&CK® mappings are *potential* associations. An event occurring does **not** definitively mean the mapped technique was used maliciously. **Context is absolutely critical.** These mappings are intended as starting points for investigation.
*   **No Guarantees:** This tool comes with no warranties. Use at your own discretion.

## Future Vibes / Ideas 🤔

*   Add "Key Fields" section to the detail view.
*   Implement more advanced search syntax (AND, NOT, field specifiers).
*   Add more comprehensive manual MITRE mappings and scenarios.
*   Integrate Sysmon configuration guidance links.
*   UI/UX refinements (loading states, animations).
*   Theme toggle (Light/Dark).

## Acknowledgements 🙏

*   **Microsoft:** For providing comprehensive documentation on Windows Security Events and Sysmon.
*   **MITRE ATT&CK®:** This project utilizes ATT&CK® content. ATT&CK® is a registered trademark of The MITRE Corporation. **"© 2024 The MITRE Corporation. This work is reproduced and distributed with the permission of The MITRE Corporation."** ([MITRE ATT&CK Website](https://attack.mitre.org/), [License](https://attack.mitre.org/resources/terms-of-use/))
*   **Sysinternals:** For the powerful Sysmon tool.
*   **Gemini 2.5 Pro Preview (03-25):** For extensive assistance during the development process.
*   **Tailwind Labs & React Icons contributors.**

## License 📄

<!-- <<< Choose a license (e.g., MIT, Apache 2.0) and add it here >>> -->
<!-- Example: Licensed under the MIT License. See the [LICENSE](LICENSE) file. -->
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
