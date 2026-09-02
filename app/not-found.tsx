import Link from "next/link";

export default function NotFound() {
  return (
    <main className="status-page">
      <p className="status-kicker">404 / Missing frame</p>
      <h1>This cut does not exist.</h1>
      <p>The portfolio is one page. Return to the opening frame and continue from there.</p>
      <Link className="status-home" href="/">Back to the portfolio</Link>
    </main>
  );
}
