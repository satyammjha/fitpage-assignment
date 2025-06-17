import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    return (
        <header className="w-full border-b px-4 py-2 shadow-sm bg-background">
            <div className="mx-auto max-w-7xl flex items-center justify-between">
                <h1 className="text-xl font-bold tracking-tight">🌟 Product Reviews</h1>
                <ThemeToggle />
            </div>
        </header>
    );
}