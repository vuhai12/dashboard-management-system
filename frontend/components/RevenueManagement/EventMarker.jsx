export function EventMarker({ cx, cy, type }) {
  if (cx == null || cy == null) return null;
  const positive = type === "positive";
  const color = positive ? "#29965c" : "#d94d58";
  const bg = positive ? "#effbf4" : "#fff2f2";
  const border = positive ? "#bfe9d0" : "#f3c6c9";

  return (
    <g
      transform={`translate(${cx - 15}, ${cy - 15})`}
      style={{ filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.08))" }}
    >
      <circle cx="15" cy="15" r="13.5" fill={bg} stroke={border} />
      {positive ? (
        <path
          d="M7 18l4-4 3 2 5-6 M15 10h4v4"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M7 11l4 4 3-2 5 6 M15 19h4v-4"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </g>
  );
}
