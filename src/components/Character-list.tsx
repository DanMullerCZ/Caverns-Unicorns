import React from 'react';
import Link from 'next/link';
import Image from 'next/image'

const Characters = ({ characters }: { characters: any }) => {
  const [hero, setHero] = React.useState({
    name: characters[0].name ,
    race: characters[0].race.name,
    class: characters[0].class.name
  })

  const handleClick = (name: string, race: string, nameOfClass: string) => {
    setHero(hero => ({
      name: name,
      race: race,
      class: nameOfClass
    })
  )};

  return (
    <>
      <section className="">
        <div className="w-screen h-screen grid grid-cols-4 grid-rows-4 ">
          <div>
            <p>{hero.name}</p>
            <p>{hero.race}</p>
            <p>{hero.class}</p>
          </div>
          <div className="col-start-4 col-end-5">
            {characters.map((e) => (
              <div
                onClick={() => handleClick(e.name, e.race.name, e.class.name)}
                className="cursor-pointer rounded-xl bg-white p-4 drop-shadow"
                key={e.id}
              >
                <p className="text-2xl">{e.name}</p>
                <p>
                  <span className="text-gray-400">
                    {e.race.name} {e.class.name}
                  </span>
                  <Image src={`/iconsClasses/${e.class.name}-icon.jpeg`} alt="dfa" width={15} height={15} />
                </p>
              </div>
            ))}
          </div>
          <Link
            className="col-start-4 col-end-5 row-start-4 row-end-5 pb-8"
            href="/character-creation"
          >
            <button
              className="w-full rounded-md bg-blue-600 px-10 py-4 text-white
                duration-300 ease-in hover:bg-blue-500 hover:drop-shadow-md"
            >
              Create new character
            </button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Characters;
