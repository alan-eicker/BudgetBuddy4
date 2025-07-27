import { useState, useMemo } from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { useMediaQuery } from 'react-responsive';
import * as _ from 'lodash';

import ChartLabel from './ChartLabel';
import CategoryList from '../../components/CategoryList';

import { Expense } from '../../shared/types/expenseGroups';

import { aggregateExpensesByMonth } from '../../shared/helpers/chartHelpers';

import styles from './ExpenseSnapshotChart.module.scss';

export interface ExpenseSnapshotChartProps {
  allExpenses: Expense[];
}

const chartColors = {
  axisStroke: '#fff',
  barFill: 'rgba(255,255,255,0.15)',
  barOverageFill: '#fa3802',
  referenceLine: 'rgba(255,255,255,0.20)',
};

const ExpenseSnapshotChart = ({ allExpenses }: ExpenseSnapshotChartProps) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  console.log('ALL EXPENSES:', allExpenses);
  const expenseCategories = _.uniq(allExpenses.map((expense) => expense.type));

  const chartData = aggregateExpensesByMonth(allExpenses, 9000, activeCategory);

  const isExtraSmallScreen = useMediaQuery({ query: '(max-width: 480px)' });
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });

  const barSize = 80;

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
          data={chartData}
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
            dataKey="budgetTotal"
            stackId="a"
            fill={chartColors.barFill}
          />
          <Bar
            barSize={barSize}
            dataKey="overageTotal"
            stackId="a"
            fill={chartColors.barOverageFill}
            {...(!isSmallScreen && { label: <ChartLabel /> })}
          />
          <ReferenceLine y={9000} stroke={chartColors.referenceLine} />
        </RechartsBarChart>
      </ResponsiveContainer>
    ),
    [chartData, barSize, isSmallScreen, isExtraSmallScreen],
  );

  return (
    <div className={styles.chartContainer}>
      <h2 className={styles.title}>{activeCategory} Expenses Over 12 Months</h2>
      {MemoizedBarChart}
      <CategoryList
        categories={['All', ...expenseCategories]}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryClick}
      />
    </div>
  );
};

export default ExpenseSnapshotChart;
