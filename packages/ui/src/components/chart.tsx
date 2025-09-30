'use client'

import React from 'react'
import { cn } from '../lib/utils'

interface ChartData {
  label: string
  value: number
  color?: string
}

interface BarChartProps {
  data: ChartData[]
  height?: number
  className?: string
  showValues?: boolean
  orientation?: 'vertical' | 'horizontal'
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  height = 200,
  className,
  showValues = true,
  orientation = 'vertical'
}) => {
  const maxValue = Math.max(...data.map(d => d.value))

  if (orientation === 'horizontal') {
    return (
      <div className={cn("w-full", className)}>
        <div className="space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="w-20 text-sm text-gray-600 truncate mr-2">
                {item.label}
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                <div
                  className={cn(
                    "h-6 rounded-full flex items-center justify-end pr-2",
                    item.color || 'bg-blue-500'
                  )}
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                >
                  {showValues && (
                    <span className="text-white text-xs font-medium">
                      {item.value}
                    </span>
                  )}
                </div>
              </div>
              <div className="w-12 text-sm text-gray-600 text-right ml-2">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-end justify-between h-48 gap-1">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="flex-1 flex items-end">
              <div
                className={cn(
                  "w-full rounded-t",
                  item.color || 'bg-blue-500'
                )}
                style={{ height: `${(item.value / maxValue) * height}px` }}
              >
                {showValues && (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-white text-xs font-medium">
                      {item.value}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-xs text-gray-600 mt-2 text-center">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface LineChartProps {
  data: ChartData[]
  height?: number
  className?: string
  showGrid?: boolean
  color?: string
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  height = 200,
  className,
  showGrid = true,
  color = '#3b82f6'
}) => {
  const maxValue = Math.max(...data.map(d => d.value))
  const minValue = Math.min(...data.map(d => d.value))
  const range = maxValue - minValue

  const getPoint = (item: ChartData, index: number) => {
    const x = (index / (data.length - 1)) * 100
    const y = 100 - ((item.value - minValue) / range) * 100
    return { x, y }
  }

  const points = data.map((item, index) => getPoint(item, index))
  const pathData = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ')

  return (
    <div className={cn("w-full", className)}>
      <svg width="100%" height={height} className="overflow-visible">
        {showGrid && (
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
            </pattern>
          </defs>
        )}
        {showGrid && <rect width="100%" height="100%" fill="url(#grid)" />}
        
        {/* Line */}
        <path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Points */}
        {points.map((point, index) => (
          <circle
            key={index}
            cx={`${point.x}%`}
            cy={`${point.y}%`}
            r="4"
            fill={color}
            className="hover:r-6 transition-all"
          />
        ))}
        
        {/* Labels */}
        {data.map((item, index) => {
          const point = getPoint(item, index)
          return (
            <text
              key={index}
              x={`${point.x}%`}
              y={`${point.y - 10}%`}
              textAnchor="middle"
              className="text-xs fill-gray-600"
            >
              {item.value}
            </text>
          )
        })}
      </svg>
    </div>
  )
}

interface PieChartProps {
  data: ChartData[]
  size?: number
  className?: string
  showLegend?: boolean
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  size = 200,
  className,
  showLegend = true
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  let currentAngle = 0

  const segments = data.map((item, index) => {
    const percentage = (item.value / total) * 100
    const angle = (item.value / total) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + angle
    
    currentAngle += angle

    return {
      ...item,
      percentage,
      angle,
      startAngle,
      endAngle,
      color: item.color || `hsl(${index * 60}, 70%, 50%)`
    }
  })

  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex-shrink-0">
        <svg width={size} height={size} className="transform -rotate-90">
          {segments.map((segment, index) => {
            const radius = size / 2 - 10
            const centerX = size / 2
            const centerY = size / 2
            
            const startAngleRad = (segment.startAngle * Math.PI) / 180
            const endAngleRad = (segment.endAngle * Math.PI) / 180
            
            const x1 = centerX + radius * Math.cos(startAngleRad)
            const y1 = centerY + radius * Math.sin(startAngleRad)
            const x2 = centerX + radius * Math.cos(endAngleRad)
            const y2 = centerY + radius * Math.sin(endAngleRad)
            
            const largeArcFlag = segment.angle > 180 ? 1 : 0
            
            const pathData = [
              `M ${centerX} ${centerY}`,
              `L ${x1} ${y1}`,
              `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              'Z'
            ].join(' ')

            return (
              <path
                key={index}
                d={pathData}
                fill={segment.color}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
            )
          })}
        </svg>
      </div>
      
      {showLegend && (
        <div className="ml-4 space-y-2">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: segment.color }}
              />
              <span className="text-sm text-gray-600">
                {segment.label} ({segment.percentage.toFixed(1)}%)
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    type: 'increase' | 'decrease'
  }
  icon?: React.ReactNode
  className?: string
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  icon,
  className
}) => {
  return (
    <div className={cn("bg-white p-6 rounded-lg shadow-sm border", className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <div className={cn(
              "flex items-center text-sm mt-1",
              change.type === 'increase' ? 'text-green-600' : 'text-red-600'
            )}>
              <span className="mr-1">
                {change.type === 'increase' ? '↗' : '↘'}
              </span>
              {Math.abs(change.value)}%
            </div>
          )}
        </div>
        {icon && (
          <div className="text-gray-400">
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}

// Components are already exported above
