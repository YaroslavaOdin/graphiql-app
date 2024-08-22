'use client';

import { i18n } from '../../../i18n.config';
import { usePathname, useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { SelectGroup } from '@radix-ui/react-select';
import { useState } from 'react';
import { Locale } from '../../../i18n.config'

interface LanguageSwitcherProps {
  lang: Locale
}

function LanguageSwitcher({lang}:LanguageSwitcherProps) {
  const pathName = usePathname();
  const router = useRouter();

  const [selectedLocale, setSelectedLocale] = useState(lang);

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const handleLanguageChange = (value:Locale) => {
    setSelectedLocale(value);
    router.push(redirectedPathName(value));
  };



  return (
    <Select  onValueChange={e=> handleLanguageChange(e as Locale)} value={selectedLocale}>
      <SelectTrigger className="w-32">
        <SelectValue defaultValue={lang} />
      </SelectTrigger>
      <SelectContent >
        <SelectGroup defaultValue={lang}>
          {i18n.locales.map((locale, i) => (
            <SelectItem key={i} value={locale}>
              {locale}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default LanguageSwitcher;
