'use server';

import { ThemeOption } from "@/theme/types";
import { ThemeSelectorMenu } from "./ThemeSelectorMenu";
import { cookies } from "next/headers";
import { themeSelectionKey } from "@/theme/config";

export async function ThemeSelector() {
  const onChange = (input: ThemeOption) => {
    'use server';
    const cookieStore = cookies();
    cookieStore.set(themeSelectionKey, input);
  }
  return (
    <ThemeSelectorMenu onChange={onChange} />
  )
}
