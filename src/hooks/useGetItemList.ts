import {
  firestore,
  onSnapshot,
  collection as getCollection,
  parseDocument,
  query as databaseQuery,
  where,
} from '@/firebase';
import type {
  Collection,
  SchemaOf,
} from '@/models';
import { schemas } from '@/models';
import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { z } from 'zod';

export const useGetItemList = <T extends Collection>(
  collection: T,
  query?: Parameters<typeof where>,
) => {
  const [data, setData] = useState<z.infer<SchemaOf<T>>[] | undefined>();
  const databaseCollection = useMemo(
    () => {
      const currentCollection = getCollection(firestore, collection);
      if (query) {
        return databaseQuery(currentCollection, where(...query));
      }
      return currentCollection;
    },
    [collection, query],
  );
  useEffect(
    () => {
      const unsubscribe = onSnapshot(
        databaseCollection,
        (snapshot) => {
          const schema = schemas[collection];
          const next = snapshot.docs.map((document_) => parseDocument(document_, schema));
          setData(next ?? undefined);
        },
      );
      return unsubscribe;
    },
    [databaseCollection, collection],
  );
  return data;
};
