import { DocumentData } from '@firebase/firestore';
import { ExpenseGroup } from '../types/expenseGroups';

export const setDocRef = (docs: DocumentData) => {
  const docRefs: ExpenseGroup[] = [];

  docs.forEach((doc: DocumentData) => {
    const data = doc.data();
    docRefs.push({
      id: doc.id,
      ...data,
    });
  });

  return docRefs;
};
