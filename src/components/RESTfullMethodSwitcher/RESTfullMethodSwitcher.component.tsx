'use client';

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { SelectGroup } from '@radix-ui/react-select';

interface MethodSwitcherProps {
  method: string | undefined;
  onChange: (v: string) => void;
}

export default function MethodSwitcher({ method, onChange }: MethodSwitcherProps): JSX.Element {
  const Methods: string[] = ['GET', 'PUT', 'POST', 'DELETE'];

  const [selectedMethod, setselectedMethod] = useState(method || 'GET');

  const handleMethodChange = (value: string) => {
    setselectedMethod(value);
    onChange(value);
  };

  return (
    <Select onValueChange={e => handleMethodChange(e as string)} value={selectedMethod}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a method" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Method</SelectLabel>
          {Methods.map((method, i) => (
            <SelectItem key={i} value={method}>
              {method}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
