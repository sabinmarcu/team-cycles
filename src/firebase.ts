import { env } from '@/env/client';
import type { DBSchema } from '@/types';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import type { z } from 'zod';

const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);

export const parseDocument = <T extends DBSchema>(
  input: { id: string, data: () => any },
  schema: T,
): z.infer<T> => {
  const { id } = input;
  const data = input.data();
  const result = schema.parse({ id, ...data });
  return result;
};

export {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  onSnapshot,
  deleteDoc,
} from 'firebase/firestore';
