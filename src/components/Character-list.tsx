import React from 'react';
import Link from 'next/link';

const Characters = ({ characters }: { characters: any }) => {
  return (
    <>
      <section className="flex justify-end">
        <div className="flex h-screen w-1/4 flex-col border border-solid border-black text-center">
          {characters.map((e) => (
            <div className="border border-solid" key={e.id}>
              <p className="text-2xl">{e.name}</p>
              <p>
                {e.race.name} {e.class.name}
              </p>
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
      </section>
    </>
  );
};

export default Characters;
