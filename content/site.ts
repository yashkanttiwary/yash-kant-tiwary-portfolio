export type MediaCredit = {
  provider: "Mixkit" | "Pexels";
  creator: string;
  sourceUrl: string;
  licenseUrl: string;
};

export type Media = {
  kind: "video" | "image";
  src: string | null;
  poster?: string | null;
  ratio: "16:9" | "4:5" | "3:2" | "1:1";
  alt: string;
  expected: string;
  blurDataURL?: string;
  mimeType?: string;
  captionSrc?: string;
  demo?: boolean;
  credit?: MediaCredit;
};

export type Stat = { value: string; label: string };

export type CaseStudy = {
  id: string;
  title: string;
  challenge: string;
  execution: string;
  result: string;
  stats: [Stat, Stat, Stat];
  media: Media;
  fullPiece?: Media | null;
};

export type TimelineNode = { label: string; year: string };

const pexelsLicense = "https://www.pexels.com/license/";
const mixkitLicense = "https://mixkit.co/license/#videoFree";

const heroReel: Media = {
  kind: "video",
  src: "/media/hero-loop.mp4",
  poster: "/media/hero-poster.jpg",
  ratio: "16:9",
  alt: "A filmmaker setting up a camera in a color-lit studio",
  expected: "hero-loop.mp4",
  mimeType: "video/mp4",
  demo: true,
  credit: {
    provider: "Mixkit",
    creator: "Mixkit contributor",
    sourceUrl: "https://mixkit.co/free-stock-video/young-man-recording-with-a-camera-on-a-set-44069/",
    licenseUrl: mixkitLicense,
  },
};

const caseMedia = {
  mbaLaunch: {
    kind: "image",
    src: "/media/case-mba-launch.webp",
    ratio: "16:9",
    alt: "A professional camera crew filming a live event under magenta stage lights",
    expected: "case-mba-launch.webp",
    demo: true,
    credit: {
      provider: "Pexels",
      creator: "Caleb Oquendo",
      sourceUrl: "https://www.pexels.com/photo/live-event-production-with-professional-cameracrew-34476056/",
      licenseUrl: pexelsLicense,
    },
  },
  skillshala: {
    kind: "image",
    src: "/media/case-skillshala.webp",
    ratio: "4:5",
    alt: "A film crew preparing a studio camera and production plan",
    expected: "case-skillshala.webp",
    demo: true,
    credit: {
      provider: "Pexels",
      creator: "AMORIE SAM",
      sourceUrl: "https://www.pexels.com/photo/film-crew-setting-up-camera-in-studio-30481729/",
      licenseUrl: pexelsLicense,
    },
  },
  unfairAdvantage: {
    kind: "image",
    src: "/media/case-unfair-advantage.webp",
    ratio: "16:9",
    alt: "Defocused event lights forming a vivid campaign-like field of color",
    expected: "case-unfair-advantage.webp",
    demo: true,
    credit: {
      provider: "Pexels",
      creator: "Luis Quintero",
      sourceUrl: "https://www.pexels.com/photo/defocused-photo-of-the-stage-and-lights-18482972/",
      licenseUrl: pexelsLicense,
    },
  },
  youtubeChannels: {
    kind: "image",
    src: "/media/case-youtube-channels.webp",
    ratio: "16:9",
    alt: "A creator working at a color-grading and video-editing desk",
    expected: "case-youtube-channels.webp",
    demo: true,
    credit: {
      provider: "Pexels",
      creator: "Amir Abbaspoor",
      sourceUrl: "https://www.pexels.com/photo/modern-creative-workspace-with-editing-setup-29849413/",
      licenseUrl: pexelsLicense,
    },
  },
  volume: {
    kind: "image",
    src: "/media/case-volume.webp",
    ratio: "16:9",
    alt: "A professional cinema-camera team working on a studio production",
    expected: "case-volume.webp",
    demo: true,
    credit: {
      provider: "Pexels",
      creator: "Cemrecan Yurtman",
      sourceUrl: "https://www.pexels.com/photo/professional-film-crew-behind-the-scenes-in-studio-38058993/",
      licenseUrl: pexelsLicense,
    },
  },
} satisfies Record<string, Media>;

const playgroundMedia = [
  {
    kind: "image",
    src: "/media/playground-water.webp",
    ratio: "4:5",
    alt: "Ocean waves folding over a rocky shoreline from above",
    expected: "playground-water.webp",
    demo: true,
    credit: {
      provider: "Pexels",
      creator: "Amos Kofi Commey",
      sourceUrl: "https://www.pexels.com/photo/aerial-view-of-ocean-waves-and-rocky-shoreline-30211751/",
      licenseUrl: pexelsLicense,
    },
  },
  {
    kind: "image",
    src: "/media/playground-travel.webp",
    ratio: "3:2",
    alt: "A quiet peach sunrise over the ocean",
    expected: "playground-travel.webp",
    demo: true,
    credit: {
      provider: "Pexels",
      creator: "Francesco Ungaro",
      sourceUrl: "https://www.pexels.com/photo/seascape-at-dawn-11384474/",
      licenseUrl: pexelsLicense,
    },
  },
  {
    kind: "image",
    src: "/media/playground-morning.webp",
    ratio: "3:2",
    alt: "A still lake and mountain silhouettes at first light",
    expected: "playground-morning.webp",
    demo: true,
    credit: {
      provider: "Pexels",
      creator: "Parveen Singh",
      sourceUrl: "https://www.pexels.com/photo/scenic-view-of-a-lake-at-dawn-19157269/",
      licenseUrl: pexelsLicense,
    },
  },
  {
    kind: "image",
    src: "/media/playground-portrait.webp",
    ratio: "4:5",
    alt: "A cinematic portrait shaped by saturated light and shadow",
    expected: "playground-portrait.webp",
    demo: true,
    credit: {
      provider: "Pexels",
      creator: "Esteban Carriazo",
      sourceUrl: "https://www.pexels.com/photo/cinematic-portrait-with-dramatic-light-in-miami-32691520/",
      licenseUrl: pexelsLicense,
    },
  },
  {
    kind: "image",
    src: "/media/playground-landscape.webp",
    ratio: "16:9",
    alt: "A solitary figure facing a calm lake at dawn",
    expected: "playground-landscape.webp",
    demo: true,
    credit: {
      provider: "Pexels",
      creator: "Nguyễn Hoàng Văn",
      sourceUrl: "https://www.pexels.com/photo/solitary-reflection-by-the-lake-at-dawn-35632974/",
      licenseUrl: pexelsLicense,
    },
  },
] satisfies Media[];

export const site = {
  hero: {
    name: "Yash Kant Tiwary",
    line: "Creative producer. Bangalore.",
    links: [
      { label: "The work", href: "#work" },
      { label: "How it's made", href: "#system" },
      { label: "Say hi", href: "#contact" },
    ],
    loop: heroReel,
    fullReel: heroReel,
  },
  proof: [
    { value: "100+", label: "videos a month" },
    { value: "200–300", label: "creatives a month" },
    { value: "5", label: "people led" },
    { value: "~50%", label: "faster turnaround" },
  ] as Stat[],
  work: [
    {
      id: "pw-ioi-mba-launch",
      title: "PW IOI MBA launch",
      challenge: "A new MBA programme, one launch window, no existing audience.",
      execution: "Six content streams built to one look: stage, social, live, banners.",
      result: "Launch shipped complete across every stream, on the day.",
      stats: [
        { value: "6", label: "content streams" },
        { value: "1", label: "launch window" },
        { value: "5", label: "people" },
      ],
      media: caseMedia.mbaLaunch,
      fullPiece: caseMedia.mbaLaunch,
    },
    {
      id: "skillshala",
      title: "Skillshala",
      challenge: "A registration target, three weeks, and a cold list.",
      execution: "One content engine across YouTube, Telegram and paid, running live.",
      result: "Filled the room and kept the views after it ended.",
      stats: [
        { value: "700+", label: "registrations" },
        { value: "400", label: "attendees" },
        { value: "30K", label: "views" },
      ],
      media: caseMedia.skillshala,
      fullPiece: caseMedia.skillshala,
    },
    {
      id: "unfair-advantage",
      title: "Unfair Advantage 2.0",
      challenge: "A scholarship offer that needed to feel like opportunity, not advertising.",
      execution: "Locked the visual theme first, then built every offer creative to it.",
      result: "One campaign that held together across every placement.",
      stats: [
        { value: "1", label: "visual system" },
        { value: "Theme-first", label: "creative direction" },
        { value: "Cross-channel", label: "placements" },
      ],
      media: caseMedia.unfairAdvantage,
      fullPiece: caseMedia.unfairAdvantage,
    },
    {
      id: "youtube-channels",
      title: "Two YouTube channels",
      challenge: "Two channels near zero, and no repeatable way to pick ideas.",
      execution: "A research pass before every video: competitors, trends, scored ideas.",
      result: "Growth that came from the process, not from one lucky video.",
      stats: [
        { value: "1,000+", label: "subscribers" },
        { value: "50K+", label: "views" },
        { value: "3", label: "part research workflow" },
      ],
      media: caseMedia.youtubeChannels,
      fullPiece: caseMedia.youtubeChannels,
    },
    {
      id: "volume",
      title: "Volume",
      challenge: "One hundred videos monthly is an operations problem, not a craft one.",
      execution: "Briefs, review cycles and approvals owned across team, freelancers, agencies.",
      result: "Everything out the door, every month, at a consistent standard.",
      stats: [
        { value: "100+", label: "videos a month" },
        { value: "200–300", label: "creatives a month" },
        { value: "5", label: "people led" },
      ],
      media: caseMedia.volume,
      fullPiece: caseMedia.volume,
    },
  ] as CaseStudy[],
  system: {
    heading: "How it's made",
    body: "Producing at this volume isn't about working faster. It's about removing the parts of the process that don't need a person. I built a system that reads the footage, finds what's missing, marks the moments and times the cuts — so the team spends its hours on judgement instead of scrubbing timelines.",
    nodes: ["Audience research", "Idea scoring", "Creative brief", "Production", "AI review", "Editing", "Distribution"],
    loopLabel: "Distribution data feeds the next audience decision",
    before: { label: "Before", value: "1–1.5 days", weight: 1 },
    after: { label: "After", value: "about half a day", weight: 0.35 },
  },
  timeline: {
    line: "From one camera to a content system.",
    nodes: [
      { label: "Photography", year: "2017" },
      { label: "Film", year: "2021" },
      { label: "Editing", year: "2021" },
      { label: "Motion", year: "2023" },
      { label: "Campaigns", year: "2024" },
      { label: "Strategy", year: "2024" },
      { label: "Production", year: "2025" },
      { label: "Leading teams", year: "2025" },
      { label: "AI systems", year: "2025" },
    ] as TimelineNode[],
  },
  playground: {
    words: "Before any of this was a job, it was a camera and somewhere to point it. I still shoot most weekends. Mostly water, mostly early, mostly nobody around.",
    frames: playgroundMedia,
  },
  contact: {
    email: "yashkanttiwary@gmail.com",
    phone: "+91 83830 69094",
    deck: "/yash-kant-tiwary-resume.pdf",
    social: [
      { label: "LinkedIn", href: "https://in.linkedin.com/in/yashkanttiwary" },
    ],
  },
  mediaCredits: [heroReel, ...Object.values(caseMedia), ...playgroundMedia]
    .flatMap((media) => media.credit ? [media.credit] : [])
    .filter((credit, index, credits) => credits.findIndex((item) => item.sourceUrl === credit.sourceUrl) === index),
};
