import React from 'react';
import Image, { ImageProps } from 'next/image';

export type OptimizedImageProps = Omit<ImageProps, 'quality'> & {
  /** Optional quality override (default: 80 for large images, 85 for heroes) */
  quality?: number;
  /** If true, adds responsive sizes for card/thumbnail use */
  cardSizes?: boolean;
  /** If true, applies hero-level sizing */
  heroSizes?: boolean;
};

/**
 * OptimizedImage — Next.js Image wrapper with sensible performance defaults.
 * Automatically handles GitHub Pages basePath prefixing dynamically.
 */
const OptimizedImage = React.memo(function OptimizedImage({
  quality = 80,
  cardSizes = false,
  heroSizes = false,
  sizes,
  priority = false,
  alt,
  src,
  ...props
}: OptimizedImageProps) {
  // Determine responsive sizes based on context
  const resolvedSizes =
    sizes ||
    (heroSizes
      ? '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw'
      : cardSizes
      ? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
      : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw');

  // Prefix relative image source paths with the NEXT_PUBLIC_BASE_PATH when deployed on GitHub Pages
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const resolvedSrc =
    typeof src === 'string' && src.startsWith('/') && !src.startsWith('//') && !src.startsWith(basePath)
      ? `${basePath}${src}`
      : src;

  return (
    <Image
      alt={alt}
      src={resolvedSrc}
      quality={quality}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      sizes={resolvedSizes}
      suppressHydrationWarning
      {...props}
    />
  );
});

export default OptimizedImage;
