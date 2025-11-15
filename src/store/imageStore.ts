import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { v4 as uuidv4 } from 'uuid';
import { CompressionLevel, ProcessedImage } from '@/lib/types';
interface ImageState {
  images: ProcessedImage[];
  compressionLevel: CompressionLevel;
  isZipping: boolean;
}
interface ImageActions {
  addImages: (files: File[]) => void;
  setImageStatus: (id: string, status: ProcessedImage['status'], data?: Partial<ProcessedImage>) => void;
  setProgress: (id: string, progress: number) => void;
  setCompressionLevel: (level: CompressionLevel) => void;
  clearAll: () => void;
  removeImage: (id: string) => void;
  startZipping: () => void;
  finishZipping: () => void;
}
export const useImageStore = create<ImageState & ImageActions>()(
  immer((set) => ({
    images: [],
    compressionLevel: 'medium',
    isZipping: false,
    addImages: (files) =>
      set((state) => {
        const newImages: ProcessedImage[] = files.map((file) => ({
          id: uuidv4(),
          file,
          status: 'queued',
          progress: 0,
          originalSize: file.size,
          previewUrl: URL.createObjectURL(file),
        }));
        state.images.push(...newImages);
      }),
    setImageStatus: (id, status, data) =>
      set((state) => {
        const image = state.images.find((img) => img.id === id);
        if (image) {
          image.status = status;
          if (data) {
            Object.assign(image, data);
          }
        }
      }),
    setProgress: (id, progress) =>
      set((state) => {
        const image = state.images.find((img) => img.id === id);
        if (image) {
          image.progress = progress;
        }
      }),
    setCompressionLevel: (level) =>
      set((state) => {
        state.compressionLevel = level;
        // Reset existing images to re-compress with the new level
        state.images.forEach((image) => {
          if (image.status === 'done' || image.status === 'error') {
            image.status = 'queued';
            image.progress = 0;
            image.compressedSize = undefined;
            image.compressedBlob = undefined;
            image.error = undefined;
          }
        });
      }),
    clearAll: () =>
      set((state) => {
        // Revoke object URLs to prevent memory leaks
        state.images.forEach(image => URL.revokeObjectURL(image.previewUrl));
        state.images = [];
      }),
    removeImage: (id) =>
      set((state) => {
        const imageIndex = state.images.findIndex((img) => img.id === id);
        if (imageIndex > -1) {
          URL.revokeObjectURL(state.images[imageIndex].previewUrl);
          state.images.splice(imageIndex, 1);
        }
      }),
    startZipping: () => set({ isZipping: true }),
    finishZipping: () => set({ isZipping: false }),
  }))
);