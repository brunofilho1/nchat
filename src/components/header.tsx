'use server';

import ThemeButton from './theme-button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import SignInButton from './signin-button';
import UserMenuDropdown from './user-menu-dropdown';

// eslint-disable-next-line @next/next/no-async-client-component
const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="h-12 border border-b px-4 py-1 flex items-center justify-between">
      <span>Nchat</span>
      <div className='flex items-center space-x-2'>
        <ThemeButton />
        {session ? (
          <UserMenuDropdown />
        ) : (
          <SignInButton />
        )}        
      </div>
    </header>
  );
}

export default Header
