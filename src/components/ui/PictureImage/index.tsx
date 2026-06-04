import type { CSSProperties } from "react";

export interface PictureImageProps {
  webpSrc: string;
  pngSrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  style?: CSSProperties;
  sizes?: string;
  priority?: boolean;
}

/** Imagen con WebP preferido y PNG como respaldo (sin optimización de Next). */
export function PictureImage({
  webpSrc,
  pngSrc,
  alt,
  width,
  height,
  className,
  style,
  sizes,
  priority = false,
}: PictureImageProps) {
  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={pngSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={style}
        sizes={sizes}
        decoding={priority ? "sync" : "async"}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
      />
    </picture>
  );
}
