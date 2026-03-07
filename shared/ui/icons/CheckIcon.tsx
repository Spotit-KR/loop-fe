export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 8" fill="none" className={className}>
      <path
        d="M1 4L3.5 6.5L9 1"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
