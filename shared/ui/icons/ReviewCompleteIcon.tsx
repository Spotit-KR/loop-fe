export function ReviewCompleteIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M478.9 336.2L360 64l-48 48-24-80-80 80-48-48L44.8 336.2c-6.4 14.9-1.6 32.3 11.7 41.6L256 512l199.5-134.2c13.3-9.3 18.1-26.7 11.7-41.6L478.9 336.2z"
        fill="currentColor"
        opacity="0.2"
      />
      <path
        d="M256 512L56.5 377.8C43.2 368.5 38.4 351.1 44.8 336.2L160 64l48 48 24-80 80 80 48-48 118.9 272.2c6.4 14.9 1.6 32.3-11.7 41.6L256 512z"
        stroke="currentColor"
        strokeWidth="20"
        fill="none"
      />
      <circle cx="200" cy="260" r="20" fill="currentColor" />
      <circle cx="312" cy="260" r="20" fill="currentColor" />
      <path
        d="M180 340 Q256 400 332 340"
        stroke="currentColor"
        strokeWidth="20"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
