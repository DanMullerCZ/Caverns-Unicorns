import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Character-list.module.css';
import NavigationBar from './NavigationBar';
import VideoBackground from './VideoBackground';

type HeroList = {
  name: string;
  race: string;
  class: string;
  id: number;
}

const CharactersDetail = ({ characters, handleDeletion }: { characters: any, handleDeletion: Function }) => {
  console.log(characters);
  const [hero, setHero] = useState<HeroList>({
      name: '',
      race: '',
      class: '',
      id: 0,
    }
  );

  useEffect(() => {
    if (localStorage.getItem('char_id')) {
      for (let i = 0; i < characters.length; i++) {
        if (characters[i].id.toString() == localStorage.getItem('char_id')) {
          setHero({
            name: characters[i].name,
            race: characters[i].race,
            class: characters[i].class,
            id: characters[i].id,
          });
        } else {
          setHero({
            name: characters[0].name,
            race: characters[0].race,
            class: characters[0].class,
            id: characters[0].id,
          });
        }
      }
    }
  }, [characters]);

  const handleClick = (
    name: string,
    race: string,
    nameOfClass: string,
    id: number,
  ) => {
    setHero({
      name: name,
      race: race,
      class: nameOfClass,
      id: id,
    });
    localStorage.setItem('char_id', id.toString());
  };

  return (
    <>
      <NavigationBar />
      <VideoBackground />
      <section className="font-LOTR">
        <div className={styles.container}>
          <div className={styles.heroDisplay}>
            {hero.race && (
              <Image
                className="rounded-lg"
                src={`/${hero.race}.png`}
                alt={`${hero.race}`}
                width={200}
                height={200}
              />
            )}
            <div className="gold">
              <p className="text-2xl">{hero.name}</p>
              <p>
                <span className="text-gray-400">
                  {hero.race} {hero.class}
                </span>
              </p>
            </div>
          </div>
          <Link className={styles.startGameButton} href="/lobby">
            <button className="gold">Start the Game</button>
          </Link>
          {characters &&
            characters.map((e: any, index: number) => (
              <div
                onClick={() => handleClick(e.name, e.race, e.class, e.id)}
                className="gold oneHero col-start-4 col-end-5 row-span-1 flex cursor-pointer items-center justify-between rounded-xl bg-white p-4 pl-10 pr-10 drop-shadow"
                key={e.id}
              >
                <div>
                  <p className="text-2xl">{e.name}</p>
                  <p>r
                    <span className="text-gray-400">
                      {e.race} {e.class}
                    </span>
                  </p>
                </div>
                <div className="flex gap-5">
                  <Image
                    className="h-8 w-8 rounded-lg"
                    src={`/iconsClasses/${e.class}-icon.jpeg`}
                    alt={`${e.class}`}
                    width={15}
                    height={15}
                  />
                  <Image 
                    className="h-8 w-8 rounded-lg"
                    src={`/deleteCross.png`}
                    alt={`${e.class}`}
                    width={15}
                    height={15}
                    onClick={(event) => {event.stopPropagation(); handleDeletion(e.id, index)}}
                  />  
                </div>
              </div>
            ))}
          <Link className={styles.createButton} href="/character-creation">
            <button className="gold">Create new character</button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default CharactersDetail;
