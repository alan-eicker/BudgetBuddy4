import classnames from 'classnames';

import Icon from '../Icon';

import * as colors from '../../styles/colors';

import styles from './ExpenseToBudgetRatio.module.scss';

export interface ExpenditureToBudgetProps {
  totalExpenses: number;
  totalBudget: number;
}

const ExpenditureToBudget = ({
  totalExpenses,
  totalBudget,
}: ExpenditureToBudgetProps) => {
  const expenditurePercentage = Math.round((totalExpenses / totalBudget) * 100);
  const overBudget = expenditurePercentage >= 90;

  return (
    <div className={styles.container}>
      <Icon
        name={overBudget ? 'error' : 'success'}
        color={overBudget ? colors.red : colors.green}
        size="60px"
      />
      <div>
        Your expenses consume{' '}
        <b
          className={classnames(styles.percentage, {
            [styles.overBudget]: overBudget,
          })}
        >
          {expenditurePercentage}%
        </b>{' '}
        of your total budget for this period.
      </div>
    </div>
  );
};

export default ExpenditureToBudget;
