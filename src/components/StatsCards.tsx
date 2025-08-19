import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Network, HardDrive, Users, Zap } from 'lucide-react';

const StatsCards = () => {
  const stats = [
    {
      icon: Network,
      title: 'Network Status',
      value: 'Online',
      subtitle: '4/5 nodes active',
      trend: '+2 peers today',
      color: 'text-node-active',
      bgColor: 'bg-node-active/10'
    },
    {
      icon: HardDrive,
      title: 'Storage Used',
      value: '18.4 GB',
      subtitle: 'Across 124 files',
      trend: '+2.1 GB this week',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: Users,
      title: 'Connected Peers',
      value: '12',
      subtitle: 'Average: 8 peers',
      trend: '3 new connections',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      icon: Zap,
      title: 'Transfer Speed',
      value: '45.2 MB/s',
      subtitle: 'Peak: 67.8 MB/s',
      trend: 'Stable connection',
      color: 'text-primary-glow',
      bgColor: 'bg-primary/5'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="card-tech p-6">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <Badge variant="outline" className="text-xs">
              Live
            </Badge>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </h3>
            <div className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
            <p className="text-sm text-muted-foreground">
              {stat.subtitle}
            </p>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-xs text-primary">{stat.trend}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;