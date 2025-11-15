import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useImageStore } from '@/store/imageStore';
import { CompressionLevel } from '@/lib/types';
import { Download, Trash2, Loader2 } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { toast } from 'sonner';
export function SettingsPanel() {
  const compressionLevel = useImageStore((state) => state.compressionLevel);
  const setCompressionLevel = useImageStore((state) => state.setCompressionLevel);
  const images = useImageStore((state) => state.images);
  const clearAll = useImageStore((state) => state.clearAll);
  const isZipping = useImageStore((state) => state.isZipping);
  const startZipping = useImageStore((state) => state.startZipping);
  const finishZipping = useImageStore((state) => state.finishZipping);
  const handleDownloadAll = async () => {
    const compressedImages = images.filter(img => img.status === 'done' && img.compressedBlob);
    if (compressedImages.length === 0) {
      toast.info("No images have been compressed yet.");
      return;
    }
    startZipping();
    toast.loading("Creating ZIP file...", { id: 'zip-toast' });
    try {
      const zip = new JSZip();
      compressedImages.forEach(image => {
        const originalName = image.file.name;
        const extension = originalName.slice(originalName.lastIndexOf('.'));
        const newName = originalName.slice(0, originalName.lastIndexOf('.')) + '-optisnap' + extension;
        zip.file(newName, image.compressedBlob!);
      });
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "optisnap-images.zip");
      toast.success("ZIP file created successfully!", { id: 'zip-toast' });
    } catch (error) {
      console.error("Error creating ZIP file:", error);
      toast.error("Failed to create ZIP file.", { id: 'zip-toast' });
    } finally {
      finishZipping();
    }
  };
  const hasImages = images.length > 0;
  const hasCompressedImages = images.some(img => img.status === 'done');
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-card border rounded-lg shadow-sm">
      <div className="flex-1 w-full md:w-auto">
        <h3 className="text-sm font-medium mb-2 text-foreground">Compression Level</h3>
        <Tabs value={compressionLevel} onValueChange={(value) => setCompressionLevel(value as CompressionLevel)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="low">Low</TabsTrigger>
            <TabsTrigger value="medium">Medium</TabsTrigger>
            <TabsTrigger value="high">High</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="flex items-center gap-2 w-full md:w-auto">
        <Button onClick={handleDownloadAll} disabled={!hasCompressedImages || isZipping} className="w-full md:w-auto">
          {isZipping ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Download className="mr-2 h-4 w-4" />
          )}
          Download All as ZIP
        </Button>
        <Button onClick={clearAll} variant="destructive" disabled={!hasImages} className="w-full md:w-auto">
          <Trash2 className="mr-2 h-4 w-4" />
          Clear All
        </Button>
      </div>
    </div>
  );
}