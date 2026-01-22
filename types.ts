
export interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
}

export type PropertyStatus = 'For Sale' | 'Sold' | 'Pending' | 'Pending Review' | 'Approved' | 'Rejected';
export type PropertyType = 'Villa' | 'Apartment' | 'Penthouse' | 'Mansion';

export interface Property {
    id: string;
    address: Address;
    price: number;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    status: PropertyStatus;
    imageUrls: string[];
    type: PropertyType;
    dateAdded: string; // ISO 8601 format
    description: string;
    yearBuilt: number;
    lotSize: number; // in square feet
    agentId: string;
}

export interface User {
    id:string;
    name: string;
    email: string;
    role: 'Admin' | 'Agent' | 'Client';
    lastLogin: string;
    status?: 'Active' | 'Suspended'; // Optional for now
}

export interface Testimonial {
    id: string;
    name: string;
    location: string;
    quote: string;
    rating: number;
    avatarUrl: string;
}

export interface Leader {
    id: string;
    name: string;
    title: string;
    bio: string;
    avatarUrl: string;
}

export type RequestStatus = 'New' | 'Contacted' | 'Closed';

export interface ClientRequest {
    id: string;
    clientName: string;
    requestDate: string; // ISO 8601 format
    preferredLocation: string;
    budget: string; // e.g. "₦500M - ₦750M"
    assignedAgentId: string | null;
    status: RequestStatus;
}

export interface Transaction {
    id: string;
    propertyId: string;
    buyerName: string;
    salePrice: number;
    transactionDate: string; // ISO 8601 format
    status: 'Completed' | 'Pending';
}

export interface Payment {
    id: string;
    transactionId: string;
    amount: number;
    paymentDate: string; // ISO 8601 format
    type: 'Mobilization Fee' | 'Commission' | 'Closing Cost';
    status: 'Paid' | 'Pending';
}
