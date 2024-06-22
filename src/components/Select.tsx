import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { ChevronDownIcon } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface SelectInputProps {
  id: string;
  value: string;
  onChange: (selectedValue: string) => void;
  options: Option[];
  className?: string;
  placeholder?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  id,
  value,
  onChange,
  options,
  className = "",
  placeholder = "Selecione",
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(value);
  const [searchTerm, setSearchTerm] = useState("");
  const [showList, setShowList] = useState(false);
  const comboboxContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedValue(value); // Atualiza o estado interno se a propriedade 'value' mudar externamente
  }, [value]);

  useEffect(() => {
    const closeDropdown = (event: MouseEvent) => {
      if (
        comboboxContainer.current &&
        !comboboxContainer.current.contains(event.target as Node)
      ) {
        setShowList(false);
      }
    };

    window.addEventListener("click", closeDropdown);

    return () => {
      window.removeEventListener("click", closeDropdown);
    };
  }, []);

  const toggleDropdown = () => {
    setShowList(!showList);
  };

  const selectOption = (option: Option) => {
    setSelectedValue(option.value);
    onChange(option.value);
    setShowList(false);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDoneClick = () => {
    setShowList(false);
  };

  return (
    <div className={`flex items-center justify-center bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-100 w-full ${className}`}>
      <div className="relative mx-6 w-96  h-10  sm:mx-auto" aria-haspopup="listbox" role="combobox" aria-expanded={showList} ref={comboboxContainer}>
        <div>
          <button
            onClick={toggleDropdown}
            className="relative flex w-full items-center justify-start rounded-md border border-input bg-white px-3 py-2 ring-offset-background  dark:border-slate-600 dark:bg-slate-900 dark:focus:ring-indigo-700"
            aria-controls="tags-dropdown"
            aria-labelledby="tags-label"
          >
            <div className="flex items-start gap-2">
              {selectedValue ? (
                <span className="inline-flex items-start rounded bg-indigo-100 px-2 py-0.5 text-sm dark:bg-indigo-700">
                  {selectedValue}
                </span>
              ) : (
                <p className="text-sm">{placeholder}</p>
              )}
            </div>
            <span className="absolute right-3 top-1/2 -translate-y-1/2" aria-hidden="true">
              <ChevronDownIcon className={`size-6 transition-transform duration-500 ${showList ? "rotate-180" : "rotate-0"}`} />
            </span>
          </button>

          {showList && (
            <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg border border-slate-300 bg-white shadow-md dark:border-slate-600 dark:bg-slate-900">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchTermChange}
                placeholder="Search Interest"
                className="w-full rounded-t-lg border-b bg-white px-3 py-2 focus:border-indigo-400 focus:outline-none dark:border-slate-600 dark:bg-slate-900 dark:focus:border-indigo-700"
              />
              <div className="max-h-96 overflow-y-auto">
                {filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => selectOption(option)}
                    onKeyPress={(e) => e.key === " " && selectOption(option)}
                    className="flex cursor-pointer items-center gap-3 px-3 py-2 hover:bg-indigo-500 hover:text-white focus:outline-none dark:hover:bg-indigo-700"
                    role="option"
                    aria-selected={option.value === selectedValue}
                    tabIndex={0}
                  >
                    <input
                      type="checkbox"
                      id={option.value}
                      checked={option.value === selectedValue}
                      className="size-5 cursor-pointer accent-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-700"
                    />
                    <label htmlFor={option.value} className="pointer-events-none">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-300 px-3 py-2 text-right dark:border-slate-600">
                <button
                  onClick={handleDoneClick}
                  className="rounded-md bg-indigo-500 px-3 py-1 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:bg-indigo-700 dark:focus:ring-indigo-500"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectInput;
