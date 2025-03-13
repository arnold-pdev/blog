'use client'

import { useState } from 'react'

export const Toggle = ({ title, children }: { title: string; children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="my-4 border rounded-lg dark:border-gray-800">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between p-4 font-medium transition-colors hover:bg-gray-50 dark:hover:bg-gray-900"
                aria-expanded={isOpen}
            >
                {title}
                <svg
                    className={`h-5 w-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="p-4 pt-0">{children}</div>
            </div>
        </div>
    )
}