# nextjs-custom-image-client

A custom Image component for Next.js that includes skeleton loading and error handling.

## Installation

```bash
npm install nextjs-custom-image-client
```

## Usage

```jsx
import Image from 'nextjs-custom-image-client';

function MyComponent() {
  return (
    <Image
      src="/path/to/image.jpg"
      alt="My image"
      srcNoImage="/path/to/fallback.jpg"
    />
  );
}
```

## Props

- `src`: URL of the main image
- `srcNoImage`: URL of the fallback image
- `objectFit`: CSS object-fit property
- All props supported by next/image

## License

MIT
