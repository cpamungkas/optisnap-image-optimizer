import { useDropzone } from 'react-dropzone';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useImageStore } from '@/store/imageStore';
import { useCallback } from 'react';
import { toast } from 'sonner';
export function ImageUploader() {
  const addImages = useImageStore((state) => state.addImages);
  const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
    if (fileRejections.length > 0) {
      fileRejections.forEach(({ errors }) => {
        errors.forEach((error: any) => {
          toast.error(error.message);
        });
      });
    }
    if (acceptedFiles.length > 0) {
      addImages(acceptedFiles);
      toast.success(`${acceptedFiles.length} image(s) added to the queue.`);
    }
  }, [addImages]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });
  return (
    <Card
      {...getRootProps()}
      className={`border-2 border-dashed transition-all duration-300 ease-in-out cursor-pointer
        ${isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50 hover:bg-accent'}`}
    >
      <CardContent className="p-8 md:p-12 text-center">
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-4 text-muted-foreground">
          {isDragActive ? (
            <>
              <ImageIcon className="w-16 h-16 text-primary animate-bounce" />
              <p className="text-xl font-semibold text-primary">Drop the images here ...</p>
            </>
          ) : (
            <>
              <UploadCloud className="w-16 h-16" />
              <p className="text-xl font-semibold">Drag & drop images here, or click to select</p>
              <p className="text-sm">Supports JPG, PNG, WebP (max 10MB each)</p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}