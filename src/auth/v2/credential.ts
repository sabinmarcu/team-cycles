import {
  firestore,
  collection,
  query,
  where,
  getDocs,
  parseDocument,

  addDoc,
} from '@/firebase';
import { CredentialSchema } from '@/models/credential';

import type {
  DBUserDevice,
  UserDevice,
} from '@/models/credential';

export async function getCredential(id: string) {
  const devicesCollection = collection(firestore, 'credential');
  const databaseDevices = await getDocs(
    query(devicesCollection, where('credentialID', '==', id)),
  );

  if (!databaseDevices || databaseDevices.size === 0) {
    return undefined;
  }

  const databaseDevice = parseDocument(databaseDevices.docs[0], CredentialSchema);

  return databaseDevice;
}

export async function addCredential(
  credential: UserDevice,
  owner: string,
) {
  const newCredentialData = {
    ...credential,
    owner,
  } satisfies DBUserDevice;

  const newDevice = await addDoc(
    collection(firestore, 'credential'),
    newCredentialData,
  );

  return newDevice;
}
