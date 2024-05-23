import { removeCredential } from '@/auth/credential';
import type { SchemaOf } from '@/models';
import type { z } from 'zod';

export interface CredentialCardProperties {
  credential: z.infer<SchemaOf<'credential'>>,
  canRemove: boolean,
}

export default function CredentialCard({
  credential,
  canRemove,
}: CredentialCardProperties) {
  const handleRemove = () => {
    if (!canRemove) {
      return undefined;
    }
    return removeCredential(credential.id);
  };
  return (
    <div className="flex flex-col items-end p-4 rounded-box bg-base-300 min-w-64">
      <h2 className="w-full">{credential.deviceName ?? 'Initial Registration Credential'}</h2>
      <button
        className="btn btn-sm btn-error btn-outline mt-2"
        disabled={!canRemove}
        type="button"
        onClick={handleRemove}
      >
        Remove
      </button>
    </div>
  );
}
