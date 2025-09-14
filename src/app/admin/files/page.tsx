
'use client'

import React from 'react'
import AdminLayout from '@/components/admin/admin-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Upload, Search, Folder } from 'lucide-react'

export default function AdminFilesPage() {

  const handleUploadClick = () => {
    alert('This is a demo. In a real application, this would open a file dialog.');
  };

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
          
          <Button
            onClick={handleUploadClick}
            className="bg-brand-accent hover:bg-brand-accent-dark"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Files
          </Button>
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
                    className="pl-10"
                    disabled
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="default" size="sm">All Files</Button>
                <Button variant="outline" size="sm">Images</Button>
                <Button variant="outline" size="sm">Documents</Button>
                <Button variant="outline" size="sm">Archives</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Files Grid - Empty State */}
        <div className="text-center py-12">
          <Folder className="h-16 w-16 text-brand-primary-light mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-brand-primary mb-2">No files found</h3>
          <p className="text-brand-primary-light mb-6">
            Upload your first file to get started.
          </p>
          <Button
            onClick={handleUploadClick}
            className="bg-brand-accent hover:bg-brand-accent-dark"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Files
          </Button>
        </div>
      </div>
    </AdminLayout>
  )
}
