"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { cn } from "@/lib/cn";

export type AudioPlayerProps = {
  title: string;
  audioSrc: string;
  className?: string;
};

function formatTrackTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  const s = total % 60;
  const m = Math.floor(total / 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function AudioPlayer(props: AudioPlayerProps) {
  return <AudioPlayerInner key={props.audioSrc} {...props} />;
}

function AudioPlayerInner({ title, audioSrc, className }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrubbingRef = useRef(false);
  const wasPlayingBeforeScrubRef = useRef(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [scrubbing, setScrubbing] = useState(false);

  const progress =
    duration > 0 ? Math.min(1, Math.max(0, currentTime / duration)) : 0;

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const syncDurationFromElement = () => {
      const d = a.duration;
      if (Number.isFinite(d) && d > 0) {
        setDuration(d);
      }
    };

    const onLoadedMetadata = () => {
      syncDurationFromElement();
    };
    const onDurationChange = () => {
      syncDurationFromElement();
    };
    const onLoadedData = () => {
      syncDurationFromElement();
    };
    const onTimeUpdate = () => {
      if (scrubbingRef.current) return;
      setCurrentTime(a.currentTime);
      syncDurationFromElement();
    };
    const onPlay = () => {
      setHasStarted(true);
      setEnded(false);
      syncDurationFromElement();
    };
    const onPlaying = () => {
      setIsPlaying(true);
      syncDurationFromElement();
    };
    const onPause = () => {
      setIsPlaying(false);
      if (a.ended) setEnded(true);
    };
    const onEnded = () => {
      setIsPlaying(false);
      setEnded(true);
      setCurrentTime(Number.isFinite(a.duration) ? a.duration : 0);
    };

    a.addEventListener("loadedmetadata", onLoadedMetadata);
    a.addEventListener("durationchange", onDurationChange);
    a.addEventListener("loadeddata", onLoadedData);
    a.addEventListener("timeupdate", onTimeUpdate);
    a.addEventListener("play", onPlay);
    a.addEventListener("playing", onPlaying);
    a.addEventListener("pause", onPause);
    a.addEventListener("ended", onEnded);

    syncDurationFromElement();

    return () => {
      a.removeEventListener("loadedmetadata", onLoadedMetadata);
      a.removeEventListener("durationchange", onDurationChange);
      a.removeEventListener("loadeddata", onLoadedData);
      a.removeEventListener("timeupdate", onTimeUpdate);
      a.removeEventListener("play", onPlay);
      a.removeEventListener("playing", onPlaying);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("ended", onEnded);
    };
  }, []);

  function togglePlayback() {
    const a = audioRef.current;
    if (!a) return;
    if (a.ended) {
      a.currentTime = 0;
      setEnded(false);
      setCurrentTime(0);
    }
    if (a.paused) {
      void a.play();
    } else {
      a.pause();
    }
  }

  function seekFromClientX(clientX: number) {
    const track = trackRef.current;
    const a = audioRef.current;
    if (!track || !a) return;
    const d = a.duration;
    if (!Number.isFinite(d) || d <= 0) return;
    const rect = track.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const t = ratio * d;
    a.currentTime = t;
    setCurrentTime(t);
    if (a.ended && t < d) {
      setEnded(false);
    }
  }

  function endScrub(options: { release: boolean; target: HTMLDivElement | null; pointerId: number }) {
    if (!scrubbingRef.current) return;
    scrubbingRef.current = false;
    setScrubbing(false);
    if (options.release && options.target) {
      try {
        if (options.target.hasPointerCapture(options.pointerId)) {
          options.target.releasePointerCapture(options.pointerId);
        }
      } catch {
        /* already released */
      }
    }
    const a = audioRef.current;
    if (wasPlayingBeforeScrubRef.current && a) {
      wasPlayingBeforeScrubRef.current = false;
      void a.play();
    } else {
      wasPlayingBeforeScrubRef.current = false;
    }
  }

  function onTrackPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    if (e.button !== 0) return;
    const a = audioRef.current;
    if (!a || !Number.isFinite(a.duration) || a.duration <= 0) return;

    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    scrubbingRef.current = true;
    setScrubbing(true);
    wasPlayingBeforeScrubRef.current = !a.paused && !a.ended;
    if (wasPlayingBeforeScrubRef.current) {
      a.pause();
    }
    seekFromClientX(e.clientX);
  }

  function onTrackPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!scrubbingRef.current) return;
    seekFromClientX(e.clientX);
  }

  function onTrackPointerUp(e: ReactPointerEvent<HTMLDivElement>) {
    endScrub({ release: true, target: e.currentTarget, pointerId: e.pointerId });
  }

  function onTrackLostPointerCapture(e: ReactPointerEvent<HTMLDivElement>) {
    endScrub({ release: false, target: e.currentTarget, pointerId: e.pointerId });
  }

  function onTrackKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const a = audioRef.current;
    if (!a || !Number.isFinite(a.duration) || a.duration <= 0) return;
    const step = 5;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      a.currentTime = Math.min(a.duration, a.currentTime + step);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      a.currentTime = Math.max(0, a.currentTime - step);
    } else if (e.key === "Home") {
      e.preventDefault();
      a.currentTime = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      a.currentTime = a.duration;
    } else {
      return;
    }
    setCurrentTime(a.currentTime);
  }

  const showTimeRow =
    hasStarted && Number.isFinite(duration) && duration > 0;

  return (
    <div
      className={cn(
        "relative flex h-14 w-full min-w-0 items-stretch overflow-hidden rounded-xl border border-border/70 bg-background-section shadow-sm",
        className,
      )}
    >
      {/*
        Avoid `display:none`: many browsers defer media load until the element
        can render, so metadata/duration never arrives. Keep it visually inert
        and out of layout instead.
      */}
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="metadata"
        className="pointer-events-none fixed top-0 left-0 h-px w-px opacity-0"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[1]"
        style={{
          width: `${progress * 100}%`,
          backgroundColor: "var(--surface)",
        }}
        aria-hidden
      />

      <div className="relative z-10 flex min-w-0 min-h-0 w-full flex-1 items-stretch">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            togglePlayback();
          }}
          className="flex shrink-0 items-center justify-center border-r border-border/50 px-4 text-accent focus-visible:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          aria-label={
            isPlaying
              ? `Pause ${title}`
              : ended
                ? `Replay ${title}`
                : `Play ${title}`
          }
        >
          {isPlaying ? <PauseGlyph /> : <PlayGlyph />}
        </button>

        <div
          ref={trackRef}
          role="slider"
          tabIndex={0}
          aria-label={`Seek: ${title}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          aria-valuetext={
            showTimeRow
              ? `${formatTrackTime(currentTime)} of ${formatTrackTime(duration)}`
              : undefined
          }
          onPointerDown={onTrackPointerDown}
          onPointerMove={onTrackPointerMove}
          onPointerUp={onTrackPointerUp}
          onPointerCancel={onTrackPointerUp}
          onLostPointerCapture={onTrackLostPointerCapture}
          onKeyDown={onTrackKeyDown}
          className={cn(
            "flex min-h-14 min-w-0 flex-1 touch-none items-center gap-2.5 px-4 select-none focus-visible:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
            scrubbing ? "cursor-grabbing" : "cursor-grab",
          )}
        >
          <p className="min-w-0 flex-1 truncate font-sans text-base leading-normal text-foreground">
            {title}
          </p>
          {showTimeRow ? (
            <p className="shrink-0 tabular-nums text-small text-foreground-muted">
              {formatTrackTime(currentTime)} / {formatTrackTime(duration)}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" width={24} height={24} fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth={1.25} />
      <path
        fill="currentColor"
        d="M10.2 8.2c0-.33.35-.54.63-.37l5.15 3.17a.45.45 0 0 1 0 .77l-5.15 3.17a.45.45 0 0 1-.63-.37V8.2Z"
      />
    </svg>
  );
}

function PauseGlyph() {
  return (
    <svg viewBox="0 0 24 24" width={24} height={24} fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth={1.25} />
      <path fill="currentColor" d="M9.25 8.5h2.2v7h-2.2v-7Zm3.3 0h2.2v7h-2.2v-7Z" />
    </svg>
  );
}
