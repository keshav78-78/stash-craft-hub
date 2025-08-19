import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NetworkVisualization from '@/components/NetworkVisualization';
import FileManager from '@/components/FileManager';
import StatsCards from '@/components/StatsCards';
import DragDropUpload from '@/components/DragDropUpload';
import Layout from '@/components/Layout';
import { Github, Download, Globe, Shield, Zap, Database, TrendingUp, Activity } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      <div className="p-6 space-y-8">
        {/* Welcome Section */}
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome to <span className="text-gradient">StashBox</span>
            </h1>
            <p className="text-muted-foreground">
              Monitor and manage your decentralized storage network
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Quick Upload
            </Button>
            <Button variant="outline">
              <Github className="w-4 h-4 mr-2" />
              Documentation
            </Button>
            <Button variant="outline">
              <Activity className="w-4 h-4 mr-2" />
              Network Status
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <StatsCards />

        {/* Main Dashboard */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <NetworkVisualization />
              
              <Card className="card-tech p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gradient">Recent Activity</h3>
                    <Button variant="outline" size="sm">View All</Button>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { action: 'File uploaded', file: 'system-docs.pdf', time: '2 min ago', status: 'completed' },
                      { action: 'Peer connected', file: 'Node-7x9k', time: '5 min ago', status: 'active' },
                      { action: 'File downloaded', file: 'network-config.json', time: '8 min ago', status: 'completed' },
                      { action: 'Sync completed', file: '42 files', time: '15 min ago', status: 'completed' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                        <div>
                          <p className="font-medium text-sm">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.file}</p>
                        </div>
                        <div className="text-right">
                          <div className={`w-2 h-2 rounded-full mb-1 ${
                            activity.status === 'completed' ? 'bg-green-500' : 
                            activity.status === 'active' ? 'bg-blue-500 animate-pulse' : 'bg-yellow-500'
                          }`}></div>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* System Architecture */}
            <Card className="card-tech p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gradient mb-2">System Architecture</h3>
                  <p className="text-muted-foreground">Modular components working together for reliable distributed storage</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 rounded-lg border border-primary/20">
                    <Database className="w-8 h-8 text-primary mb-3" />
                    <h4 className="font-semibold mb-2">FileServer</h4>
                    <p className="text-sm text-muted-foreground">Core orchestration layer managing peer connections and storage</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-accent/5 to-accent/10 p-4 rounded-lg border border-accent/20">
                    <Globe className="w-8 h-8 text-accent mb-3" />
                    <h4 className="font-semibold mb-2">TCPTransport</h4>
                    <p className="text-sm text-muted-foreground">High-performance networking layer for peer communication</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-500/5 to-green-500/10 p-4 rounded-lg border border-green-500/20">
                    <Shield className="w-8 h-8 text-green-500 mb-3" />
                    <h4 className="font-semibold mb-2">Content Store</h4>
                    <p className="text-sm text-muted-foreground">SHA1-based content addressing with integrity verification</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="network">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <NetworkVisualization />
              </div>
              
              <Card className="card-tech p-6">
                <h3 className="text-lg font-semibold mb-4">Peer Details</h3>
                <div className="space-y-3">
                  {[
                    { id: 'node-1', status: 'online', files: 42, latency: '12ms', location: 'US-East' },
                    { id: 'node-2', status: 'online', files: 28, latency: '8ms', location: 'EU-West' },
                    { id: 'node-3', status: 'online', files: 35, latency: '15ms', location: 'Asia-SE' },
                    { id: 'node-4', status: 'offline', files: 0, latency: '-', location: 'Unknown' },
                  ].map((peer) => (
                    <div key={peer.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          peer.status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-gray-500'
                        }`}></div>
                        <div>
                          <p className="font-medium text-sm">{peer.id}</p>
                          <p className="text-xs text-muted-foreground">{peer.location}</p>
                        </div>
                      </div>
                      <div className="text-right text-xs">
                        <p>{peer.files} files</p>
                        <p className="text-muted-foreground">{peer.latency}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="files">
            <FileManager />
          </TabsContent>

          <TabsContent value="upload">
            <DragDropUpload />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Index;
