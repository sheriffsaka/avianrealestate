
import React, { useState, useMemo } from 'react';
import { properties as mockProperties, users as mockUsers } from '../services/mockData';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { BedIcon } from '../components/icons/BedIcon';
import { BathIcon } from '../components/icons/BathIcon';
import { RulerIcon } from '../components/icons/RulerIcon';
import { CalendarIcon } from '../components/icons/CalendarIcon';
import { BuildingIcon } from '../components/icons/BuildingIcon';
import { PhoneIcon } from '../components/icons/PhoneIcon';
import { MailIcon } from '../components/icons/MailIcon';

type Page = 'home' | 'about' | 'listings' | 'details';

interface PropertyDetailsPageProps {
    propertyId: string;
    onNavigate: (page: Page) => void;
}

const PropertyDetailsPage: React.FC<PropertyDetailsPageProps> = ({ propertyId, onNavigate }) => {
    const property = useMemo(() => mockProperties.find(p => p.id === propertyId), [propertyId]);
    const agent = useMemo(() => property ? mockUsers.find(u => u.id === property.agentId) : undefined, [property]);
    
    const [activeImage, setActiveImage] = useState(property?.imageUrls[0] || '');

    if (!property || !agent) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h1 className="text-2xl font-bold">Property not found.</h1>
                <Button onClick={() => onNavigate('listings')} className="mt-4">Back to Listings</Button>
            </div>
        );
    }

    const badgeVariant = (status: string) => {
        switch (status) {
            case 'For Sale': return 'success';
            case 'Pending': return 'default';
            case 'Sold': return 'destructive';
            default: return 'secondary';
        }
    };
    
    return (
        <div className="container mx-auto px-4 py-12">
            <Button variant="ghost" onClick={() => onNavigate('listings')} className="mb-6">
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Back to Listings
            </Button>

            {/* Image Gallery */}
            <div className="mb-8">
                <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted mb-4">
                    <img src={activeImage} alt="Main property view" className="w-full h-full object-cover" />
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {property.imageUrls.map((url, index) => (
                        <div 
                            key={index} 
                            className={`aspect-video w-full overflow-hidden rounded-md cursor-pointer border-2 ${activeImage === url ? 'border-primary' : 'border-transparent'} hover:border-primary/50`}
                            onClick={() => setActiveImage(url)}
                        >
                             <img src={url} alt={`Property view ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div>
                        <div className="flex justify-between items-start">
                             <div>
                                <h1 className="text-4xl font-bold tracking-tight">{property.address.street}</h1>
                                <p className="text-lg text-muted-foreground mt-1">{`${property.address.city}, ${property.address.state}`}</p>
                            </div>
                            <Badge variant={badgeVariant(property.status)} className="text-lg whitespace-nowrap">{property.status}</Badge>
                        </div>
                         <p className="text-4xl font-bold text-primary mt-4">₦{property.price.toLocaleString()}</p>
                    </div>

                    <div className="border-t border-border pt-6">
                        <h2 className="text-2xl font-semibold mb-4">Description</h2>
                        <p className="text-muted-foreground leading-relaxed">{property.description}</p>
                    </div>

                    <div className="border-t border-border pt-6">
                        <h2 className="text-2xl font-semibold mb-4">Specifications</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
                            <div className="flex items-center gap-3"><BedIcon className="w-5 h-5 text-primary"/> <div><span className="font-bold">{property.bedrooms}</span> Bedrooms</div></div>
                            <div className="flex items-center gap-3"><BathIcon className="w-5 h-5 text-primary"/> <div><span className="font-bold">{property.bathrooms}</span> Bathrooms</div></div>
                            <div className="flex items-center gap-3"><RulerIcon className="w-5 h-5 text-primary"/> <div><span className="font-bold">{property.sqft.toLocaleString()}</span> sqft Living</div></div>
                            <div className="flex items-center gap-3"><RulerIcon className="w-5 h-5 text-primary"/> <div><span className="font-bold">{property.lotSize.toLocaleString()}</span> sqft Lot</div></div>
                            <div className="flex items-center gap-3"><BuildingIcon className="w-5 h-5 text-primary"/> <div><span className="font-bold">{property.type}</span></div></div>
                            <div className="flex items-center gap-3"><CalendarIcon className="w-5 h-5 text-primary"/> <div>Built in <span className="font-bold">{property.yearBuilt}</span></div></div>
                        </div>
                    </div>
                </div>

                {/* Agent CTA Card */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-24">
                        <CardHeader className="items-center text-center">
                             <img src={`https://api.dicebear.com/8.x/personas/svg?seed=${agent.name.split(' ')[0]}`} alt={agent.name} className="w-20 h-20 rounded-full mb-2 bg-muted border"/>
                            <CardTitle>{agent.name}</CardTitle>
                            <CardDescription>Listing Agent</CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm space-y-4">
                            <Button className="w-full" size="lg">Request Inspection</Button>
                            <div className="text-muted-foreground space-y-2 pt-2">
                                <div className="flex items-center gap-3">
                                    <PhoneIcon className="w-4 h-4" />
                                    <span>+234 800 123 4567</span>
                                </div>
                                 <div className="flex items-center gap-3">
                                    <MailIcon className="w-4 h-4" />
                                    <span>{agent.email}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetailsPage;
