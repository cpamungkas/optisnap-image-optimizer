import { Header } from '@/components/layout/Header';
import { ImageUploader } from '@/components/ImageUploader';
import { SettingsPanel } from '@/components/SettingsPanel';
import { ImageResultList } from '@/components/ImageResultList';
import { Toaster } from '@/components/ui/sonner';
import { useTheme } from '@/hooks/use-theme';
export function HomePage() {
  // Initialize theme
  useTheme();
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-10 lg:py-12">
          <Header />
          <main className="space-y-12 mt-8">
            <div className="space-y-6">
              <SettingsPanel />
              <ImageUploader />
            </div>
            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-6">
                Your Images
              </h2>
              <ImageResultList />
            </section>
          </main>
        </div>
        <footer className="text-center py-8 text-sm text-muted-foreground">
          <p>Built with ❤️ at Cloudflare</p>
        </footer>
      </div>
      <Toaster richColors closeButton position="top-right" />
    </>
  );
}