import { firestore, onSnapshot, addDoc, collection as getCollection, parseDoc } from "@/firebase";
import { Collection, SchemaOf, schemas } from "@/auth/v2/models";
import { useCallback, useEffect, useMemo, useState } from "react";
import { z } from "zod";

export const useGetItemList = <T extends Collection>(
  collection: T,
) => {
  const [data, setData] = useState<z.infer<SchemaOf<T>>[] | undefined>();
  const dbCollection = useMemo(
    () => getCollection(firestore, collection),
    [collection],
  )
  useEffect(
    () => {
      const unsubscribe = onSnapshot(
        dbCollection,
        (snapshot) => {
          const schema = schemas[collection];
          const data = snapshot.docs.map((doc) => parseDoc(doc, schema));
          setData(data ?? undefined);
        }
      );
      return unsubscribe;
    },
    [dbCollection],
  )
  return data;
}
