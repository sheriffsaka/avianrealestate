
import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Select } from '../components/ui/Select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';
import { UploadCloudIcon } from '../components/icons/UploadCloudIcon';
import { XIcon } from '../components/icons/XIcon';
import { EyeIcon } from '../components/icons/EyeIcon';
import { EditIcon } from '../components/icons/EditIcon';
import { LoaderIcon } from '../components/icons/LoaderIcon';
import { CheckCircleIcon } from '../components/icons/CheckCircleIcon';

type Page = 'agent-dashboard' | 'home';

interface AgentPropertySubmissionPageProps {
    onNavigate: (page: Page) => void;
}

const AgentPropertySubmissionPage: React.FC<AgentPropertySubmissionPageProps> = ({ onNavigate }) => {
    const [formData, setFormData] = useState({
        street: '', city: 'Lagos', state: 'Lagos',
        price: '', bedrooms: '', bathrooms: '', sqft: '', lotSize: '',
        type: '', yearBuilt: '', description: '',
    });
    const [images, setImages] = useState<string[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isPreview, setIsPreview] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.street) newErrors.street = "Street address is required.";
        if (!formData.price) newErrors.price = "Price is required.";
        if (!formData.bedrooms) newErrors.bedrooms = "Number of bedrooms is required.";
        if (!formData.bathrooms) newErrors.bathrooms = "Number of bathrooms is required.";
        if (!formData.sqft) newErrors.sqft = "Square footage is required.";
        if (!formData.type) newErrors.type = "Property type is required.";
        if (!formData.description) newErrors.description = "Description is required.";
        if (images.length === 0) newErrors.images = "At least one image is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleImageUpload = () => {
        if (images.length < 4) {
             const mockImages = [
                'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=2070&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1600607686527-6fb88629f44b?q=80&w=1974&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=2070&auto=format&fit=crop',
            ];
            setImages(mockImages);
            if (errors.images) setErrors(prev => ({ ...prev, images: '' }));
        }
    };
    
    const handleRemoveImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);
            setTimeout(() => {
                console.log("Submitting property:", { ...formData, images });
                setIsSubmitting(false);
                setIsSubmitted(true);
            }, 2000);
        }
    };

    const renderError = (field: string) => errors[field] && <p className="text-sm text-destructive mt-1">{errors[field]}</p>;
    
    if (isSubmitted) {
        return (
            <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
                <Card className="flex flex-col items-center justify-center text-center p-12 max-w-lg">
                    <CheckCircleIcon className="w-16 h-16 text-green-500 mb-4" />
                    <h2 className="text-2xl font-semibold">Listing Submitted!</h2>
                    <p className="text-muted-foreground mt-2">Your new property listing is now under review. You will be notified once it is approved and published.</p>
                    <div className="flex gap-4 mt-6">
                        <Button onClick={() => onNavigate('agent-dashboard')}>Return to Dashboard</Button>
                        <Button onClick={() => window.location.reload()} variant="outline">Submit Another</Button>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <header className="mb-8">
                <h1 className="text-4xl font-bold tracking-tight">Submit New Property</h1>
                <p className="text-muted-foreground mt-2">Provide accurate details to attract the best clients.</p>
            </header>
            
            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Listing Details</CardTitle>
                            <CardDescription>All fields marked with an asterisk (*) are required.</CardDescription>
                        </div>
                        <Button type="button" variant="outline" onClick={() => setIsPreview(!isPreview)}>
                            {isPreview ? <><EditIcon className="w-4 h-4 mr-2"/> Edit Form</> : <><EyeIcon className="w-4 h-4 mr-2"/> Preview Listing</>}
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        {/* Address Section */}
                        <div className="space-y-4">
                             <h3 className="text-lg font-medium border-b pb-2">Address *</h3>
                             <div className="grid sm:grid-cols-3 gap-4">
                                <div>
                                    <label htmlFor="street" className="block text-sm font-medium mb-2">Street Address</label>
                                    <Input id="street" name="street" value={formData.street} onChange={handleChange} disabled={isPreview} className={errors.street ? 'border-destructive' : ''}/>
                                    {renderError('street')}
                                </div>
                                 <div>
                                    <label htmlFor="city" className="block text-sm font-medium mb-2">City</label>
                                    <Input id="city" name="city" value={formData.city} onChange={handleChange} disabled={isPreview} />
                                </div>
                                 <div>
                                    <label htmlFor="state" className="block text-sm font-medium mb-2">State</label>
                                    <Input id="state" name="state" value={formData.state} onChange={handleChange} disabled={isPreview} />
                                </div>
                             </div>
                        </div>

                        {/* Property Details Section */}
                         <div className="space-y-4">
                             <h3 className="text-lg font-medium border-b pb-2">Property Details *</h3>
                              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium mb-2">Price (₦)</label>
                                    <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} disabled={isPreview} className={errors.price ? 'border-destructive' : ''} />
                                     {renderError('price')}
                                </div>
                                 <div>
                                    <label htmlFor="bedrooms" className="block text-sm font-medium mb-2">Bedrooms</label>
                                    <Input id="bedrooms" name="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange} disabled={isPreview} className={errors.bedrooms ? 'border-destructive' : ''} />
                                     {renderError('bedrooms')}
                                </div>
                                 <div>
                                    <label htmlFor="bathrooms" className="block text-sm font-medium mb-2">Bathrooms</label>
                                    <Input id="bathrooms" name="bathrooms" type="number" value={formData.bathrooms} onChange={handleChange} disabled={isPreview} className={errors.bathrooms ? 'border-destructive' : ''} />
                                     {renderError('bathrooms')}
                                </div>
                                 <div>
                                    <label htmlFor="sqft" className="block text-sm font-medium mb-2">Total Sqft</label>
                                    <Input id="sqft" name="sqft" type="number" value={formData.sqft} onChange={handleChange} disabled={isPreview} className={errors.sqft ? 'border-destructive' : ''} />
                                     {renderError('sqft')}
                                </div>
                                 <div>
                                    <label htmlFor="lotSize" className="block text-sm font-medium mb-2">Lot Size (Sqft)</label>
                                    <Input id="lotSize" name="lotSize" type="number" value={formData.lotSize} onChange={handleChange} disabled={isPreview} />
                                </div>
                                 <div>
                                    <label htmlFor="yearBuilt" className="block text-sm font-medium mb-2">Year Built</label>
                                    <Input id="yearBuilt" name="yearBuilt" type="number" value={formData.yearBuilt} onChange={handleChange} disabled={isPreview} />
                                </div>
                                  <div>
                                    <label htmlFor="type" className="block text-sm font-medium mb-2">Property Type</label>
                                    <Select id="type" name="type" value={formData.type} onChange={handleChange} disabled={isPreview} className={errors.type ? 'border-destructive' : ''}>
                                        <option value="">Select type...</option>
                                        <option value="Mansion">Mansion</option>
                                        <option value="Villa">Villa</option>
                                        <option value="Apartment">Apartment</option>
                                        <option value="Penthouse">Penthouse</option>
                                    </Select>
                                     {renderError('type')}
                                </div>
                              </div>
                         </div>
                         
                         {/* Description Section */}
                         <div className="space-y-4">
                            <h3 className="text-lg font-medium border-b pb-2">Description *</h3>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium mb-2">Property Description</label>
                                <Textarea id="description" name="description" rows={6} value={formData.description} onChange={handleChange} disabled={isPreview} className={errors.description ? 'border-destructive' : ''} />
                                {renderError('description')}
                            </div>
                         </div>

                        {/* Media Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium border-b pb-2">Media *</h3>
                            {!isPreview && (
                                <>
                                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary" onClick={handleImageUpload}>
                                    <UploadCloudIcon className="w-12 h-12 mx-auto text-muted-foreground"/>
                                    <p className="mt-4 font-semibold">Drag & drop images here, or click to select</p>
                                    <p className="text-sm text-muted-foreground">The first image will be the cover photo. Max 4 images.</p>
                                </div>
                                {renderError('images')}
                                </>
                            )}
                            {images.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                    {images.map((src, index) => (
                                        <div key={index} className="relative aspect-video group">
                                            <img src={src} alt={`Upload preview ${index + 1}`} className="w-full h-full object-cover rounded-md"/>
                                            {!isPreview && (
                                                <button type="button" onClick={() => handleRemoveImage(index)} className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <XIcon className="w-4 h-4"/>
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-4">
                        <Button type="button" variant="outline" onClick={() => onNavigate('agent-dashboard')}>Cancel</Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <LoaderIcon className="w-4 h-4 mr-2 animate-spin"/>}
                            Submit for Review
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
};

export default AgentPropertySubmissionPage;
