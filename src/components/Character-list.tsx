import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Character-list.module.css';
import UserSettings from './userSettings/UserSettings';

const Characters = ({ characters }: { characters: any }) => {
  const [hero, setHero] = useState({
    name: characters[0].name,
    race: characters[0].race,
    class: characters[0].class,
  });

  const handleClick = (name: string, race: string, nameOfClass: string) => {
    setHero({
      name: name,
      race: race,
      class: nameOfClass,
    }
    );
  };

  return (
    <>
      <UserSettings />
      <section className="">
        <div className={styles.container}>
          <div className={styles.heroDisplay}>
            <Image

                className="rounded-lg"
                src={`/${hero.race}.png`}
                alt={`${hero.race}`}
                width={200}
                height={200}
              />

            <div className="">
              <p className="text-2xl">{hero.name}</p>
              <p>
                <span className="text-gray-400">
                  {hero.race} {hero.class}
                </span>
              </p>

            </div>
          </div>
          <Link className={styles.startGameButton} href="/character-creation">
            <button
              className="w-full rounded-md bg-blue-600 px-10 py-4 text-white
                duration-300 ease-in hover:bg-blue-500 hover:drop-shadow-md"
            >
              Start the Game
            </button>
          </Link>
          {characters.map((e: any) => (
            <div
              onClick={() => handleClick(e.name, e.race, e.class)}
              className="flex justify-around items-center col-start-4 col-end-5 row-span-1 cursor-pointer rounded-xl bg-white p-4 drop-shadow"
              key={e.id}
            >
              <div>
                <p className="text-2xl">{e.name}</p>
                <p>
                  <span className="text-gray-400">
                    {e.race} {e.class}
                  </span>
                </p>
              </div>
              <Image
                className="w-8 h-8 rounded-lg"
                src={`/iconsClasses/${e.class}-icon.jpeg`}
                alt={`${e.class}`}
                width={15}
                height={15}
              />
            </div>
          ))}
          <Link className={styles.createButton} href="/character-creation">
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
