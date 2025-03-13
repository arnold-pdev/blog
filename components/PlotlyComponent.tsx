// components/PlotlyComponent.tsx
'use client'

import dynamic from 'next/dynamic'

// Correct dynamic import syntax
const Plot = dynamic(
    () => import('react-plotly.js').then((mod) => mod.default),
    {
        ssr: false,
        loading: () => <div className="h-64 animate-pulse bg-gray-100 dark:bg-gray-800" />
    }
)

export default function PlotlyComponent({
    data,
    layout
}: {
    data: Plotly.Data[],
    layout: Partial<Plotly.Layout>
}) {
    return (
        <Plot
            data={data}
            layout={layout}
            className="w-full"
        />
    )
}