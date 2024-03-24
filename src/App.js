import React, { useState, useEffect, useRef } from "react";
import axios from "axios"; // Assuming axios is installed
import { CharacterCard } from "./component/CharacterCard";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [characters, setCharacters] = useState([]);
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const prevInputValueRef = useRef("");
  const handleInputChange = (event) => {
    const newInputValue = event.target.value;
    setSearchTerm(newInputValue);
    prevInputValueRef.current = newInputValue;
  };

  const handleKeyDown = (event) => {
    const { selectionStart } = event.target;

    if (event.key === "Backspace" && selectionStart === 0) {
      if (prevInputValueRef.current.length > 0) {
        const newSelectedCharacters = [...selectedCharacters];
        newSelectedCharacters.pop();
        setSelectedCharacters(newSelectedCharacters);
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const url = `https://rickandmortyapi.com/api/character/?name=${searchTerm}`;
        const response = await axios.get(url);
        setCharacters(response.data.results);
      } catch (error) {
        console.error("Error fetching characters:", error);
        setError("Failed to load characters. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);
  const handleChange = (character) => {
    setSearchTerm("");
    const isAlreadyExists = selectedCharacters.filter(
      (char) => char === character
    );

    if (isAlreadyExists.length > 0) {
      setSelectedCharacters(
        selectedCharacters.filter(
          (selectCharacter) => selectCharacter !== String(character)
        )
      );
    } else {
      setSelectedCharacters([...selectedCharacters, character]);
    }
  };
  const handleClick = (character) => {
    setSelectedCharacters(
      selectedCharacters.filter((char) => char !== character)
    );
  };
  const highlightMatch = (name, inputValue) => {
    const index = name.toLowerCase().indexOf(inputValue.toLowerCase());
    if (index !== -1) {
      return (
        <span>
          {name.slice(0, index)}
          <b>{name.slice(index, index + inputValue.length)}</b>
          {name.slice(index + inputValue.length)}
        </span>
      );
    } else {
      return name;
    }
  };
  return (
    <div className="bg-stone-800 w-full min-h-screen flex flex-col items-center">
      <div className="border-2 w-[600px] flex flex-wrap gap-1 p-1 border-stone-800 bg-white">
        {selectedCharacters &&
          selectedCharacters.map((character) => (
            <span className="bg-emerald-300 rounded-lg relative px-3 py-1">
              {character}
              <span
                onClick={() => handleClick(character)}
                className=" text-[14px] absolute top-[-5px] right-1"
              >
                x
              </span>
            </span>
          ))}
        <input
          type="text"
          placeholder="Search character..."
          onKeyDown={handleKeyDown}
          value={searchTerm}
          onChange={handleInputChange}
          className="border-0 outline-none p-1"
        />
      </div>
      {isLoading && <p>Loading characters...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {searchTerm &&
        characters?.map((character) => (
          <CharacterCard
            handleChange={handleChange}
            selectedCharacters={selectedCharacters}
            character={character}
            displayName={highlightMatch(character.name, searchTerm)}
          />
        ))}
    </div>
  );
}

export default App;
