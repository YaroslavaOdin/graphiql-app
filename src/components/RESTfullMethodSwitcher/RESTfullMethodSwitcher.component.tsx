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

export default function MethodSwitcher(props: { onChange: (v: string) => void }): JSX.Element {
  const Methods: string[] = ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'];
  const [selectedMethod, setselectedMethod] = useState('');

  const handleMethodChange = (value: string) => {
    setselectedMethod(value);
    props.onChange(value);
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
