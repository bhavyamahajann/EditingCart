import { useRef, useState } from "react";
import Reveal from "../components/Reveal";
import { STATS, TOOLS, TIMELINE } from "../constants";
import "./About.css";

// ---- Abhi ke liye temporary online links — baad mein apni real video/photos se replace kar dena ----
// Reel video for the program monitor
const REEL_SRC = "https://www.w3schools.com/html/mov_bbb.mp4";
// Poster frame shown before playback
const POSTER_SRC = "https://picsum.photos/seed/editingcart-poster/960/540";
// Behind-the-scenes still for the corner photo
const STILL_SRC = "https://picsum.photos/seed/editingcart-bts/400/300";

function formatTime(seconds) {
  if (!isFinite(seconds)) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const RULER_TICKS = [
  "00:00:00:00",
  "00:01:00:00",
  "00:02:00:00",
  "ABOUT",
  "00:04:00:00",
  "00:05:00:00",
  "00:06:00:00",
  "00:07:00:00",
  "00:08:00:00",
];

export default function About() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [duration, setDuration] = useState("00:00");
  const [videoError, setVideoError] = useState(false);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  return (
    <section id="about" aria-label="About" className="about-section">
      {/* Scrub-bar ruler — decorative, echoes a timeline's timecode track */}
      <div className="about-ruler" aria-hidden="true">
        <div className="about-ruler-track">
          {RULER_TICKS.map((tick, i) => (
            <div
              key={i}
              className={`about-ruler-tick${tick === "ABOUT" ? " is-active" : ""}`}
            >
              <span className="about-ruler-tick-mark" />
              <span className="about-ruler-tick-label">{tick}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="about-container">
        {/* Section header */}
        <Reveal>
          <div className="about-eyebrow">
            <span className="about-rec-dot" />
            <span className="about-eyebrow-text">About_Us</span>
            <span className="about-eyebrow-divider" />
            <span className="about-timecode-range">00:00:00:00 — 00:05:42:18</span>
          </div>
          <h2 className="about-title">
            Behind the <span className="gold-text">cuts</span>
          </h2>
          <div className="line-gold" />
        </Reveal>

        {/* Two-column layout */}
        <div className="about-grid">
          {/* Left: bio + tools */}
          <Reveal delay={100}>
            <div className="about-bio">
              <div className="about-monitor-wrap">
                <div className="about-monitor">
                  <div className="about-monitor-chrome">
                    <span className="about-monitor-chrome-left">
                      <span className="about-rec-dot small" />
                      Program
                    </span>
                    <span className="about-monitor-chrome-right">4K · 24fps</span>
                  </div>

                  <div className="about-monitor-frame">
                    {REEL_SRC && !videoError ? (
                      <video
                        ref={videoRef}
                        className="about-monitor-video"
                        src={REEL_SRC}
                        poster={POSTER_SRC || undefined}
                        playsInline
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onTimeUpdate={(e) => {
                          const v = e.target;
                          setProgress(v.duration ? (v.currentTime / v.duration) * 100 : 0);
                          setCurrentTime(formatTime(v.currentTime));
                        }}
                        onLoadedMetadata={(e) => setDuration(formatTime(e.target.duration))}
                        onError={() => setVideoError(true)}
                      />
                    ) : (
                      <div className="about-monitor-placeholder">
                        <span className="about-monitor-placeholder-icon" aria-hidden="true" />
                        <span className="about-monitor-placeholder-text">Drop reel here</span>
                        <span className="about-monitor-placeholder-sub">.MP4 · 16:9</span>
                      </div>
                    )}

                    <button
                      type="button"
                      className={`about-monitor-play${isPlaying ? " is-active" : ""}`}
                      onClick={togglePlay}
                      disabled={!REEL_SRC || videoError}
                      aria-label={isPlaying ? "Pause reel" : "Play reel"}
                    >
                      <span
                        className={`about-monitor-icon ${isPlaying ? "is-pause" : "is-play"}`}
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  <div className="about-monitor-transport">
                    <span className="about-monitor-time">{currentTime}</span>
                    <span className="about-monitor-scrub">
                      <span
                        className="about-monitor-scrub-fill"
                        style={{ width: `${progress}%` }}
                      />
                    </span>
                    <span className="about-monitor-time">{duration}</span>
                  </div>
                </div>

                <div className="about-monitor-still">
                  <span className="about-monitor-still-tag">Still_004</span>
                  {STILL_SRC ? (
                    <img
                      src={STILL_SRC}
                      alt="Behind the scenes"
                      className="about-monitor-still-img"
                    />
                  ) : (
                    <div className="about-monitor-still-placeholder" />
                  )}
                </div>
              </div>

              <p className="about-bio-text">
                Editing Cart is a one-person post-production studio. For the past five years
                I&apos;ve taken raw, unsorted footage — shaky gimbal shots, mismatched audio,
                badly-lit interviews — and turned it into something people actually finish watching.
              </p>
              <p className="about-bio-text">
                Every project starts the same way: understand who it&apos;s for, then cut for them,
                not for the footage. The result is always intentional — never just &ldquo;edited.&rdquo;
              </p>

              <p className="about-tools-label">Tools &amp; Software</p>
              <div className="about-tools-bin" role="list">
                {TOOLS.map((tool) => (
                  <span key={tool} className="about-tool-chip" role="listitem">
                    <span className="about-tool-dot" aria-hidden="true" />
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right: timeline as a clip track */}
          <Reveal delay={200}>
            <ol className="about-timeline-list" aria-label="Career timeline">
              {TIMELINE.map((item, i) => {
                const isCurrent = i === TIMELINE.length - 1;
                return (
                  <li
                    key={i}
                    className={`about-timeline-item${isCurrent ? " is-current" : ""}`}
                  >
                    <span className="about-timeline-marker" aria-hidden="true">
                      {isCurrent && <span className="about-timeline-pulse" />}
                    </span>
                    <span className="about-timeline-year">
                      {item.year}
                      {isCurrent && <span className="about-timeline-now">Now</span>}
                    </span>
                    <h3 className="about-timeline-title">{item.title}</h3>
                    <p className="about-timeline-desc">{item.desc}</p>
                  </li>
                );
              })}
            </ol>
          </Reveal>
        </div>

        {/* Stat cards as a render summary */}
        <Reveal delay={300}>
          <div className="about-stats">
            <p className="about-stats-eyebrow">// Render Summary</p>
            <div className="about-stats-grid">
              {STATS.map((stat) => (
                <div key={stat.label} className="about-stat-card">
                  <span className="about-stat-bar" aria-hidden="true" />
                  <p className="about-stat-value">{stat.value}</p>
                  <p className="about-stat-label">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}