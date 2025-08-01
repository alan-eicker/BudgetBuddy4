import { LuUtilityPole } from 'react-icons/lu';
import { FaHouseChimney } from 'react-icons/fa6';
import { FaBriefcaseMedical } from 'react-icons/fa6';
import { FaCreditCard } from 'react-icons/fa6';
import { FaPlane } from 'react-icons/fa';
import { AiFillBank } from 'react-icons/ai';
import { FaGasPump } from 'react-icons/fa6';
import { FaChevronRight } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdArrowRoundBack } from 'react-icons/io';
import {
  MdErrorOutline,
  MdWarningAmber,
  MdOutlineAttachMoney,
  MdCheck,
  MdInfoOutline,
  MdLocalGroceryStore,
  MdMiscellaneousServices,
} from 'react-icons/md';

export interface IconProps {
  name: string;
}

const Icon = ({ name }: IconProps) => {
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
    case 'Investments':
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
    case 'MdMiscellaneous':
      IconComponent = MdMiscellaneousServices as unknown as React.FC;
      break;
    case 'ChevronRight':
      IconComponent = FaChevronRight as unknown as React.FC;
      break;
    case 'HamburgerMenu':
      IconComponent = GiHamburgerMenu as unknown as React.FC;
      break;
    case 'error':
      IconComponent = MdErrorOutline as unknown as React.FC;
      break;
    case 'warning':
      IconComponent = MdWarningAmber as unknown as React.FC;
      break;
    case 'success':
      IconComponent = MdCheck as unknown as React.FC;
      break;
    case 'info':
      IconComponent = MdInfoOutline as unknown as React.FC;
      break;
    case 'back':
      IconComponent = IoMdArrowRoundBack as unknown as React.FC;
      break;
    default:
      IconComponent = () => <></>;
  }

  return <IconComponent />;
};

export default Icon;
