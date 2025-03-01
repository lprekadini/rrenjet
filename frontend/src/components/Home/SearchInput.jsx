import React, { useState, useEffect, useRef } from 'react';

const SearchInput = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);


  const inputRef = useRef(null);

  // Mocked suggestions (could be fetched from an API)
  const allSuggestions = [
    'Adem Jashari',
    'Adem Prekadini',
    'Skenderbeu',
    'Date',
    'Elderberry',
    'Fig',
    'Grape',
    'Honeydew',
  ];

  // Handle input change
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length >= 3) {
      const filteredSuggestions = allSuggestions.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
      setActiveIndex(0);
    } else {
      setShowSuggestions(false);
    }
  };

  // Handle selection
  const handleSelect = (value) => {
    setQuery(value);
    setShowSuggestions(false);
    console.log('Search for:', value); // Replace with your search logic
  };

  // Handle keyboard events
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setActiveIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === 'ArrowUp') {
      setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    } else if (e.key === 'Enter') {
      if (suggestions.length > 0) {
        handleSelect(suggestions[activeIndex]);
      }
    }
  };

   // Focus input on Cmd + K (Mac) or Ctrl + K (Windows/Linux)
   useEffect(() => {
    const handleShortcut = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current.focus();
      }
    };

    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
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
                key={item}
                className={`px-4 py-2 cursor-pointer ${
                  index === activeIndex ? 'border rounded-md border-indigo-400 bg-indigo-100' : 'hover:bg-gray-100'
                }`}
                onMouseDown={() => handleSelect(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
