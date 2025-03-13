// components/plots/HeatmapExample.tsx
'use client'
import { useState, useCallback, useEffect } from 'react'
import dynamic from 'next/dynamic'
import type { Data, Layout, PlotSelectionEvent, Shape } from 'plotly.js'

const Plot = dynamic(
    () => import('react-plotly.js').then((mod) => mod.default),
    { ssr: false }
)

// Sample heatmap data
const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`)
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const temperatures = days.map(() =>
    Array.from({ length: 24 }, () => Math.floor(Math.random() * 15 + 20))
)

export default function HeatmapExample() {
    const [shapes, setShapes] = useState<Partial<Shape>[]>([])
    const [axisRanges, setAxisRanges] = useState<{
        x: [number, number],
        y: [number, number]
    } | null>(null)

    // Plotly data configuration
    const data: Data[] = [{
        x: hours,
        y: days,
        z: temperatures,
        type: 'heatmap',
        colorscale: 'Viridis',
        hoverongaps: false
    }]

    // Plotly layout configuration
    const layout: Partial<Layout> = {
        title: 'Weekly Temperature Distribution',
        xaxis: { title: 'Time of Day' },
        yaxis: { title: 'Day of Week', autorange: 'reversed' },
        margin: { t: 40, r: 30, b: 60, l: 80 },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        shapes
    }

    // Handle rectangle drawing
    const handleSelected = useCallback((eventData: PlotSelectionEvent) => {
        if (!eventData?.range) return

        // Convert y-axis coordinates (since autorange is reversed)
        const yMax = days.length - 1
        const y0 = yMax - eventData.range.y[0]
        const y1 = yMax - eventData.range.y[1]

        const newShape: Partial<Shape> = {
            type: 'rect',
            x0: eventData.range.x[0],
            x1: eventData.range.x[1],
            y0: Math.min(y0, y1),
            y1: Math.max(y0, y1),
            line: { color: '#3B82F6', width: 2 },
            fillcolor: 'rgba(59, 130, 246, 0.2)'
        }

        setShapes(prev => [...prev, newShape])

        // Reset view immediately after drawing
        if (axisRanges) {
            Plot.relayout('heatmap-plot', {
                'xaxis.range': axisRanges.x,
                'yaxis.range': axisRanges.y
            })
        }
    }, [axisRanges, days.length])

    // Store initial axis ranges on load
    useEffect(() => {
        setAxisRanges({
            x: [0, hours.length - 1],
            y: [0, days.length - 1]
        })
    }, [hours.length, days.length])

    return (
        <div className="my-8 rounded-lg border p-4 dark:border-gray-800">
            <Plot
                data={data}
                layout={layout}
                config={{
                    displayModeBar: true,
                    modeBarButtonsToRemove: [
                        'zoom2d', 'pan2d', 'lasso2d', 'zoomIn2d',
                        'zoomOut2d', 'autoScale2d', 'resetScale2d',
                        'hoverClosestCartesian', 'toImage'
                    ],
                    displaylogo: false
                }}
                className="w-full"
                style={{ height: '600px' }}
                onSelected={handleSelected}
                divId="heatmap-plot"
            />

            <div className="mt-4 flex gap-4 items-center">
                <button
                    onClick={() => setShapes([])}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Clear Rectangles
                </button>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                    Click and drag to draw rectangles
                </span>
            </div>
        </div>
    )
}