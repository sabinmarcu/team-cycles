import type {
  DBUserDevice,
  UserDevice,
} from '@/models/credential';
import {
  addDoc,
  collection,
  firestore,
} from '@/firebase';

export async function addDevice(
  device: UserDevice,
  owner: string,
) {
  const newDeviceData = {
    ...device,
    owner,
  } satisfies DBUserDevice;

  const newDevice = await addDoc(
    collection(firestore, 'credential'),
    newDeviceData,
  );

  return newDevice;
}
