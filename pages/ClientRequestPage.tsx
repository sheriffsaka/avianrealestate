
import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Select } from '../components/ui/Select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Progress } from '../components/ui/Progress';
import { ShieldCheckIcon } from '../components/icons/ShieldCheckIcon';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';

type Page = 'home' | 'about' | 'listings' | 'details' | 'contact' | 'client-request' | 'mobilization-fee';

interface ClientRequestPageProps {
    onNavigate: (page: Page) => void;
}

const ClientRequestPage: React.FC<ClientRequestPageProps> = ({ onNavigate }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        occupation: '',
        address: '',
        phone: '',
        email: '',
        propertyType: '',
        preferredLocation: '',
        landSize: '',
        buildingType: '',
        budgetMin: '',
        budgetMax: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const totalSteps = 2;
    const progress = (currentStep / totalSteps) * 100;

    const validateStep = (step: number) => {
        const newErrors: Record<string, string> = {};
        if (step === 1) {
            if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
            if (!formData.phone.trim()) newErrors.phone = 'Phone number is required.';
            if (!formData.email.trim()) {
                newErrors.email = 'Email is required.';
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                newErrors.email = 'Email is invalid.';
            }
        } else if (step === 2) {
            if (!formData.propertyType) newErrors.propertyType = 'Please select a property type.';
            if (!formData.preferredLocation.trim()) newErrors.preferredLocation = 'Preferred location is required.';
            if (!formData.budgetMin.trim()) newErrors.budgetMin = 'Minimum budget is required.';
            if (!formData.budgetMax.trim()) newErrors.budgetMax = 'Maximum budget is required.';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            if (currentStep < totalSteps) {
                setCurrentStep(prev => prev + 1);
            }
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({...prev, [name]: ''}));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateStep(currentStep)) {
            console.log('Form Submitted:', formData);
            setIsSubmitted(true);
        }
    };
    
    const renderError = (field: string) => errors[field] && <p className="text-sm text-destructive mt-1">{errors[field]}</p>;


    if (isSubmitted) {
        return (
            <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
                 <Card className="flex flex-col items-center justify-center text-center p-12 max-w-lg">
                    <ShieldCheckIcon className="w-16 h-16 text-green-500 mb-4" />
                    <h2 className="text-2xl font-semibold">Request Submitted!</h2>
                    <p className="text-muted-foreground mt-2">Thank you. An Avian agent will review your request and contact you within 24 hours. To finalize your engagement, please proceed to pay the mobilization fee.</p>
                    <div className="flex gap-4 mt-6">
                        <Button onClick={() => onNavigate('mobilization-fee')}>Proceed to Mobilization Fee</Button>
                        <Button onClick={() => onNavigate('home')} variant="outline">Back to Home</Button>
                    </div>
                </Card>
            </div>
        )
    }

    return (
         <div className="container mx-auto px-4 py-12">
            <header className="mb-8 text-center max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold tracking-tight">Client Property Request</h1>
                <p className="text-muted-foreground mt-2">Provide your details and property requirements so we can find the perfect match for you.</p>
            </header>

            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle>Step {currentStep}: {currentStep === 1 ? 'Personal Information' : 'Property Requirements'}</CardTitle>
                    <Progress value={progress} className="mt-2" />
                </CardHeader>
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit} noValidate className="space-y-6">
                        {currentStep === 1 && (
                            <>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="fullName" className="block text-sm font-medium mb-2">Full Name</label>
                                        <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Adebisi Adebayo" className={errors.fullName ? 'border-destructive' : ''} />
                                        {renderError('fullName')}
                                    </div>
                                    <div>
                                        <label htmlFor="occupation" className="block text-sm font-medium mb-2">Occupation (Optional)</label>
                                        <Input id="occupation" name="occupation" value={formData.occupation} onChange={handleChange} placeholder="E.g., Entrepreneur, Doctor" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium mb-2">Address (Optional)</label>
                                    <Textarea id="address" name="address" value={formData.address} onChange={handleChange} placeholder="123 Main Street, Lagos" />
                                </div>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone Number</label>
                                        <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+234 800 123 4567" className={errors.phone ? 'border-destructive' : ''} />
                                        {renderError('phone')}
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className={errors.email ? 'border-destructive' : ''} />
                                        {renderError('email')}
                                    </div>
                                </div>
                            </>
                        )}

                        {currentStep === 2 && (
                            <>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="propertyType" className="block text-sm font-medium mb-2">Property Type</label>
                                        <Select id="propertyType" name="propertyType" value={formData.propertyType} onChange={handleChange} className={errors.propertyType ? 'border-destructive' : ''}>
                                            <option value="">Select a type...</option>
                                            <option value="Villa">Villa</option>
                                            <option value="Apartment">Apartment</option>
                                            <option value="Penthouse">Penthouse</option>
                                            <option value="Mansion">Mansion</option>
                                            <option value="Land">Land</option>
                                            <option value="Other">Other</option>
                                        </Select>
                                        {renderError('propertyType')}
                                    </div>
                                    <div>
                                        <label htmlFor="preferredLocation" className="block text-sm font-medium mb-2">Preferred Location(s)</label>
                                        <Input id="preferredLocation" name="preferredLocation" value={formData.preferredLocation} onChange={handleChange} placeholder="E.g., Ikoyi, Maitama" className={errors.preferredLocation ? 'border-destructive' : ''} />
                                        {renderError('preferredLocation')}
                                    </div>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="landSize" className="block text-sm font-medium mb-2">Land Size / Building Type (Optional)</label>
                                        <Input id="landSize" name="landSize" value={formData.landSize} onChange={handleChange} placeholder="E.g., 2000 sqm or 5-bedroom duplex" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Budget Range (in Naira)</label>
                                    <div className="grid sm:grid-cols-2 gap-6">
                                         <div>
                                            <Input name="budgetMin" type="number" value={formData.budgetMin} onChange={handleChange} placeholder="Minimum Budget" className={errors.budgetMin ? 'border-destructive' : ''}/>
                                            {renderError('budgetMin')}
                                         </div>
                                         <div>
                                            <Input name="budgetMax" type="number" value={formData.budgetMax} onChange={handleChange} placeholder="Maximum Budget" className={errors.budgetMax ? 'border-destructive' : ''} />
                                            {renderError('budgetMax')}
                                         </div>
                                    </div>
                                </div>
                            </>
                        )}
                        
                        <div className="flex justify-between items-center pt-4">
                            {currentStep > 1 ? (
                                <Button type="button" variant="ghost" onClick={handlePrevious}>
                                    <ArrowLeftIcon className="w-4 h-4 mr-2" />
                                    Previous
                                </Button>
                            ) : <div></div>}

                            {currentStep < totalSteps ? (
                                <Button type="button" onClick={handleNext}>Next</Button>
                            ) : (
                                <Button type="submit">Submit Request</Button>
                            )}
                        </div>
                    </form>
                </CardContent>
            </Card>
         </div>
    );
};

export default ClientRequestPage;
