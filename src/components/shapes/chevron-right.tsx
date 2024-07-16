export type ChevronRightProps = {
  width: number;
  height: number;
  fill: string;
  stroke: string;
};

export const ChevronRight = ({ width, height }: ChevronRightProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="currentColor"
      className="bi bi-chevron-right"
      viewBox={`0 0 ${width} ${height}`}
    >
      <path
        fillRule="evenodd"
        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
      />
    </svg>
  );
};