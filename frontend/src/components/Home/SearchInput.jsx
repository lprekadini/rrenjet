import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const inputRef = useRef(null);

  // Handle input change
  const handleChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length >= 3) {
      try {
        const response = await fetch(
          `http://localhost:5001/api/personalities/search?q=${value}`
        );
        const data = await response.json();
        setSuggestions(data);
        setShowSuggestions(true);
        setActiveIndex(0);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setShowSuggestions(false);
    }
  };

  // Handle selection
  const handleSelect = (value) => {
    setQuery(value);
    setShowSuggestions(false);
    navigate(`/explore/single/${value.id}`);
  };

  // Handle keyboard events
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === "Enter") {
      if (suggestions.length > 0) {
        handleSelect(suggestions[activeIndex]);
      }
    }
  };

  // Focus input on Cmd + K (Mac) or Ctrl + K (Windows/Linux)
  useEffect(() => {
    const handleShortcut = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current.focus();
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <div className="mt-10 flex items-center justify-center gap-x-6">
      <div className="mt-2 w-full relative">
        <div className="flex rounded-md bg-white outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
          <input
            id="search"
            ref={inputRef}
            autoComplete="off"
            name="search"
            type="text"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="block min-w-0 grow px-3 py-1.5 text-lg text-gray-900 placeholder:text-gray-400 focus:outline-none"
            placeholder="Search..."
          />
          <div className="flex py-1.5 pr-1.5">
            <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
              ⌘K
            </kbd>
          </div>
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg">
            {suggestions.map((item, index) => (
              <li
                key={item.id}
                className={`px-4 py-2 cursor-pointer ${
                  index === activeIndex
                    ? "border rounded-md border-indigo-400 bg-indigo-100"
                    : "hover:bg-gray-100"
                }`}
                onMouseDown={() => handleSelect(item)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
