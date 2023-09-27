import React from 'react';
import SearchInput from './SearchInput';
import CreateProductButton from './CreateProductButton';

const Header = () => {
  return (
    <div className="space-y-4 md:space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Inventory App</h1>
        <a
          href="https://github.com/lukasjoho/inventory-app"
          className="cursor-pointer text-sm text-blue-500 hover:underline"
          target="_blank"
        >
          View Github project
        </a>
      </div>
      <div className="flex flex-col justify-between gap-2 md:flex-row md:gap-8">
        <SearchInput />
        <CreateProductButton />
      </div>
    </div>
  );
};

export default Header;
