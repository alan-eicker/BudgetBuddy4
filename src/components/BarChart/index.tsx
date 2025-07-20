import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { useMediaQuery } from 'react-responsive';

import BarCharLabel from '../BarChartLabel';

const chartColors = {
  axisStroke: '#fff',
  barFill: 'rgba(255,255,255,0.15)',
  barOverageFill: '#fa3802',
  referenceLine: 'rgba(255,255,255,0.50)',
};

const BarChart = ({ data, barSize = 80 }: any) => {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" stroke={chartColors.axisStroke} />
        <YAxis stroke={chartColors.axisStroke} />
        <Bar
          barSize={barSize}
          dataKey="uv"
          stackId="a"
          fill={chartColors.barFill}
        />
        <Bar
          barSize={barSize}
          dataKey="pv"
          stackId="a"
          fill={chartColors.barOverageFill}
          {...(!isSmallScreen && { label: <BarCharLabel /> })}
        />
        <ReferenceLine y={9000} stroke={chartColors.referenceLine} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
