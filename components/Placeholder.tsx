type PlaceholderProps = {
  label: string;
  description?: string;
  ratio?: "16:9" | "4:5" | "3:2" | "1:1";
  className?: string;
};

const ratios = {
  "16:9": "16 / 9",
  "4:5": "4 / 5",
  "3:2": "3 / 2",
  "1:1": "1 / 1",
};

export default function Placeholder({
  label,
  description = "Visual unavailable",
  ratio,
  className = "",
}: PlaceholderProps) {
  return (
    <div
      className={`placeholder ${className}`}
      style={ratio ? { aspectRatio: ratios[ratio] } : undefined}
      role="img"
      aria-label={description}
    >
      <span aria-hidden="true">{label}</span>
    </div>
  );
}
