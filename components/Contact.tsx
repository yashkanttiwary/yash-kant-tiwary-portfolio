import { site } from "@/content/site";

export default function Contact() {
  const phoneHref = site.contact.phone.replace(/\s/g, "");

  return (
    <section id="contact" className="contact" aria-labelledby="contact-heading">
      <div className="contact-inner">
        <h2 id="contact-heading">Say hi</h2>
        <div className="contact-primary">
          <a className="email-link" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          <a href={`tel:${phoneHref}`}>{site.contact.phone}</a>
        </div>
        <a className="deck-link" href={site.contact.deck} download="Yash-Kant-Tiwary-Resume.pdf">
          Download résumé <span>(PDF)</span>
        </a>
        <nav className="social-links" aria-label="Social profiles">
          {site.contact.social.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">{social.label}</a>
          ))}
        </nav>
        <details className="media-credits">
          <summary>Concept visual credits</summary>
          <p>Temporary licensed visuals for design preview only. Replace them with Yash&apos;s project work before launch.</p>
          <ul>
            {site.mediaCredits.map((credit) => (
              <li key={credit.sourceUrl}>
                <a href={credit.sourceUrl} target="_blank" rel="noopener noreferrer">
                  {credit.creator} / {credit.provider}
                </a>
                {" · "}
                <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer">license</a>
              </li>
            ))}
          </ul>
        </details>
        <footer>{site.hero.name}, Bangalore</footer>
      </div>
    </section>
  );
}
