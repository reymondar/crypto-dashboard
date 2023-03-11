import React from "react";

import { Input } from "../Input/Input";

type barProps = {
  setCoin?: (coin: string) => void;
};
export const SearchBar = ({ setCoin }: barProps) => {
  //Coins data base

  const handleClick = (coin: string) => {
    //set the coin in the index.ts
    setCoin(coin);
  };

  return (
    <form>
      <Input handleClick={handleClick} />
    </form>
  );
};
