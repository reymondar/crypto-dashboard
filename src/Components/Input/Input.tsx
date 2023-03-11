import { useState, useContext } from "react";

type Coins = {
  id: string;
  image: string;
};

type InputPros = {
  handleClick: (e: string) => void;
};

export const Input = ({ handleClick }: InputPros) => {
  const coinDB = useContext(coinContext);

  //User search
  const [search, setSearch] = useState("");
  //Display ? open
  const [isOpen, setIsOpen] = useState(false);

  const [coinSearch, setCoinSearch] = useState([]);

  const handleChange = (e) => {
    let typed: string = e.target.value.toLowerCase().join("");
    setSearch(typed);
    setCoinSearch(coinDB.filter((coin) => coin.id.includes(typed)));
  };

  const handleFocus = () => setIsOpen((prev) => !prev);

  const sendClick = (e) => {
    handleClick(e.target.value);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsOpen((prev) => !prev);

      setSearch("");
      setCoinSearch([]);
    }, 300);
  };

  return (
    <>
      <input
        name="search"
        placeholder="Search Any Things"
        value={search}
        onChange={handleChange}
        onFocus={handleFocus}
      />
      {isOpen
        ? coinSearch.map((coin) => {
            return (
              <button
                key={coin.id}
                style={{ display: "flex" }}
                onClick={sendClick}
                value={coin.id}
              >
                {coin.name}
                <img src={coin.image} alt={coin.id} style={{ width: "20px" }} />
              </button>
            );
          })
        : ""}
    </>
  );
};
