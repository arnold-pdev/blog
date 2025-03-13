import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './AnimatedIcon.module.css'

const AnimatedIcon = ({ icons, duration, alt, width, height, isHovered }) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if (!isHovered) {
            setCurrentIndex(0)
            return
        }

        const durationMs = parseInt(duration || '500', 10)
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % icons.length)
        }, durationMs / icons.length)

        return () => clearInterval(interval)
    }, [isHovered, icons, duration])

    if (!icons || icons.length === 0) return null

    return (
        <div className={styles.iconContainer} style={{ width, height }}>
            {icons.map((icon, index) => (
                <div key={icon} className={styles.imageWrapper}>
                    <Image
                        src={icon}
                        alt={alt}
                        width={width}
                        height={height}
                        className={`
              ${styles.iconImage}
              ${index === currentIndex ? styles.visible : styles.hidden}
            `}
                    />
                </div>
            ))}
        </div>
    )
}

export default AnimatedIcon