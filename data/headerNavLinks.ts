const headerNavLinks = [
  { href: '/', title: 'Home' },
  { href: '/blog', title: 'Blog', icons: ['/icons/blog-frame1.svg', '/icons/blog-frame2.svg', '/icons/blog-frame3.svg'], default: 0, sequence: [0, 1, 2, 1], duration: '500ms' },
  { href: '/projects', title: 'Projects', icons: ['/icons/projects-frame1.svg', '/icons/projects-frame2.svg', '/icons/projects-frame3.svg', '/icons/projects-frame4.svg'], default: 0, sequence: [0, 1, 2, 3], duration: '500ms' },
  { href: '/about', title: 'About', icons: ['/icons/about-frame1.svg', '/icons/about-frame2.svg', '/icons/about-frame3.svg', '/icons/about-frame4.svg'], default: 0, sequence: [0, 1, 2, 3], duration: '500ms' },
  { href: '/resume', title: 'CV', icons: ['/icons/cv-frame1.svg', '/icons/cv-frame2.svg', '/icons/cv-frame3.svg'], default: 0, sequence: [0, 1, 2, 1], duration: '500ms' },
]

export default headerNavLinks
