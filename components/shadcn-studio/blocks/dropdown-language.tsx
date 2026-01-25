'use client';

import * as React from 'react';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LanguageDropdownProps {
  trigger: React.ReactNode;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
];

export default function LanguageDropdown({ trigger }: LanguageDropdownProps) {
  const [selectedLanguage, setSelectedLanguage] = React.useState('en');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setSelectedLanguage(lang.code)}
            className="flex items-center gap-2"
          >
            <span>{lang.flag}</span>
            <span className="flex-1">{lang.name}</span>
            {selectedLanguage === lang.code && (
              <CheckIcon className="size-4" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
