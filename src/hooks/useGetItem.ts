import { firestore, doc, onSnapshot, updateDoc, deleteDoc } from "@/firebase";
import { Collection, SchemaOf, schemas } from "@/auth/v2/models";
import { useCallback, useEffect, useMemo, useState } from "react";
import { z } from "zod";

export const useGetItem = <T extends Collection>(
  collection: T,
  id: string,
) => {
  const [data, setData] = useState<z.infer<SchemaOf<T>> | undefined>();
  const document = useMemo(
    () => doc(firestore, collection, id),
    [collection, id],
  )
  useEffect(
    () => {
      const unsubscribe = onSnapshot(
        document,
        (snapshot) => {
          const data = snapshot.data();
          const schema = schemas[collection];
          setData(
            data 
              ? schema.parse({ id, ...data })
              : undefined
          );
        }
      );
      return unsubscribe;
    },
    [document],
  )
  const update = useCallback(
    ({ id, ...data }: z.infer<SchemaOf<T>>) => {
      updateDoc(document, data as any);
    },
    [document],
  )
  const remove = useCallback(
    () => {
      deleteDoc(document)
    },
    [document]
  )
  return [data, update, remove] as const;
}
