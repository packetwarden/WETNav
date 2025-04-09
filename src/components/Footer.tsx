// src/components/Footer.tsx
import Link from 'next/link';

// --- Configuration ---
const GITHUB_REPO_URL = "https://github.com/haripatelfanshawe/SOC-Windows-Event"; // Your Repo URL
const CURRENT_YEAR = new Date().getFullYear();
// --- End Configuration ---

export default function Footer() {
  return (
    <footer className="w-full py-4 px-4 sm:px-6 lg:px-8 mt-auto border-t border-slate-700/50 bg-slate-900">
      <div className="max-w-7xl mx-auto text-center text-xs text-slate-500 space-y-1"> {/* Added space-y-1 */}
         {/* Your Project Info */}
        <div>
            <span>© {CURRENT_YEAR} | </span>
            <Link
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 hover:underline focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 focus:ring-offset-slate-900 rounded"
            >
              View Project on GitHub
            </Link>
        </div>
         {/* MITRE ATT&CK Notice */}
         {/* Added div for separate line */}
        <div>
            Uses ATT&CK® content. ATT&CK® is a registered trademark of The MITRE Corporation.
            <br /> {/* Line break */}
            "© 2024 The MITRE Corporation. This work is reproduced and distributed with the permission of The MITRE Corporation."
        </div>
      </div>
    </footer>
  );
}
