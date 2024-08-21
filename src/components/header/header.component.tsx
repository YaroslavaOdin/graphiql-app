import React from 'react'
import Link from "next/link"
import { getDictionary } from '../../lib/dictionary'
import { Locale } from '../../../i18n.config'
import LanguageSwitcher from '../languageSwitcher/languageSwitcher.component'


interface HeaderProps {
  lang: Locale
}


async function Header({lang}:HeaderProps) {
  const { navigation } = await getDictionary(lang)
  return (
    <header>
      <nav className='flex justify-center gap-4 p-4 bg-green-300'>
        
      <Link href={`/${lang}`}>{navigation.home}</Link>
      <Link href={`/${lang}/about`}>{navigation.about}</Link>
      <LanguageSwitcher />
      </nav>
    </header>
  )
}

export default Header