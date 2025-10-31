# Windows Event Threat Navigator 🧭

**A fast reference tool for Windows Security & Sysmon events, designed for SOC analysts, threat hunters, and incident responders.**

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://wetnav.patelhari.com)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/packetwarden/WETN-vercel)

![License](https://img.shields.io/badge/License-MIT-green)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

---

## 🎯 About This Project

Windows Event Threat Navigator (WETN) is a quick reference tool built to solve a common analyst problem: rapidly looking up Windows Security and Sysmon event IDs with immediate context about their security significance. Whether you're investigating an incident, building detection rules, or simply learning about Windows event logs, this tool provides fast access to event documentation with MITRE ATT&CK® mappings.

**This is an experimental reference tool**, not a production-ready security product. It serves as a helpful utility for speeding up the common analyst task of understanding Windows event context and potential security implications.

### Key Capabilities

- **470+ Events Documented** - Windows Security (441 events) and Sysmon (29 events)
- **MITRE ATT&CK® Integration** - Manual mappings to adversary techniques and tactics
- **Enhanced Event Analysis** - In-depth security context for critical events
- **Key Log Fields** - 152 events with exact field names and analyst guidance
- **Fast Search & Filtering** - Instant lookup by Event ID, name, category, or MITRE technique

---

## Core Functionality ⚡

At its core, this tool provides a searchable interface to:

1. **Look up** Windows Security and Sysmon event IDs
2. View event **names, descriptions, and categories**
3. Access **MITRE ATT&CK® technique mappings** for threat context
4. Review **key log fields** that SOC/IR teams should focus on during analysis
5. Read **analyst notes** on common scenarios and investigation tips
6. Understand **security implications** and detection strategies
7. **Filter events** by source (Windows/Sysmon) and category

---

## Key Features 🚀

### Event Coverage
- **Unified Event Data** - Comprehensive Windows Security and Sysmon event database
- **Enhanced Content** - Deep-dive analysis for critical security events with:
  - Quick answer summaries for rapid triage
  - Detailed explanations of event significance
  - Security implications and threat context
  - Detection strategies and baseline guidance
  - Real-world attack examples from documented campaigns
  - Related event correlations

### MITRE ATT&CK® Integration
- **Manual Technique Mappings** - Events mapped to specific MITRE ATT&CK® techniques based on analyst research
- **Rich Context** - View Technique ID, Name, Tactics, and Descriptions
- **Investigation Starting Points** - Understand which adversary behaviors each event can detect
- **Important Disclaimer** - All mappings are potential associations; context is critical for accurate threat assessment

### Key Log Fields (152 Events)
- **Exact Technical Field Names** - Uses actual Windows Event Log field names (e.g., `SubjectUserName`, `LogonType`, `IpAddress`)
- **Detailed Descriptions** - Field explanations with examples, status codes, and analysis guidance
- **Coverage Areas** - Authentication, account management, process execution, network activity, policy changes, and more
- **SOC/IR Focus** - Highlights the most critical fields for security analysis and threat hunting

### Search & Filtering
- **Fast Client-Side Search** - Instant results across Event ID, Name, Category, MITRE ID/Name, and Notes
- **Source Filtering** - Switch between Windows Security, Sysmon, or all events
- **Multiple View Modes** - Card view, list view, and detailed event pages
- **Official Documentation Links** - Direct references to Microsoft documentation

---

## Tech Stack 🛠️

- **Framework:** [Next.js](https://nextjs.org/) 14 (React with App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/)
- **Deployment:** [Vercel](https://vercel.com/)

---

## Data Sources & Mapping Process 📊

The tool integrates several data sources processed during build:

### 1. Base Event Data (`/src/data/*.json`)
- Contains Event ID, Source, Name, Description, and Official Link
- Derived primarily from Microsoft documentation for Security Events and Sysmon

### 2. Manual Mappings (`/src/data/mappings/*.ts`)
- **`categories.ts`** - Assigns categories (e.g., "Authentication", "Process Execution") to each Event ID
- **`scenarios.ts`** - Curated notes, common legitimate uses, and analysis considerations for specific events
- **`mitre.ts`** - **Manually maps Event IDs to MITRE ATT&CK® Technique IDs** (e.g., "T1059", "T1110.003") based on analyst research
- **`keyFields.ts`** - Maps 152 events to critical log fields with exact technical names and detailed descriptions

### 3. Processed MITRE ATT&CK® Data (`/src/data/mitre_processed/techniques.json`)
- **Source:** Generated offline using `process_stix.py` script that parses the official `enterprise-attack.json` STIX bundle from [mitre-attack/attack-stix-data](https://github.com/mitre-attack/attack-stix-data/)
- **Content:** Structured details (ID, Name, Description, Tactics, URL) for ATT&CK® techniques with cleaned descriptions

### 4. Merging Logic
- Next.js app loads all data sources at build time
- For each event, looks up Category, Scenarios, and Key Log Fields from mapping files
- Uses manual MITRE mapping to find relevant Technique IDs
- Retrieves full technique details from processed STIX data
- Merged `EventDetail` objects are passed to client-side components

---

## 🌐 Live Demo

Experience WETN in action: **[wetnav.patelhari.com](https://wetnav.patelhari.com)**

### How to Use

1. **Search** - Type an Event ID, keyword, category, or MITRE technique
2. **Filter** - Click "Windows" or "Sysmon" buttons to filter by source
3. **Browse** - Scroll through the event list or use card/list view
4. **Deep Dive** - Click any event to see comprehensive analysis
5. **Learn** - Read detection strategies, real-world examples, and security implications

---

## 🧪 Running Locally

### Prerequisites
- Node.js 18.17 or higher
- npm, yarn, or pnpm package manager

### Quick Start

```bash
# Clone the repository
git clone https://github.com/packetwarden/WETN-vercel.git
cd WETN-vercel

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

### Updating MITRE Data

To update the MITRE ATT&CK® technique details (`techniques.json`):
1. Download the latest `enterprise-attack.json` STIX bundle from [mitre-attack/attack-stix-data](https://github.com/mitre-attack/attack-stix-data/)
2. Run the `process_stix.py` Python script (requires Python 3)
3. Copy the generated `techniques.json` to `/src/data/mitre_processed/`

---

## Important Disclaimers ⚠️

### Experimental Nature
This is a side project and **NOT a production-ready security tool**. Use it as a reference aid only. Always verify information against official documentation and your own analysis.

### Data Accuracy
Event descriptions and mappings are based on public data and manual interpretation. They may contain errors, omissions, or become outdated. **Always verify critical information** against official Microsoft documentation and current threat intelligence.

### MITRE ATT&CK® Mapping Context
The ATT&CK® mappings represent **potential associations** between events and adversary techniques. An event occurring does **NOT** definitively mean the mapped technique was used maliciously. **Context is absolutely critical** - these mappings are intended as investigation starting points, not definitive indicators of compromise.

### No Guarantees
This tool comes with no warranties or guarantees. Use at your own discretion and risk.

---

## 🗺️ Roadmap

### Planned Features
- **SIEM Detection Queries** - Pre-built queries for Splunk SPL, Microsoft Sentinel KQL, and Elastic Query DSL
- **Advanced Search Syntax** - Boolean operators (AND, OR, NOT) and field-specific search
- **Threat Actor Profiles** - Link events to known threat actor TTPs and campaigns
- **Export Functionality** - Export event details as PDF, Markdown, or JSON
- **API Access** - RESTful API for programmatic access to event data

### Content Expansion
- Expand MITRE ATT&CK® mappings to additional events
- Add more enhanced event analysis with real-world examples
- Include Sysmon configuration recommendations
- Add Windows Event Forwarding (WEF) guidance
- Create detection rule templates for popular SIEM platforms

---

## 🤝 Contributing

Contributions are welcome! Whether it's:
- Adding or improving MITRE ATT&CK® mappings
- Enhancing event analysis and detection guidance
- Fixing bugs or data errors
- Improving documentation
- Suggesting new features

Please open an issue or pull request on GitHub.

### Development Guidelines
- Follow TypeScript best practices
- Test changes thoroughly before submitting
- Include clear commit messages
- Update documentation as needed

---

## 🙏 Acknowledgements

- **Microsoft** - For comprehensive Windows Security Events and Sysmon documentation
- **MITRE ATT&CK®** - This project utilizes ATT&CK® content. ATT&CK® is a registered trademark of The MITRE Corporation. "© 2024 The MITRE Corporation. This work is reproduced and distributed with the permission of The MITRE Corporation." ([MITRE ATT&CK Website](https://attack.mitre.org/), [Terms of Use](https://attack.mitre.org/resources/terms-of-use/))
- **Microsoft Sysinternals** - For the powerful Sysmon tool
- **Next.js Team** - For the excellent React framework
- **Tailwind Labs** - For the utility-first CSS framework
- **Vercel** - For seamless deployment and hosting
- **Open Source Community** - For countless tools and libraries that made this possible

---

## 📧 Contact & Support

- **Live Demo**: [wetnav.patelhari.com](https://wetnav.patelhari.com)
- **GitHub Repository**: [github.com/packetwarden/WETN-vercel](https://github.com/packetwarden/WETN-vercel)
- **Issue Tracker**: [GitHub Issues](https://github.com/packetwarden/WETN-vercel/issues)
- **Author**: Hari Patel - Cybersecurity Researcher

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Third-Party Licenses
- MITRE ATT&CK® content used under their terms of use
- Microsoft documentation referenced under fair use principles
- All open source libraries used under their respective licenses

---

**Built for the security community**

If this tool has helped you in your security operations, consider:
- ⭐ Starring the repository
- 🐛 Reporting issues or bugs
- 💡 Suggesting features or improvements
- 🤝 Contributing code or documentation
- 📢 Sharing with fellow security professionals

---
