import { useEffect } from 'react';
import { useImageStore } from '@/store/imageStore';
import { ImageResultCard } from './ImageResultCard';
import imageCompression from 'browser-image-compression';
import { CompressionLevel } from '@/lib/types';
import { AnimatePresence, motion } from 'framer-motion';
import { FileImage } from 'lucide-react';
const compressionOptions: Record<CompressionLevel, imageCompression.Options> = {
  low: {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  },
  medium: {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1280,
    useWebWorker: true,
  },
  high: {
    maxSizeMB: 0.1,
    maxWidthOrHeight: 800,
    useWebWorker: true,
  },
};
export function ImageResultList() {
  const images = useImageStore((state) => state.images);
  const compressionLevel = useImageStore((state) => state.compressionLevel);
  const setImageStatus = useImageStore((state) => state.setImageStatus);
  const setProgress = useImageStore((state) => state.setProgress);
  useEffect(() => {
    const compressQueue = async () => {
      const queuedImages = images.filter((img) => img.status === 'queued');
      if (queuedImages.length === 0) return;
      for (const image of queuedImages) {
        try {
          setImageStatus(image.id, 'compressing');
          const options = {
            ...compressionOptions[compressionLevel],
            onProgress: (p: number) => {
              setProgress(image.id, Math.round(p));
            },
          };
          const compressedBlob = await imageCompression(image.file, options);
          setImageStatus(image.id, 'done', {
            compressedBlob,
            compressedSize: compressedBlob.size,
            progress: 100,
          });
        } catch (error) {
          console.error('Compression error:', error);
          const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
          setImageStatus(image.id, 'error', { error: errorMessage });
        }
      }
    };
    compressQueue();
  }, [images, compressionLevel, setImageStatus, setProgress]);
  if (images.length === 0) {
    return (
      <div className="text-center py-16 px-6 border-2 border-dashed rounded-lg">
        <FileImage className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium text-foreground">No images uploaded</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Drop some images above to get started.
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <AnimatePresence>
        {images.map((image) => (
          <motion.div
            key={image.id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <ImageResultCard image={image} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}