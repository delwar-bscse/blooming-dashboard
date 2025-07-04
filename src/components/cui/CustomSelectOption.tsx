"use client"

import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter, useSearchParams } from 'next/navigation';

type TSelectOptions = {
  value: string;
  label: string;
}


const CustomSelectOption = ({ selectOptions, placeHolderValue, queryKey }: { selectOptions: TSelectOptions[], placeHolderValue: string, queryKey: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedValue = searchParams.get(queryKey);

  return (
    <Select
      onValueChange={value => {
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        params.set(queryKey, value);
        router.push(`?${params.toString()}`);
      }}
    >
      <SelectTrigger className="cursor-pointer">
        <SelectValue placeholder={selectedValue || placeHolderValue} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {selectOptions.map((option) => (
            <SelectItem key={option.value} value={option.value} className='cursor-pointer'>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default CustomSelectOption