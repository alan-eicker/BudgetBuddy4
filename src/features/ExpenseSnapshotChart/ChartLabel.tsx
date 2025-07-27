import { toDollarAmountString } from '../../utils/numbers';

const ChartLabel = ({ x, y, value }: any) => {
  const isNumberValue = typeof value === 'number';
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
      {isNumberValue ? toDollarAmountString(value) : value}
    </text>
  );
};

export default ChartLabel;
