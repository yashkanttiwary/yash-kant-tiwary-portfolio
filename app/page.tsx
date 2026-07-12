"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Project = {
  slug: string;
  layer: string;
  discipline: string;
  title: string;
  subtitle: string;
  thesis: string;
  role: string;
  type: string;
  brief: string;
  thinking: string;
  contribution: string;
  outcomes: string[];
  placeholderLabels: string[];
};

const projects: Project[] = [
  {
    slug: "pw-ioi-launch",
    layer: "01",
    discipline: "Launch · Creative Direction",
    title: "PW IOI MBA Launch",
    subtitle: "Six content streams. One live launch system.",
    thesis: "Turning a high-stakes education launch into a coherent live and digital experience.",
    role: "Creative Production Lead",
    type: "Launch Campaign",
    brief: "Build the creative system for the PW IOI MBA launch in Bangalore across event branding, social, YouTube Live, stage design, banners, and event flow.",
    thinking: "Treat every touchpoint as part of one launch story: the audience should recognize the same promise from the first thumbnail to the live stage.",
    contribution: "Owned briefs, creative direction, review cycles, team coordination, and final approvals across six content streams.",
    outcomes: ["6 connected content streams", "Live + digital launch coverage", "Team and agency coordination"],
    placeholderLabels: ["Launch film", "Stage & event branding", "Social campaign carousel"],
  },
  {
    slug: "skillshala-engine",
    layer: "02",
    discipline: "Growth · YouTube · Launch",
    title: "Skillshala Content Engine",
    subtitle: "Content built to move people from interest to attendance.",
    thesis: "A video-led launch engine connecting audience insight, creative formats, and measurable conversion.",
    role: "Creative Producer",
    type: "Growth Content System",
    brief: "Create the launch and live-content engine for Skillshala across YouTube and supporting campaign surfaces.",
    thinking: "Design every asset for a job in the funnel: hook attention, explain the promise, reduce doubt, and create a reason to register.",
    contribution: "Directed launch content, YouTube assets, creative variants, live support, and the production workflow behind the campaign.",
    outcomes: ["700+ registrations", "400 attendees", "30K YouTube views"],
    placeholderLabels: ["Hero launch video", "Performance creative set", "Results dashboard"],
  },
  {
    slug: "ai-workflow",
    layer: "03",
    discipline: "AI · Creative Operations",
    title: "AI Production Workflow",
    subtitle: "Faster execution without outsourcing the thinking.",
    thesis: "A four-part production assistant for footage analysis, B-roll, highlights, and music cues.",
    role: "Workflow Designer",
    type: "AI Creative Operations",
    brief: "Reduce repetitive review and planning work while protecting creative judgment and final quality.",
    thinking: "Use AI as an execution multiplier: automate the mechanical search and organization so people spend more time on story, pacing, and craft.",
    contribution: "Designed the workflow, integrated it into review and planning, and built adoption around real production tasks.",
    outcomes: ["Turnaround cut from 1–1.5 days to ~0.5 day", "4-part AI workflow", "Human-led final review"],
    placeholderLabels: ["Workflow demo", "Before / after process", "System diagram"],
  },
  {
    slug: "youtube-research",
    layer: "04",
    discipline: "Strategy · Audience Research",
    title: "YouTube Research Engine",
    subtitle: "Ideas scored before production begins.",
    thesis: "A repeatable way to connect competitor signals, trends, and audience personas to stronger content bets.",
    role: "Creative Strategist",
    type: "Research System",
    brief: "Make ideation more consistent and audience-led across recurring YouTube production.",
    thinking: "Separate signals from noise: track competitors, watch emerging patterns, then score ideas against a specific persona and content objective.",
    contribution: "Designed a three-part workflow for competitor tracking, trend monitoring, and persona-based idea scoring.",
    outcomes: ["3-part research workflow", "Audience-first idea scoring", "Repeatable weekly input"],
    placeholderLabels: ["Research dashboard", "Idea scorecard", "Winning concept examples"],
  },
  {
    slug: "content-at-scale",
    layer: "05",
    discipline: "Production · Performance Creative",
    title: "Content at Scale",
    subtitle: "High-volume creative, with a system behind every approval.",
    thesis: "A production operating model for videos, campaigns, webinars, events, web, and paid support.",
    role: "Content Production Manager",
    type: "Creative Operations",
    brief: "Ship a large monthly creative volume without losing consistency, turnaround speed, or ownership.",
    thinking: "Clear briefs, visible review stages, reusable formats, and decisive approvals turn volume into a system instead of a fire drill.",
    contribution: "Led a five-person core team plus freelancers and agencies, owning creative direction and final approvals.",
    outcomes: ["100+ videos / month at peak", "200–300 creatives / month", "5-person core creative team"],
    placeholderLabels: ["Monthly output reel", "Creative operations board", "Format library"],
  },
  {
    slug: "photo-motion",
    layer: "06",
    discipline: "Photography · Motion",
    title: "Photography & Motion",
    subtitle: "Brand stories built from the frame outward.",
    thesis: "Selected photography, motion design, interviews, lifestyle, education, and campaign work.",
    role: "Photographer / Motion Designer",
    type: "Selected Visual Work",
    brief: "Create useful, repeatable visual stories for brands across shoots, edits, animation, and campaign delivery.",
    thinking: "Start with the human moment, then use framing, movement, and graphic rhythm to make the message easier to feel and remember.",
    contribution: "Worked across DCI India, Useme Works, House of Parvi, Transformative Learning Solution, Eugenix Hair Sciences, and community organizations.",
    outcomes: ["4 freelance client brands", "Interview + lifestyle production", "Motion and recurring education formats"],
    placeholderLabels: ["Photography grid", "Motion reel", "Client campaign selection"],
  },
];

const films = [
  { title: "PW IOI Launch Film", meta: "Launch · Creative Direction" },
  { title: "Skillshala Growth Story", meta: "YouTube · Performance Content" },
  { title: "AI Workflow Demo", meta: "Creative Operations · AI" },
  { title: "Monthly Content Reel", meta: "Production · Scale" },
  { title: "Photography & Motion Reel", meta: "Visual Storytelling" },
];

const experience = [
  { marker: "V6 · 25–now", company: "Physics Wallah", role: "Content Production Manager", detail: "PW IOI · PW Skills · Bangalore" },
  { marker: "V5 · 24–25", company: "Ze Learning Labb / LLRI", role: "Video / Graphic Manager", detail: "Campaigns · Social · YouTube · Performance" },
  { marker: "V4 · 23–24", company: "Freelance", role: "Photographer / Motion Graphics Designer", detail: "DCI India · Useme Works · House of Parvi" },
  { marker: "V3 · 22–23", company: "Transformative Learning Solution", role: "Photographer / Video Editor", detail: "Skincare · Cosmetics · Education" },
  { marker: "V2 · 21–22", company: "Eugenix Hair Sciences", role: "Photographer / Video Editor", detail: "Interviews · Lifestyle · Patient Education" },
  { marker: "V1 · 21", company: "Working From Memory", role: "Assistant Director", detail: "Shoot planning · On-set execution" },
];

const tools = [
  ["Pr", "Premiere Pro", "Edit · Sequence"],
  ["Ae", "After Effects", "Motion · Compositing"],
  ["Ps", "Photoshop", "Design · Retouch"],
  ["Ai", "Illustrator", "Vector · Systems"],
  ["Dr", "DaVinci Resolve", "Edit · Grade"],
  ["Fc", "Final Cut Pro", "Fast-turn Edit"],
  ["Lr", "Lightroom", "Photography · Grade"],
  ["Bl", "Blender", "3D · Experiments"],
  ["Cp", "Capture One", "Tether · Colour"],
  ["Id", "InDesign", "Layout · Documents"],
  ["My", "Autodesk Maya", "3D · Motion"],
  ["AI", "AI Production", "Script · Review · Edit"],
];

const sectionLabels = [
  ["00", "Cover", "hero"],
  ["01", "About", "about"],
  ["02", "Work", "work"],
  ["03", "Films", "films"],
  ["04", "Experience", "experience"],
  ["05", "Proof", "proof"],
  ["06", "Toolkit", "toolkit"],
  ["07", "Contact", "contact"],
];

const accentOptions = ["#00e5b0", "#ff3f8e", "#2f80ff", "#ff8a2a", "#7c3aed", "#e4002b", "#00c2d1", "#ffd23f"];

export default function Home() {
  const [bootProgress, setBootProgress] = useState(0);
  const [booted, setBooted] = useState(false);
  const [accent, setAccent] = useState("#00e5b0");
  const [accentOpen, setAccentOpen] = useState(false);
  const [activeTool, setActiveTool] = useState("cursor");
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [playingFilm, setPlayingFilm] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const timecode = useMemo(() => {
    const totalFrames = Math.round(scrollProgress * 24 * 88);
    const seconds = Math.floor(totalFrames / 24);
    const frames = totalFrames % 24;
    return `00:00:${String(seconds).padStart(2, "0")}:${String(frames).padStart(2, "0")}`;
  }, [scrollProgress]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setBootProgress(100);
      setBooted(true);
      return;
    }
    const timer = window.setInterval(() => {
      setBootProgress((current) => {
        const next = Math.min(100, current + 2);
        if (next === 100) {
          window.clearInterval(timer);
          window.setTimeout(() => setBooted(true), 350);
        }
        return next;
      });
    }, 24);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const storedAccent = window.localStorage.getItem("yash-portfolio-accent");
    if (storedAccent && /^#[0-9a-f]{6}$/i.test(storedAccent)) setAccent(storedAccent);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", accent);
    window.localStorage.setItem("yash-portfolio-accent", accent);
  }, [accent]);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      const marker = window.scrollY + window.innerHeight * 0.42;
      let current = "hero";
      for (const [, , id] of sectionLabels) {
        const section = document.getElementById(id);
        if (section && marker >= section.offsetTop) current = id;
      }
      setActiveSection(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const openFromHash = () => {
      const slug = window.location.hash.replace("#case-", "");
      if (!window.location.hash.startsWith("#case-")) return;
      const project = projects.find((item) => item.slug === slug);
      if (project) setSelectedProject(project);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("case-lock", Boolean(selectedProject));
    if (selectedProject) window.setTimeout(() => closeRef.current?.focus(), 30);
    return () => document.body.classList.remove("case-lock");
  }, [selectedProject]);

  const openProject = (project: Project, trigger: HTMLButtonElement) => {
    lastTriggerRef.current = trigger;
    setSelectedProject(project);
    window.history.pushState({}, "", `#case-${project.slug}`);
  };

  const closeProject = () => {
    setSelectedProject(null);
    window.history.replaceState({}, "", `${window.location.pathname}${window.location.search}`);
    window.setTimeout(() => lastTriggerRef.current?.focus(), 30);
  };

  const nextProject = () => {
    if (!selectedProject) return;
    const index = projects.findIndex((item) => item.slug === selectedProject.slug);
    const next = projects[(index + 1) % projects.length];
    setSelectedProject(next);
    window.history.replaceState({}, "", `#case-${next.slug}`);
    dialogRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDialogKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeProject();
      return;
    }
    if (event.key !== "Tab" || !dialogRef.current) return;
    const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button, a[href], input"));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const applyCustomAccent = (value: string) => {
    if (/^#[0-9a-f]{6}$/i.test(value)) setAccent(value);
  };

  const completedSteps = Math.floor(bootProgress / 25);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to portfolio</a>
      <div className={`boot-screen ${booted ? "is-done" : ""}`} aria-hidden={booted}>
        <div className="boot-brand"><span>Yk</span><strong>Yash Kant Tiwary</strong><small>Creative System · Portfolio Edition 2026</small></div>
        <div className="boot-progress"><span>{bootProgress < 100 ? "Initializing creative workspace…" : "Ready."}</span><strong>{bootProgress}%</strong><i style={{ width: `${bootProgress}%` }} /></div>
        <ul>
          {["Loading video production timeline", "Calibrating audience signals", "Connecting AI workflow modules", "Importing selected impact"].map((step, index) => <li key={step}>{index < completedSteps ? "✓" : "•"} {step}</li>)}
        </ul>
        <button type="button" onClick={() => { setBootProgress(100); setBooted(true); }}>Skip intro</button>
      </div>

      <header className="menubar">
        <a className="mark" href="#hero" aria-label="Yash Kant Tiwary, back to top">Yk</a>
        <nav aria-label="Primary navigation">
          <a href="#about">About</a><a href="#work">Work</a><a href="#experience">Experience</a><a href="#toolkit">Toolkit</a><a href="#contact">Contact</a>
        </nav>
        <div className="availability"><i /> Available for creative leadership roles</div>
      </header>

      <aside className="toolrail" aria-label="Creative tools">
        {[
          ["cursor", "↖", "Cursor"], ["move", "✣", "Move"], ["marquee", "□", "Marquee"], ["lasso", "⌁", "Lasso"],
          ["crop", "⌗", "Crop"], ["brush", "╱", "Brush"], ["type", "T", "Type"], ["pen", "⌄", "Pen"],
        ].map(([id, icon, label]) => (
          <button key={id} type="button" aria-label={`Select ${label} tool`} aria-pressed={activeTool === id} className={activeTool === id ? "is-active" : ""} onClick={() => setActiveTool(id)}>
            <span aria-hidden="true">{icon}</span>
          </button>
        ))}
        <button className="swatch" type="button" aria-label="Choose accent colour" aria-expanded={accentOpen} onClick={() => setAccentOpen((open) => !open)}><span style={{ background: accent }} /></button>
      </aside>

      <div className={`accent-picker ${accentOpen ? "is-open" : ""}`} role="dialog" aria-label="Accent colour">
        <div><span>Accent</span><strong>{accent.toUpperCase()}</strong></div>
        <div className="accent-grid">
          {accentOptions.map((color) => <button key={color} type="button" aria-label={`Use ${color}`} aria-pressed={accent === color} style={{ background: color }} onClick={() => setAccent(color)} />)}
        </div>
        <label>Custom<input defaultValue={accent} onBlur={(event) => applyCustomAccent(event.target.value)} aria-label="Custom hex accent" /></label>
      </div>

      <aside className="layers" aria-label="Portfolio sections">
        <div className="layers-title"><span>Layers</span><strong>08</strong></div>
        <ol>
          {sectionLabels.map(([number, label, id]) => <li key={id} className={activeSection === id ? "is-active" : ""}><a href={`#${id}`}><i />{number} · {label}</a></li>)}
        </ol>
        <div className="opacity"><span>Opacity</span><strong>{Math.round(100 - scrollProgress * 22)}%</strong></div>
      </aside>

      <main id="main-content">
        <section id="hero" className="hero">
          <div className="hero-inner">
            <div className="chips"><span>Creative Producer</span><span>Strategy · Video · AI</span><span>Bangalore, India</span></div>
            <h1><span>YASH</span><span className="accent-line">KANT</span><span>TIWARY</span></h1>
            <p className="hero-tagline">I build <em>creative systems that perform</em> — turning audience insight, production craft, and AI-assisted workflows into videos and campaigns that ship at scale.</p>
            <div className="hero-actions"><a className="button primary" href="#work">View selected work</a><a className="button" href="/Yash_Kant_Tiwary_Resume.pdf" download>Download résumé</a></div>
            <div className="scroll-cue"><span>Scroll to scrub the production timeline</span><i /></div>
            <div className="format-meta"><span>100+ videos / month</span><span>200–300 creatives</span><span>Layer 0 · Cover</span><span>@yashkanttiwary</span></div>
          </div>
        </section>

        <section id="about" className="section about">
          <div className="section-label"><strong>01</strong><span>About</span></div>
          <div className="about-grid">
            <div className="portrait-placeholder">
              <div className="portrait-monogram">YKT</div>
              <span>Portrait placeholder</span><small>Add a transparent cut-out or editorial portrait</small>
              <div className="file-label">yash_portrait.png</div>
            </div>
            <div className="about-copy">
              <h2>Ideas are useful.<br />Systems make them <em>repeatable.</em></h2>
              <p>I’m a Creative Producer and Creative Strategist with 4+ years turning brand and launch goals into videos, campaigns, and content systems audiences respond to.</p>
              <p>At Physics Wallah, I lead a core team of designers and editors while shipping high-volume work across YouTube, launches, webinars, events, web, and paid-campaign support.</p>
              <p>I use AI to remove repetitive production work — not replace audience insight, taste, story, or final creative judgment.</p>
              <div className="stats"><div><strong>4+ yrs</strong><span>Creative production</span></div><div><strong>5</strong><span>Core team members</span></div><div><strong>50%+</strong><span>Faster turnaround</span></div></div>
            </div>
          </div>
        </section>

        <section id="work" className="section work">
          <SectionHeading number="02" label="Work" title="Selected Systems & Campaigns" intro="Six working case-study slots. Open one to step inside the file." />
          <div className="work-grid">
            {projects.map((project, index) => (
              <button key={project.slug} type="button" className={`project-card project-card-${index + 1}`} onClick={(event) => openProject(project, event.currentTarget)}>
                <div className="project-art" aria-hidden="true"><span>{project.layer}</span><i /><b>{project.title.slice(0, 2).toUpperCase()}</b></div>
                <div className="project-meta"><span>Layer {project.layer}</span><span>{project.discipline}</span></div>
                <div className="project-title"><div><h3>{project.title}</h3><p>{project.subtitle}</p></div><strong>Open case ↗</strong></div>
              </button>
            ))}
          </div>
        </section>

        <section id="films" className="section films">
          <SectionHeading number="03" label="Films" title="Video-Led Work" intro="Five ready-to-fill embed slots for launch films, reels, demos, and campaign stories." />
          <div className="film-grid">
            {films.map((film, index) => (
              <article className="film-card" key={film.title}>
                {playingFilm === index ? (
                  <div className="video-pending"><div className="embed-code">&lt;iframe /&gt;</div><strong>Add the final YouTube or Vimeo URL</strong><p>This responsive 16:9 area is ready for the real embed.</p><button type="button" onClick={() => setPlayingFilm(null)}>Return to cover</button></div>
                ) : (
                  <div className={`film-cover film-cover-${index + 1}`}><button type="button" aria-label={`Preview video slot: ${film.title}`} onClick={() => setPlayingFilm(index)}><span>▶</span></button><i>VIDEO SLOT {String(index + 1).padStart(2, "0")}</i></div>
                )}
                <div className="film-caption"><strong>{film.title}</strong><span>{film.meta}</span></div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="section experience">
          <SectionHeading number="04" label="Experience" title="The Production Timeline" intro="Where the briefs, teams, frames, and systems came together." />
          <div className="timeline">
            <div className="timeline-ruler">{["00:00", "00:04", "00:08", "00:12", "00:16", "00:20"].map((time) => <span key={time}>{time}</span>)}</div>
            <div className="timeline-track">
              {experience.map((item, index) => <div className="timeline-item" key={item.marker}><span>{item.marker}</span><div><i style={{ background: index === 0 ? accent : undefined }} /><strong>{item.company}</strong><p>{item.role}</p><small>{item.detail}</small></div></div>)}
            </div>
          </div>
        </section>

        <section id="proof" className="section proof">
          <SectionHeading number="05" label="Proof" title="Outcomes & Foundations" intro="Measured impact, formal learning, and the communities behind the craft." />
          <div className="proof-grid">
            <div className="proof-panel"><h3>▸ Production impact</h3><ul><li><strong>100+ videos</strong><span>Monthly output at peak</span></li><li><strong>200–300 creatives</strong><span>Monthly campaign volume</span></li><li><strong>1,000+ subscribers</strong><span>Growth on one channel</span></li><li><strong>50K+ views</strong><span>One channel’s content performance</span></li><li><strong>700+ registrations</strong><span>Skillshala launch engine</span></li></ul></div>
            <div className="proof-panel"><h3>▸ Education</h3><ul><li><strong>MBA in Marketing</strong><span>Symbiosis Institute of Management Studies · 2024–26</span></li><li><strong>BFA Photography</strong><span>Indian Institute of Photography · 2017–20</span></li></ul><h3 className="subhead">▸ Volunteering</h3><ul><li><strong>Smile Foundation</strong><span>Volunteer photographer · SIFFCY Film Festival</span></li><li><strong>Akhil Bhartiya Vidvat Goshthi</strong><span>Motion graphics & event coverage</span></li></ul></div>
          </div>
        </section>

        <section id="toolkit" className="section toolkit">
          <SectionHeading number="06" label="Toolkit" title="The Creative Stack" intro="The applications I think, make, review, and ship in." />
          <div className="tool-grid">{tools.map(([short, name, use]) => <div className="tool-card" key={name}><strong>{short}</strong><h3>{name}</h3><p>{use}</p><i /></div>)}</div>
        </section>

        <section id="contact" className="section contact">
          <div className="section-label"><strong>07</strong><span>Contact</span></div>
          <h2>Let’s build creative<br />worth <em>measuring.</em></h2>
          <p>Open to creative production, creative strategy, campaign, content, and AI-enabled workflow opportunities.</p>
          <p className="contact-line">Bangalore, India · <a href="mailto:Yashkanttiwary@gmail.com">Yashkanttiwary@gmail.com</a> · <a href="tel:+918383069094">+91 8383069094</a></p>
          <div className="contact-actions"><a className="button primary" href="mailto:Yashkanttiwary@gmail.com">Start a conversation</a><a className="button" href="/Yash_Kant_Tiwary_Resume.pdf" download>Export résumé</a></div>
          <div className="social-slots"><div><strong>LinkedIn</strong><span>Add profile URL</span></div><div><strong>Behance</strong><span>Add portfolio URL</span></div><div><strong>Video portfolio</strong><span>Add reel URL</span></div></div>
          <footer><span>© 2026 Yash Kant Tiwary</span><span>Produced in Premiere · Strategised in research · Accelerated with AI</span><strong>{timecode}</strong></footer>
        </section>
      </main>

      <div className="transport" aria-label="Portfolio timeline status"><span>{timecode}</span><div className="transport-line"><i style={{ left: `${scrollProgress * 100}%` }} /></div><span>{activeTool} tool</span><span>24 fps</span></div>

      {selectedProject && (
        <div className="case-overlay" role="dialog" aria-modal="true" aria-labelledby="case-title" onKeyDown={handleDialogKeyDown}>
          <div className="case-dialog" ref={dialogRef}>
            <div className="case-bar"><span>{selectedProject.slug.replaceAll("-", "_")}.project</span><span>{selectedProject.discipline}</span><button ref={closeRef} type="button" onClick={closeProject}>Close ✕</button></div>
            <div className="case-content">
              <header className="case-hero"><div><span>Project {selectedProject.layer}</span><h2 id="case-title">{selectedProject.title}</h2><p>{selectedProject.subtitle}</p><blockquote>{selectedProject.thesis}</blockquote></div><dl><div><dt>Role</dt><dd>{selectedProject.role}</dd></div><div><dt>Type</dt><dd>{selectedProject.type}</dd></div><div><dt>Discipline</dt><dd>{selectedProject.discipline}</dd></div></dl></header>
              <div className="case-sections"><article><span>Brief</span><h3>The brief</h3><p>{selectedProject.brief}</p></article><article><span>Thinking</span><h3>The thinking</h3><p>{selectedProject.thinking}</p></article><article><span>My role</span><h3>What I did</h3><p>{selectedProject.contribution}</p></article></div>
              <div className="case-outcomes"><span>Selected outcomes</span>{selectedProject.outcomes.map((outcome) => <strong key={outcome}>{outcome}</strong>)}</div>
              <div className="case-gallery"><span>Gallery · ready for final media</span>{selectedProject.placeholderLabels.map((label, index) => <figure key={label}><div><b>{String(index + 1).padStart(2, "0")}</b><i /></div><figcaption>{label}<small>Add approved image, video, or process artifact</small></figcaption></figure>)}</div>
              <div className="case-footer"><div><strong>Missing for final case study</strong><span>Approved media · exact credits · live links · final metrics</span></div><button type="button" onClick={nextProject}>Next project ↦</button></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SectionHeading({ number, label, title, intro }: { number: string; label: string; title: string; intro: string }) {
  return <header className="section-heading"><div className="section-label"><strong>{number}</strong><span>{label}</span></div><div><h2>{title}</h2><p>{intro}</p></div></header>;
}
