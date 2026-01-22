
import React from 'react';
import { Logo } from '../icons/Logo';
import { SearchIcon } from '../icons/SearchIcon';
import { BellIcon } from '../icons/BellIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import { Button } from '../ui/Button';
import { LogOutIcon } from '../icons/LogOutIcon';
import { SettingsIcon } from '../icons/SettingsIcon';

type Page = 'home' | 'about' | 'listings' | 'details' | 'contact' | 'client-request' | 'mobilization-fee' | 'confirmation' | 'agent-signup' | 'agent-dashboard' | 'agent-property-submission' | 'admin-login' | 'admin-dashboard';

interface HeaderProps {
    currentPage: Page;
    onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
    
    const navLinkClasses = (page: Page) => {
        const isActive = currentPage === page || (page === 'listings' && currentPage === 'details') || (page === 'agent-dashboard' && currentPage === 'agent-property-submission');
        return `transition-colors hover:text-foreground/80 ${isActive ? 'text-foreground' : 'text-muted-foreground'}`;
    };

    const isAdminView = currentPage === 'admin-dashboard';
    const isAgentView = ['agent-dashboard', 'agent-property-submission'].includes(currentPage);

    const renderNavLinks = () => {
        if (isAdminView) {
            return (
                 <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <button onClick={() => onNavigate('admin-dashboard')} className={navLinkClasses('admin-dashboard')}>Dashboard</button>
                    {/* Admin specific links can go here */}
                </nav>
            );
        }
        if (isAgentView) {
            return (
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <button onClick={() => onNavigate('agent-dashboard')} className={navLinkClasses('agent-dashboard')}>Dashboard</button>
                    <button onClick={() => onNavigate('listings')} className={navLinkClasses('listings')}>All Listings</button>
                </nav>
            );
        }
        // Default public view
        return (
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                <button onClick={() => onNavigate('home')} className={navLinkClasses('home')}>Home</button>
                <button onClick={() => onNavigate('listings')} className={navLinkClasses('listings')}>Listings</button>
                <button onClick={() => onNavigate('about')} className={navLinkClasses('about')}>About Us</button>
                <button onClick={() => onNavigate('contact')} className={navLinkClasses('contact')}>Contact</button>
            </nav>
        );
    };
    
    const renderUserProfile = () => {
        let user = { name: 'Guest', role: '', avatarSeed: 'Guest' };
        if (isAdminView) {
            user = { name: 'Adebisi Adebayo', role: 'Admin', avatarSeed: 'Adebisi' };
        } else if (isAgentView) {
            user = { name: 'Chidi Okoro', role: 'Agent', avatarSeed: 'Chidi' };
        } else {
             return <Button onClick={() => onNavigate('admin-login')}>Sign In</Button>
        }

        return (
             <button className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                    <img src={`https://api.dicebear.com/8.x/personas/svg?seed=${user.avatarSeed}`} alt="User Avatar" className="w-full h-full" />
                </div>
                <div className="hidden lg:flex flex-col items-start">
                    <span className="text-sm font-medium">{user.name}</span>
                    <span className="text-xs text-muted-foreground">{user.role}</span>
                </div>
                <ChevronDownIcon className="h-4 w-4 text-muted-foreground hidden lg:block" />
            </button>
        )
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
                <div className="flex items-center gap-8">
                    <button onClick={() => onNavigate('home')} className="flex items-center gap-2">
                        <Logo className="h-6 w-6" />
                        <span className="font-bold text-lg">Avian Real Estate</span>
                    </button>
                    {renderNavLinks()}
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="relative hidden sm:block">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="search"
                            placeholder="Search platform..."
                            className="h-9 w-full rounded-md border border-input bg-transparent pl-9 pr-4 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 sm:w-64"
                        />
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <BellIcon className="h-5 w-5" />
                        <span className="sr-only">Notifications</span>
                    </Button>
                    {renderUserProfile()}
                </div>
            </div>
        </header>
    );
};

export default Header;
