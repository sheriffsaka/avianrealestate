
import React from 'react';
import { Logo } from '../icons/Logo';

type Page = 'home' | 'about' | 'listings' | 'details' | 'contact' | 'agent-signup' | 'admin-login';

interface FooterProps {
    onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    return (
        <footer className="border-t">
            <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center md:items-start">
                        <button onClick={() => onNavigate('home')} className="flex items-center gap-2 mb-2">
                            <Logo className="h-6 w-6" />
                            <span className="font-bold">Avian Real Estate</span>
                        </button>
                         <p className="text-sm text-muted-foreground text-center md:text-left">
                            © {new Date().getFullYear()} Avian Real Estate, Inc. All rights reserved.
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-sm text-muted-foreground">
                        <h3 className="font-semibold text-foreground mb-2">Quick Links</h3>
                        <nav className="flex flex-col items-center md:items-start gap-1">
                            <button onClick={() => onNavigate('listings')} className="hover:text-foreground">Listings</button>
                            <button onClick={() => onNavigate('about')} className="hover:text-foreground">About Us</button>
                            <button onClick={() => onNavigate('contact')} className="hover:text-foreground">Contact</button>
                        </nav>
                    </div>

                    <div className="flex flex-col items-center md:items-end text-sm text-muted-foreground">
                         <h3 className="font-semibold text-foreground mb-2">Partnerships</h3>
                        <nav className="flex flex-col items-center md:items-end gap-1">
                            <button onClick={() => onNavigate('agent-signup')} className="hover:text-foreground">Partner With Us</button>
                            <a href="#" className="hover:text-foreground">Terms of Service</a>
                            <a href="#" className="hover:text-foreground">Privacy Policy</a>
                            <button onClick={() => onNavigate('admin-login')} className="hover:text-foreground mt-2">Admin Login</button>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
