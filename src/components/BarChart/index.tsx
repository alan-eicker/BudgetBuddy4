import { useState, useMemo } from 'react';
import classnames from 'classnames';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { useMediaQuery } from 'react-responsive';
import uniqBy from 'lodash/uniqBy';

import BarCharLabel from '../BarChartLabel';

import styles from './BarChart.module.scss';

export interface BarChartProps {
  data: any[];
  barSize?: number;
  title?: string;
}

const chartColors = {
  axisStroke: '#fff',
  barFill: 'rgba(255,255,255,0.15)',
  barOverageFill: '#fa3802',
  referenceLine: 'rgba(255,255,255,0.50)',
};

const BarChart = ({ data, title, barSize = 80 }: BarChartProps) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const isExtraSmallScreen = useMediaQuery({ query: '(max-width: 480px)' });
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });

  const categories = ['All', ...uniqBy(data, 'type').map((item) => item.type)];

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  const MemoizedBarChart = useMemo(
    () => (
      <ResponsiveContainer
        width="100%"
        height={isExtraSmallScreen ? '65%' : '74%'}
      >
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
    ),
    [data, barSize, isSmallScreen],
  );

  return (
    <>
      {title && <h2 className={styles.title}>{title}</h2>}
      {MemoizedBarChart}
      <div className={styles.categoryList}>
        {categories.map((category) => (
          <button
            className={classnames({
              [styles.isActive]: activeCategory === category,
            })}
            key={category}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </>
  );
};

export default BarChart;
