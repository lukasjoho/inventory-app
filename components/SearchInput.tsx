'use client';
import React, { useCallback } from 'react';
import { Input } from './ui/input';
import { Search } from 'lucide-react';
import debounce from 'lodash.debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const SearchInput = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value === '' || value === undefined) {
        params.delete(name);
        return params.toString();
      }
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );
  const handleChange = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      router.push(pathname + '?' + createQueryString('search', e.target.value));
    }, 150),
    []
  );
  return (
    <div>
      <Input
        placeholder="Search product..."
        onChange={handleChange}
        className="md:w-[240px]"
      />
    </div>
  );
};

export default SearchInput;
