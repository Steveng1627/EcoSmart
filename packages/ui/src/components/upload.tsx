'use client'

import React, { useCallback, useState } from 'react'
import { Upload, X, File, Image, FileText, CheckCircle } from 'lucide-react'
import { cn } from '../lib/utils'
import { Button } from './button'

interface UploadedFile {
  id: string
  file: File
  preview?: string
  status: 'uploading' | 'success' | 'error'
  progress?: number
  error?: string
}

interface FileUploadProps {
  onUpload: (files: File[]) => Promise<void>
  accept?: string
  multiple?: boolean
  maxSize?: number // in MB
  className?: string
  disabled?: boolean
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onUpload,
  accept = '*/*',
  multiple = false,
  maxSize = 10,
  className,
  disabled = false
}) => {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [dragActive, setDragActive] = useState(false)

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`
    }
    return null
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image className="h-8 w-8 text-blue-500" />
    }
    if (file.type.includes('pdf') || file.type.includes('document')) {
      return <FileText className="h-8 w-8 text-red-500" />
    }
    return <File className="h-8 w-8 text-gray-500" />
  }

  const handleFiles = useCallback(async (newFiles: FileList) => {
    const fileArray = Array.from(newFiles)
    const validFiles: UploadedFile[] = []
    const errors: string[] = []

    for (const file of fileArray) {
      const error = validateFile(file)
      if (error) {
        errors.push(`${file.name}: ${error}`)
        continue
      }

      const uploadedFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        file,
        status: 'uploading',
        progress: 0
      }

      // Create preview for images
      if (file.type.startsWith('image/')) {
        uploadedFile.preview = URL.createObjectURL(file)
      }

      validFiles.push(uploadedFile)
    }

    if (errors.length > 0) {
      alert(errors.join('\n'))
    }

    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles])
      
      try {
        await onUpload(validFiles.map(f => f.file))
        
        // Update status to success
        setFiles(prev => prev.map(f => 
          validFiles.some(vf => vf.id === f.id) 
            ? { ...f, status: 'success' as const, progress: 100 }
            : f
        ))
      } catch (error) {
        // Update status to error
        setFiles(prev => prev.map(f => 
          validFiles.some(vf => vf.id === f.id) 
            ? { ...f, status: 'error' as const, error: error instanceof Error ? error.message : 'Upload failed' }
            : f
        ))
      }
    }
  }, [onUpload, maxSize])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (disabled) return
    
    const droppedFiles = e.dataTransfer.files
    if (droppedFiles.length > 0) {
      handleFiles(droppedFiles)
    }
  }, [handleFiles, disabled])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
    }
  }, [handleFiles])

  const removeFile = (id: string) => {
    setFiles(prev => {
      const file = prev.find(f => f.id === id)
      if (file?.preview) {
        URL.revokeObjectURL(file.preview)
      }
      return prev.filter(f => f.id !== id)
    })
  }

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
          dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-gray-400"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !disabled && document.getElementById('file-upload')?.click()}
      >
        <input
          id="file-upload"
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="hidden"
          disabled={disabled}
        />
        
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-lg font-medium text-gray-900 mb-2">
          {dragActive ? 'Drop files here' : 'Upload files'}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Drag and drop files here, or click to select files
        </p>
        <p className="text-xs text-gray-500">
          Max file size: {maxSize}MB
        </p>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                {file.preview ? (
                  <img
                    src={file.preview}
                    alt={file.file.name}
                    className="h-10 w-10 object-cover rounded"
                  />
                ) : (
                  getFileIcon(file.file)
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(file.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  {file.status === 'uploading' && file.progress !== undefined && (
                    <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                      <div
                        className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  )}
                  {file.status === 'error' && file.error && (
                    <p className="text-xs text-red-500 mt-1">{file.error}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {file.status === 'success' && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(file.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

interface ImageUploadProps extends Omit<FileUploadProps, 'accept'> {
  aspectRatio?: 'square' | 'landscape' | 'portrait'
  maxFiles?: number
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  aspectRatio = 'square',
  maxFiles = 5,
  ...props
}) => {
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square'
      case 'landscape':
        return 'aspect-video'
      case 'portrait':
        return 'aspect-[3/4]'
      default:
        return 'aspect-square'
    }
  }

  return (
    <FileUpload
      {...props}
      accept="image/*"
      multiple={props.multiple ?? true}
    />
  )
}

export default FileUpload
