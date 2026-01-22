
import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Checkbox } from '../components/ui/Checkbox';
import { ShieldCheckIcon } from '../components/icons/ShieldCheckIcon';
import { UsersIcon } from '../components/icons/UsersIcon';
import { TrendingUpIcon } from '../components/icons/TrendingUpIcon';

type Page = 'home';

interface AgentSignupPageProps {
    onNavigate: (page: Page) => void;
}

const AgentSignupPage: React.FC<AgentSignupPageProps> = ({ onNavigate }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        agencyName: '',
        phone: '',
        email: '',
        cacNumber: '',
        agreed: false,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Your full name is required.';
        if (!formData.agencyName.trim()) newErrors.agencyName = 'Agency name is required.';
        if (!formData.phone.trim()) newErrors.phone = 'A valid phone number is required.';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid.';
        }
        if (!formData.agreed) newErrors.agreed = 'You must agree to the terms.';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;
        setFormData(prev => ({ ...prev, [name]: val }));
        if (errors[name]) {
            setErrors(prev => ({...prev, [name]: ''}));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            console.log('Agent Application Submitted:', formData);
            setIsSubmitted(true);
        }
    };

    const renderError = (field: string) => errors[field] && <p className="text-sm text-destructive mt-1">{errors[field]}</p>;

    if (isSubmitted) {
        return (
            <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
                <Card className="flex flex-col items-center justify-center text-center p-12 max-w-lg">
                    <ShieldCheckIcon className="w-16 h-16 text-green-500 mb-4" />
                    <h2 className="text-2xl font-semibold">Application Received!</h2>
                    <p className="text-muted-foreground mt-2">Thank you for your interest. Our partnerships team will review your application and contact you within 3-5 business days.</p>
                    <Button onClick={() => onNavigate('home')} className="mt-6">Back to Home</Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <header className="mb-12 text-center max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold tracking-tight">Partner with Avian Real Estate</h1>
                <p className="text-muted-foreground mt-3 text-lg">Expand your reach and gain access to a qualified pool of high-net-worth clients. Join Nigeria's leading luxury real estate platform.</p>
            </header>
            
            <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
                {/* Benefits Section */}
                <div className="space-y-8 lg:mt-4">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <UsersIcon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Access Qualified Leads</h3>
                            <p className="text-muted-foreground mt-1">Connect with high-net-worth individuals and corporate clients actively searching for premium properties in your area.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                           <TrendingUpIcon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Boost Your Earnings</h3>
                            <p className="text-muted-foreground mt-1">Benefit from our competitive commission structures and co-brokerage opportunities on high-value transactions.</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                           <ShieldCheckIcon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Trusted Partnership</h3>
                            <p className="text-muted-foreground mt-1">Align your agency with a reputable national brand known for integrity, innovation, and excellence in the luxury market.</p>
                        </div>
                    </div>
                </div>

                {/* Signup Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Agent Application</CardTitle>
                        <CardDescription>Fill out the form below to begin the partnership process.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} noValidate className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium mb-2">Full Name</label>
                                    <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Chidi Okoro" className={errors.fullName ? 'border-destructive' : ''} />
                                    {renderError('fullName')}
                                </div>
                                <div>
                                    <label htmlFor="agencyName" className="block text-sm font-medium mb-2">Agency Name</label>
                                    <Input id="agencyName" name="agencyName" value={formData.agencyName} onChange={handleChange} placeholder="Okoro Properties Ltd." className={errors.agencyName ? 'border-destructive' : ''} />
                                    {renderError('agencyName')}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone Number</label>
                                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+234 801 234 5678" className={errors.phone ? 'border-destructive' : ''} />
                                {renderError('phone')}
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="chidi@okoroproperties.com" className={errors.email ? 'border-destructive' : ''} />
                                {renderError('email')}
                            </div>
                             <div>
                                <label htmlFor="cacNumber" className="block text-sm font-medium mb-2">CAC Registration No. (Optional)</label>
                                <Input id="cacNumber" name="cacNumber" value={formData.cacNumber} onChange={handleChange} placeholder="RC 1234567" />
                            </div>
                            <div>
                                <div className="flex items-start gap-3">
                                    <Checkbox id="agreed" name="agreed" checked={formData.agreed} onChange={handleChange} className={errors.agreed ? 'border-destructive' : ''} />
                                    <label htmlFor="agreed" className="text-sm text-muted-foreground">
                                        I agree to the <a href="#" className="underline text-primary">Terms of Service</a> and <a href="#" className="underline text-primary">Partnership Agreement</a>.
                                    </label>
                                </div>
                                {renderError('agreed')}
                            </div>
                            <Button type="submit" size="lg" className="w-full">Submit Application</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AgentSignupPage;
