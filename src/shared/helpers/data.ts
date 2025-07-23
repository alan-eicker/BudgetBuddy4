import { DocumentData } from '@firebase/firestore';

export const setDocRef = <T>(docs: DocumentData) => {
  const docRefs: T[] = [];

  docs.forEach((doc: DocumentData) => {
    const data = doc.data();
    docRefs.push({
      id: doc.id,
      ...data,
    });
  });

  return docRefs;
};
