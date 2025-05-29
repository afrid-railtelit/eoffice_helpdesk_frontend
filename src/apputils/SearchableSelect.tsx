/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

export type searchableSelectDataType = {
  key: string;
  value: string;
};

interface SearchableSelectInterface {
  data: searchableSelectDataType[];
  onSelect: (item: searchableSelectDataType) => void;
  isDisabled?: boolean;
  label: string;
  errorMessage?: string;
  register?: any;
  name?: string;
  error?: string;
  clear?: boolean;
  icon?: string;
  mandatory?: boolean;
  value?: string;
}

function SearchableSelect({
  data,
  onSelect,
  isDisabled,
  label,
  errorMessage,
  name,
  register,
  error,
  clear,
  icon,
  mandatory,
  value,
}: SearchableSelectInterface) {
  const [clickedInput, setClickedInput] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [inputValue, setInputValue] = useState<string>("");
  const [mainData, setMainData] = useState<
    searchableSelectDataType[] | undefined
  >(undefined);

  useEffect(() => {
    setMainData(data);

    if (clear) {
      setInputValue("");
    }
    if (value) {
      setInputValue(value ? value : "");
    }
  }, [data, clear, value]);

  function handleSelectItem(item: searchableSelectDataType) {
    setInputValue(item.key);
    setClickedInput(false);
    setHighlightedIndex(-1);
    onSelect(item);
  }

  function handleSearch(event: any) {
    setInputValue(event?.target?.value);
    setClickedInput(true);
    const value = event?.target?.value?.toLowerCase()?.trim();
    const filteredData = data?.filter((item) =>
      item?.key?.toLowerCase()?.includes(value)
    );
    setMainData(filteredData);
    setHighlightedIndex(-1);
  }

  function handleKeyDown(event: any) {
    if (!mainData || mainData.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex(
        highlightedIndex < mainData.length - 1 ? highlightedIndex + 1 : 0
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex(
        highlightedIndex > 0 ? highlightedIndex - 1 : mainData.length - 1
      );
    } else if (event.key === "Enter" && highlightedIndex >= 0) {
      event.preventDefault();
      handleSelectItem(mainData[highlightedIndex]);
    }
  }

  return (
    <div className="relative    rounded-md w-[20vw]">
      <div
        className="flex items-center w-[20vw] justify-center relative"
        onClick={() => {
          if (!isDisabled) {
            setClickedInput(!clickedInput);
          }
        }}
      >
        <Input
          {...(register &&
            register(name, {
              required: error,
            }))}
          mandatory={mandatory}
          className=" lg:w-[20vw] "
          onBlur={() => setClickedInput(false)}
          onChange={handleSearch}
          disabled={isDisabled}
          onKeyDown={handleKeyDown}
          value={inputValue ? inputValue : ""}
          about={label}
          placeholder={label}
          id={label}
          aria-label={label}
          errorMessage={errorMessage}
          icon={icon}
          noErrorMessage={!error}
        />
        {!clickedInput ? (
          <IoIosArrowDown
            className={`absolute right-2.5 w-4 h-4 ${error && "top-3"} ${
              isDisabled && "text-foreground/30"
            }   `}
          />
        ) : (
          <MdOutlineKeyboardArrowUp
            className={`absolute right-2 w-5 h-5   ${error && "top-3"} ${
              isDisabled && "text-foreground/30"
            }`}
          />
        )}
      </div>

      <div
        className={`fixed bg-white mt-1 ${
          mandatory && "-ml-2"
        } w-[20vw] border border-gray-300 rounded-md shadow-lg transform transition-all duration-300  origin-top z-[60]  ${
          clickedInput
            ? "opacity-100 scale-y-100 max-h-60 overflow-y-auto"
            : "opacity-0 scale-y-0 max-h-0 overflow-hidden"
        }`}
      >
        {mainData && mainData?.length > 0 ? (
          mainData?.map((item: searchableSelectDataType, index: number) => (
            <div
              key={index}
              onMouseDown={() => handleSelectItem(item)}
              className={`cursor-pointer text-foreground px-3 py-2 ${
                index === highlightedIndex ? "bg-gray-200" : ""
              } hover:bg-gray-100`}
            >
              {item.key}
            </div>
          ))
        ) : (
          <div className="px-3 py-2 text-gray-500"> No results!</div>
        )}
      </div>
    </div>
  );
}

export default SearchableSelect;
