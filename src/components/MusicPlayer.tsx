import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface MusicPlayerProps {
  play: boolean;
  src?: string;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  play,
  src = '/audio/background.mp3',
}) => {
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
      <audio ref={audioRef} src={src} preload="auto" />
      {play && (
        <button
          type="button"
          aria-label={muted ? 'Unmute background music' : 'Mute background music'}
          onClick={() => setMuted((m) => !m)}
          className="fixed bottom-5 right-5 z-50 h-11 w-11 rounded-full bg-[#2b1f1a]/80 text-[#faf6f0] backdrop-blur shadow-elegant flex items-center justify-center hover:scale-105 transition cursor-pointer"
        >
          {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
      )}
    </>
  );
};
