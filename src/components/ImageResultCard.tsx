import { ProcessedImage } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Download, XCircle, AlertTriangle, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useImageStore } from '@/store/imageStore';
import { saveAs } from 'file-saver';
interface ImageResultCardProps {
  image: ProcessedImage;
}
function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
export function ImageResultCard({ image }: ImageResultCardProps) {
  const removeImage = useImageStore((state) => state.removeImage);
  const handleDownload = () => {
    if (image.compressedBlob) {
      const originalName = image.file.name;
      const extension = originalName.slice(originalName.lastIndexOf('.'));
      const newName = originalName.slice(0, originalName.lastIndexOf('.')) + '-optisnap' + extension;
      saveAs(image.compressedBlob, newName);
    }
  };
  const renderContent = () => {
    switch (image.status) {
      case 'queued':
      case 'compressing':
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <Skeleton className="w-full h-48" />
            <div className="w-full p-4 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Progress value={image.progress} className="w-full" />
              <p className="text-sm text-muted-foreground text-center">{image.status === 'compressing' ? `${image.progress}%` : 'Waiting...'}</p>
            </div>
          </div>
        );
      case 'done':
        const reduction = image.compressedSize ? 100 - (image.compressedSize / image.originalSize) * 100 : 0;
        return (
          <>
            <CardHeader className="p-0 relative">
              <img src={image.previewUrl} alt={image.file.name} className="w-full h-48 object-cover rounded-t-lg" />
            </CardHeader>
            <CardContent className="p-4 flex-1">
              <p className="text-sm font-medium truncate text-foreground" title={image.file.name}>{image.file.name}</p>
              <div className="text-xs text-muted-foreground mt-2 space-y-1">
                <p>Original: <span className="font-semibold text-foreground">{formatBytes(image.originalSize)}</span></p>
                <p>Compressed: <span className="font-semibold text-green-600">{formatBytes(image.compressedSize!)}</span></p>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex items-center justify-between">
              <Badge variant={reduction > 0 ? "default" : "secondary"} className={reduction > 50 ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : ""}>
                {reduction.toFixed(1)}% saved
              </Badge>
              <Button size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4" />
              </Button>
            </CardFooter>
          </>
        );
      case 'error':
        return (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center bg-destructive/10">
            <AlertTriangle className="w-12 h-12 text-destructive mb-4" />
            <p className="text-sm font-semibold text-destructive-foreground">Compression Failed</p>
            <p className="text-xs text-muted-foreground mt-1">{image.error || 'An unknown error occurred.'}</p>
          </div>
        );
    }
  };
  return (
    <Card className="overflow-hidden flex flex-col relative group transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-6 w-6 rounded-full bg-background/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-10"
        onClick={() => removeImage(image.id)}
      >
        <X className="h-4 w-4" />
      </Button>
      {renderContent()}
    </Card>
  );
}