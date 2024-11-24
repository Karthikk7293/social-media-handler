'use client'
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Instagram, Twitter, Facebook, Youtube, TrendingUp, Users, MessageCircle, Eye, LucideIcon } from 'lucide-react';

// Type definitions
interface EngagementData {
    date: string;
    instagram: number;
    twitter: number;
    facebook: number;
    youtube: number;
}

interface PlatformSummary {
    followers: number;
    posts: number;
    engagement: string;
    views: number;
}

interface DashboardData {
    engagement: EngagementData[];
    summary: {
        instagram: PlatformSummary;
        twitter: PlatformSummary;
        facebook: PlatformSummary;
        youtube: PlatformSummary;
    };
}

interface Platform {
    name: string;
    color: string;
    icon: LucideIcon;
}

interface MetricCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend: number;
}

const SocialMediaDashboard: React.FC = () => {
    // Sample data with type annotation
    const [data] = useState<DashboardData>({
        engagement: [
            { date: '2024-01', instagram: 1200, twitter: 800, facebook: 1500, youtube: 2000 },
            { date: '2024-02', instagram: 1400, twitter: 900, facebook: 1600, youtube: 2200 },
            { date: '2024-03', instagram: 1300, twitter: 1000, facebook: 1700, youtube: 2400 },
        ],
        summary: {
            instagram: {
                followers: 12500,
                posts: 245,
                engagement: '4.2%',
                views: 45000
            },
            twitter: {
                followers: 8800,
                posts: 890,
                engagement: '2.8%',
                views: 32000
            },
            facebook: {
                followers: 15200,
                posts: 180,
                engagement: '3.5%',
                views: 52000
            },
            youtube: {
                followers: 25000,
                posts: 120,
                engagement: '5.1%',
                views: 150000
            }
        }
    });

    const platforms: Platform[] = [
        { name: 'Instagram', color: '#E1306C', icon: Instagram },
        { name: 'Twitter', color: '#1DA1F2', icon: Twitter },
        { name: 'Facebook', color: '#4267B2', icon: Facebook },
        { name: 'YouTube', color: '#FF0000', icon: Youtube }
    ];

    const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon: Icon, trend }) => (
        <Card className="flex-1">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500">{title}</p>
                        <h3 className="text-2xl font-bold mt-1">{value}</h3>
                    </div>
                    <Icon className="h-8 w-8 text-gray-400" />
                </div>
                <div className="mt-2 flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500">{trend}%</span>
                    <span className="text-gray-500 ml-1">vs last month</span>
                </div>
            </CardContent>
        </Card>
    );

    const getPlatformData = (platformName: string): PlatformSummary => {
        return data.summary[platformName.toLowerCase() as keyof typeof data.summary];
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold">Social Media Analytics</h1>

            <Tabs defaultValue="overview" className="w-full">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    {platforms.map(platform => (
                        <TabsTrigger key={platform.name} value={platform.name.toLowerCase()}>
                            {platform.name}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="overview">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <MetricCard
                            title="Total Followers"
                            value="61.5K"
                            icon={Users}
                            trend={2.5}
                        />
                        <MetricCard
                            title="Total Engagement"
                            value="3.9%"
                            icon={TrendingUp}
                            trend={0.8}
                        />
                        <MetricCard
                            title="Total Comments"
                            value="2.3K"
                            icon={MessageCircle}
                            trend={1.2}
                        />
                        <MetricCard
                            title="Total Views"
                            value="279K"
                            icon={Eye}
                            trend={4.1}
                        />
                    </div>

                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Engagement Trends</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={data.engagement}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        {platforms.map(platform => (
                                            <Line
                                                key={platform.name}
                                                type="monotone"
                                                dataKey={platform.name.toLowerCase()}
                                                stroke={platform.color}
                                                strokeWidth={2}
                                            />
                                        ))}
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {platforms.map(platform => (
                    <TabsContent key={platform.name} value={platform.name.toLowerCase()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            <MetricCard
                                title="Followers"
                                value={getPlatformData(platform.name).followers.toLocaleString()}
                                icon={Users}
                                trend={2.1}
                            />
                            <MetricCard
                                title="Posts"
                                value={getPlatformData(platform.name).posts}
                                icon={MessageCircle}
                                trend={1.5}
                            />
                            <MetricCard
                                title="Engagement Rate"
                                value={getPlatformData(platform.name).engagement}
                                icon={TrendingUp}
                                trend={0.8}
                            />
                            <MetricCard
                                title="Views"
                                value={getPlatformData(platform.name).views.toLocaleString()}
                                icon={Eye}
                                trend={3.2}
                            />
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
};

export default SocialMediaDashboard;