import {
  firestore,
  collection,
  query,
  where,
  getDocs,
  parseDocument,

  addDoc,
  deleteDoc,
  doc,
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

export async function getCredentialsOfUser(id: string) {
  const devicesCollection = collection(firestore, 'credential');
  const databaseDevices = await getDocs(
    query(devicesCollection, where('owner', '==', id)),
  );

  return databaseDevices.docs
    .map((document_) => parseDocument(document_, CredentialSchema));
}

export async function addCredential(
  credential: UserDevice,
  deviceName: string,
  owner: string,
) {
  const newCredentialData = {
    ...credential,
    owner,
    deviceName,
  } satisfies DBUserDevice;

  const newDevice = await addDoc(
    collection(firestore, 'credential'),
    newCredentialData,
  );

  return newDevice;
}

export async function removeCredential(
  credentialId: string,
) {
  return deleteDoc(doc(firestore, 'credential', credentialId));
}
