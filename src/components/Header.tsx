import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-semibold">Bram App</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/watch-demo" className="text-muted-foreground hover:text-foreground transition-colors">
              Watch Demo
            </Link>
            <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Button asChild style={{ backgroundColor: "#e87400" }} className="text-white hover:opacity-90">
            <Link to="/get-started">Get Started</Link>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}