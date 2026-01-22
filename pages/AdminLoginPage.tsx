
import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Logo } from '../components/icons/Logo';
import { MailIcon } from '../components/icons/MailIcon';
import { LockIcon } from '../components/icons/LockIcon';
import { LoaderIcon } from '../components/icons/LoaderIcon';

type Page = 'admin-dashboard' | 'home';

interface AdminLoginPageProps {
    onNavigate: (page: Page) => void;
}

const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onNavigate }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.email) {
            newErrors.email = 'Email address is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
        }
        if (!formData.password) newErrors.password = 'Password is required.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);
            // Simulate API call
            setTimeout(() => {
                setIsSubmitting(false);
                // On success, navigate to dashboard
                onNavigate('admin-dashboard');
            }, 1500);
        }
    };
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-secondary">
            <Card className="w-full max-w-md mx-4">
                <CardHeader className="text-center">
                    <Logo className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <CardTitle className="text-2xl">Administrator Access</CardTitle>
                    <CardDescription>Enter your credentials to access the admin dashboard.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} noValidate className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
                            <div className="relative">
                                <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="admin@avianre.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
                                    disabled={isSubmitting}
                                />
                            </div>
                             {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password"className="block text-sm font-medium">Password</label>
                                <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
                            </div>
                            <div className="relative">
                                <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`pl-10 ${errors.password ? 'border-destructive' : ''}`}
                                    disabled={isSubmitting}
                                />
                            </div>
                            {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                        </div>
                         <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? <LoaderIcon className="w-5 h-5 animate-spin" /> : 'Sign In'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminLoginPage;
