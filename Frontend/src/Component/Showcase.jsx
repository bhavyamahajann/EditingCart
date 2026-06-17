import { useState, useEffect, useRef } from "react";
import { PlayIcon } from "../components/icons";
import Reveal from "../components/Reveal";
import "./Showcase.css";

/* ── Project data ── */
const PROJECTS = [
  {
    id: 1,
    title: "Mountain Echoes: Solo Ascent",
    client: "Summit Media Group",
    tag: "Cinematic",
    duration: "02:45",
    fps: "23.976",
    codec: "RAW ProRes 422",
    file: "EC_MNT720_02.4.75",
    thumb: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=160&h=90&fit=crop&q=70",
    preview: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80&fit=crop",
    timeline: [
      { track: "Cinematic Video (B-Roll)", clips: ["Epic Drone Ascent", "Sunrise Backlight Peak", "Cliff Edge Wide Angle", "Glacier Walk Highlight"], colors: ["#7C3AED","#7C3AED","#7C3AED","#7C3AED"] },
      { track: "Overlays & Transitions",   clips: ["Lens Flare Burn Transition", "Light Leak Overlay"],                                               colors: ["#C9A84C","#C9A84C"] },
      { track: "Orchestral Score",          clips: ["The Ascent — Hans Zimmer Style Edit"],                                                           colors: ["#16A34A"] },
    ],
  },
  {
    id: 2,
    title: "Volt: Neon Tokyo Streetwear",
    client: "Volt Outfitters",
    tag: "Social Short",
    duration: "00:38",
    fps: "60.000",
    codec: "H.264 4K",
    file: "EC_VOLT_NK_01.2",
    thumb: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=160&h=90&fit=crop&q=70",
    preview: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=900&q=80&fit=crop",
    timeline: [
      { track: "Footage (A-Roll)",    clips: ["Model Walk Neon Alley", "Close-Up Jacket Detail", "Street Traffic Bokeh"],  colors: ["#7C3AED","#7C3AED","#7C3AED"] },
      { track: "Beat Sync Cuts",      clips: ["Bass Hit Cut 1", "Bass Hit Cut 2", "Drop Sequence"],                        colors: ["#C9A84C","#C9A84C","#C9A84C"] },
      { track: "Color LUT — Neon",    clips: ["Tokyo Night Grade Applied"],                                                colors: ["#DC2626"] },
    ],
  },
  {
    id: 3,
    title: "Monarch X: AirPower Commercial",
    client: "Monarch Core Technologies",
    tag: "Commercial",
    duration: "01:00",
    fps: "29.97",
    codec: "ProRes 4444",
    file: "EC_MNX_AP_03.1",
    thumb: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=160&h=90&fit=crop&q=70",
    preview: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80&fit=crop",
    timeline: [
      { track: "Product Shots",        clips: ["Drone Unbox Hero", "360 Spin Close", "Shadow Play Reveal"],  colors: ["#7C3AED","#7C3AED","#7C3AED"] },
      { track: "Motion Graphics",      clips: ["Logo Sting Intro", "Spec Callout Titles", "End Card"],       colors: ["#C9A84C","#C9A84C","#C9A84C"] },
      { track: "Sound Design",         clips: ["Whoosh Transitions", "Power-On SFX", "Score Bed"],           colors: ["#16A34A","#16A34A","#16A34A"] },
    ],
  },
  {
    id: 4,
    title: "How Sound Sells the Screen",
    client: "The Cinephile Channel",
    tag: "YouTube Longform",
    duration: "14:22",
    fps: "23.976",
    codec: "H.265 4K",
    file: "EC_CIN_SND_08.4",
    thumb: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=160&h=90&fit=crop&q=70",
    preview: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=900&q=80&fit=crop",
    timeline: [
      { track: "Interview (A-Roll)",  clips: ["Host Intro Take 3", "Mid Section Talking Head", "Outro Take 1"],    colors: ["#7C3AED","#7C3AED","#7C3AED"] },
      { track: "B-Roll Cutaways",     clips: ["Foley Studio Footage", "Mixer Board Close", "Orchestra Wide"],     colors: ["#C9A84C","#C9A84C","#C9A84C"] },
      { track: "Music & SFX",         clips: ["Underscore Bed", "Transition SFX Pack"],                           colors: ["#16A34A","#16A34A"] },
    ],
  },
];

const TAG_COLORS = {
  "Cinematic":        "#7C3AED",
  "Social Short":     "#C9A84C",
  "Commercial":       "#DC2626",
  "YouTube Longform": "#16A34A",
};

function pad(n) { return String(n).padStart(2, "0"); }

export default function Showcase() {
  const [selected, setSelected] = useState(PROJECTS[0]);
  const [playing,  setPlaying]  = useState(false);
  const [frame,    setFrame]    = useState(0);
  const [muted,    setMuted]    = useState(true);
  const timerRef = useRef(null);

  /* Fake playhead timer */
  useEffect(() => {
    if (playing) {
      timerRef.current = setInterval(() => setFrame((f) => f + 1), 80);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [playing]);

  /* Reset frame when project changes */
  useEffect(() => {
    setPlaying(false);
    setFrame(0);
  }, [selected]);

  /* Timecode from frame */
  const fps          = parseFloat(selected.fps) || 24;
  const totalSec     = Math.floor(frame / fps);
  const [durM, durS] = selected.duration.split(":").map(Number);
  const durFrames    = (durM * 60 + durS) * fps;
  const clampedFrame = Math.min(frame, durFrames);
  const playheadPct  = durFrames > 0 ? (clampedFrame / durFrames) * 100 : 0;
  const tcSec        = Math.floor(clampedFrame / fps);
  const timecode     = `${pad(Math.floor(tcSec / 60))}:${pad(tcSec % 60)}`;

  /* Stop at end */
  useEffect(() => {
    if (frame >= durFrames && playing) {
      setPlaying(false);
    }
  }, [frame, durFrames, playing]);

  return (
    <section aria-label="Portfolio Showcase" className="showcase-section">
      <div className="showcase-container">

        {/* ── Section header ── */}
        <Reveal>
          <div className="showcase-header">
            {/* Badge */}
            <div className="showcase-badge">
              <span className="showcase-badge-dot" />
              <span className="showcase-badge-text">
                Interactive Production Suite
              </span>
            </div>

            <h2 className="showcase-title">
              Where Premium Cuts Meet Strategic Pacing
            </h2>
            <p className="showcase-subtitle">
              Explore our real-world editing works. Click any project to inspect how we sync
              sound-beds, grade color, and structure the timeline.
            </p>
          </div>
        </Reveal>

        {/* ── Main two-column layout ── */}
        <Reveal delay={100}>
          <div className="showcase-grid">

            {/* ══ LEFT: Project catalog ══ */}
            <div className="catalog-panel">
              <div className="catalog-header">
                <span className="catalog-header-label">
                  Project Catalog
                </span>
              </div>

              {PROJECTS.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setSelected(project)}
                  className={`catalog-item${selected.id === project.id ? " catalog-item-active" : ""}`}
                >
                  {/* Thumb */}
                  <div className="catalog-thumb">
                    <img src={project.thumb} alt="" className="catalog-thumb-img" />
                    <span className="catalog-thumb-duration">
                      {project.duration}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="catalog-info">
                    <span className="catalog-tag" style={{ color: TAG_COLORS[project.tag] || "var(--gold)" }}>
                      {project.tag}
                    </span>
                    <p className="catalog-title" style={{ color: selected.id === project.id ? "#F5F0E8" : "#8A8A8A" }}>
                      {project.title}
                    </p>
                    <p className="catalog-client">
                      {project.client}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* ══ RIGHT: Preview panel ══ */}
            <div className="preview-panel">

              {/* Top bar */}
              <div className="preview-topbar">
                <div className="preview-topbar-left">
                  <span className="light-dot light-red" />
                  <span className="light-dot light-yellow" />
                  <span className="light-dot light-green" />
                  <span className="preview-filename">
                    {selected.file}
                  </span>
                </div>
                <div className="preview-topbar-right">
                  {["Video Preview", "Color Split", "System Specs"].map((btn) => (
                    <button key={btn} className={`preview-tab${btn === "Video Preview" ? " preview-tab-active" : ""}`}>
                      {btn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Video preview area */}
              <div className="preview-stage">
                <img
                  src={selected.preview}
                  alt={selected.title}
                  className="preview-img"
                />

                {/* Title overlay */}
                <div className="preview-title-overlay">
                  <p className="preview-title-text">
                    {selected.title}
                  </p>
                  <div className="preview-status-row">
                    <span className="preview-status" style={{ color: playing ? "#16A34A" : "#C9A84C" }}>
                      {playing ? "● Playing" : "⏸ Paused"}
                    </span>
                    <span className="preview-timecode">
                      {timecode} / {selected.duration}
                    </span>
                  </div>
                </div>

                {/* FPS badge */}
                <div className="preview-fps-badge">
                  <span className="preview-fps-text">
                    FPS: {selected.fps} | {selected.codec}
                  </span>
                </div>

                {/* Play button */}
                <button
                  onClick={() => setPlaying((p) => !p)}
                  aria-label={playing ? "Pause" : "Play"}
                  className="preview-play-btn"
                >
                  {playing
                    ? <span className="pause-icon"><span className="pause-bar" /><span className="pause-bar" /></span>
                    : <PlayIcon className="preview-play-icon" />
                  }
                </button>
              </div>

              {/* Playback controls bar */}
              <div className="playback-bar">
                <button
                  onClick={() => setPlaying((p) => !p)}
                  className="btn-primary playback-render-btn"
                >
                  <PlayIcon className="playback-render-icon" />
                  {playing ? "Pause Render" : "Play Render"}
                </button>

                {/* Scrubber */}
                <div
                  className="scrubber"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pct  = (e.clientX - rect.left) / rect.width;
                    setFrame(Math.round(pct * durFrames));
                    setPlaying(false);
                  }}
                >
                  <div className="scrubber-fill" style={{ width: `${playheadPct}%` }} />
                  <div className="scrubber-dot" style={{ left: `${playheadPct}%` }} />
                </div>

                <button
                  onClick={() => setMuted((m) => !m)}
                  className={`mute-btn${muted ? " mute-btn-muted" : " mute-btn-active"}`}
                >
                  <span className="decibel-bars">
                    {[4, 8, 6, 10, 7, 12, 5].map((h, i) => (
                      <span
                        key={i}
                        className="decibel-bar"
                        style={{
                          height:         `${h}px`,
                          background:     muted ? "#333" : "#16A34A",
                          animation:      playing && !muted ? `bar-pulse ${0.8 + i * 0.1}s ease-in-out infinite` : "none",
                          animationDelay: `${i * 0.07}s`,
                        }}
                      />
                    ))}
                  </span>
                  Decibel: {muted ? "Muted" : "Active"}
                </button>
              </div>

              {/* ── Live timeline ── */}
              <div className="timeline-panel">
                {/* Timeline header */}
                <div className="timeline-header">
                  <div className="timeline-header-left">
                    <span
                      className="timeline-status-dot"
                      style={{
                        background: playing ? "#16A34A" : "var(--gold)",
                        animation:  playing ? "bar-pulse 1.2s infinite" : "none",
                      }}
                    />
                    <span className="timeline-header-label">
                      Live Editing Sequencer Timeline
                    </span>
                  </div>
                  <span className="timeline-time">
                    Time: {timecode} / {selected.duration}
                  </span>
                </div>

                {/* Tracks */}
                <div className="timeline-tracks">
                  {selected.timeline.map((track, ti) => (
                    <div key={ti} className="timeline-track">
                      {/* Track label */}
                      <span className="timeline-track-label">
                        {ti === 0 ? "▶" : ti === 1 ? "◆" : "♪"} {track.track}
                      </span>

                      {/* Clip blocks */}
                      <div className="timeline-clips">
                        {track.clips.map((clip, ci) => (
                          <div
                            key={ci}
                            className="timeline-clip"
                            style={{ background: track.colors[ci] || "#333" }}
                          >
                            {clip}
                          </div>
                        ))}

                        {/* Playhead overlay */}
                        <div
                          aria-hidden="true"
                          className="timeline-playhead"
                          style={{ left: `${playheadPct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}