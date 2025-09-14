
'use client'

import React, { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Upload,
  Search,
  Filter,
  Download,
  Trash2,
  File,
  Image,
  FileText,
  Archive,
  MoreVertical,
  Folder
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from '@/hooks/use-toast'

interface FileAsset {
  id: string
  filename: string
  originalName: string
  fileType: string
  fileSize: number
  storageKey: string
  uploadedBy: string
  isActive: boolean
  tags: string[]
  createdAt: string
  updatedAt: string
}

export default function AdminFilesPage() {
  const [files, setFiles] = useState<FileAsset[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')

  const fileTypes = [
    { id: 'all', name: 'All Files' },
    { id: 'image', name: 'Images' },
    { id: 'document', name: 'Documents' },
    { id: 'archive', name: 'Archives' },
    { id: 'other', name: 'Other' }
  ]

  useEffect(() => {
    fetchFiles()
  }, [searchQuery, selectedType])

  const fetchFiles = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        ...(searchQuery && { search: searchQuery }),
        ...(selectedType !== 'all' && { type: selectedType })
      })
      
      const response = await fetch(`/api/admin/files?${params}`)
      if (response.ok) {
        const data = await response.json()
        setFiles(data.files || [])
      }
    } catch (error) {
      console.error('Error fetching files:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    const formData = new FormData()

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i])
    }

    try {
      const response = await fetch('/api/admin/files/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setFiles(prev => [...data.files, ...prev])
        toast({
          title: "Success",
          description: `${data.files.length} file(s) uploaded successfully`,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload files",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteFile = async (fileId: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return

    try {
      const response = await fetch(`/api/admin/files/${fileId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setFiles(files.filter(file => file.id !== fileId))
        toast({
          title: "Success",
          description: "File deleted successfully",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete file",
        variant: "destructive",
      })
    }
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return Image
    if (fileType.includes('pdf') || fileType.includes('document')) return FileText
    if (fileType.includes('zip') || fileType.includes('archive')) return Archive
    return File
  }

  const getFileTypeColor = (fileType: string) => {
    if (fileType.startsWith('image/')) return 'bg-green-100 text-green-800'
    if (fileType.includes('pdf') || fileType.includes('document')) return 'bg-blue-100 text-blue-800'
    if (fileType.includes('zip') || fileType.includes('archive')) return 'bg-purple-100 text-purple-800'
    return 'bg-gray-100 text-gray-800'
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-brand-primary mb-2">
              File Management
            </h1>
            <p className="text-brand-primary-light">
              Manage uploaded files and assets
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
              accept="*/*"
            />
            <Button
              onClick={() => document.getElementById('file-upload')?.click()}
              disabled={uploading}
              className="bg-brand-accent hover:bg-brand-accent-dark"
            >
              <Upload className="h-4 w-4 mr-2" />
              {uploading ? 'Uploading...' : 'Upload Files'}
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-brand-primary-light" />
                  <Input
                    placeholder="Search files by name or type..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                {fileTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant={selectedType === type.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(type.id)}
                  >
                    {type.name}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Files Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-48 animate-pulse border border-brand-neutral"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {files.map((file) => {
              const FileIcon = getFileIcon(file.fileType)
              
              return (
                <Card key={file.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-brand-accent/10">
                          <FileIcon className="h-6 w-6 text-brand-accent" />
                        </div>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <File className="h-4 w-4 mr-2" />
                            Copy URL
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDeleteFile(file.id)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-semibold text-brand-primary text-sm line-clamp-1">
                        {file.originalName}
                      </h3>
                      
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={getFileTypeColor(file.fileType)} variant="secondary">
                          {file.fileType.split('/')[1]?.toUpperCase() || 'FILE'}
                        </Badge>
                        {!file.isActive && (
                          <Badge variant="secondary" className="bg-red-100 text-red-800">
                            Inactive
                          </Badge>
                        )}
                      </div>
                      
                      <div className="text-xs text-brand-primary-light space-y-1">
                        <p>{formatFileSize(file.fileSize)}</p>
                        <p>Uploaded {formatDate(file.createdAt)}</p>
                      </div>
                      
                      {file.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {file.tags.slice(0, 2).map((tag, index) => (
                            <span key={index} className="text-xs bg-brand-accent/10 text-brand-accent px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                          {file.tags.length > 2 && (
                            <span className="text-xs text-brand-primary-light">
                              +{file.tags.length - 2} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {files.length === 0 && !loading && (
          <div className="text-center py-12">
            <Folder className="h-16 w-16 text-brand-primary-light mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-brand-primary mb-2">No files found</h3>
            <p className="text-brand-primary-light mb-6">
              {searchQuery || selectedType !== 'all' 
                ? 'No files match your current filters.' 
                : 'Upload your first file to get started.'
              }
            </p>
            <Button
              onClick={() => document.getElementById('file-upload')?.click()}
              className="bg-brand-accent hover:bg-brand-accent-dark"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Files
            </Button>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
