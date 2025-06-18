import { Mail, Github, Linkedin } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    return (
        <header className="w-full border-b px-4 py-2 shadow-sm bg-background fixed top-0 z-50 dark:bg-gray-900">
            <div className="mx-auto max-w-7xl flex items-center justify-between">
                <h1 className="text-xl font-bold tracking-tight">🌟 Product Reviews</h1>

                <p className="mb-2 md:mb-0 text-center md:text-left">
                    Submission by{" "}
                    <a
                        href="https://satyamjha.me"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold hover:text-primary"
                    >
                        satyamjha.me
                    </a>
                </p>

                <div className="flex items-center gap-4">
                    <a
                        href="mailto:satyammjha0@gmail.com"
                        className="hover:text-primary"
                        aria-label="Email"
                    >
                        <Mail className="h-4 w-4" />
                    </a>
                    <a
                        href="https://github.com/satyammjha"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary"
                        aria-label="GitHub"
                    >
                        <Github className="h-4 w-4" />
                    </a>
                    <a
                        href="https://linkedin.com/in/satyammjha"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary"
                        aria-label="LinkedIn"
                    >
                        <Linkedin className="h-4 w-4" />
                    </a>
                </div>

                <ThemeToggle />
            </div>
        </header>
    );
}