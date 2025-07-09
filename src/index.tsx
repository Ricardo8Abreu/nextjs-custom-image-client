import  NextImage, { type ImageProps as NextImageProps } from "next/image"
import { useState, type CSSProperties, type SyntheticEvent } from "react"

const defaultValues = {
  alt: "Image"
}

/**
 * Props for the Image component.
 */
export interface ImageProps extends Omit<NextImageProps, "objectFit"> {
  /**
   * CSS object-fit property for the image.
   */
  objectFit?: CSSProperties["objectFit"]
  /**
   * URL of the fallback image to be used if the main image fails to load.
   */
  srcNoImage: string
}

interface GetSrcProps extends Pick<ImageProps, "src" | "srcNoImage"> {
  error: boolean
}

const getSrc = ({ src, error, srcNoImage }: GetSrcProps) => {
  if (error) {
    return srcNoImage
  }
  return src || srcNoImage
}

/**
 * Custom Image component for Next.js with loading skeleton and error handling.
 */
const Image = ({ src, alt, fill = true, style, objectFit, srcNoImage, loading = "lazy", onError, onLoad, width, height, ...props }: ImageProps) => {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const newSrc = getSrc({ src, error, srcNoImage })

  const newFill = width || height ? false : fill
  const ifShowSkeleton = !loaded && !error

  const ifShowImage = !ifShowSkeleton && loaded
  
  const handleLoad = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    setError(false)
    setLoaded(true)
    onLoad && onLoad(event)
  }

  const handleError = (error: SyntheticEvent<HTMLImageElement>) => {
    setError(true)
    onError && onError(error)
  }

  return (
    <>
      {ifShowSkeleton && <div className="skeleton-nextjs-image"></div>}
      <NextImage
        src={newSrc}
        alt={alt || defaultValues.alt}
        fill={newFill}
        width={width}
        height={height}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          ...style,
          opacity: ifShowImage ? 1 : 0,
          objectFit: error ? "none" : objectFit,
          transition: 'opacity 0.5s ease-in-out'
        }}
        {...props}
      />
      <style>{`
        .skeleton-nextjs-image {
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          position: absolute;
          min-width: ${width ? `${width}px` : "50px"};
          min-height: ${height ? `${height}px` : "auto"};
          max-width: ${width ? `${width}px` : "auto"};
          max-height: ${height ? `${height}px` : "auto"};
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          border-radius: 0.5rem;
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </>
  )
}

export default Image

