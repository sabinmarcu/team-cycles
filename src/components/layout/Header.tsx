import { ThemeSelector } from '@/components/theme/ThemeSelector';
import { AuthenticationButton } from '../auth/Authentication';
import { GoHomeButton } from './GoHomeButton';

export const Header = () => (
  <header className="flex items-center justify-center w-full pt-2 pb-4 xl:pt-8 xl:pb-16 sticky top-0 z-50">
    <nav className="navbar bg-base-100 container rounded-box flex min-h-[4rem] flex-wrap items-center justify-center gap-2 bg-cover bg-top p-4 shadow-xl">
      <GoHomeButton />
      <h1 className="flex-1 text-xl inline-block align-middle">Team Rotation</h1>
      <div className="flex-none flex items-center justify-center gap-2">
        <AuthenticationButton />
        <ThemeSelector />
      </div>
    </nav>
  </header>

);
