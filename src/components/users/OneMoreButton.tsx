'use client';

import { useCallback } from "react";
import { faker } from '@faker-js/faker';
import { firestore, addDoc, collection } from "@/firebase";

export const OneMoreButton = () => {
  const onClick = useCallback(
    () => {
      const [firstName, lastName] = [
        faker.animal.type(),
        faker.animal.type()
      ].map((it) => {
        const name = it as unknown as keyof typeof faker.animal;
        return faker.animal[name]();
      });
      addDoc(
        collection(firestore, 'user'), 
        { name: [firstName, lastName].join(' ') }
      );
    },
    []
  );
  return (
    <button 
      className="btn btn-outline btn-success"
      onClick={onClick}
    >Add one more</button>
  )
}
