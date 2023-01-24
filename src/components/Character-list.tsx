import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Character-list.module.css';
import UserSettings from './userSettings/UserSettings';
import { useSession } from 'next-auth/react';
import { contextProps } from '@trpc/react-query/dist/internals/context';
import NavigationBar from './NavigationBar';
import VideoBackground from './VideoBackground';

const CharactersDetail = ({ characters }: { characters: any }) => {
  console.log(characters)
  const [hero, setHero] = useState({
    name: characters[0]?.name || '',
    race: characters[0]?.race || '',
    class: characters[0]?.class || '',
    id: characters[0]?.id || 0,
  });
  
  useEffect(()=>{
    if (localStorage.getItem("char_id")){
    for (let i=0;i<characters.length;i++){
      if (characters[i].id.toString()==localStorage.getItem("char_id")){
        setHero({
        name: characters[i].name,
        race: characters[i].race,
        class: characters[i].class,
        id: characters[i].id,
      })}

      }
    }
  },[])

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
            {hero.race && <Image
              className="rounded-lg"
              src={`/${hero.race}.png`}
              alt={`${hero.race}`}
              width={200}
              height={200}
            />
            }
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
            <button
              className="gold"
            >
              Start the Game
            </button>
          </Link>
          {characters &&
            characters.map((e: any) => (
              <div
                onClick={() => handleClick(e.name, e.race, e.class, e.id)}
                className="gold oneHero col-start-4 col-end-5 row-span-1 flex cursor-pointer items-center justify-between pl-10 pr-20 rounded-xl bg-white p-4 drop-shadow"
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
                  className="h-8 w-8 rounded-lg"
                  src={`/iconsClasses/${e.class}-icon.jpeg`}
                  alt={`${e.class}`}
                  width={15}
                  height={15}
                />
              </div>
            ))}
          <Link className={styles.createButton} href="/character-creation">
            <button
              className="gold"
            >
              Create new character
            </button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default CharactersDetail;
