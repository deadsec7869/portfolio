export function Github({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 19c-4.3 1.3-4.3-2-6-2.5M15 22v-3.9c0-1 .1-1.4-.5-2 3.1-.4 6.3-1.5 6.3-7A5.4 5.4 0 0 0 19.3 5c.2-.9.2-2.2-.2-3-1.2-.1-2.8.7-3.6 1.3a12.3 12.3 0 0 0-7 0C7.7 2.7 6.1 1.9 4.9 2c-.4.8-.4 2.1-.2 3a5.4 5.4 0 0 0-1.5 4.1c0 5.5 3.2 6.6 6.3 7-.6.6-.5 1.3-.5 2V22" />
    </svg>
  );
}
