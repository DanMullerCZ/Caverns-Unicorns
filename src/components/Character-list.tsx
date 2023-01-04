import React from 'react';
import Link from 'next/link';

const Characters = ({ characters }: { characters: any }) => {
  return (
    <>
      <div>
        {characters.map((e) => (
          <div key={e.id}>
            {e.name}
            <br />
            {e.race.name}
            <br />
            {e.class.name}
          </div>
        ))}
        <Link href="/character-creation">
          <button
            className="w-full rounded-md bg-blue-600 px-10 py-2 text-white
            duration-300 ease-in hover:bg-blue-500 hover:drop-shadow-md"
          >
            create new char
          </button>
        </Link>
      </div>
    </>
  );
};

export default Characters;
