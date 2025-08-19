import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import NetworkVisualization from '@/components/NetworkVisualization';
import FileManager from '@/components/FileManager';
import StatsCards from '@/components/StatsCards';
import { Github, Download, Globe, Shield, Zap, Database } from 'lucide-react';
import networkBg from '@/assets/network-bg.jpg';
import stashIcon from '@/assets/stash-icon.jpg';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${networkBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-background/80"></div>
        <div className="absolute inset-0 bg-gradient-hero"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="flex justify-center mb-8">
            <img 
              src={stashIcon} 
              alt="StashBox" 
              className="w-24 h-24 rounded-2xl node-glow animate-float"
            />
          </div>
          
          <h1 className="text-6xl font-bold mb-6">
            <span className="text-gradient">StashBox</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            A decentralized, content-addressable storage network built from the ground up. 
            Store, share, and retrieve files across a peer-to-peer network with guaranteed data integrity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3">
              <Download className="w-5 h-5 mr-2" />
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 px-8 py-3">
              <Github className="w-5 h-5 mr-2" />
              View Source
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="card-tech p-6 text-center">
              <Globe className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Decentralized</h3>
              <p className="text-sm text-muted-foreground">No single point of failure</p>
            </Card>
            <Card className="card-tech p-6 text-center">
              <Shield className="w-8 h-8 mx-auto mb-3 text-accent" />
              <h3 className="font-semibold mb-2">Content-Addressed</h3>
              <p className="text-sm text-muted-foreground">SHA1 hash verification</p>
            </Card>
            <Card className="card-tech p-6 text-center">
              <Zap className="w-8 h-8 mx-auto mb-3 text-primary-glow" />
              <h3 className="font-semibold mb-2">Auto-Discovery</h3>
              <p className="text-sm text-muted-foreground">Intelligent peer fetching</p>
            </Card>
          </div>
        </div>
      </div>

      {/* Dashboard Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-gradient">Network Dashboard</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Monitor your decentralized storage network in real-time. Track node status, 
            manage files, and visualize peer connections.
          </p>
        </div>

        <StatsCards />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          <NetworkVisualization />
          <FileManager />
        </div>
      </div>

      {/* Architecture Section */}
      <div className="bg-card/30 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-gradient">System Architecture</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built with modular components for maximum reliability and scalability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card-tech p-8 text-center">
              <Database className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-3">FileServer</h3>
              <p className="text-muted-foreground">
                Orchestrates high-level logic: peer connections, local storage, and message broadcasting
              </p>
            </Card>
            
            <Card className="card-tech p-8 text-center">
              <Globe className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h3 className="text-xl font-semibold mb-3">TCPTransport</h3>
              <p className="text-muted-foreground">
                Handles raw TCP communication between peers via channels
              </p>
            </Card>
            
            <Card className="card-tech p-8 text-center">
              <Shield className="w-12 h-12 mx-auto mb-4 text-primary-glow" />
              <h3 className="text-xl font-semibold mb-3">Store</h3>
              <p className="text-muted-foreground">
                Content-addressable storage with SHA1-based file retrieval
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            Built by <span className="text-primary">Keshav Kapoor</span> • 
            <a href="https://github.com/keshav78-78" className="text-primary hover:text-primary-glow ml-1">
              GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
