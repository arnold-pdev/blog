// components/Tooltip.tsx
'use client'

import { useState } from 'react'

type TooltipProps = {
    content: string
    children: React.ReactNode
    className?: string
    offset?: number
}

export const Tooltip = ({
    content,
    children,
    className = '',
    offset = 12
}: TooltipProps) => {
    const [isVisible, setIsVisible] = useState(false)
    const [coords, setCoords] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e: React.MouseEvent) => {
        setCoords({ x: e.clientX, y: e.clientY })
        setIsVisible(true)
    }

    return (
        <div
            className={`relative ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}

            {isVisible && (
                <div
                    className="fixed z-[9999] px-2 py-1 text-sm bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900 rounded-md shadow-lg pointer-events-none transition-opacity opacity-95"
                    style={{
                        left: coords.x,
                        top: coords.y + offset,
                        transform: 'translateX(-50%)'
                    }}
                    role="tooltip"
                >
                    {content}
                    {/* Tooltip arrow */}
                    <div
                        className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-100 rotate-45"
                        aria-hidden="true"
                    />
                </div>
            )}
        </div>
    )
}