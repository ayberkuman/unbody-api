export type CheckIconProps = React.SVGAttributes<SVGElement>

export const CheckIcon: React.FC<CheckIconProps> = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    {...props}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
)
