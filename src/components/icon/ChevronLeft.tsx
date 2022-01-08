export default function ChevronLeft(props: { color: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.80847 7.99985L5.1916 10.383L10.8085 16L13.1916 13.6171L7.57472 7.99985L13.1916 2.38297L10.8086 0L5.19175 5.61689L2.80878 7.99985H2.80847Z"
        fill={props.color}
      />
    </svg>
  )
}
