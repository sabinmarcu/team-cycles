import {
  addDoc,
  collection,
  doc,
  firestore,
  getDoc,
  parseDocument,
} from '@/firebase';
import { UserSchema } from '@/models/user';

export async function createUser(
  name: string,
) {
  const newUser = await addDoc(
    collection(firestore, 'user'),
    { name },
  );

  return parseDocument(
    await getDoc(doc(firestore, 'user', newUser.id)),
    UserSchema,
  );
}
