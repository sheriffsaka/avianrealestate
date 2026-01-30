
import React, { useMemo } from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { properties as mockProperties } from '../services/mockData';
import type { Property, PropertyStatus } from '../types';
import { BuildingIcon } from '../components/icons/BuildingIcon';
import { CheckCircleIcon } from '../components/icons/CheckCircleIcon';
import { DollarSignIcon } from '../components/icons/DollarSignIcon';
import { UsersIcon } from '../components/icons/UsersIcon';
import { EditIcon } from '../components/icons/EditIcon';
import { EyeIcon } from '../components/icons/EyeIcon';
import { PlusCircleIcon } from '../components/icons/PlusCircleIcon';

type Page = 'details' | 'listings' | 'agent-property-submission';

interface AgentDashboardPageProps {
    onNavigate: (page: Page) => void;
    onSelectProperty: (id: string) => void;
}

const AgentDashboardPage: React.FC<AgentDashboardPageProps> = ({ onNavigate, onSelectProperty }) => {
    const agentId = 'user2'; // Mocking the logged-in agent

    const agentProperties = useMemo(() => {
        return mockProperties
            .filter(p => p.agentId === agentId)
            .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
    }, [agentId]);

    const stats = useMemo(() => {
        const activeListings = agentProperties.filter(p => p.status === 'For Sale').length;
        const soldProperties = agentProperties.filter(p => p.status === 'Sold');
        const totalRevenue = soldProperties.reduce((sum, p) => sum + p.price, 0);
        return {
            activeListings,
            propertiesSold: soldProperties.length,
            totalRevenue,
            newLeads: 12, // Mocked value
        };
    }, [agentProperties]);

    const getBadgeVariant = (status: PropertyStatus): 'success' | 'default' | 'destructive' => {
        switch (status) {
            case 'For Sale': return 'success';
            case 'Pending': return 'default';
            case 'Sold': return 'destructive';
            default: return 'default';
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <header className="mb-8">
                <h1 className="text-4xl font-bold tracking-tight">Agent Dashboard</h1>
                <p className="text-muted-foreground mt-2">Welcome back, Chidi. Here's your performance overview.</p>
            </header>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
                        <BuildingIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.activeListings}</div>
                        <p className="text-xs text-muted-foreground">Properties currently on the market</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Properties Sold (YTD)</CardTitle>
                        <CheckCircleIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.propertiesSold}</div>
                        <p className="text-xs text-muted-foreground">Successful transactions this year</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue (YTD)</CardTitle>
                        <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₦{(stats.totalRevenue / 1_000_000_000).toFixed(2)}B</div>
                        <p className="text-xs text-muted-foreground">Based on sold properties</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">New Leads (This Month)</CardTitle>
                        <UsersIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+{stats.newLeads}</div>
                        <p className="text-xs text-muted-foreground">New client inquiries received</p>
                    </CardContent>
                </Card>
            </div>

            {/* Property Listings Table */}
            <Card>
                <CardHeader className="flex items-center justify-between flex-row">
                    <div>
                        <CardTitle>My Property Listings</CardTitle>
                        <CardDescription>Manage your portfolio of active and closed listings.</CardDescription>
                    </div>
                    <Button onClick={() => onNavigate('agent-property-submission')}>
                        <PlusCircleIcon className="w-4 h-4 mr-2" />
                        Submit New Property
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Property</TableHead>
                                <TableHead className="hidden md:table-cell">Date Added</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {agentProperties.map((prop) => (
                                <TableRow key={prop.id}>
                                    <TableCell className="font-medium">
                                        <div>{prop.address.street}</div>
                                        <div className="text-xs text-muted-foreground">{prop.address.city}</div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">{new Date(prop.dateAdded).toLocaleDateString()}</TableCell>
                                    <TableCell>₦{(prop.price / 1_000_000).toFixed(0)}M</TableCell>
                                    <TableCell>
                                        <Badge variant={getBadgeVariant(prop.status)}>{prop.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => onSelectProperty(prop.id)}>
                                                <EyeIcon className="h-4 w-4" />
                                                <span className="sr-only">View</span>
                                            </Button>
                                            <Button variant="ghost" size="icon">
                                                <EditIcon className="h-4 w-4" />
                                                <span className="sr-only">Edit</span>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default AgentDashboardPage;
