import { useState } from 'react';
import { Expense } from '../../shared/types/expenseGroups';

import { LuUtilityPole } from 'react-icons/lu';
import { FaHouseChimney } from 'react-icons/fa6';
import { MdLocalGroceryStore } from 'react-icons/md';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { FaBriefcaseMedical } from 'react-icons/fa6';
import { FaCreditCard } from 'react-icons/fa6';
import { FaPlane } from 'react-icons/fa';
import { AiFillBank } from 'react-icons/ai';
import { MdMiscellaneousServices } from 'react-icons/md';
import { FaGasPump } from 'react-icons/fa6';

import Button from '../../components/Button';
import Switch from '../../components/Switch';
import ConfirmationSlider from '../../components/ConfirmationSlider';

import { toDollarAmountString } from '../../utils/numbers';

import styles from './ExpenseList.module.scss';

export interface ExpenseListProps {
  expenses?: Expense[];
  onDelete: () => void;
  onEdit: () => void;
}

const Icon = ({ name }: { name: string }) => {
  let IconComponent: React.FC;

  switch (name) {
    case 'Utilities':
      IconComponent = LuUtilityPole as unknown as React.FC;
      break;
    case 'Housing':
      IconComponent = FaHouseChimney as unknown as React.FC;
      break;
    case 'Groceries':
      IconComponent = MdLocalGroceryStore as unknown as React.FC;
      break;
    case 'Investing':
      IconComponent = MdOutlineAttachMoney as unknown as React.FC;
      break;
    case 'Medical':
      IconComponent = FaBriefcaseMedical as unknown as React.FC;
      break;
    case 'Loan':
      IconComponent = AiFillBank as unknown as React.FC;
      break;
    case 'Credit Card':
      IconComponent = FaCreditCard as unknown as React.FC;
      break;
    case 'Gas':
      IconComponent = FaGasPump as unknown as React.FC;
      break;
    case 'Travel':
      IconComponent = FaPlane as unknown as React.FC;
      break;
    default:
      IconComponent = MdMiscellaneousServices as unknown as React.FC;
  }

  return <IconComponent />;
};

const ExpenseList = ({ onDelete, onEdit, expenses = [] }: ExpenseListProps) => {
  const [activeSliderIndex, setActiveSliderIndex] = useState<number>();

  const handleConfirmClick = () => {
    setActiveSliderIndex(undefined);
    onDelete();
  };

  return expenses.length > 0 ? (
    <div className={styles.expenseList}>
      {expenses.map((expense, index) => (
        <div key={expense.id} className={styles.expenseListItem}>
          <div className={styles.expenseListItemIcon}>
            <Icon name={expense.type} />
          </div>
          <div className={styles.expenseListItemDetails}>
            <div className={styles.expenseListItemType}>{expense.type}</div>
            <h3 className={styles.expenseListItemTitle}>{expense.name}</h3>
            <b>Balance Due:</b> {toDollarAmountString(expense.balance)}
          </div>
          <div className={styles.expenseListItemActions}>
            <div className={styles.expenseListItemStatusSwitch}>
              <label>Is Paid</label>
              <Switch checked={expense.paid} onChange={() => {}} />
            </div>
            <Button
              text="Edit"
              variant="secondary"
              size="sm"
              onClick={onEdit}
            />
            <Button
              text="Delete"
              variant="delete"
              size="sm"
              onClick={() => setActiveSliderIndex(index)}
            />
          </div>
          <ConfirmationSlider
            onConfirm={handleConfirmClick}
            onCancel={() => setActiveSliderIndex(undefined)}
            isActive={index === activeSliderIndex}
          />
        </div>
      ))}
    </div>
  ) : (
    <div>No expenses to list for this group.</div>
  );
};

export default ExpenseList;
