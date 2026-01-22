
import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { CreditCardIcon } from '../components/icons/CreditCardIcon';
import { LoaderIcon } from '../components/icons/LoaderIcon';
import { VisaIcon } from '../components/icons/VisaIcon';
import { MastercardIcon } from '../components/icons/MastercardIcon';

type Page = 'home' | 'about' | 'listings' | 'details' | 'contact' | 'client-request' | 'mobilization-fee' | 'confirmation';

interface MobilizationFeePageProps {
    onNavigate: (page: Page) => void;
}

const MobilizationFeePage: React.FC<MobilizationFeePageProps> = ({ onNavigate }) => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const MOBILIZATION_FEE = 250000;
    const PROCESSING_FEE = 5000;
    const VAT = (MOBILIZATION_FEE + PROCESSING_FEE) * 0.075; // 7.5% VAT
    const TOTAL_AMOUNT = MOBILIZATION_FEE + PROCESSING_FEE + VAT;

    const handlePayment = () => {
        if (!paymentMethod) return;
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            onNavigate('confirmation');
        }, 2500); // Simulate network request
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <header className="mb-8 text-center max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold tracking-tight">Mobilization Fee Payment</h1>
                <p className="text-muted-foreground mt-2">Finalize your engagement with Avian Real Estate by completing the secure payment below.</p>
            </header>

            <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Fee Breakdown */}
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>Fee Summary</CardTitle>
                        <CardDescription>Review the details of your payment.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 flex-grow">
                        <div className="flex justify-between text-muted-foreground"><span>Mobilization Fee</span><span>₦{MOBILIZATION_FEE.toLocaleString()}</span></div>
                        <div className="flex justify-between text-muted-foreground"><span>Processing Fee</span><span>₦{PROCESSING_FEE.toLocaleString()}</span></div>
                        <div className="flex justify-between text-muted-foreground"><span>VAT (7.5%)</span><span>₦{VAT.toLocaleString()}</span></div>
                        <div className="border-t border-border my-4"></div>
                        <div className="flex justify-between font-bold text-lg"><span>Total Amount</span><span>₦{TOTAL_AMOUNT.toLocaleString()}</span></div>
                    </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                    <CardHeader>
                        <CardTitle>Payment Method</CardTitle>
                        <CardDescription>Select your preferred payment method.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-3">
                            <label className={`flex items-center gap-4 p-4 border rounded-md cursor-pointer ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : ''}`} onClick={() => setPaymentMethod('card')}>
                                <CreditCardIcon className="w-6 h-6 text-primary" />
                                <span className="font-semibold">Pay with Card</span>
                                <input type="radio" name="paymentMethod" value="card" className="sr-only" checked={paymentMethod === 'card'} onChange={() => {}} />
                            </label>
                            {paymentMethod === 'card' && (
                                <div className="p-4 bg-secondary/50 rounded-md space-y-4">
                                    <div className="relative">
                                        <Input placeholder="Card Number" disabled={isLoading} />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                                            <VisaIcon className="w-7 h-7" />
                                            <MastercardIcon className="w-7 h-7" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input placeholder="MM / YY" disabled={isLoading}/>
                                        <Input placeholder="CVC" disabled={isLoading}/>
                                    </div>
                                </div>
                            )}
                            <label className={`flex items-center gap-4 p-4 border rounded-md cursor-pointer ${paymentMethod === 'transfer' ? 'border-primary bg-primary/5' : ''}`} onClick={() => setPaymentMethod('transfer')}>
                                <span className="font-semibold">Bank Transfer</span>
                                <input type="radio" name="paymentMethod" value="transfer" className="sr-only" checked={paymentMethod === 'transfer'} onChange={() => {}} />
                            </label>
                        </div>
                        <Button size="lg" className="w-full" onClick={handlePayment} disabled={!paymentMethod || isLoading}>
                            {isLoading ? (
                                <LoaderIcon className="w-6 h-6 animate-spin" />
                            ) : (
                                `Confirm & Pay ₦${TOTAL_AMOUNT.toLocaleString()}`
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default MobilizationFeePage;
