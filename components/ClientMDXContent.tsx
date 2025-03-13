// components/ClientMDXContent.tsx
'use client'

import { getMDXComponent } from 'mdx-bundler/client'
import { useMemo } from 'react'
import type { MDXComponents } from 'mdx/types'
import { useMDXComponents } from '@/components/MDXComponents'

export default function ClientMDXContent({ code }: { code: string }) {
  const components = useMDXComponents({})
  const MDXContent = useMemo(() => getMDXComponent(code), [code])

  return <MDXContent components={components} />
}