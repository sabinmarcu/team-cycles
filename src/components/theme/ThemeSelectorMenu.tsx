'use client';

import { themeOptions } from '@/theme/themes';
import type { ThemeOption } from '@/theme/types';
import type { ChangeEvent } from 'react';
import './ThemeSelectorMenu.css';

const getThemeOptionId = (option: string) => `theme-option-${option}`;

export const ThemeSelectorMenu = ({
  onChange,
}: { onChange: (input: ThemeOption) => void }) => {
  const changeHandler = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    onChange(value as any);
  };
  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} className="btn btn-square theme-options" type="button">
        {Object.entries(themeOptions).map(([option, { icon: Icon }]) => (
          <div className="theme-option" data-theme-option={option} key={option}>
            <Icon />
          </div>
        ))}
      </button>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-2xl bg-base-300 rounded-box w-48">
        {Object.entries(themeOptions).map(([option, { name, icon: OptionIcon }]) => (
          <li key={option}>
            <label
              htmlFor={getThemeOptionId(option)}
              className="label theme-controller btn btn-sm btn-block justify-start my-1 py-0"
              data-theme-option={option}
            >
              <OptionIcon />
              {name}
              <input
                type="radio"
                id={getThemeOptionId(option)}
                name="theme-dropdown"
                className="theme-controller hidden"
                aria-label={name}
                value={option}
                onChange={changeHandler}
              />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
