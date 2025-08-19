import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Upload, Download, Share2, Trash2, File, Folder } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileItem {
  id: string;
  name: string;
  hash: string;
  size: string;
  type: 'file' | 'folder';
  peers: number;
  lastAccessed: string;
}

const FileManager = () => {
  const { toast } = useToast();
  const [files] = useState<FileItem[]>([
    {
      id: '1',
      name: 'distributed-systems.pdf',
      hash: 'a1b2c3d4e5f6...',
      size: '2.3 MB',
      type: 'file',
      peers: 3,
      lastAccessed: '2 min ago'
    },
    {
      id: '2',
      name: 'blockchain-research',
      hash: 'f6e5d4c3b2a1...',
      size: '15.7 MB',
      type: 'folder',
      peers: 5,
      lastAccessed: '5 min ago'
    },
    {
      id: '3',
      name: 'network-topology.json',
      hash: '9x8y7z6w5v4u...',
      size: '845 KB',
      type: 'file',
      peers: 2,
      lastAccessed: '1 hr ago'
    }
  ]);

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast({
            title: "File uploaded successfully",
            description: "File has been distributed across the network",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDownload = (fileName: string) => {
    toast({
      title: "Download started",
      description: `Fetching ${fileName} from network peers`,
    });
  };

  const handleShare = (fileName: string, hash: string) => {
    navigator.clipboard.writeText(hash);
    toast({
      title: "Hash copied",
      description: "Content hash copied to clipboard for sharing",
    });
  };

  return (
    <Card className="card-tech p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gradient">File Manager</h3>
          <p className="text-muted-foreground">Manage your distributed files</p>
        </div>
        <Button onClick={handleFileUpload} disabled={isUploading} className="bg-primary hover:bg-primary/90">
          <Upload className="w-4 h-4 mr-2" />
          {isUploading ? `Uploading ${uploadProgress}%` : 'Upload File'}
        </Button>
      </div>

      {isUploading && (
        <div className="mb-4">
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {files.map((file) => (
          <div key={file.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-card/50 hover:bg-card/70 transition-colors">
            <div className="flex items-center gap-3">
              {file.type === 'file' ? (
                <File className="w-5 h-5 text-primary" />
              ) : (
                <Folder className="w-5 h-5 text-accent" />
              )}
              <div>
                <div className="font-medium">{file.name}</div>
                <div className="text-sm text-muted-foreground">
                  Hash: {file.hash} • {file.size}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right text-sm">
                <Badge variant="outline" className="mb-1">
                  {file.peers} peers
                </Badge>
                <div className="text-muted-foreground">{file.lastAccessed}</div>
              </div>
              
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDownload(file.name)}
                  className="hover:bg-primary/10"
                >
                  <Download className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleShare(file.name, file.hash)}
                  className="hover:bg-accent/10"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="hover:bg-destructive/10 text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
        <div className="flex items-center gap-2 mb-2">
          <Share2 className="w-4 h-4 text-primary" />
          <span className="font-medium">Network Storage</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Files are automatically replicated across network peers using content-addressable storage.
          Each file is identified by its SHA1 hash ensuring data integrity.
        </p>
      </div>
    </Card>
  );
};

export default FileManager;