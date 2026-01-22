
import React, { useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ListingsPage from './pages/ListingsPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import ContactPage from './pages/ContactPage';
import ClientRequestPage from './pages/ClientRequestPage';
import MobilizationFeePage from './pages/MobilizationFeePage';
import ConfirmationPage from './pages/ConfirmationPage';
import AgentSignupPage from './pages/AgentSignupPage';
import AgentDashboardPage from './pages/AgentDashboardPage';
import AgentPropertySubmissionPage from './pages/AgentPropertySubmissionPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

type Page = 'home' | 'about' | 'listings' | 'details' | 'contact' | 'client-request' | 'mobilization-fee' | 'confirmation' | 'agent-signup' | 'agent-dashboard' | 'agent-property-submission' | 'admin-login' | 'admin-dashboard';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

    const handleNavigate = (page: Page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const handleSelectProperty = (id: string) => {
        setSelectedPropertyId(id);
        handleNavigate('details');
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage onNavigate={handleNavigate} />;
            case 'about':
                return <AboutPage onNavigate={handleNavigate} />;
            case 'listings':
                return <ListingsPage onSelectProperty={handleSelectProperty} />;
            case 'details':
                if (selectedPropertyId) {
                    return <PropertyDetailsPage propertyId={selectedPropertyId} onNavigate={handleNavigate} />;
                }
                setCurrentPage('listings'); 
                return <ListingsPage onSelectProperty={handleSelectProperty} />;
            case 'contact':
                return <ContactPage />;
            case 'client-request':
                return <ClientRequestPage onNavigate={handleNavigate} />;
            case 'mobilization-fee':
                return <MobilizationFeePage onNavigate={handleNavigate} />;
            case 'confirmation':
                return <ConfirmationPage onNavigate={handleNavigate} />;
            case 'agent-signup':
                return <AgentSignupPage onNavigate={handleNavigate} />;
            case 'agent-dashboard':
                return <AgentDashboardPage onNavigate={handleNavigate} onSelectProperty={handleSelectProperty} />;
            case 'agent-property-submission':
                return <AgentPropertySubmissionPage onNavigate={handleNavigate} />;
            case 'admin-login':
                return <AdminLoginPage onNavigate={handleNavigate} />;
            case 'admin-dashboard':
                return <AdminDashboardPage onNavigate={handleNavigate} onSelectProperty={handleSelectProperty} />;
            default:
                return <HomePage onNavigate={handleNavigate} />;
        }
    };
    
    const isAuthPage = currentPage === 'admin-login';

    return (
        <div className="flex flex-col min-h-screen bg-background">
            {!isAuthPage && <Header currentPage={currentPage} onNavigate={handleNavigate} />}
            <main className="flex-grow">
                {renderPage()}
            </main>
            {!isAuthPage && <Footer onNavigate={handleNavigate} />}
        </div>
    );
};

export default App;
