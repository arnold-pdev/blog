// components/plots/BasicTest.tsx
'use client'

import dynamic from 'next/dynamic'

const Plot = dynamic(
    () => import('react-plotly.js').then((mod) => mod.default),
    {
        ssr: false,
        loading: () => <div className="h-64 animate-pulse bg-gray-100 rounded-lg dark:bg-gray-800" />
    }
)

export default function BasicTest() {
    const data: Plotly.Data[] = [{
        x: ['Lions', 'Tigers', 'Bears'],
        y: [20, 14, 23],
        type: 'bar',
        marker: {
            color: '#3B82F6' // Tailwind blue-500
        }
    }]

    const layout: Partial<Plotly.Layout> = {
        title: 'Animal Counts',
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        font: {
            color: '#64748B' // Tailwind slate-500
        },
        xaxis: { title: 'Animal' },
        yaxis: { title: 'Count' }
    }

    return (
        <div className="my-6 rounded-lg border p-4 dark:border-gray-800">
            <Plot
                data={data}
                layout={layout}
                className="w-full"
                config={{ responsive: true }}
            />
        </div>
    )
}