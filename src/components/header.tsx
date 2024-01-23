'use server';

import ThemeButton from './theme-button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import UserMenuDropdown from './user-menu-dropdown';

const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="h-12 border border-b px-4 py-1 flex items-center justify-between">
      <span>Nchat</span>
      <div className='flex items-center space-x-2'>
        <ThemeButton />
        {session && <UserMenuDropdown />}     
      </div>
    </header>
  );
}

export default Header
