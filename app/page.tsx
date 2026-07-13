"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const resumeUrl = basePath + "/Yash_Kant_Tiwary_Resume.pdf";
const frameRate = 25;
const durationSeconds = 60;
const maxFrames = frameRate * durationSeconds;

type LayerId = "primary" | "secondary" | "accent" | "guides" | "timeline" | "ui" | "background";

type LayerSetting = {
  label: string;
  swatch: string;
  visible: boolean;
  opacity: number;
};

type Project = {
  slug: string;
  number: string;
  code: string;
  discipline: string;
  title: string;
  subtitle: string;
  role: string;
  type: string;
  brief: string;
  thinking: string;
  contribution: string;
  outcomes: string[];
  media: string[];
};

const initialLayers: Record<LayerId, LayerSetting> = {
  primary: { label: "TEXT — PRIMARY", swatch: "ivory", visible: true, opacity: 100 },
  secondary: { label: "TEXT — SECONDARY", swatch: "teal", visible: true, opacity: 100 },
  accent: { label: "ACCENT — TEAL", swatch: "line", visible: true, opacity: 100 },
  guides: { label: "GRID / GUIDES", swatch: "grid", visible: true, opacity: 72 },
  timeline: { label: "TIMELINE", swatch: "charcoal", visible: true, opacity: 100 },
  ui: { label: "UI ELEMENTS", swatch: "outline", visible: true, opacity: 100 },
  background: { label: "BACKGROUND", swatch: "black", visible: true, opacity: 100 },
};

const projects: Project[] = [
  {
    slug: "pw-ioi-launch",
    number: "01",
    code: "IOI",
    discipline: "Launch · Creative Direction",
    title: "PW IOI MBA Launch",
    subtitle: "Six content streams. One live launch system.",
    role: "Creative Production Lead",
    type: "Launch Campaign",
    brief: "Build one coherent creative system for the PW IOI MBA launch in Bangalore across event branding, social, YouTube Live, stage design, banners, and event flow.",
    thinking: "Treat every touchpoint as one launch story, so the audience recognises the same promise from the first thumbnail to the live stage.",
    contribution: "Owned briefs, creative direction, review cycles, team coordination, and final approvals across six connected content streams.",
    outcomes: ["6 connected content streams", "Live + digital launch coverage", "Team and agency coordination"],
    media: ["Launch film", "Stage and event branding", "Social campaign system"],
  },
  {
    slug: "skillshala-engine",
    number: "02",
    code: "SKL",
    discipline: "Growth · YouTube · Launch",
    title: "Skillshala Content Engine",
    subtitle: "Content designed to move people from interest to attendance.",
    role: "Creative Producer",
    type: "Growth Content System",
    brief: "Create the launch and live-content engine for Skillshala across YouTube and supporting campaign surfaces.",
    thinking: "Give every asset one clear job in the funnel: earn attention, explain the promise, reduce doubt, and create a reason to register.",
    contribution: "Directed launch content, YouTube assets, creative variants, live support, and the production workflow behind the campaign.",
    outcomes: ["700+ registrations", "400 attendees", "30K YouTube views"],
    media: ["Hero launch video", "Performance creative set", "Results dashboard"],
  },
  {
    slug: "ai-workflow",
    number: "03",
    code: "AI",
    discipline: "AI · Creative Operations",
    title: "AI Production Workflow",
    subtitle: "Faster execution without outsourcing the thinking.",
    role: "Workflow Designer",
    type: "AI Creative Operations",
    brief: "Reduce repetitive review and planning work while protecting creative judgement and final quality.",
    thinking: "Automate mechanical search and organisation so people spend more time on story, pacing, and craft.",
    contribution: "Designed a four-part workflow for footage analysis, B-roll, highlights, and music cues, then integrated it into real production tasks.",
    outcomes: ["Turnaround reduced by 50%+", "4-part AI workflow", "Human-led final review"],
    media: ["Workflow demo", "Before / after process", "System diagram"],
  },
  {
    slug: "youtube-research",
    number: "04",
    code: "YT",
    discipline: "Strategy · Audience Research",
    title: "YouTube Research Engine",
    subtitle: "Ideas scored before production begins.",
    role: "Creative Strategist",
    type: "Research System",
    brief: "Make recurring YouTube ideation more consistent and audience-led.",
    thinking: "Separate signal from noise by tracking competitors, watching emerging patterns, and scoring ideas against a defined persona and objective.",
    contribution: "Designed a repeatable workflow for competitor tracking, trend monitoring, and persona-based idea scoring.",
    outcomes: ["3-part research workflow", "Audience-first scoring", "Repeatable weekly input"],
    media: ["Research dashboard", "Idea scorecard", "Winning concept examples"],
  },
  {
    slug: "content-at-scale",
    number: "05",
    code: "100",
    discipline: "Production · Performance Creative",
    title: "Content at Scale",
    subtitle: "High-volume creative with a system behind every approval.",
    role: "Content Production Manager",
    type: "Creative Operations",
    brief: "Ship a large monthly creative volume without losing consistency, turnaround speed, or ownership.",
    thinking: "Clear briefs, visible review stages, reusable formats, and decisive approvals turn volume into an operating system.",
    contribution: "Led a five-person core team plus freelancers and agencies, owning creative direction and final approvals.",
    outcomes: ["100+ videos / month", "200–300 creatives / month", "5-person core team"],
    media: ["Monthly output reel", "Creative operations board", "Format library"],
  },
  {
    slug: "photo-motion",
    number: "06",
    code: "FM",
    discipline: "Photography · Motion",
    title: "Photography & Motion",
    subtitle: "Brand stories built from the frame outward.",
    role: "Photographer / Motion Designer",
    type: "Selected Visual Work",
    brief: "Create repeatable visual stories for brands across shoots, edits, animation, and campaign delivery.",
    thinking: "Start with the human moment, then use framing, movement, and graphic rhythm to make the message easier to feel and remember.",
    contribution: "Worked across brand, lifestyle, education, interview, event, and recurring campaign production.",
    outcomes: ["4 freelance client brands", "Interview + lifestyle production", "Motion and education formats"],
    media: ["Photography grid", "Motion reel", "Client campaign selection"],
  },
];

const experience = [
  ["2025—NOW", "Physics Wallah", "Content Production Manager", "PW IOI · PW Skills · Bangalore"],
  ["2024—25", "Ze Learning Labb / LLRI", "Video / Graphic Manager", "Campaigns · Social · YouTube · Performance"],
  ["2023—24", "Freelance", "Photographer / Motion Graphics Designer", "DCI India · Useme Works · House of Parvi"],
  ["2022—23", "Transformative Learning Solution", "Photographer / Video Editor", "Skincare · Cosmetics · Education"],
  ["2021—22", "Eugenix Hair Sciences", "Photographer / Video Editor", "Interviews · Lifestyle · Patient Education"],
  ["2021", "Working From Memory", "Assistant Director", "Shoot planning · On-set execution"],
];

const tools = [
  ["PR", "Premiere Pro"], ["AE", "After Effects"], ["PS", "Photoshop"], ["AI", "Illustrator"],
  ["DR", "DaVinci Resolve"], ["FC", "Final Cut Pro"], ["LR", "Lightroom"], ["BL", "Blender"],
  ["CP", "Capture One"], ["ID", "InDesign"], ["MY", "Autodesk Maya"], ["AI+", "AI Production"],
];

const videoSlots = [
  ["01", "PW IOI launch film", "Launch · Creative direction"],
  ["02", "Skillshala growth story", "YouTube · Performance"],
  ["03", "AI workflow demo", "Creative operations · AI"],
  ["04", "Monthly content reel", "Production · Scale"],
  ["05", "Photography & motion reel", "Visual storytelling"],
];

const timelineScenes = [
  { id: "name", label: "YASH KANT TIWARY", start: 0, end: 300, layer: "primary" as LayerId },
  { id: "statement", label: "CREATIVE SYSTEMS THAT PERFORM", start: 300, end: 700, layer: "secondary" as LayerId },
  { id: "disciplines", label: "VIDEO · STRATEGY · AI", start: 700, end: 1050, layer: "secondary" as LayerId },
  { id: "metric", label: "100+ VIDEOS / MONTH", start: 1050, end: 1500, layer: "accent" as LayerId },
];

function formatTimecode(frame: number) {
  const seconds = Math.floor(frame / frameRate);
  const frames = frame % frameRate;
  return "00:00:" + String(seconds).padStart(2, "0") + ":" + String(frames).padStart(2, "0");
}

function layerStyle(setting: LayerSetting) {
  return {
    opacity: setting.visible ? setting.opacity / 100 : 0,
    pointerEvents: setting.visible ? "auto" : "none",
  } as React.CSSProperties;
}

export default function Home() {
  const [layers, setLayers] = useState(initialLayers);
  const [selectedLayer, setSelectedLayer] = useState<LayerId>("primary");
  const [currentFrame, setCurrentFrame] = useState(750);
  const [isPlaying, setIsPlaying] = useState(false);
  const [snap, setSnap] = useState(true);
  const [resolution, setResolution] = useState("1920 × 1080");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const timecode = formatTimecode(currentFrame);
  const activeScene = timelineScenes.find((scene) => currentFrame >= scene.start && currentFrame < scene.end) ?? timelineScenes[timelineScenes.length - 1];
  const waveform = useMemo(
    () => Array.from({ length: 96 }, (_, index) => Math.round(18 + Math.abs(Math.sin(index * 0.47) * 31) + Math.abs(Math.cos(index * 0.19) * 16))),
    [],
  );

  useEffect(() => {
    const updateResolution = () => setResolution(String(window.innerWidth) + " × " + String(window.innerHeight));
    updateResolution();
    window.addEventListener("resize", updateResolution);
    return () => window.removeEventListener("resize", updateResolution);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setCurrentFrame((frame) => {
        if (frame >= maxFrames) {
          setIsPlaying(false);
          return 0;
        }
        return frame + 1;
      });
    }, 1000 / frameRate);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    const openFromHash = () => {
      if (!window.location.hash.startsWith("#case-")) return;
      const slug = window.location.hash.replace("#case-", "");
      const project = projects.find((item) => item.slug === slug);
      if (project) setSelectedProject(project);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dialog-lock", Boolean(selectedProject));
    if (selectedProject) window.setTimeout(() => closeRef.current?.focus(), 20);
    return () => document.body.classList.remove("dialog-lock");
  }, [selectedProject]);

  const updateLayer = (id: LayerId, update: Partial<LayerSetting>) => {
    setLayers((current) => ({ ...current, [id]: { ...current[id], ...update } }));
  };

  const openProject = (project: Project, trigger: HTMLButtonElement) => {
    lastTriggerRef.current = trigger;
    setSelectedProject(project);
    window.history.pushState({}, "", "#case-" + project.slug);
  };

  const closeProject = () => {
    setSelectedProject(null);
    window.history.replaceState({}, "", window.location.pathname + window.location.search);
    window.setTimeout(() => lastTriggerRef.current?.focus(), 20);
  };

  const handleDialogKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeProject();
      return;
    }
    if (event.key !== "Tab" || !dialogRef.current) return;
    const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button, a[href]"));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <>
      <a className="skip-link" href="#work">Skip to selected work</a>

      <section className="studio-shell" id="home" aria-label="Interactive portfolio title sequence">
        <div className="studio-background" style={layerStyle(layers.background)} />

        <header className="studio-topbar" style={layerStyle(layers.ui)}>
          <a className="suite-brand" href="#home" aria-label="Yash Kant Tiwary creative suite, back to top">
            <i aria-hidden="true" />
            <span>Creative Suite</span>
          </a>
          <nav aria-label="Portfolio navigation">
            <a href="#work">Work</a>
            <a href="#profile">Profile</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="top-ruler" aria-hidden="true">
            {[0, 15, 30, 45, 60].map((second) => <span key={second} style={{ left: String((second / 60) * 100) + "%" }}>{second}</span>)}
            <i className="top-playhead" style={{ left: String((currentFrame / maxFrames) * 100) + "%" }} />
          </div>
        </header>

        <div className="composition-stage">
          <div className="stage-grid" style={layerStyle(layers.guides)} aria-hidden="true" />
          <div className="stage-axis axis-x" style={layerStyle(layers.guides)} aria-hidden="true" />
          <div className="stage-axis axis-y" style={layerStyle(layers.guides)} aria-hidden="true" />

          <div className="name-frame" style={layerStyle(layers.primary)}>
            <span className="frame-label">PRIMARY TITLE / 01</span>
            <span className="corner corner-a" aria-hidden="true" />
            <span className="corner corner-b" aria-hidden="true" />
            <span className="corner corner-c" aria-hidden="true" />
            <span className="corner corner-d" aria-hidden="true" />
            <h1><span>YASH KANT</span><span>TIWARY</span></h1>
          </div>

          <div className="stage-copy">
            <div className="statement-frame" style={layerStyle(layers.secondary)}>
              <span className="frame-corner corner-a" aria-hidden="true" />
              <span className="frame-corner corner-d" aria-hidden="true" />
              <p>Creative<br />systems that<br />perform</p>
            </div>
            <div className="discipline-strip" style={layerStyle(layers.secondary)}>
              <span>Video</span><i /> <span>Strategy</span><i /> <span>AI Workflows</span>
            </div>
            <a className="metric-strip" href="#work" style={layerStyle(layers.accent)}>
              <strong>100+ videos / month</strong>
              <span>View selected work ↘</span>
            </a>
          </div>

          <div className="active-sequence" style={layerStyle(layers.ui)}>
            <span>ACTIVE CLIP</span>
            <strong>{activeScene.label}</strong>
          </div>
        </div>

        <aside className="inspector" aria-label="Composition inspector">
          <section className="inspector-panel">
            <header><span>Layers</span><strong>07</strong></header>
            <div className="layer-list">
              {(Object.keys(layers) as LayerId[]).map((id, index) => {
                const layer = layers[id];
                return (
                  <div className={"layer-row " + (selectedLayer === id ? "is-selected" : "")} key={id}>
                    <button
                      className="visibility-toggle"
                      type="button"
                      aria-label={(layer.visible ? "Hide " : "Show ") + layer.label}
                      aria-pressed={layer.visible}
                      onClick={() => updateLayer(id, { visible: !layer.visible })}
                    >
                      <span aria-hidden="true">{layer.visible ? "◉" : "○"}</span>
                    </button>
                    <button className="layer-select" type="button" onClick={() => setSelectedLayer(id)}>
                      <i className={"layer-swatch " + layer.swatch} aria-hidden="true" />
                      <span>{String(index + 1).padStart(2, "0")} {layer.label}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="inspector-panel properties-panel">
            <header><span>Properties</span><strong>{selectedLayer.toUpperCase()}</strong></header>
            <dl>
              <div><dt>Resolution</dt><dd>{resolution}</dd></div>
              <div><dt>Frame rate</dt><dd>25 fps</dd></div>
              <div><dt>Color space</dt><dd>Rec.709</dd></div>
              <div><dt>Duration</dt><dd>00:60:00</dd></div>
            </dl>
            <label className="opacity-control">
              <span>Layer opacity</span>
              <output>{layers[selectedLayer].opacity}%</output>
              <input
                type="range"
                min="0"
                max="100"
                value={layers[selectedLayer].opacity}
                onChange={(event) => updateLayer(selectedLayer, { opacity: Number(event.target.value) })}
              />
            </label>
            <div className="property-toggles">
              <button type="button" aria-pressed={layers.guides.visible} onClick={() => updateLayer("guides", { visible: !layers.guides.visible })}>
                <span>Guides</span><strong>{layers.guides.visible ? "ON" : "OFF"}</strong>
              </button>
              <button type="button" aria-pressed={snap} onClick={() => setSnap((current) => !current)}>
                <span>Snap</span><strong>{snap ? "ON" : "OFF"}</strong>
              </button>
            </div>
          </section>
        </aside>

        <section className="timeline-editor" aria-label="Interactive title sequence timeline" style={layerStyle(layers.timeline)}>
          <header className="timeline-toolbar">
            <div>
              <strong>{timecode}</strong>
              <span>SEQUENCE 01 · PORTFOLIO OPEN</span>
            </div>
            <div className="playback-controls">
              <button type="button" onClick={() => setCurrentFrame(0)} aria-label="Go to sequence start">|◀</button>
              <button className="play-button" type="button" onClick={() => setIsPlaying((current) => !current)} aria-label={isPlaying ? "Pause sequence" : "Play sequence"}>
                {isPlaying ? "Ⅱ" : "▶"}
              </button>
              <button type="button" onClick={() => setCurrentFrame(maxFrames)} aria-label="Go to sequence end">▶|</button>
            </div>
            <span>25 FPS · {snap ? "SNAP ON" : "SNAP OFF"}</span>
          </header>

          <div className="timeline-ruler-row">
            <div className="track-spacer">TRACKS</div>
            <div className="timeline-ruler">
              {[0, 10, 20, 30, 40, 50, 60].map((second) => <span key={second} style={{ left: String((second / 60) * 100) + "%" }}>00:{String(second).padStart(2, "0")}</span>)}
            </div>
          </div>

          <div className="timeline-body">
            <div className="track-labels" aria-hidden="true">
              <span>V3 <b>GRAPHICS</b></span>
              <span>V2 <b>VIDEO</b></span>
              <span>V1 <b>FOOTAGE</b></span>
              <span>A1 <b>AUDIO</b></span>
              <span>A2 <b>MUSIC</b></span>
            </div>
            <div className="tracks-canvas">
              <div className="graphic-track">
                {timelineScenes.map((scene) => (
                  <button
                    type="button"
                    key={scene.id}
                    className={activeScene.id === scene.id ? "is-active" : ""}
                    style={{ left: String((scene.start / maxFrames) * 100) + "%", width: String(((scene.end - scene.start) / maxFrames) * 100) + "%" }}
                    onClick={() => {
                      setCurrentFrame(scene.start);
                      setSelectedLayer(scene.layer);
                    }}
                  >
                    <i aria-hidden="true">T</i><span>{scene.label}</span>
                  </button>
                ))}
              </div>
              <div className="video-track"><i style={{ left: "2%", width: "20%" }} /><i style={{ left: "24%", width: "36%" }} /><i style={{ left: "70%", width: "11%" }} /><i style={{ left: "86%", width: "12%" }} /></div>
              <div className="footage-track"><i style={{ left: "0%", width: "13%" }} /><i style={{ left: "14%", width: "12%" }} /><i style={{ left: "28%", width: "10%" }} /><i style={{ left: "52%", width: "17%" }} /><i style={{ left: "74%", width: "21%" }} /></div>
              <div className="audio-track">{waveform.map((height, index) => <i key={index} style={{ height: String(height) + "%" }} />)}</div>
              <div className="audio-track music-track">{waveform.slice().reverse().map((height, index) => <i key={index} style={{ height: String(Math.max(12, height - 8)) + "%" }} />)}</div>
              <div className="timeline-playhead" style={{ left: String((currentFrame / maxFrames) * 100) + "%" }} aria-hidden="true"><i /></div>
              <input
                className="timeline-scrubber"
                type="range"
                min="0"
                max={maxFrames}
                step={snap ? frameRate : 1}
                value={currentFrame}
                aria-label="Sequence playhead"
                onChange={(event) => {
                  setIsPlaying(false);
                  setCurrentFrame(Number(event.target.value));
                }}
              />
            </div>
          </div>
        </section>
      </section>

      <main id="work">
        <section className="content-section work-section">
          <header className="section-intro">
            <span>01 / Selected work</span>
            <h2>Systems, campaigns<br />and production at scale.</h2>
            <p>Six case-study structures built from verified résumé details. Open any sequence to inspect the brief, approach, contribution, outcomes, and final-media slots.</p>
          </header>
          <div className="project-index">
            {projects.map((project) => (
              <button className="project-row" type="button" key={project.slug} onClick={(event) => openProject(project, event.currentTarget)}>
                <span className="project-number">{project.number}</span>
                <span className="project-code" aria-hidden="true">{project.code}</span>
                <span className="project-name"><strong>{project.title}</strong><small>{project.subtitle}</small></span>
                <span className="project-discipline">{project.discipline}</span>
                <span className="project-arrow">↗</span>
              </button>
            ))}
          </div>
        </section>

        <section className="content-section profile-section" id="profile">
          <header className="section-intro compact">
            <span>02 / Profile</span>
            <h2>Creative judgement.<br />Operational discipline.</h2>
          </header>
          <div className="profile-grid">
            <div className="profile-statement">
              <strong>04+</strong><span>Years building video-led creative systems</span>
            </div>
            <div className="profile-copy">
              <p>I’m a Creative Producer and Strategist who turns brand and launch goals into videos, campaigns, and content systems audiences respond to.</p>
              <p>At Physics Wallah, I lead a core team of designers and editors while shipping high-volume work across YouTube, launches, webinars, events, web, and paid-campaign support.</p>
              <p>AI removes repetitive production work. Audience insight, taste, story, and final creative judgement remain human.</p>
            </div>
          </div>
          <div className="metric-grid">
            <div><strong>100+</strong><span>Videos / month at peak</span></div>
            <div><strong>200–300</strong><span>Campaign creatives / month</span></div>
            <div><strong>05</strong><span>Core team members led</span></div>
            <div><strong>50%+</strong><span>Faster turnaround</span></div>
          </div>
        </section>

        <section className="content-section experience-section" id="experience">
          <header className="section-intro compact">
            <span>03 / Experience</span>
            <h2>The production timeline.</h2>
          </header>
          <div className="career-list">
            {experience.map(([period, company, role, detail], index) => (
              <article key={company}>
                <span>V{String(experience.length - index).padStart(2, "0")}</span>
                <time>{period}</time>
                <h3>{company}</h3>
                <p>{role}</p>
                <small>{detail}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section films-section" id="films">
          <header className="section-intro">
            <span>04 / Film slots</span>
            <h2>Designed for the work<br />that belongs in motion.</h2>
            <p>These are honest production placeholders—not fake players. Each frame is ready for an approved YouTube or Vimeo embed when the final URLs are available.</p>
          </header>
          <div className="video-slot-grid">
            {videoSlots.map(([number, title, meta]) => (
              <article className="video-slot" key={number}>
                <div className="video-frame">
                  <span>{number}</span>
                  <i aria-hidden="true" />
                  <strong>16:9</strong>
                  <small>AWAITING APPROVED EMBED URL</small>
                </div>
                <footer><strong>{title}</strong><span>{meta}</span></footer>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section toolkit-section">
          <header className="section-intro compact">
            <span>05 / Toolkit</span>
            <h2>The creative stack.</h2>
          </header>
          <div className="tool-list">
            {tools.map(([short, name]) => <div key={name}><strong>{short}</strong><span>{name}</span></div>)}
          </div>
          <div className="education-grid">
            <article><span>2024—26</span><h3>MBA in Marketing</h3><p>Symbiosis Institute of Management Studies</p></article>
            <article><span>2017—20</span><h3>BFA Photography</h3><p>Indian Institute of Photography</p></article>
            <article><span>VOLUNTEERING</span><h3>Smile Foundation</h3><p>Volunteer photographer · SIFFCY Film Festival</p></article>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <span>06 / Contact</span>
          <h2>Build creative<br />worth measuring.</h2>
          <div className="contact-grid">
            <p>Open to creative production, creative strategy, campaign, content, and AI-enabled workflow opportunities.</p>
            <div>
              <a href="mailto:Yashkanttiwary@gmail.com">Yashkanttiwary@gmail.com ↗</a>
              <a href="tel:+918383069094">+91 8383069094</a>
              <a href={resumeUrl} download>Download résumé ↓</a>
            </div>
          </div>
          <footer><span>Bangalore, India</span><span>© 2026 Yash Kant Tiwary</span><strong>END / 00:60:00</strong></footer>
        </section>
      </main>

      {selectedProject && (
        <div className="case-overlay" role="dialog" aria-modal="true" aria-labelledby="case-title" onKeyDown={handleDialogKeyDown} onMouseDown={(event) => { if (event.target === event.currentTarget) closeProject(); }}>
          <div className="case-window" ref={dialogRef}>
            <header className="case-topbar">
              <span>SEQUENCE_{selectedProject.number} / {selectedProject.slug.toUpperCase()}</span>
              <span>{selectedProject.discipline}</span>
              <button ref={closeRef} type="button" onClick={closeProject}>CLOSE ×</button>
            </header>
            <div className="case-title-block">
              <span>{selectedProject.number} / CASE STUDY</span>
              <h2 id="case-title">{selectedProject.title}</h2>
              <p>{selectedProject.subtitle}</p>
              <dl>
                <div><dt>Role</dt><dd>{selectedProject.role}</dd></div>
                <div><dt>Type</dt><dd>{selectedProject.type}</dd></div>
              </dl>
            </div>
            <div className="case-narrative">
              <article><span>01 / Brief</span><h3>The assignment</h3><p>{selectedProject.brief}</p></article>
              <article><span>02 / Thinking</span><h3>The operating idea</h3><p>{selectedProject.thinking}</p></article>
              <article><span>03 / Contribution</span><h3>What I owned</h3><p>{selectedProject.contribution}</p></article>
            </div>
            <div className="case-outcomes">
              <span>04 / Outcomes</span>
              {selectedProject.outcomes.map((outcome) => <strong key={outcome}>{outcome}</strong>)}
            </div>
            <div className="case-media">
              <header><span>05 / Final media</span><p>Structured slots ready for approved images, videos, links, credits, and exact campaign metrics.</p></header>
              {selectedProject.media.map((item, index) => (
                <figure key={item}>
                  <div><span>{String(index + 1).padStart(2, "0")}</span><i /></div>
                  <figcaption><strong>{item}</strong><small>MEDIA SLOT / PENDING FINAL ASSET</small></figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
