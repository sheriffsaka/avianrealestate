
import React from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';
import { leadershipTeam } from '../services/mockData';
import type { Leader } from '../types';
import { TargetIcon } from '../components/icons/TargetIcon';
import { UsersIcon } from '../components/icons/UsersIcon';
import { BriefcaseIcon } from '../components/icons/BriefcaseIcon';
import { AwardIcon } from '../components/icons/AwardIcon';
import { TrendingUpIcon } from '../components/icons/TrendingUpIcon';
import { ShieldCheckIcon } from '../components/icons/ShieldCheckIcon';

type Page = 'home' | 'about' | 'listings' | 'details' | 'contact';

interface AboutPageProps {
    onNavigate: (page: Page) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
    return (
        <>
            {/* Hero Section */}
            <section className="bg-card py-20 md:py-32">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary">
                        Pioneering the Future of Luxury Real Estate in Nigeria.
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
                        Avian Real Estate is a tech-driven brokerage committed to providing unparalleled service, data-driven insights, and seamless experiences for discerning clients in the Nigerian luxury property market.
                    </p>
                </div>
            </section>
            
            <div className="container mx-auto px-4 py-16 md:py-24 space-y-24">
                
                {/* Mission & Vision Section */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Mission</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            To empower our clients with exceptional insights and advisory services, leveraging technology to deliver transparent and efficient real estate transactions. We strive to be the most trusted name in Nigerian luxury property.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Vision</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                           To be the undisputed leader in the African luxury real estate sector, setting new standards for innovation, integrity, and client satisfaction, while contributing to the growth and prestige of our communities.
                        </p>
                    </div>
                </section>

                {/* Trust & Credibility Indicators Section */}
                <section className="bg-card border border-border rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
                        <div className="p-8 flex flex-col items-center text-center">
                            <AwardIcon className="w-10 h-10 text-primary mb-4" />
                            <p className="text-4xl font-bold">10+</p>
                            <p className="text-muted-foreground mt-1">Years of Combined Experience</p>
                        </div>
                        <div className="p-8 flex flex-col items-center text-center">
                            <TrendingUpIcon className="w-10 h-10 text-primary mb-4" />
                            <p className="text-4xl font-bold">₦50B+</p>
                            <p className="text-muted-foreground mt-1">In Properties Sold</p>
                        </div>
                        <div className="p-8 flex flex-col items-center text-center">
                            <ShieldCheckIcon className="w-10 h-10 text-primary mb-4" />
                            <p className="text-4xl font-bold">98%</p>
                            <p className="text-muted-foreground mt-1">Client Satisfaction Rate</p>
                        </div>
                    </div>
                </section>

                 {/* Leadership Section */}
                <section>
                     <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Meet Our Leadership</h2>
                        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
                            The driving force behind our success is a team of seasoned industry veterans.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {leadershipTeam.map((leader: Leader) => (
                            <Card key={leader.id} className="text-center">
                                <CardHeader className="items-center">
                                    <img src={leader.avatarUrl} alt={leader.name} className="w-24 h-24 rounded-full mb-4 bg-muted border"/>
                                    <CardTitle className="text-xl">{leader.name}</CardTitle>
                                    <CardDescription className="text-primary">{leader.title}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground text-sm">{leader.bio}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Our Model Section */}
                <section>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">The Avian Model</h2>
                        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
                           Our unique approach combines technology, expertise, and a client-first philosophy.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="flex flex-col items-center p-6 bg-card border border-border rounded-lg">
                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                                <TargetIcon className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Data-Driven Strategy</h3>
                            <p className="text-muted-foreground">We harness proprietary market data and analytics to provide our clients with a decisive competitive advantage in their transactions.</p>
                        </div>
                        <div className="flex flex-col items-center p-6 bg-card border border-border rounded-lg">
                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                                <UsersIcon className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Client-Centric Service</h3>
                            <p className="text-muted-foreground">Our agents are dedicated advisors committed to understanding your unique needs and delivering a bespoke, confidential service.</p>
                        </div>
                        <div className="flex flex-col items-center p-6 bg-card border border-border rounded-lg">
                             <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                                <BriefcaseIcon className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Integrated Platform</h3>
                            <p className="text-muted-foreground">Our end-to-end technology platform streamlines every aspect of the process, from discovery to closing, ensuring efficiency and transparency.</p>
                        </div>
                    </div>
                </section>

                {/* Final CTA Section */}
                <section className="bg-card border border-border rounded-lg p-8 md:p-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Partner with the Leaders in Luxury</h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Contact us today to learn how our expertise can help you achieve your real estate ambitions.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" onClick={() => onNavigate('contact')}>Contact Us</Button>
                        <Button size="lg" variant="secondary" onClick={() => onNavigate('listings')}>Explore Listings</Button>
                    </div>
                </section>
            </div>
        </>
    );
};

export default AboutPage;
