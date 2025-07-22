const ChartLabel = ({ x, y, value }: any) => {
  return (
    <text
      x={x + 70 / 2}
      y={y}
      dy={-10}
      fontSize="13"
      fontFamily="sans-serif"
      fill={'#fff'}
      textAnchor="middle"
    >
      ${value.toLocaleString()}
    </text>
  );
};

export default ChartLabel;
