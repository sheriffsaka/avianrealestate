
import React, { useMemo } from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { CheckCircleIcon } from '../components/icons/CheckCircleIcon';
import { FileCheckIcon } from '../components/icons/FileCheckIcon';
import { MailIcon } from '../components/icons/MailIcon';

type Page = 'home' | 'about' | 'listings' | 'details' | 'contact' | 'client-request' | 'mobilization-fee' | 'confirmation';

interface ConfirmationPageProps {
    onNavigate: (page: Page) => void;
}

const ConfirmationPage: React.FC<ConfirmationPageProps> = ({ onNavigate }) => {
    
    // Mock data for display purposes
    const confirmationDetails = useMemo(() => {
        const MOBILIZATION_FEE = 250000;
        const PROCESSING_FEE = 5000;
        const VAT = (MOBILIZATION_FEE + PROCESSING_FEE) * 0.075;
        const TOTAL_AMOUNT = MOBILIZATION_FEE + PROCESSING_FEE + VAT;

        return {
            id: `AVN-${Math.floor(Math.random() * 90000) + 10000}`,
            date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric'}),
            amount: TOTAL_AMOUNT,
            paymentMethod: 'Mastercard ending in 1234'
        }
    }, []);

    return (
        <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[70vh]">
            <div className="max-w-2xl w-full text-center">
                <Card className="p-8 sm:p-12">
                    <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold tracking-tight">Request Confirmed!</h1>
                    <p className="text-muted-foreground mt-2">Your mobilization fee has been processed successfully. Welcome to Avian Real Estate.</p>
                    
                    {/* Request Summary */}
                    <Card className="mt-8 text-left bg-secondary/50">
                        <CardHeader className="flex-row items-center gap-4 space-y-0">
                            <FileCheckIcon className="w-6 h-6 text-primary" />
                            <CardTitle>Request Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                           <div className="flex justify-between">
                               <span className="text-muted-foreground">Confirmation ID:</span>
                               <span className="font-medium">{confirmationDetails.id}</span>
                           </div>
                           <div className="flex justify-between">
                               <span className="text-muted-foreground">Date:</span>
                               <span className="font-medium">{confirmationDetails.date}</span>
                           </div>
                           <div className="flex justify-between">
                               <span className="text-muted-foreground">Amount Paid:</span>
                               <span className="font-medium">₦{confirmationDetails.amount.toLocaleString()}</span>
                           </div>
                            <div className="flex justify-between">
                               <span className="text-muted-foreground">Payment Method:</span>
                               <span className="font-medium">{confirmationDetails.paymentMethod}</span>
                           </div>
                        </CardContent>
                    </Card>

                    {/* Next Steps */}
                    <div className="text-left p-6 mt-8">
                        <h3 className="font-semibold mb-3 text-lg">What Happens Next?</h3>
                        <ul className="list-disc list-inside text-muted-foreground space-y-2">
                            <li>You will receive an email receipt for your payment shortly.</li>
                            <li>A dedicated luxury property agent will contact you within 24 business hours.</li>
                            <li>We will begin curating a personalized portfolio of properties based on your request.</li>
                        </ul>
                    </div>
                    
                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                        <Button size="lg" className="flex-1" onClick={() => onNavigate('home')}>Return to Home</Button>
                        <Button size="lg" variant="outline" className="flex-1" onClick={() => onNavigate('contact')}>
                             <MailIcon className="w-4 h-4 mr-2" />
                            Contact Support
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ConfirmationPage;
