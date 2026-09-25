import React, { useState, useEffect, useRef } from 'react';
import { Maximize2, ZoomIn, ZoomOut, X, Upload, Sparkles } from 'lucide-react';
import { getAssetPath } from '../utils/assets';

interface InvitationPageCardProps {
  pageLabel: string;
  pageTitle: string;
  defaultFilename: string;
  candidateFilenames: string[];
  altText: string;
  storageKey?: string;
}

export const InvitationPageCard: React.FC<InvitationPageCardProps> = ({
  pageLabel,
  pageTitle,
  defaultFilename,
  candidateFilenames,
  altText,
  storageKey,
}) => {
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxZoom, setLightboxZoom] = useState(false);
  const [localPreview, setLocalPreview] = useState<string | null>(() => {
    if (storageKey) {
      try {
        return localStorage.getItem(`invitation_img_${storageKey}`) || null;
      } catch {
        return null;
      }
    }
    return null;
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentSrc = localPreview || getAssetPath(`assets/${candidateFilenames[candidateIndex] || defaultFilename}`);

  const handleImageError = () => {
    if (localPreview) {
      // If local preview failed, clear it and try candidate paths
      setLocalPreview(null);
      return;
    }
    if (candidateIndex < candidateFilenames.length - 1) {
      setCandidateIndex((prev) => prev + 1);
    } else {
      setImageError(true);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setLocalPreview(dataUrl);
        setImageError(false);
        if (storageKey) {
          try {
            localStorage.setItem(`invitation_img_${storageKey}`, dataUrl);
          } catch {
            // ignore quota errors
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Keyboard shortcut to close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isLightboxOpen) {
        setIsLightboxOpen(false);
        setLightboxZoom(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  return (
    <div className="relative w-full max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto flex flex-col items-center justify-center my-4 sm:my-8 px-1 sm:px-4">
      {/* Main Full-Size Card Presentation (No distracting background) */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-3 border-gold-soft/70 bg-white/95 group transition-all duration-300">
        {!imageError ? (
          <div
            onClick={() => setIsLightboxOpen(true)}
            className="relative w-full bg-[#fdfbf7] flex items-center justify-center p-0 cursor-pointer group"
            title="Click to view full screen"
          >
            <img
              src={currentSrc}
              alt={altText}
              onError={handleImageError}
              className="w-full h-auto object-contain rounded-2xl sm:rounded-3xl shadow-xs transition-transform duration-500 group-hover:scale-[1.006]"
            />

            {/* Enlarge Hint Overlay Badge */}
            <div className="absolute bottom-4 right-4 z-20 opacity-90 group-hover:opacity-100 transition-opacity">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-cinzel font-semibold bg-black/65 text-white backdrop-blur-md shadow-lg border border-white/20 hover:bg-black/85 transition-all">
                <Maximize2 className="w-3.5 h-3.5 text-gold-soft" />
                <span>Enlarge</span>
              </span>
            </div>
          </div>
        ) : (
          /* Placeholder display when waiting for user to upload image */
          <div className="relative w-full min-h-[480px] sm:min-h-[620px] bg-gradient-to-b from-[#faf6f0] to-[#f4ede0] flex flex-col items-center justify-center p-6 sm:p-10 text-center border-2 border-dashed border-gold-soft/70 rounded-2xl sm:rounded-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-cinzel font-bold tracking-widest text-[#1b4332] uppercase bg-[#1b4332]/10 border border-[#1b4332]/25 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
              {pageLabel}
            </span>

            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-foreground mb-3">
              {pageTitle}
            </h3>

            <p className="font-serif-display italic text-sm sm:text-base text-foreground/75 max-w-md mb-6 leading-relaxed">
              Upload your image into <code className="bg-white/90 px-2 py-0.5 rounded text-xs sm:text-sm text-[#a84c32] font-mono font-bold">public/assets/{defaultFilename}</code> to display it full size here.
            </p>

            {/* Direct Upload / Preview Button */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-cinzel font-semibold text-white bg-gradient-to-r from-[#93203c] to-[#a84c32] shadow-md hover:shadow-lg hover:from-[#7a1b32] hover:to-[#8c3d28] transition-all cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>Select &amp; Preview Image</span>
              </button>
            </div>

            <p className="text-[11px] font-cinzel text-foreground/50 tracking-wider mt-4">
              Accepted names: {candidateFilenames.slice(0, 3).join(', ')}
            </p>
          </div>
        )}
      </div>

      {/* Lightbox Fullscreen Modal */}
      {isLightboxOpen && !imageError && (
        <div
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={() => {
            setIsLightboxOpen(false);
            setLightboxZoom(false);
          }}
        >
          {/* Top Bar with Title and Controls */}
          <div
            className="w-full max-w-5xl flex items-center justify-between pb-4 text-white z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <p className="font-cinzel text-xs text-gold-soft tracking-widest uppercase">
                {pageLabel}
              </p>
              <h4 className="font-serif-display text-lg sm:text-xl font-bold">
                {pageTitle}
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setLightboxZoom(!lightboxZoom)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title={lightboxZoom ? 'Zoom out' : 'Zoom in'}
              >
                {lightboxZoom ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsLightboxOpen(false);
                  setLightboxZoom(false);
                }}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Centered High-Res Image Display */}
          <div
            className="relative flex items-center justify-center max-w-5xl max-h-[85vh] w-full overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentSrc}
              alt={altText}
              className={`max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl transition-transform duration-300 ${
                lightboxZoom ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={() => setLightboxZoom(!lightboxZoom)}
            />
          </div>

          <p className="text-white/60 text-xs font-serif-display mt-3 select-none">
            Click image or use controls to zoom • Press ESC or click outside to close
          </p>
        </div>
      )}
    </div>
  );
};
