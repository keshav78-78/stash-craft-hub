import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Upload, File, X, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface UploadFile {
  file: File
  progress: number
  status: 'uploading' | 'completed' | 'error'
  hash?: string
}

const DragDropUpload = () => {
  const { toast } = useToast()
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      progress: 0,
      status: 'uploading' as const
    }))
    
    setUploadFiles(prev => [...prev, ...newFiles])
    
    // Simulate upload process
    newFiles.forEach((uploadFile, index) => {
      const fileIndex = uploadFiles.length + index
      simulateUpload(fileIndex, uploadFile.file)
    })
  }, [uploadFiles.length])

  const simulateUpload = (fileIndex: number, file: File) => {
    const interval = setInterval(() => {
      setUploadFiles(prev => {
        const updated = [...prev]
        if (updated[fileIndex]) {
          if (updated[fileIndex].progress >= 100) {
            updated[fileIndex].status = 'completed'
            updated[fileIndex].hash = `a1b2c3d4e5f6${Math.random().toString(36).substr(2, 9)}`
            clearInterval(interval)
            toast({
              title: "Upload completed",
              description: `${file.name} has been distributed to the network`,
            })
          } else {
            updated[fileIndex].progress += Math.random() * 15
          }
        }
        return updated
      })
    }, 200)
  }

  const removeFile = (index: number) => {
    setUploadFiles(prev => prev.filter((_, i) => i !== index))
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true
  })

  return (
    <div className="space-y-4">
      <Card 
        {...getRootProps()} 
        className={`p-8 border-2 border-dashed transition-colors cursor-pointer ${
          isDragActive 
            ? 'border-primary bg-primary/5' 
            : 'border-muted-foreground/25 hover:border-primary/50'
        }`}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          {isDragActive ? (
            <p className="text-lg font-medium text-primary">Drop files here...</p>
          ) : (
            <div>
              <p className="text-lg font-medium mb-2">Drag & drop files here</p>
              <p className="text-sm text-muted-foreground mb-4">
                or click to select files to upload to the network
              </p>
              <Button>Choose Files</Button>
            </div>
          )}
        </div>
      </Card>

      {uploadFiles.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium">Upload Progress</h3>
          {uploadFiles.map((uploadFile, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <File className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">{uploadFile.file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(uploadFile.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {uploadFile.status === 'completed' && (
                    <Check className="w-4 h-4 text-green-500" />
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <Progress value={Math.min(uploadFile.progress, 100)} className="mb-2" />
              
              {uploadFile.status === 'completed' && uploadFile.hash && (
                <div className="text-xs text-muted-foreground font-mono bg-muted/50 p-2 rounded">
                  Hash: {uploadFile.hash}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default DragDropUpload