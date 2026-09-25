import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { getAssetPath } from '../utils/assets';

interface MusicPlayerProps {
  play: boolean;
  src?: string;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  play,
  src,
}) => {
  const audioSrc = src || getAssetPath('audio/background.mp3');
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.45;
    audio.loop = true;

    if (play && !muted) {
      audio.play().catch((err) => {
        console.warn('Audio autoplay blocked or failed:', err);
      });
    } else {
      audio.pause();
    }
  }, [play, muted]);

  return (
    <>
      <audio ref={audioRef} src={audioSrc} preload="auto" />
      {play && (
        <button
          type="button"
          aria-label={muted ? 'Unmute background music' : 'Mute background music'}
          onClick={() => setMuted((m) => !m)}
          className="fixed bottom-[70px] right-5 sm:bottom-[78px] sm:right-6 z-40 h-11 w-11 rounded-full bg-[#2b1f1a]/85 text-[#faf6f0] border border-gold-soft/40 backdrop-blur shadow-elegant flex items-center justify-center hover:scale-105 active:scale-95 transition cursor-pointer"
        >
          {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
      )}
    </>
  );
};
