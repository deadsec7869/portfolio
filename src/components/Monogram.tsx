import glyphs from "../data/monogram.json";

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
      {glyphs.map(({letter, outline, holes}) => (
        <path key={letter} fillRule="evenodd" d={[outline,...holes].map(points =>
          "M" + points.map(pair => pair.join(" ")).join(" ") + "Z"
        ).join(" ")} />
      ))}
    </svg>
  );
}
