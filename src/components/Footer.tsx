import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="font-semibold">Bram App</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              design built for business owners. All in one platform to secure marketing intelligently.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input 
                placeholder="Enter your email" 
                className="max-w-xs"
              />
              <Button>Get Started</Button>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/features" className="hover:text-foreground transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
              <li><Link to="/changelog" className="hover:text-foreground transition-colors">Changelog</Link></li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2026 Bram App. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <a
              href="https://www.iubenda.com/privacy-policy/95097773"
              className="iubenda-white iubenda-noiframe iubenda-embed hover:text-foreground transition-colors"
              title="Privacy Policy"
            >
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}