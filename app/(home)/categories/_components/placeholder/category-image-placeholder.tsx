interface CategoryImagePlaceholderProps {
  categoryName: string;
  size?: number;
}

export function CategoryImagePlaceholder({
  categoryName,
  size = 120,
}: CategoryImagePlaceholderProps) {
  // Generate a consistent color based on product name
  const hashCode = categoryName.split("").reduce((acc, char) => {
    return (acc << 5) - acc + char.charCodeAt(0);
  }, 0);
  const hue = Math.abs(hashCode) % 360;
  const bgColor = `hsl(${hue}, 70%, 85%)`;
  const textColor = `hsl(${hue}, 70%, 30%)`;

  // Truncate product name if too long
  const displayName =
    categoryName.length > 20
      ? categoryName.substring(0, 17) + "..."
      : categoryName;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="rounded-lg border border-border"
      style={{ backgroundColor: bgColor }}
    >
      <text
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={size / 8}
        fontWeight="600"
        fill={textColor}
        className="pointer-events-none"
      >
        {displayName}
      </text>
    </svg>
  );
}
