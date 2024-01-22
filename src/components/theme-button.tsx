'use client'

import { useTheme } from 'next-themes';
import { Button } from './ui/button';
import { MoonIcon, SunIcon } from 'lucide-react'

export default function ThemeButton() {
  const { theme, setTheme } = useTheme()

  const handleTheme = () => {
    if (theme === 'dark') setTheme('light')
    else setTheme('dark')
  }

  return (
    <Button variant='outline' size='sm' onClick={handleTheme}>
      {theme === 'light' ? <MoonIcon size={16} /> :  <SunIcon size={16} />}
    </Button>
  );
}
