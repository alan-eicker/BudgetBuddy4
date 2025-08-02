import { onSnapshot, collection, Firestore } from 'firebase/firestore';

type FirestoreDoc<T> = T & { id: string };

export function subscribeToCollection<T>(
  db: Firestore,
  collectionName: string,
  setter: (docs: FirestoreDoc<T>[]) => void,
): () => void {
  const unsubscribe = onSnapshot(collection(db, collectionName), (snapshot) => {
    const docs: FirestoreDoc<T>[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as T),
    }));

    setter(docs);
  });

  return unsubscribe;
}
