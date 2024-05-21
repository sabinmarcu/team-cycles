import { ThemeOption } from "@/theme/types";
import { createContext, useContext, useState } from "react";
import Cookies from 'js-cookie';
import { themeSelectionKey } from "@/theme/config";

export const useThemeOptionProvider = () => {
  const [option, setOption] = useState(
    (Cookies.get(themeSelectionKey) ?? 'system') as ThemeOption
  );
  const setter = (selection: ThemeOption) => {
    setOption(selection);
    Cookies.set(themeSelectionKey, selection);
  }
  return { option, setter } as const;
}

export type ThemeOptionContextType = ReturnType<typeof useThemeOptionProvider>;
export const ThemeOptionContext = createContext<
  ReturnType<typeof useThemeOptionProvider>
>({
  option: 'system',
  setter: () => {},
});

export const useThemeOption = () => useContext(ThemeOptionContext).option;
export const useSetThemeOption = () => useContext(ThemeOptionContext).setter;
