"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChatTeardropText, X, PaperPlaneRight, CircleNotch } from "@phosphor-icons/react";

// Chat widget for the marketing site. Talks to the `site-assistant` Supabase
// edge function, which answers from the live site and forwards leads to Joe.
// The anon key is a publishable key — it is meant to ship in the browser.

type Message = { role: "user" | "assistant"; content: string };

const OPENERS = [
  "What do you actually build?",
  "How does private AI work?",
  "Can you help my business?",
];

const SESSION_KEY = "jts-chat-session";
const ENDPOINT = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/site-assistant`
  : null;

export function SiteAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const sessionId = useRef<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // One session per browser tab, so a refresh keeps the thread.
  useEffect(() => {
    try {
      sessionId.current = sessionStorage.getItem(SESSION_KEY);
    } catch {
      /* private mode — a fresh session each time is fine */
    }
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const send = useCallback(
    async (text: string) => {
      const question = text.trim();
      if (!question || pending) return;
      setInput("");
      setMessages((m) => [...m, { role: "user", content: question }]);
      setPending(true);

      try {
        if (!ENDPOINT) throw new Error("Chat endpoint is not configured");
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            message: question,
            session_id: sessionId.current,
            page_context: { url: window.location.pathname },
          }),
        });
        const data = await res.json();
        if (data.session_id) {
          sessionId.current = data.session_id;
          try {
            sessionStorage.setItem(SESSION_KEY, data.session_id);
          } catch {
            /* ignore */
          }
        }
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content:
              data.content ??
              "Something went wrong on my end. Email joe@joestechsolutions.com and he'll pick it up.",
          },
        ]);
      } catch {
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content:
              "I can't reach the server right now. Email joe@joestechsolutions.com — he usually replies within a day.",
          },
        ]);
      } finally {
        setPending(false);
      }
    },
    [pending]
  );

  if (!ENDPOINT) return null;

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="site-assistant-panel"
        aria-label={open ? "Close chat" : "Ask a question"}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center border-2 border-foreground bg-primary text-background shadow-[4px_4px_0_var(--foreground)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none sm:h-16 sm:w-16"
      >
        {open ? (
          <X weight="bold" className="h-6 w-6" />
        ) : (
          <ChatTeardropText weight="duotone" className="h-7 w-7" />
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          id="site-assistant-panel"
          ref={panelRef}
          role="dialog"
          aria-label="Ask Joe's Tech Solutions"
          className="fixed bottom-24 right-5 z-50 flex h-[min(30rem,70vh)] w-[min(24rem,calc(100vw-2.5rem))] flex-col border-2 border-foreground bg-card shadow-[8px_8px_0_var(--primary)] sm:bottom-28"
        >
          <header className="border-b-2 border-foreground px-4 py-3">
            <p className="font-mono text-[13px] font-bold">
              <span className="text-primary">$ </span>ask --about joestechsolutions
            </p>
            <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
              Answers come from this site. Leave an email and it reaches Joe.
            </p>
          </header>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.length === 0 && (
              <div className="space-y-2">
                {OPENERS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    className="block w-full border border-border px-3 py-2 text-left font-mono text-[12.5px] text-foreground/80 transition-colors hover:border-primary hover:text-primary"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : ""}>
                <p className="mb-1 font-mono text-[10px] tracking-wider text-muted-foreground">
                  {m.role === "user" ? "you" : "jts"}
                </p>
                <div
                  className={`inline-block max-w-[92%] whitespace-pre-wrap border px-3 py-2 text-left text-[13.5px] leading-relaxed ${
                    m.role === "user"
                      ? "border-foreground bg-[var(--panel)] text-[var(--panel-foreground)]"
                      : "border-border bg-background text-foreground/90"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {pending && (
              <p className="flex items-center gap-2 font-mono text-[12px] text-muted-foreground">
                <CircleNotch weight="bold" className="h-3.5 w-3.5 animate-spin motion-reduce:animate-none" />
                reading the site…
              </p>
            )}
            <div aria-live="polite" className="sr-only">
              {pending ? "Thinking" : messages[messages.length - 1]?.content ?? ""}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex border-t-2 border-foreground"
          >
            <label htmlFor="site-assistant-input" className="sr-only">
              Your question
            </label>
            <input
              id="site-assistant-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything, or leave your email…"
              maxLength={2000}
              className="min-w-0 flex-1 bg-transparent px-3 py-3 font-mono text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              type="submit"
              disabled={pending || !input.trim()}
              aria-label="Send"
              className="border-l-2 border-foreground px-4 text-primary transition-colors hover:bg-primary hover:text-background disabled:cursor-not-allowed disabled:text-muted-foreground disabled:hover:bg-transparent"
            >
              <PaperPlaneRight weight="bold" className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
