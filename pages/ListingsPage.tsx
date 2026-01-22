
import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Skeleton } from '../components/ui/Skeleton';
import { Pagination } from '../components/ui/Pagination';
import { properties as mockProperties } from '../services/mockData';
import type { Property } from '../types';

const ITEMS_PER_PAGE = 6;

interface ListingsPageProps {
    onSelectProperty: (id: string) => void;
}

const ListingsPage: React.FC<ListingsPageProps> = ({ onSelectProperty }) => {
    const [loading, setLoading] = useState(true);
    const [allProperties, setAllProperties] = useState<Property[]>([]);
    const [filters, setFilters] = useState({
        location: '',
        minPrice: '',
        maxPrice: '',
        type: 'all',
    });
    const [sortOption, setSortOption] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setAllProperties(mockProperties.filter(p => p.status === 'For Sale' || p.status === 'Pending'));
            setLoading(false);
        }, 1500);
    }, []);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
        setCurrentPage(1);
    };

    const filteredAndSortedProperties = useMemo(() => {
        let result = allProperties
            .filter(p => {
                const locationMatch = p.address.city.toLowerCase().includes(filters.location.toLowerCase()) ||
                                      p.address.state.toLowerCase().includes(filters.location.toLowerCase()) ||
                                      p.address.street.toLowerCase().includes(filters.location.toLowerCase());
                const minPriceMatch = filters.minPrice ? p.price >= parseInt(filters.minPrice) : true;
                const maxPriceMatch = filters.maxPrice ? p.price <= parseInt(filters.maxPrice) : true;
                const typeMatch = filters.type === 'all' || p.type === filters.type;
                return locationMatch && minPriceMatch && maxPriceMatch && typeMatch;
            });
        
        result.sort((a, b) => {
            switch (sortOption) {
                case 'price_asc':
                    return a.price - b.price;
                case 'price_desc':
                    return b.price - a.price;
                case 'newest':
                default:
                    return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
            }
        });

        return result;
    }, [allProperties, filters, sortOption]);

    const paginatedProperties = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredAndSortedProperties.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredAndSortedProperties, currentPage]);

    const totalPages = Math.ceil(filteredAndSortedProperties.length / ITEMS_PER_PAGE);

    const PropertyCardSkeleton = () => (
        <div className="space-y-4">
            <Skeleton className="h-[225px] w-full" />
            <div className="space-y-2 p-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex justify-between pt-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                </div>
                 <div className="flex justify-between items-center pt-2">
                    <Skeleton className="h-8 w-1/3" />
                    <Skeleton className="h-10 w-1/4" />
                </div>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-12">
            <header className="mb-8">
                <h1 className="text-4xl font-bold tracking-tight">Property Listings</h1>
                <p className="text-muted-foreground mt-2">Browse our exclusive collection of luxury properties available for sale.</p>
            </header>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8 p-4 bg-card border rounded-lg">
                <Input 
                    placeholder="Search by location..."
                    name="location"
                    value={filters.location}
                    onChange={handleFilterChange}
                    className="lg:col-span-2"
                />
                <Select name="minPrice" value={filters.minPrice} onChange={handleFilterChange}>
                    <option value="">Min Price</option>
                    <option value="500000000">₦500M</option>
                    <option value="1000000000">₦1B</option>
                    <option value="2000000000">₦2B</option>
                    <option value="5000000000">₦5B</option>
                </Select>
                 <Select name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange}>
                    <option value="">Max Price</option>
                    <option value="1000000000">₦1B</option>
                    <option value="2000000000">₦2B</option>
                    <option value="5000000000">₦5B</option>
                    <option value="10000000000">₦10B</option>
                </Select>
                <Select name="type" value={filters.type} onChange={handleFilterChange}>
                    <option value="all">All Types</option>
                    <option value="Villa">Villa</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Mansion">Mansion</option>
                </Select>
            </div>
            
            {/* Sorting & Results */}
            <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-muted-foreground">
                    Showing {paginatedProperties.length} of {filteredAndSortedProperties.length} results
                </p>
                <div className="w-48">
                    <Select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                        <option value="newest">Sort by: Newest</option>
                        <option value="price_asc">Price: Low to High</option>
                        <option value="price_desc">Price: High to Low</option>
                    </Select>
                </div>
            </div>

            {/* Listings Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading 
                    ? Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => <PropertyCardSkeleton key={i} />)
                    : paginatedProperties.map((property) => (
                        <Card key={property.id} className="overflow-hidden hover:border-primary/50 transition-colors duration-300 flex flex-col">
                            <CardHeader className="p-0">
                                <div className="aspect-[16/10] bg-muted overflow-hidden">
                                    <img src={property.imageUrls[0]} alt={property.address.street} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"/>
                                </div>
                            </CardHeader>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex-grow space-y-4">
                                    <div>
                                        <CardTitle className="text-xl">{property.address.street}</CardTitle>
                                        <CardDescription>{property.address.city}, {property.address.state}</CardDescription>
                                    </div>
                                    <div className="flex justify-between items-center text-sm text-muted-foreground border-t border-border pt-4">
                                        <div className="flex items-center gap-2"><b>{property.bedrooms}</b> beds</div>
                                        <div className="flex items-center gap-2"><b>{property.bathrooms}</b> baths</div>
                                        <div className="flex items-center gap-2"><b>{property.sqft.toLocaleString()}</b> sqft</div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                                    <p className="text-2xl font-bold text-primary">₦{(property.price / 1_000_000_000).toFixed(2)}B</p>
                                    <Button variant="outline" onClick={() => onSelectProperty(property.id)}>View Details</Button>
                                </div>
                            </div>
                        </Card>
                ))}
            </div>

            {!loading && filteredAndSortedProperties.length === 0 && (
                 <div className="text-center py-20 col-span-full">
                    <h2 className="text-2xl font-semibold">No Properties Found</h2>
                    <p className="text-muted-foreground mt-2">Try adjusting your filters to find what you're looking for.</p>
                </div>
            )}

            {/* Pagination */}
            {!loading && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
        </div>
    );
};

export default ListingsPage;
