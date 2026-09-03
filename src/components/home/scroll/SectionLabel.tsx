// `$ command` eyebrow above a section title — the Paper Terminal voice.
export function SectionLabel({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <p className={`mb-1.5 font-mono text-[13px] font-bold text-foreground ${className}`}>
      <span className="text-primary">$ </span>
      {children}
    </p>
  );
}
