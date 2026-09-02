"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="status-page">
      <p className="status-kicker">Something interrupted the edit.</p>
      <h1>The story is still here.</h1>
      <p>Try loading this frame again. If it keeps failing, Yash is one email away.</p>
      <div className="status-actions">
        <button type="button" onClick={reset}>Try again</button>
        <a href="mailto:yashkanttiwary@gmail.com">Email Yash</a>
      </div>
    </main>
  );
}
