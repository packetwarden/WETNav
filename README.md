# Windows Event Threat Navigator 🛡️

**A comprehensive, professional reference tool for Windows Security & Sysmon events, designed for SOC analysts, threat hunters, and incident responders.**

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://wetnav.patelhari.com)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/packetwarden/WETN-vercel)

![License](https://img.shields.io/badge/License-MIT-green)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4)

---

## 🎯 Overview

Windows Event Threat Navigator (WETN) is a modern, feature-rich web application that provides security professionals with instant access to comprehensive Windows Security and Sysmon event documentation. Whether you're investigating an incident, building detection rules, or learning about Windows event logs, WETN offers an intuitive interface with advanced features designed for real-world security operations.

### Key Highlights

- **470+ Events Documented** - Complete coverage of Windows Security and Sysmon events
- **MITRE ATT&CK Integration** - Direct mappings to adversary tactics and techniques
- **Enhanced Analysis** - Deep-dive content for critical security events
- **Professional UI/UX** - Modern, responsive design optimized for security workflows
- **SEO Optimized** - Built for discoverability and accessibility

## ✨ New Features

### Hero Section Animations
- **Dynamic Text Rotation** - Engaging hero section with rotating use cases:
  - Threat Detection
  - SOC Operations
  - Digital Forensics
  - Malware Analysis
  - Security Research

### Interactive UI Components
- **Collapsible FAQ Section** - Expandable/collapsible FAQ items for better content organization
- **Toggleable MITRE Alert** - Collapsible important notes on MITRE ATT&CK mappings
- **Show More/Less MITRE Techniques** - Smart display of MITRE techniques (shows 4 initially, expandable)

### Sticky Table of Contents
- **Desktop**: Sticky sidebar on the right side with active section highlighting
- **Mobile**: Floating button with slide-out drawer for easy navigation
- **Smart Scroll**: Automatic active section tracking as you scroll
- **Smooth Navigation**: Click any section to smoothly scroll to it

### Professional Content Organization
Event pages now follow an optimized reading flow:
1. Quick Answer (if available)
2. Technical Details
3. MITRE ATT&CK Mapping (with smart display logic)
4. Event Comparison
5. What This Event Means
6. Security Implications
7. Detection Strategies
8. Real-World Attack Examples
9. Related Events

## 🚀 Core Features

### Event Database
- **470+ Events** - Comprehensive coverage of Windows Security (441) and Sysmon (29) events
- **Enhanced Content** - In-depth analysis for critical security events
- **MITRE ATT&CK Mappings** - Direct links to adversary techniques and tactics
- **Key Log Fields** - 152 events with detailed field documentation
- **Real-World Examples** - Documented attack scenarios and APT campaigns

### Search & Navigation
- **Instant Search** - Fast client-side search across Event ID, Name, Category, and MITRE mappings
- **Advanced Filtering** - Filter by source (Windows/Sysmon), category, and enhanced status
- **Multiple View Modes** - Card view, list view, and detailed event pages
- **Smart Table of Contents** - Navigate long event pages with ease

### Security Intelligence
- **Detection Strategies** - Practical guidance for building detection rules
- **Security Implications** - Understand the security impact of each event
- **Baseline Guidance** - Know what's normal vs. suspicious
- **Correlation Tips** - Learn how to combine events for better detection

### Technical Documentation
- **Exact Field Names** - Technical field names from Windows Event Logs
- **Field Descriptions** - Detailed explanations with examples and status codes
- **Official Links** - Direct references to Microsoft documentation
- **Analyst Notes** - Expert commentary and investigation tips

### User Experience
- **Modern UI** - Clean, professional dark theme optimized for security professionals
- **Fully Responsive** - Seamless experience on desktop, tablet, and mobile
- **Accessibility** - ARIA labels, keyboard navigation, and screen reader support
- **SEO Optimized** - Rich structured data for search engines

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
    *   **`keyFields.ts`:** Maps Event IDs to critical log fields with exact technical field names and detailed descriptions. Covers 152 events across Windows Security and Sysmon, based on Microsoft documentation and security analysis best practices.

3.  **Processed MITRE ATT&CK® Data (`/src/data/mitre_processed/techniques.json`):**
    *   **Source:** Generated *offline* using a separate Python script (`process_stix.py` - available in repo history, requires manual execution) that parses the official `enterprise-attack.json` STIX bundle from [mitre-attack/attack-stix-data](https://github.com/mitre-attack/attack-stix-data/).
    *   **Content:** Contains structured details (ID, Name, Description, Tactics, URL) for ATT&CK techniques referenced in the manual mapping. Descriptions are cleaned to remove citation markers.

4.  **Merging Logic (`/src/app/page.tsx`):**
    *   The Next.js app (server-side) loads all the above data.
    *   It iterates through the base events.
    *   For each event, it looks up its Category, Scenarios, and Key Log Fields from the mapping files.
    *   It uses the manual `mitre.ts` mapping to find relevant Technique IDs.
    *   It then looks up the *full details* for those Technique IDs in the processed `techniques.json` data.
    *   This merged `EventDetail` object (including the rich MITRE data and key fields) is passed to the client-side components.

## 🌐 Live Demo

Experience WETN in action: **[wetnav.patelhari.com](https://wetnav.patelhari.com)**

### How to Use

1. **Browse Events** - Navigate to the Events page to see all 470+ documented events
2. **Search** - Type Event ID, keyword, category, or MITRE technique
3. **Filter** - Use source filters (Windows/Sysmon) and view modes (Cards/List)
4. **Deep Dive** - Click any event to see comprehensive analysis
5. **Navigate** - Use the sticky table of contents to jump between sections
6. **Learn** - Read detection strategies, real-world examples, and security implications

## 🛠️ Local Development

### Prerequisites
- Node.js 18.17 or higher
- npm, yarn, or pnpm package manager
- Git

### Quick Start

```bash
# Clone the repository
git clone https://github.com/packetwarden/WETN-vercel.git
cd WETN-vercel

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Run development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

### Project Structure

```
WETN-vercel/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── page.tsx      # Homepage with hero animations
│   │   ├── events/       # Events browser page
│   │   ├── event/[id]/   # Dynamic event detail pages
│   │   ├── top-events/   # Top exploited events
│   │   └── guides/       # Getting started guides
│   ├── components/       # React components
│   │   ├── HeroTextAnimation.tsx
│   │   ├── FAQItem.tsx
│   │   ├── CollapsibleAlert.tsx
│   │   ├── TableOfContents.tsx
│   │   ├── MitreTechniquesGrid.tsx
│   │   └── EventDetailView.tsx
│   ├── lib/              # Data and utilities
│   │   ├── eventData.ts
│   │   └── enhancedContent.ts
│   ├── data/             # Event and mapping data
│   │   ├── mappings/     # Manual mappings
│   │   └── mitre_processed/
│   └── types/            # TypeScript definitions
├── public/               # Static assets
└── README.md
```

## Important Disclaimers ⚠️

*   **Experimental:** This is a side project ("vibe coding") and NOT a production-ready security tool. Use it as a reference aid only.
*   **Data Accuracy:** Event descriptions and mappings are based on public data and manual interpretation. They may contain errors, omissions, or become outdated. **Always verify information** against official documentation and your own analysis.
*   **MITRE Mapping Context:** The ATT&CK® mappings are *potential* associations. An event occurring does **not** definitively mean the mapped technique was used maliciously. **Context is absolutely critical.** These mappings are intended as starting points for investigation.
*   **No Guarantees:** This tool comes with no warranties. Use at your own discretion.

## 🗺️ Roadmap

### Planned Features
- **SIEM Detection Queries** - Pre-built queries for Splunk SPL, Microsoft Sentinel KQL, and Elastic Query DSL
- **Advanced Search** - Boolean operators, field-specific search, regex support
- **Threat Actor Profiles** - Link events to known threat actor behaviors
- **Event Timelines** - Visual representation of attack chains
- **Export Functionality** - Export event details as PDF, Markdown, or JSON
- **API Access** - RESTful API for programmatic access
- **Theme Toggle** - Light/Dark mode support
- **Bookmark System** - Save and organize favorite events
- **Notes & Annotations** - Personal notes on events (local storage)

### Content Expansion
- Expand MITRE mappings to more events
- Add more enhanced event analysis
- Include Sysmon configuration examples
- Add Windows Event Forwarding (WEF) guidance
- Create detection rule templates

## 🤝 Contributing

Contributions are welcome! Whether it's:
- Adding more event mappings
- Improving documentation
- Fixing bugs
- Suggesting new features
- Enhancing UI/UX

Please open an issue or pull request on GitHub.

### Development Guidelines
- Follow TypeScript best practices
- Maintain responsive design principles
- Add appropriate ARIA labels for accessibility
- Include JSDoc comments for functions
- Test on multiple browsers and devices

## 🙏 Acknowledgements

- **Microsoft** - Comprehensive Windows Security Events and Sysmon documentation
- **MITRE ATT&CK®** - This project utilizes ATT&CK® content. ATT&CK® is a registered trademark of The MITRE Corporation. "© 2024 The MITRE Corporation. This work is reproduced and distributed with the permission of The MITRE Corporation." ([MITRE ATT&CK Website](https://attack.mitre.org/))
- **Sysinternals** - The powerful Sysmon tool
- **Next.js Team** - Outstanding React framework
- **Tailwind Labs** - Beautiful utility-first CSS framework
- **React Icons** - Comprehensive icon library
- **Vercel** - Seamless deployment platform
- **Open Source Community** - For countless tools and libraries

## 🌟 Star History

If you find this project useful, please consider giving it a star on GitHub! It helps others discover the tool and motivates continued development.

## 📧 Contact & Support

- **Website**: [wetnav.patelhari.com](https://wetnav.patelhari.com)
- **GitHub**: [github.com/packetwarden/WETN-vercel](https://github.com/packetwarden/WETN-vercel)
- **Issues**: [GitHub Issues](https://github.com/packetwarden/WETN-vercel/issues)
- **Author**: Hari Patel - Cybersecurity Researcher

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Third-Party Licenses
- MITRE ATT&CK® content used under their terms of use
- Microsoft documentation referenced under fair use
- Open source libraries used under their respective licenses

---

**Built with ❤️ for the security community**

If this tool has helped you in your security operations, consider:
- ⭐ Starring the repository
- 🐛 Reporting issues
- 💡 Suggesting features
- 🤝 Contributing code
- 📢 Sharing with colleagues

---
