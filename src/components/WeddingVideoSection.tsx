import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, Sparkles, Film } from 'lucide-react';
import { FlowerDivider, FloralCornerAccents } from './Ornaments';
import { IslamicPatternOverlay } from './IslamicBackground';
import { AnimatedSection } from './AnimatedSection';
import { getAssetPath } from '../utils/assets';

export const WeddingVideoSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);

  const videoSrc = getAssetPath('assets/v1.mp4');

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn('Video playback error:', err));
    }
  };

  const handleReplay = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => console.warn('Video replay error:', err));
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch((err) => console.warn('Fullscreen error:', err));
    } else {
      document.exitFullscreen?.().catch((err) => console.warn('Exit fullscreen error:', err));
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration;
    if (total > 0) {
      setProgress((current / total) * 100);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setProgress(100);
  };

  return (
    <section className="relative pt-12 pb-16 px-6 bg-gradient-to-b from-[#faf6f0] via-[#f5ede1] to-[#faf6f0] border-t border-gold-soft/40 overflow-hidden">
      <IslamicPatternOverlay opacity={0.04} />
      <FloralCornerAccents />

      <div className="relative max-w-4xl mx-auto z-10 text-center">
        <AnimatedSection direction="up" durationMs={650}>
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-cinzel font-bold tracking-widest text-[#1b4332] uppercase bg-[#1b4332]/10 border border-[#1b4332]/25 shadow-xs mb-3">
              <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
              Ceremonial Invitation Video
            </span>

            <p
              dir="rtl"
              lang="ar"
              className="font-arabic text-2xl sm:text-3xl text-rose-deep my-1 font-bold select-none"
              style={{ fontFamily: "'Amiri', serif" }}
            >
              مقطع الدعوة المباركة
            </p>

            <h2 className="font-script text-5xl sm:text-6xl text-rose-deep mt-1">
              Watch Our Invitation Film
            </h2>

            <p className="font-serif-display italic text-sm sm:text-base text-foreground/75 mt-2 max-w-lg mx-auto">
              A glimpse into the sacred journey, joyous memories, and wedding celebration of Ambiya &amp; Basti Ali.
            </p>

            <FlowerDivider />
          </div>
        </AnimatedSection>

        {/* Video Player Framed Container */}
        <AnimatedSection direction="zoom" delayMs={150} durationMs={750}>
          <div className="relative mx-auto max-w-[340px] sm:max-w-[370px]">
            {/* Ambient Backlight Glow */}
            <div className="absolute -inset-3 bg-gradient-to-tr from-amber-400/20 via-gold-soft/30 to-emerald-500/20 rounded-[38px] blur-xl opacity-75 pointer-events-none" />

            {/* Royal Phone/Arch Smart Frame */}
            <div
              ref={containerRef}
              className="relative rounded-[32px] overflow-hidden border-4 border-gold-soft shadow-2xl bg-black aspect-[9/16] group"
              onMouseEnter={() => setShowControls(true)}
              onTouchStart={() => setShowControls(true)}
            >
              <video
                ref={videoRef}
                src={`${videoSrc}#t=0.1`}
                playsInline
                muted={isMuted}
                loop
                preload="metadata"
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoEnded}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onClick={togglePlay}
                className="w-full h-full object-cover cursor-pointer"
              />

              {/* Decorative Arch Peak Border at Top */}
              <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-10 flex items-center justify-center">
                <div className="w-16 h-1 rounded-full bg-gold-soft/60" />
              </div>

              {/* Center Play Button Overlay when Paused */}
              {!isPlaying && (
                <div
                  onClick={togglePlay}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all cursor-pointer group-hover:bg-black/30"
                >
                  <button
                    type="button"
                    aria-label="Play invitation video"
                    className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-[#a84c32] via-[#bf953f] to-[#fcf6ba] text-white p-1 shadow-[0_0_30px_rgba(191,149,63,0.7)] flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-300 cursor-pointer"
                  >
                    <div className="w-full h-full rounded-full bg-[#1b4332] flex items-center justify-center border-2 border-gold-soft/70">
                      <Play className="w-8 h-8 text-gold fill-gold ml-1" />
                    </div>
                  </button>

                  <span className="mt-4 font-cinzel text-xs font-bold tracking-widest text-[#fcf6ba] uppercase drop-shadow-md bg-black/50 px-4 py-1 rounded-full border border-gold-soft/30">
                    Play Video
                  </span>
                </div>
              )}

              {/* Bottom Progress Bar */}
              <div className="absolute bottom-14 inset-x-3 z-30 h-1 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gold-soft to-amber-300 transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Floating Bottom Video Controls Bar */}
              <div
                className={`absolute bottom-3 inset-x-3 z-30 flex items-center justify-between px-3 py-2 rounded-2xl bg-black/65 backdrop-blur-md border border-white/15 text-white transition-opacity duration-300 ${
                  showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                    className="p-1.5 rounded-full hover:bg-white/20 text-gold-soft transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-gold-soft" /> : <Play className="w-4 h-4 fill-gold-soft" />}
                  </button>

                  <button
                    type="button"
                    onClick={handleReplay}
                    aria-label="Replay"
                    className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
                    title="Replay from start"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-cinzel tracking-wider text-white/70">
                  <Film className="w-3.5 h-3.5 text-gold-soft" />
                  <span>Ambiya &amp; Basti Ali</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                    className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-amber-300" /> : <Volume2 className="w-4 h-4 text-emerald-300" />}
                  </button>

                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    aria-label="Fullscreen"
                    className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
                    title="Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
