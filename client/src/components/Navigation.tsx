import { Link, useLocation } from "wouter";
import { Moon } from "lucide-react";

export function Navigation() {
  const [location] = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center group-hover:bg-primary/90 transition-colors">
            <Moon className="w-5 h-5 text-accent fill-accent" />
          </div>
          <span className="font-ornament text-xl font-bold text-primary group-hover:text-primary/80 transition-colors">
            Sunnah Foods
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className={`text-sm font-medium transition-colors hover:text-primary ${location === '/' ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
            Home
          </Link>
          <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            About Project
          </a>
        </div>
      </div>
    </nav>
  );
}
