import React from "react";

export const CharacterCard = ({
  character,
  selectedCharacters,
  handleChange,
  displayName,
}) => {
  const includeOnList = selectedCharacters.filter(
    (name) => name === character.name
  );
  return (
    <div className="flex relative gap-2 bg-stone-200 w-[600px] p-2 rounded-md  mb-1">
      <div className="p-1">
        <input
          onChange={() => handleChange(character.name)}
          checked={includeOnList.length > 0}
          type="checkbox"
          name="isSelected"
          id="isSelected"
        />
      </div>
      <img
        src={character.image}
        className="h-10 w-10"
        alt={`${character.name}`}
      />
      <span className="bg-sky-300 absolute top-0 right-0">
        {character.episode.length} episodes
      </span>
      <span key={character.id}>{displayName}</span>
    </div>
  );
};
