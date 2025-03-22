export default function CoolBorder({
  position = 'top'
}: {
  position?: 'top' | 'bottom'
}): JSX.Element {
  return (
    <svg
      className={`cool-border ${position}`}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      viewBox="0 0 745 11"
    >
      <path d="M4.000,8.000 L9.000,1.1000 L734.1000,1.1000 L739.1000,8.000 L4.000,8.000 Z" />
    </svg>
  )
}
