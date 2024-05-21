import {
  firestore,
  doc,
  onSnapshot,
  updateDoc,
  deleteDoc,
} from '@/firebase';
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { z } from 'zod';
import type {
  Collection,
  SchemaOf,
} from '@/models';
import { schemas } from '@/models';

export const useGetItem = <T extends Collection>(
  collection: T,
  id: string,
) => {
  const [data, setData] = useState<z.infer<SchemaOf<T>> | undefined>();
  const document = useMemo(
    () => doc(firestore, collection, id),
    [collection, id],
  );
  useEffect(
    () => {
      const unsubscribe = onSnapshot(
        document,
        (snapshot) => {
          const next = snapshot.data();
          const schema = schemas[collection];
          setData(
            next
              ? schema.parse({ id, ...next })
              : undefined,
          );
        },
      );
      return unsubscribe;
    },
    [document, collection, id],
  );
  const update = useCallback(
    ({ id: _, ...next }: z.infer<SchemaOf<T>>) => {
      updateDoc(document, next as any);
    },
    [document],
  );
  const remove = useCallback(
    () => {
      deleteDoc(document);
    },
    [document],
  );
  return [data, update, remove] as const;
};
