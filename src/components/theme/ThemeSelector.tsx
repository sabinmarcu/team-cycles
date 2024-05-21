'use server';

import type { ThemeOption } from '@/theme/types';
import { cookies } from 'next/headers';
import { themeSelectionKey } from '@/theme/config';
import { ThemeSelectorMenu } from './ThemeSelectorMenu';

const onChange = (input: ThemeOption) => {
  'use server';

  const cookieStore = cookies();
  cookieStore.set(themeSelectionKey, input);
};

export async function ThemeSelector() {
  return (
    <ThemeSelectorMenu onChange={onChange} />
  );
}
