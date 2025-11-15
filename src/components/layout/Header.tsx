import { ThemeToggle } from '@/components/ThemeToggle';
import { Sparkles } from 'lucide-react';
export function Header() {
  return (
    <header className="relative text-center py-8 md:py-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110">
          <Sparkles className="w-6 h-6" />
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
          OptiSnap
        </h1>
      </div>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Compress and optimize your images instantly. Privacy-first, entirely in your browser.
      </p>
      <ThemeToggle className="absolute top-4 right-0" />
    </header>
  );
}