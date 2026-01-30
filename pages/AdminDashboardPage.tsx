
import React, { useState, useMemo, FC } from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { properties as mockProperties, users as mockUsers } from '../services/mockData';
import type { Property, User, PropertyStatus } from '../types';
import { BuildingIcon } from '../components/icons/BuildingIcon';
import { UsersIcon } from '../components/icons/UsersIcon';
import { FileTextIcon } from '../components/icons/FileTextIcon';
import { ReceiptIcon } from '../components/icons/ReceiptIcon';
import { SettingsIcon } from '../components/icons/SettingsIcon';
import { FilterIcon } from '../components/icons/FilterIcon';
import { DollarSignIcon } from '../components/icons/DollarSignIcon';
import { MoreHorizontalIcon } from '../components/icons/MoreHorizontalIcon';

type Page = 'details' | 'listings';

interface AdminDashboardPageProps {
    onNavigate: (page: Page) => void;
    onSelectProperty: (id: string) => void;
}

type Tab = 'properties' | 'requests' | 'agents' | 'transactions' | 'payments' | 'settings';

// Properties Tab Component
const PropertiesTab: FC<{ properties: Property[], users: User[], onSelectProperty: (id: string) => void }> = ({ properties, users, onSelectProperty }) => {
    const [statusFilter, setStatusFilter] = useState<PropertyStatus | 'all'>('all');
    
    const getBadgeVariant = (status: PropertyStatus): 'success' | 'default' | 'destructive' | 'secondary' | 'outline' => {
        switch (status) {
            case 'For Sale': return 'success';
            case 'Pending Review': return 'default';
            case 'Rejected': return 'destructive';
            case 'Sold': return 'secondary';
            default: return 'outline';
        }
    };

    const filteredProperties = useMemo(() => {
        return properties.filter(p => statusFilter === 'all' || p.status === statusFilter);
    }, [properties, statusFilter]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Manage Properties</CardTitle>
                <CardDescription>Review, approve, or reject new property listings.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-full max-w-sm">
                        <FilterIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search by address or agent..." className="pl-10" />
                    </div>
                    <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as PropertyStatus | 'all')}>
                        <option value="all">All Statuses</option>
                        <option value="Pending Review">Pending Review</option>
                        <option value="For Sale">For Sale</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Sold">Sold</option>
                    </Select>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Property</TableHead>
                            <TableHead>Agent</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Date Added</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredProperties.map(prop => {
                            const agent = users.find(u => u.id === prop.agentId);
                            return (
                                <TableRow key={prop.id}>
                                    <TableCell className="font-medium">{prop.address.street}</TableCell>
                                    <TableCell>{agent?.name || 'N/A'}</TableCell>
                                    <TableCell>₦{(prop.price / 1_000_000_000).toFixed(2)}B</TableCell>
                                    <TableCell>{new Date(prop.dateAdded).toLocaleDateString()}</TableCell>
                                    <TableCell><Badge variant={getBadgeVariant(prop.status)}>{prop.status}</Badge></TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {prop.status === 'Pending Review' && <Button variant="outline" size="sm">Approve</Button>}
                                            <Button variant="ghost" size="icon" onClick={() => onSelectProperty(prop.id)}><MoreHorizontalIcon className="w-4 h-4" /></Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
};

// Agents Tab Component
const AgentsTab: FC<{ agents: User[] }> = ({ agents }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Manage Agents</CardTitle>
                <CardDescription>View agent performance and manage their platform access.</CardDescription>
            </CardHeader>
            <CardContent>
                {/* Add filters and actions here */}
                <Table>
                    <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                    <TableBody>
                        {agents.map(agent => (
                             <TableRow key={agent.id}>
                                <TableCell className="font-medium">{agent.name}</TableCell>
                                <TableCell>{agent.email}</TableCell>
                                <TableCell><Badge variant={agent.status === 'Active' ? 'success' : 'destructive'}>{agent.status}</Badge></TableCell>
                                <TableCell className="text-right"><Button variant="ghost" size="icon"><MoreHorizontalIcon className="w-4 h-4" /></Button></TableCell>
                             </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

// Placeholder for other tabs
const PlaceholderTab: FC<{ title: string }> = ({ title }) => (
    <Card><CardHeader><CardTitle>{title}</CardTitle></CardHeader><CardContent><p>Management interface for {title.toLowerCase()} will be here.</p></CardContent></Card>
);

const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate, onSelectProperty }) => {
    const [activeTab, setActiveTab] = useState<Tab>('properties');

    const agents = useMemo(() => mockUsers.filter(u => u.role === 'Agent'), []);

    const TabButton: FC<{ tabName: Tab; icon: React.ReactNode; children: React.ReactNode }> = ({ tabName, icon, children }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === tabName ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
        >
            {icon}{children}
        </button>
    );

    return (
        <div className="container mx-auto px-4 py-12">
            <header className="mb-8">
                <h1 className="text-4xl font-bold tracking-tight">Admin Dashboard</h1>
                <p className="text-muted-foreground mt-2">Platform overview and management tools.</p>
            </header>

            <div className="flex flex-col lg:flex-row gap-8">
                <nav className="flex lg:flex-col gap-2 flex-wrap">
                    <TabButton tabName="properties" icon={<BuildingIcon className="w-4 h-4"/>}>Properties</TabButton>
                    <TabButton tabName="requests" icon={<FileTextIcon className="w-4 h-4"/>}>Client Requests</TabButton>
                    <TabButton tabName="agents" icon={<UsersIcon className="w-4 h-4"/>}>Agents</TabButton>
                    <TabButton tabName="transactions" icon={<DollarSignIcon className="w-4 h-4"/>}>Transactions</TabButton>
                    <TabButton tabName="payments" icon={<ReceiptIcon className="w-4 h-4"/>}>Payments</TabButton>
                    <TabButton tabName="settings" icon={<SettingsIcon className="w-4 h-4"/>}>Settings</TabButton>
                </nav>

                <div className="flex-1">
                    {activeTab === 'properties' && <PropertiesTab properties={mockProperties} users={mockUsers} onSelectProperty={onSelectProperty} />}
                    {activeTab === 'requests' && <PlaceholderTab title="Client Requests" />}
                    {activeTab === 'agents' && <AgentsTab agents={agents} />}
                    {activeTab === 'transactions' && <PlaceholderTab title="Transactions" />}
                    {activeTab === 'payments' && <PlaceholderTab title="Payments" />}
                    {activeTab === 'settings' && <PlaceholderTab title="Settings" />}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;