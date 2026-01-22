
import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Card, CardContent } from '../components/ui/Card';
import { PhoneIcon } from '../components/icons/PhoneIcon';
import { MailIcon } from '../components/icons/MailIcon';
import { MapPinIcon } from '../components/icons/MapPinIcon';
import { ClockIcon } from '../components/icons/ClockIcon';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';
import { TwitterIcon } from '../components/icons/TwitterIcon';
import { LinkedinIcon } from '../components/icons/LinkedinIcon';
import { InstagramIcon } from '../components/icons/InstagramIcon';
import { ShieldCheckIcon } from '../components/icons/ShieldCheckIcon';

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = 'Full name is required.';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid.';
        }
        if (!formData.subject.trim()) newErrors.subject = 'Subject is required.';
        if (!formData.message.trim()) newErrors.message = 'Message is required.';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({...prev, [name]: ''}));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            console.log('Form Submitted:', formData);
            setIsSubmitted(true);
        }
    };

    return (
         <div className="container mx-auto px-4 py-12">
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-bold tracking-tight">Get in Touch</h1>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">We're here to help you with your luxury real estate needs. Fill out the form below or use one of the direct contact methods.</p>
            </header>

            <div className="grid lg:grid-cols-5 gap-12">
                {/* Contact Form */}
                <div className="lg:col-span-3">
                    {isSubmitted ? (
                        <Card className="flex flex-col items-center justify-center text-center p-12 h-full">
                           <ShieldCheckIcon className="w-16 h-16 text-green-500 mb-4" />
                           <h2 className="text-2xl font-semibold">Thank You!</h2>
                           <p className="text-muted-foreground mt-2">Your message has been sent successfully. Our team will get back to you shortly.</p>
                        </Card>
                    ) : (
                        <form onSubmit={handleSubmit} noValidate className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name</label>
                                <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Adebisi Adebayo" className={errors.name ? 'border-destructive' : ''} />
                                {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                            </div>
                             <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className={errors.email ? 'border-destructive' : ''} />
                                {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                            </div>
                             <div>
                                <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                                <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="Inquiry about Property #PROP1" className={errors.subject ? 'border-destructive' : ''} />
                                {errors.subject && <p className="text-sm text-destructive mt-1">{errors.subject}</p>}
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                                <Textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5} placeholder="I would like to schedule an inspection..." className={errors.message ? 'border-destructive' : ''} />
                                {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
                            </div>
                            <Button type="submit" size="lg" className="w-full">Send Message</Button>
                        </form>
                    )}
                </div>

                {/* Contact Info */}
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardContent className="p-6 space-y-4">
                           <h3 className="font-semibold text-lg">Contact Information</h3>
                            <div className="flex items-start gap-4">
                                <MapPinIcon className="w-5 h-5 mt-1 text-primary"/>
                                <div>
                                    <p className="font-medium">Our Office</p>
                                    <p className="text-muted-foreground text-sm">Landmark Towers, 5B Water Corporation Dr, Oniru, Lagos</p>
                                </div>
                            </div>
                             <div className="flex items-start gap-4">
                                <ClockIcon className="w-5 h-5 mt-1 text-primary"/>
                                <div>
                                    <p className="font-medium">Business Hours</p>
                                    <p className="text-muted-foreground text-sm">Mon-Fri: 9am - 6pm</p>
                                </div>
                            </div>
                             <div className="flex items-start gap-4">
                                <MailIcon className="w-5 h-5 mt-1 text-primary"/>
                                <div>
                                    <p className="font-medium">General Inquiries</p>
                                    <p className="text-muted-foreground text-sm">info@avianre.com</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-4">
                        <Button variant="outline" size="lg" className="w-full justify-start gap-3">
                            <PhoneIcon className="w-5 h-5 text-primary"/> Call Us: +234 800 123 4567
                        </Button>
                         <Button variant="outline" size="lg" className="w-full justify-start gap-3">
                            <WhatsAppIcon className="w-5 h-5 text-green-500"/> Chat on WhatsApp
                        </Button>
                    </div>

                     <div>
                        <h3 className="font-semibold mb-4">Follow Us</h3>
                        <div className="flex gap-4">
                            <a href="#" aria-label="Twitter"><TwitterIcon className="w-6 h-6 text-muted-foreground hover:text-primary"/></a>
                            <a href="#" aria-label="LinkedIn"><LinkedinIcon className="w-6 h-6 text-muted-foreground hover:text-primary"/></a>
                            <a href="#" aria-label="Instagram"><InstagramIcon className="w-6 h-6 text-muted-foreground hover:text-primary"/></a>
                        </div>
                    </div>
                </div>
            </div>
         </div>
    );
};

export default ContactPage;
