
import React from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';
import { properties, testimonials } from '../services/mockData';
import type { Property, Testimonial } from '../types';
import { SearchIcon } from '../components/icons/SearchIcon';
import { HomeIcon } from '../components/icons/HomeIcon';
import { KeyIcon } from '../components/icons/KeyIcon';
import { StarIcon } from '../components/icons/StarIcon';

type Page = 'home' | 'about' | 'listings' | 'details' | 'contact' | 'client-request';

interface HomePageProps {
    onNavigate: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <StarIcon key={i} className={`w-5 h-5 ${i < rating ? 'text-primary' : 'text-muted-foreground/50'}`} />
        ));
    };

    return (
        <>
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center text-white px-4">
                <div className="absolute inset-0 bg-black/60 z-10"></div>
                <img 
                    src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop" 
                    alt="Modern luxury villa in Nigeria" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-20 space-y-6">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
                        Your Vision, Our Expertise.
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/90 drop-shadow-md">
                        Seamlessly navigate the luxury real estate market with our unparalleled service and data-driven insights.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" onClick={() => onNavigate('listings')}>Explore Listings</Button>
                        <Button size="lg" variant="secondary" onClick={() => onNavigate('client-request')}>Client Services</Button>
                    </div>
                </div>
            </section>
            
            <div className="container mx-auto px-4 py-16 md:py-24 space-y-24">
                {/* Featured Properties Section */}
                <section>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Featured Properties</h2>
                        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
                            Discover exclusive listings in Nigeria's most desirable neighborhoods.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {properties.slice(0, 3).map((property: Property) => (
                            <Card key={property.id} className="overflow-hidden hover:border-primary/50 transition-colors duration-300">
                                <CardHeader className="p-0">
                                    <div className="aspect-video bg-muted overflow-hidden">
                                        <img src={property.imageUrls[0]} alt={property.address.street} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"/>
                                    </div>
                                </CardHeader>
                                <div className="p-6 space-y-4">
                                    <div>
                                        <CardTitle className="text-xl">{property.address.street}</CardTitle>
                                        <CardDescription>{property.address.city}, {property.address.state}</CardDescription>
                                    </div>
                                    <div className="flex justify-between items-center text-sm text-muted-foreground border-t border-border pt-4">
                                        <div className="flex items-center gap-2"><b>{property.bedrooms}</b> beds</div>
                                        <div className="flex items-center gap-2"><b>{property.bathrooms}</b> baths</div>
                                        <div className="flex items-center gap-2"><b>{property.sqft.toLocaleString()}</b> sqft</div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-2xl font-bold text-primary">₦{property.price.toLocaleString()}</p>
                                        <Button variant="outline" onClick={() => onNavigate('listings')}>View Details</Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* How It Works Section */}
                <section>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">A Simplified Journey</h2>
                        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
                            We've streamlined the process to make your real estate experience effortless.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="flex flex-col items-center p-6 bg-card border border-border rounded-lg">
                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                                <SearchIcon className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">1. Discover</h3>
                            <p className="text-muted-foreground">Browse our curated, up-to-the-minute listings or connect with a dedicated agent to find your perfect match.</p>
                        </div>
                        <div className="flex flex-col items-center p-6 bg-card border border-border rounded-lg">
                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                                <HomeIcon className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">2. Tour</h3>
                            <p className="text-muted-foreground">Schedule seamless virtual or in-person tours at your convenience. Experience properties like never before.</p>
                        </div>
                        <div className="flex flex-col items-center p-6 bg-card border border-border rounded-lg">
                             <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                                <KeyIcon className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">3. Close</h3>
                            <p className="text-muted-foreground">Our team of experts will guide you through every step of the closing process, ensuring a smooth transition.</p>
                        </div>
                    </div>
                </section>

                 {/* Testimonials Section */}
                <section>
                     <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Trusted by Discerning Clients</h2>
                        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
                            Our commitment to excellence is reflected in the words of our clients.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial: Testimonial) => (
                            <Card key={testimonial.id} className="flex flex-col">
                                <CardContent className="flex-grow p-6">
                                    <div className="flex mb-4">{renderStars(testimonial.rating)}</div>
                                    <blockquote className="text-foreground/90">"{testimonial.quote}"</blockquote>
                                </CardContent>
                                <CardFooter className="p-6 pt-4 border-t border-border mt-auto">
                                    <div className="flex items-center">
                                        <img src={testimonial.avatarUrl} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4 bg-muted"/>
                                        <div>
                                            <p className="font-semibold">{testimonial.name}</p>
                                            <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                                        </div>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </section>
                
                {/* Final CTA Section */}
                <section className="bg-card border border-border rounded-lg p-8 md:p-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ready to Begin Your Journey?</h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Whether buying, selling, or investing, Avian Real Estate is your trusted partner in luxury real estate.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" onClick={() => onNavigate('listings')}>Find a Property</Button>
                        <Button size="lg" variant="secondary" onClick={() => onNavigate('client-request')}>Get a Free Valuation</Button>
                    </div>
                </section>
            </div>
        </>
    );
};

export default HomePage;
