import sharp from "sharp";

const width = 1200;
const height = 630;
const overlay = Buffer.from(`
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#07100f" fill-opacity="0.96"/>
  <rect x="54" y="48" width="1092" height="534" fill="none" stroke="#5f7269" stroke-width="1"/>
  <rect x="54" y="48" width="8" height="534" fill="#ff6a2b"/>
  <text x="92" y="88" fill="#ff6a2b" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" letter-spacing="2">THE SIGNAL LOOP · FIELD CARD</text>
  <text x="92" y="190" fill="#f0ede4" font-family="Arial, Helvetica, sans-serif" font-size="66" font-weight="800" letter-spacing="-2">YASH KANT TIWARY</text>
  <text x="94" y="236" fill="#b9c1ba" font-family="Arial, Helvetica, sans-serif" font-size="25" letter-spacing="1">CREATIVE PRODUCER · BANGALORE</text>
  <path d="M94 300 H1040" stroke="#5f7269" stroke-width="2"/>
  <path d="M1040 300 C1100 300 1100 383 1040 383 H122" fill="none" stroke="#ff6a2b" stroke-width="3" stroke-dasharray="9 7"/>
  <path d="M122 383 L142 373 L142 393 Z" fill="#ff6a2b"/>
  <text x="94" y="340" fill="#f0ede4" font-family="Arial, Helvetica, sans-serif" font-size="25" font-weight="700">Audience signals → sharper briefs → production → results → back again</text>
  <g font-family="Arial, Helvetica, sans-serif">
    <text x="94" y="462" fill="#ff6a2b" font-size="40" font-weight="800">100+</text>
    <text x="94" y="491" fill="#b9c1ba" font-size="17">VIDEOS / MONTH</text>
    <text x="352" y="462" fill="#ff6a2b" font-size="40" font-weight="800">~50%</text>
    <text x="352" y="491" fill="#b9c1ba" font-size="17">FASTER TURNAROUND</text>
    <text x="670" y="462" fill="#ff6a2b" font-size="40" font-weight="800">5</text>
    <text x="670" y="491" fill="#b9c1ba" font-size="17">PERSON CORE TEAM</text>
  </g>
  <text x="94" y="552" fill="#f0ede4" font-family="Arial, Helvetica, sans-serif" font-size="19">Craft in the frame. Systems behind it. Everything ships.</text>
  <text x="1108" y="552" text-anchor="end" fill="#87938b" font-family="Arial, Helvetica, sans-serif" font-size="16">PORTFOLIO / 2026</text>
</svg>`);

await sharp("public/og.png")
  .resize(width, height, { fit: "cover" })
  .composite([{ input: overlay }])
  .png({ compressionLevel: 9 })
  .toFile("public/og-loot.png");
