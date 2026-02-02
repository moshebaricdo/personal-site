interface IconProps {
  className?: string;
}

export function ExternalIcon({ className }: IconProps) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 15.25V6.75H8.75M17 7L6.75 17.25"
      />
    </svg>
  );
}
