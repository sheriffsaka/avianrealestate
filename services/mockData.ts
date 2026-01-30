
import type { Property, User, Testimonial, Leader, ClientRequest, Transaction, Payment } from '../types';

export const properties: Property[] = [
    {
        id: 'prop1',
        address: { street: '10 Banana Island Road', city: 'Ikoyi', state: 'Lagos', zip: '106104' },
        price: 3500000000,
        bedrooms: 5,
        bathrooms: 6,
        sqft: 4500,
        status: 'For Sale',
        imageUrls: [
            'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600607686527-6fb88629f44b?q=80&w=1974&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=2070&auto=format&fit=crop',
        ],
        type: 'Mansion',
        dateAdded: '2024-07-20T10:00:00Z',
        description: 'An architectural masterpiece in the heart of Banana Island, this 5-bedroom mansion offers unparalleled luxury and privacy. Featuring a private cinema, infinity pool, and state-of-the-art security, it represents the pinnacle of opulent living.',
        yearBuilt: 2021,
        lotSize: 20000,
        agentId: 'user2',
    },
    {
        id: 'prop2',
        address: { street: '25 Asokoro Drive', city: 'Maitama', state: 'Abuja', zip: '904101' },
        price: 5800000000,
        bedrooms: 6,
        bathrooms: 7,
        sqft: 5500,
        status: 'For Sale',
        imageUrls: [
            'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12?q=80&w=2070&auto=format&fit=crop',
        ],
        type: 'Villa',
        dateAdded: '2024-07-18T14:30:00Z',
        description: 'Nestled in the prestigious Maitama district, this expansive villa is an entertainer\'s dream. With lush, landscaped gardens, a grand ballroom, and quarters for staff, it provides a secure and serene escape.',
        yearBuilt: 2019,
        lotSize: 35000,
        agentId: 'user3',
    },
    {
        id: 'prop3',
        address: { street: '18 Bourdillon Road', city: 'Ikoyi', state: 'Lagos', zip: '106104' },
        price: 9500000000,
        bedrooms: 7,
        bathrooms: 8,
        sqft: 7200,
        status: 'Sold',
        imageUrls: [
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600585153492-3f7035b8a14b?q=80&w=2070&auto=format&fit=crop'
        ],
        type: 'Mansion',
        dateAdded: '2024-07-15T09:00:00Z',
        description: 'A landmark estate on Bourdillon Road, offering breathtaking views of the Ikoyi skyline. This property features bespoke finishes, a rooftop terrace, and smart home automation for ultimate convenience and luxury.',
        yearBuilt: 2022,
        lotSize: 28000,
        agentId: 'user2',
    },
    {
        id: 'prop4',
        address: { street: '5 Admiralty Way', city: 'Lekki Phase 1', state: 'Lagos', zip: '106104' },
        price: 2200000000,
        bedrooms: 4,
        bathrooms: 5,
        sqft: 3800,
        status: 'Pending Review',
        imageUrls: [
            'https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=2067&auto=format&fit=crop'
        ],
        type: 'Villa',
        dateAdded: '2024-07-21T11:00:00Z',
        description: 'A contemporary waterfront villa with a private jetty in the vibrant heart of Lekki. Floor-to-ceiling windows offer stunning lagoon views, while the open-plan living space is perfect for modern family life.',
        yearBuilt: 2020,
        lotSize: 15000,
        agentId: 'user3',
    },
    {
        id: 'prop5',
        address: { street: 'Eko Atlantic Pearl Tower', city: 'Victoria Island', state: 'Lagos', zip: '106104' },
        price: 1800000000,
        bedrooms: 3,
        bathrooms: 4,
        sqft: 2500,
        status: 'Pending',
        imageUrls: [
            'https://images.unsplash.com/photo-1593696140826-c58b02198d47?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop'
        ],
        type: 'Penthouse',
        dateAdded: '2024-07-22T08:00:00Z',
        description: 'Experience sky-high living in this exquisite penthouse at the iconic Eko Atlantic. Offering 360-degree views of the city and the Atlantic ocean, this residence includes access to world-class amenities.',
        yearBuilt: 2023,
        lotSize: 2500,
        agentId: 'user2',
    },
    {
        id: 'prop6',
        address: { street: 'Jabi Lakefront Villa', city: 'Jabi', state: 'Abuja', zip: '900108' },
        price: 4100000000,
        bedrooms: 5,
        bathrooms: 5,
        sqft: 4200,
        status: 'Pending Review',
        imageUrls: [
            'https://images.unsplash.com/photo-1605276374104-5de67d216b04?q=80&w=1974&auto=format&fit=crop'
        ],
        type: 'Villa',
        dateAdded: '2024-06-30T16:00:00Z',
        description: 'A serene and secure family home with direct access to Jabi Lake. This villa combines modern amenities with tranquil surroundings, featuring a private garden, boat dock, and stunning water views.',
        yearBuilt: 2018,
        lotSize: 25000,
        agentId: 'user3',
    },
     {
        id: 'prop7',
        address: { street: 'Landmark Tower Apt.', city: 'Oniru', state: 'Lagos', zip: '106104' },
        price: 950000000,
        bedrooms: 2,
        bathrooms: 3,
        sqft: 1800,
        status: 'For Sale',
        imageUrls: [
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop'
        ],
        type: 'Apartment',
        dateAdded: '2024-07-19T18:00:00Z',
        description: 'A chic and modern apartment in the sought-after Landmark Tower, perfect for professionals or small families. Enjoy premium building amenities including a gym, pool, and concierge services, all with ocean views.',
        yearBuilt: 2020,
        lotSize: 1800,
        agentId: 'user2',
    },
    {
        id: 'prop8',
        address: { street: 'Guzape Hills Estate', city: 'Guzape', state: 'Abuja', zip: '900211' },
        price: 6500000000,
        bedrooms: 6,
        bathrooms: 8,
        sqft: 6000,
        status: 'For Sale',
        imageUrls: [
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop'
        ],
        type: 'Mansion',
        dateAdded: '2024-07-12T12:00:00Z',
        description: 'This palatial mansion in Guzape Hills offers commanding views and exceptional craftsmanship. Designed for grand-scale living, it includes multiple reception rooms, a library, and a resort-style pool area.',
        yearBuilt: 2021,
        lotSize: 40000,
        agentId: 'user3',
    }
];

export const users: User[] = [
    {
        id: 'user1',
        name: 'Adebisi Adebayo',
        email: 'adebisi.a@avianre.com',
        role: 'Admin',
        lastLogin: '2 hours ago',
        status: 'Active',
    },
    {
        id: 'user2',
        name: 'Chidi Okoro',
        email: 'chidi.o@avianre.com',
        role: 'Agent',
        lastLogin: '1 day ago',
        status: 'Active',
    },
    {
        id: 'user3',
        name: 'Fatima Bello',
        email: 'fatima.b@avianre.com',
        role: 'Agent',
        lastLogin: '5 minutes ago',
        status: 'Active',
    },
    {
        id: 'user4',
        name: 'David Ebiowei',
        email: 'david.ebiowei@client.com',
        role: 'Client',
        lastLogin: '3 days ago',
    },
    {
        id: 'user5',
        name: 'Ngozi Eze',
        email: 'ngozi.e@avianre.com',
        role: 'Agent',
        lastLogin: '2 weeks ago',
        status: 'Suspended',
    }
];

export const testimonials: Testimonial[] = [
    {
        id: 'test1',
        name: 'The Adekunle Family',
        location: 'Ikoyi, Lagos',
        quote: 'Avian Real Estate made our dream of a luxury home a reality. Their professionalism and market knowledge are second to none. The process was transparent and seamless.',
        rating: 5,
        avatarUrl: 'https://api.dicebear.com/8.x/personas/svg?seed=Adekunle'
    },
    {
        id: 'test2',
        name: 'Dr. Aisha Aliyu',
        location: 'Maitama, Abuja',
        quote: 'As a busy professional, I needed an efficient and trustworthy team. Avian delivered beyond my expectations, finding the perfect property with discretion and expertise.',
        rating: 5,
        avatarUrl: 'https://api.dicebear.com/8.x/personas/svg?seed=Aisha'
    },
    {
        id: 'test3',
        name: 'Emeka Nwankwo',
        location: 'Lekki, Lagos',
        quote: "Selling our family estate was an emotional process, but Avian's agents handled it with remarkable care and strategic insight, securing an excellent outcome for us.",
        rating: 5,
        avatarUrl: 'https://api.dicebear.com/8.x/personas/svg?seed=Emeka'
    }
];

export const leadershipTeam: Leader[] = [
    {
        id: 'leader1',
        name: 'Dr. Olumide Adebayo',
        title: 'Founder & CEO',
        bio: 'With over 20 years in real estate development and investment, Dr. Adebayo founded Avian to redefine luxury living in Nigeria by blending architectural innovation with unparalleled client service.',
        avatarUrl: 'https://api.dicebear.com/8.x/personas/svg?seed=Olumide'
    },
    {
        id: 'leader2',
        name: 'Chiamaka Nwosu',
        title: 'Chief Operating Officer',
        bio: 'Chiamaka orchestrates the seamless execution of our operations. Her expertise in process optimization and team leadership ensures every client interaction is flawless.',
        avatarUrl: 'https://api.dicebear.com/8.x/personas/svg?seed=Chiamaka'
    },
    {
        id: 'leader3',
        name: 'Ibrahim Danjuma',
        title: 'Chief Financial Officer',
        bio: 'A seasoned financial strategist, Ibrahim manages the company\'s fiscal health and investment portfolios, ensuring sustainable growth and maximizing value for our partners.',
        avatarUrl: 'https://api.dicebear.com/8.x/personas/svg?seed=Ibrahim'
    }
];

export const clientRequests: ClientRequest[] = [
    { id: 'req1', clientName: 'Mr. Tunde Bakare', requestDate: '2024-07-25T10:00:00Z', preferredLocation: 'Banana Island, Ikoyi', budget: '₦3B - ₦4B', assignedAgentId: 'user2', status: 'Contacted' },
    { id: 'req2', clientName: 'Hajia Amina Yusuf', requestDate: '2024-07-24T15:30:00Z', preferredLocation: 'Maitama, Abuja', budget: '₦5B+', assignedAgentId: 'user3', status: 'New' },
    { id: 'req3', clientName: 'Chief Okonjo', requestDate: '2024-07-22T09:00:00Z', preferredLocation: 'Lekki Phase 1', budget: '₦1.5B - ₦2B', assignedAgentId: 'user2', status: 'Closed' },
];

export const transactions: Transaction[] = [
    { id: 'txn1', propertyId: 'prop3', buyerName: 'Confidential Client', salePrice: 9500000000, transactionDate: '2024-07-28T14:00:00Z', status: 'Completed' },
    { id: 'txn2', propertyId: 'prop5', buyerName: 'Confidential Client', salePrice: 1800000000, transactionDate: '2024-08-01T11:00:00Z', status: 'Pending' },
];

export const payments: Payment[] = [
    { id: 'pay1', transactionId: 'txn1', amount: 950000000, paymentDate: '2024-07-28T14:05:00Z', type: 'Closing Cost', status: 'Paid' },
    { id: 'pay2', transactionId: 'txn2', amount: 250000, paymentDate: '2024-07-22T10:05:00Z', type: 'Mobilization Fee', status: 'Paid' },
    { id: 'pay3', transactionId: 'txn1', amount: 475000000, paymentDate: '2024-07-29T10:00:00Z', type: 'Commission', status: 'Pending' },
];
