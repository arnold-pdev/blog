'use client'

import { useState } from 'react'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import AnimatedIcon from './AnimatedIcon'
import { Tooltip } from './Tooltip'

const Header = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  let headerClass = 'flex items-center w-full bg-white dark:bg-gray-950 justify-between py-8'

  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center justify-between">
          <div className="mr-3 flex items-center group">
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden h-6 text-2xl font-semibold sm:block group-hover:text-primary-500 dark:text-gray-100 dark:group-hover:text-primary-400">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 26 18"
              fill="currentColor"
              className="h-8 w-8 ml-2 text-gray-900 group-hover:text-primary-500 dark:text-gray-100 dark:group-hover:text-primary-400"
              style={{ height: '32px', width: '32px' }}
            >
              <path
                fillRule="evenodd"
                d="M6 18.7481S.4237 16.8702.4237 12.1069s5.5763-6.6412 5.5763-6.6412h14.187S25.7634 7.3435 25.7634 12.1069s-4.7634 5.3931-5.5763 6.6412H6ZM13.6489 6.7882 22.6145 11.1508v1.9981L13.6489 17.5286v-1.7748l2.8168-1.3683V9.834l-2.8168-1.3111V6.7882m3.7214 3.3893 4.2252 1.9294-4.2252 1.9408V10.1775M12.4237 17.4313 3.458 13.0687V11.0706L12.4237 6.6908v1.7748l-2.8168 1.3626v4.5515l2.8168 1.3168V17.4313m-3.7214-3.3893-4.2252-1.9294 4.2252-1.9408v3.8702"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </Link>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        <div className="no-scrollbar hidden max-w-40 items-center space-x-4 overflow-x-auto sm:flex sm:space-x-6 md:max-w-72 lg:max-w-96">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Tooltip key={link.title} content={link.href}>
                <div
                  className="group relative"
                  onMouseEnter={() => setHoveredLink(link.title)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {siteMetadata.useIconLinks && link.icons ? (
                    <Link
                      href={link.href}
                      className="flex items-center p-2 hover:text-primary-500 dark:hover:text-primary-400"
                    >
                      <AnimatedIcon
                        isHovered={hoveredLink === link.title}
                        icons={link.icons}
                        duration={link.duration || '500ms'}
                        alt={link.title}
                        width={36}
                        height={36}
                      />
                    </Link>
                  ) : (
                    <Link
                      href={link.href}
                      className="block font-medium text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
                    >
                      {link.title}
                    </Link>
                  )}
                </div>
              </Tooltip>
            ))}
        </div>
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header