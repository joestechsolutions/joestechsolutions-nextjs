"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

type VoiceClip = {
  id: string;
  label: string;
  src: string;
  duration?: string;
};

const VOICE_CLIPS: VoiceClip[] = [
  {
    id: "intro",
    label: "Intro",
    src: "/audio/joe-intro.mp3",
  },
  {
    id: "services",
    label: "What I Do",
    src: "/audio/joe-services.mp3",
  },
  {
    id: "approach",
    label: "My Approach",
    src: "/audio/joe-approach.mp3",
  },
];

export function VoiceAvatar() {
  const [activeClip, setActiveClip] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [, setAudioReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Check if audio files exist (dev mode flag — set to true once files are generated)
  const hasAudio = false;

  const handlePlay = useCallback((clip: VoiceClip) => {
    if (!audioRef.current) return;

    if (activeClip === clip.id && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    if (activeClip !== clip.id) {
      audioRef.current.src = clip.src;
      setActiveClip(clip.id);
      setProgress(0);
    }

    audioRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      // Audio file doesn't exist yet — show placeholder state
      setAudioReady(false);
    });
  }, [activeClip, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      if (audio.duration > 0) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setActiveClip(null);
    };
    const onCanPlay = () => setAudioReady(true);
    const onError = () => {
      setAudioReady(false);
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("error", onError);
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center gap-8">
      {/* Avatar + Play Button */}
      <div className="relative group cursor-pointer" onClick={() => handlePlay(VOICE_CLIPS[0])}>
        {/* Pulsing rings when playing */}
        {isPlaying && (
          <>
            <span className="absolute inset-0 rounded-none animate-ping-slow bg-primary/20" />
            <span className="absolute inset-0 rounded-none animate-ping-slower bg-primary/10" />
          </>
        )}

        {/* Avatar image */}
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-none overflow-hidden border-2 border-primary/40 group-hover:border-primary/70 transition-colors duration-500 shadow-xl shadow-primary/10">
          <Image
            src="/images/joe-profile.jpg"
            alt="Joe Blas — Joe's Tech Solutions"
            fill
            sizes="(max-width: 640px) 128px, 160px"
            className="object-cover"
            priority
          />
        </div>

        {/* Play/Pause overlay */}
        <div className={`absolute inset-0 flex items-center justify-center rounded-none transition-colors duration-300 ${isPlaying ? "bg-black/40" : "bg-black/20 group-hover:bg-black/30"}`}>
          {isPlaying ? (
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-foreground" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-foreground drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>

        {/* Progress ring */}
        {isPlaying && progress > 0 && (
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r="48" fill="none" stroke="#02a0a0" strokeWidth="2" strokeDasharray="301.6" strokeDashoffset={301.6 - (301.6 * progress) / 100} strokeLinecap="round" className="transition-[stroke-dashoffset] duration-150" />
          </svg>
        )}
      </div>

      {/* Label */}
      <div className="text-center">
        <p className="text-sm text-foreground/60 font-medium">
          {isPlaying ? "Joe is talking..." : "Hear from Joe"}
        </p>
      </div>

      {/* Clip selector */}
      {hasAudio && (
        <div className="flex flex-wrap justify-center gap-2">
          {VOICE_CLIPS.map((clip) => (
            <button
              key={clip.id}
              onClick={() => handlePlay(clip)}
              className={`px-4 py-2 rounded-none text-sm font-medium transition-[color,background-color,border-color] duration-300 ${
                activeClip === clip.id
                  ? "bg-primary text-foreground border-primary"
                  : "bg-card text-foreground/70 border-foreground/10 hover:border-primary/40 hover:text-foreground"
              } border`}
            >
              {clip.label}
            </button>
          ))}
        </div>
      )}

      {/* Coming soon state when no audio yet */}
      {!hasAudio && (
        <div className="flex items-center gap-2 px-4 py-2 rounded-none bg-card/60 border border-foreground/10 text-xs text-foreground/40">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-primary opacity-75" />
            <span className="relative inline-flex rounded-none h-2 w-2 bg-primary" />
          </span>
          Voice cloning in progress
        </div>
      )}

      {/* Hidden audio element */}
      <audio ref={audioRef} preload="none" />
    </div>
  );
}