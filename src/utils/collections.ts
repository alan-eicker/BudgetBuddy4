import {
  onSnapshot,
  collection,
  Firestore,
  DocumentData,
} from 'firebase/firestore';

type FirestoreDoc<T> = T & { id: string };

export const subscribeToCollection = <T>(
  db: Firestore,
  collectionName: string,
  setter: (docs: FirestoreDoc<T>[]) => void,
): (() => void) => {
  const unsubscribe = onSnapshot(collection(db, collectionName), (snapshot) => {
    const docs: FirestoreDoc<T>[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as T),
    }));

    setter(docs);
  });

  return unsubscribe;
};

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
