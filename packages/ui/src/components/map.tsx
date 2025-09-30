'use client'

import React, { useEffect, useRef, useState } from 'react'
import { cn } from '../lib/utils'

interface MapMarker {
  id: string
  lat: number
  lng: number
  title: string
  type: 'asset' | 'order' | 'pickup' | 'dropoff'
  status?: string
  battery?: number
}

interface MapProps {
  markers?: MapMarker[]
  center?: { lat: number; lng: number }
  zoom?: number
  height?: string
  className?: string
  onMarkerClick?: (marker: MapMarker) => void
  onMapClick?: (lat: number, lng: number) => void
}

export const Map: React.FC<MapProps> = ({
  markers = [],
  center = { lat: 1.3521, lng: 103.8198 }, // Singapore
  zoom = 13,
  height = '400px',
  className,
  onMarkerClick,
  onMapClick
}) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null)

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => setMapLoaded(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const getMarkerIcon = (type: string, status?: string, battery?: number) => {
    switch (type) {
      case 'asset':
        if (battery && battery < 20) return '🔴'
        if (battery && battery < 50) return '🟡'
        return '🟢'
      case 'order':
        return '📦'
      case 'pickup':
        return '📍'
      case 'dropoff':
        return '🏁'
      default:
        return '📍'
    }
  }

  const getMarkerColor = (type: string, status?: string) => {
    switch (type) {
      case 'asset':
        return status === 'ACTIVE' ? 'bg-green-500' : 'bg-gray-400'
      case 'order':
        return status === 'CREATED' ? 'bg-blue-500' : 'bg-orange-500'
      case 'pickup':
        return 'bg-green-600'
      case 'dropoff':
        return 'bg-red-600'
      default:
        return 'bg-gray-500'
    }
  }

  if (!mapLoaded) {
    return (
      <div 
        className={cn("bg-gray-100 rounded-lg flex items-center justify-center", className)}
        style={{ height }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-2"></div>
          <p className="text-sm text-gray-600">Loading map...</p>
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={mapRef}
      className={cn("relative bg-gray-100 rounded-lg overflow-hidden", className)}
      style={{ height }}
    >
      {/* Map Placeholder with Interactive Elements */}
      <div className="w-full h-full bg-gradient-to-br from-green-50 to-blue-50 relative">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Markers */}
        {markers.map((marker) => (
          <div
            key={marker.id}
            className={cn(
              "absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110",
              getMarkerColor(marker.type, marker.status),
              selectedMarker === marker.id && "ring-2 ring-blue-500 ring-offset-2"
            )}
            style={{
              left: `${50 + (marker.lng - center.lng) * 1000}%`,
              top: `${50 - (marker.lat - center.lat) * 1000}%`,
            }}
            onClick={() => {
              setSelectedMarker(marker.id)
              onMarkerClick?.(marker)
            }}
            title={marker.title}
          >
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
              {getMarkerIcon(marker.type, marker.status, marker.battery)}
            </div>
            {marker.battery && (
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs bg-black text-white px-1 rounded">
                {marker.battery}%
              </div>
            )}
          </div>
        ))}

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button className="w-8 h-8 bg-white rounded shadow-md flex items-center justify-center hover:bg-gray-50">
            <span className="text-sm">+</span>
          </button>
          <button className="w-8 h-8 bg-white rounded shadow-md flex items-center justify-center hover:bg-gray-50">
            <span className="text-sm">-</span>
          </button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3 text-xs">
          <div className="font-medium mb-2">Legend</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Active Assets</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Orders</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              <span>Pickup</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              <span>Dropoff</span>
            </div>
          </div>
        </div>

        {/* Center Marker */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-red-500 rounded-full bg-white"></div>
        </div>
      </div>
    </div>
  )
}

export default Map
