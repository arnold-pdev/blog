'use client'

import { useMemo } from 'react'
import { MDXProvider } from '@mdx-js/react'
import { getMDXComponent } from 'mdx-bundler/client'
import type { MDXComponents } from 'mdx/types'
import { useMDXComponents } from '@/components/MDXComponents'

export const MDXLayoutRenderer = ({
    code,
    toc,
    ...rest
}: {
    code: string
    toc?: any
}) => {
    // Get components from your MDX config
    const components = useMDXComponents({})

    // Memoize the MDX content
    const MDXContent = useMemo(() => getMDXComponent(code), [code])

    return (
        <MDXProvider components={components}>
            <div className="mdx-content">
                {/* Pass frontmatter as props if needed */}
                <MDXContent {...rest} />
                {toc && (
                    <div className="toc-wrapper">
                        {/* Render table of contents if needed */}
                    </div>
                )}
            </div>
        </MDXProvider>
    )
}