export function Monogram({
  className = "",
  wire = false,
}: {
  className?: string;
  wire?: boolean;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 320"
      fill={wire ? "none" : "currentColor"}
      stroke={wire ? "currentColor" : "none"}
      strokeWidth="1"
      aria-hidden="true"
    >
      <path d="M30 104 82 76 82 20 116 2 116 112 64 140 64 184 97 166 97 206 64 224 30 204Z" />
      <path d="M132 110 166 92 210 118 210 226 156 256 156 300 122 318 122 166 156 148 156 212 176 201 176 150 156 139 132 152Z" />
    </svg>
  );
}
