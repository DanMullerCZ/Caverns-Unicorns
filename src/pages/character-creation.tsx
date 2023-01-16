import React, { useState, useEffect, useRef } from 'react';
import ClassList from 'components/ClassList';
import RaceList from 'components/RaceList';
import styles from '../styles/character-creation.module.css';
import { trpc } from 'utils/trpc';
import { useSession } from 'next-auth/react';
import { appRouter } from 'server/routers/_app';
import superjson from 'superjson';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import Head from 'next/head';
import Attribute from 'components/Attribute';
import VideoBackground from 'components/VideoBackground';

const createNewChar = () => {
  const dataRaces = trpc.dbRouter.getAllRaces.useQuery();
  const races = dataRaces.data;
  console.log(races);
  const dataClasses = trpc.dbRouter.getAllClasses.useQuery();
  const classes = dataClasses.data;
    // eslint-disable-next-line react-hooks/rules-of-hooks
  const sessionData = useSession();
    // eslint-disable-next-line react-hooks/rules-of-hooks
  const [confirmAtr, setConfirmAtr] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
  const nameOfChar = useRef<HTMLInputElement>(null);
  type CharacterProperties = 'str' | 'con' | 'dex' | 'int' | 'wis' | 'char';
  const arr: CharacterProperties[] = [
    'str',
    'dex',
    'con',
    'wis',
    'char',
    'int',
  ];
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedRace, setSelectedRace] = useState(1);
    // eslint-disable-next-line react-hooks/rules-of-hooks
  const [character, setCharacter] = useState({
    race: '',
    class: '',
    str: 10,
    con: 10,
    dex: 10,
    int: 10,
    wis: 10,
    char: 10,
  });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [atrPoints, setAtrPoints] = useState(5);

  const setRace = (x: string, i: number) => {
    const updatedRace = { race: x };
    setCharacter((character) => ({
      ...character,
      ...updatedRace,
    }));
    setSelectedRace(i - 1);
  };
  const confirmation = () => setConfirmAtr(true);

  const resetChar = () => {
    setCharacter({
      class: '',
      race: '',
      str: 10,
      con: 10,
      dex: 10,
      int: 10,
      wis: 10,
      char: 10,
    });
    setConfirmAtr(false);
    setAtrPoints(5);
  };
  const setClass = (x: string) => {
    const updatedClass = { class: x };
    setCharacter((character) => ({
      ...character,
      ...updatedClass,
    }));
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (races){
      arr.forEach((e) => {
        setCharacter((character) => ({
          ...character,
          ...{ [e]: 10 + races[selectedRace][e] },
        }));
      });
    }
  }, [character.race]);

  const addChar = trpc.backend.addChar.useMutation();

  const createChar = async () => {
    if (sessionData.data?.user?.id && nameOfChar.current?.value){
      addChar.mutate({
        class: character.class,
        race: character.race,
        user_id: sessionData.data.user.id,
        name: nameOfChar.current.value,
        str: character.str,
        dex: character.dex,
        con: character.con,
        int: character.int,
        wis: character.wis,
        char: character.char,
      });
    }
  };
  const setPoints = (x: number) => {
    setAtrPoints((atrPoints) => atrPoints + x);
  };

  if (addChar.isSuccess) {
    window.location.href = 'character-list';
  }
  if (addChar.isError) {
    window.alert(addChar.error.message);
  }
  return (
    <>
      <Head>
        <title>Create new hero</title>
      </Head>
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <VideoBackground/>
        {(!character.race || !character.class) && (
          <div test-id="creation-container">
            {!character.race && races && (
              <div test-id="race-selection">
                <h1>SELECT RACE</h1>
                <RaceList setRace={setRace} creation={true} races={races} />
              </div>
            )}
            {!character.class && character.race && classes && (
              <div test-id="class-selection">
                <h1>Race: {character.race}</h1>
                <h1>SELECT CLASS</h1>
                <ClassList
                  creation={true}
                  setClass={setClass}
                  classes={classes}
                />
              </div>
            )}
          </div>
        )}
        {character.race && character.class && !confirmAtr && (
          <>
            <div className="w-1/5 rounded-xl bg-yellow-700 p-4 bg-contain bg-center bg-no-repeat bg-opacity-75" style={{ backgroundImage: `url(/${character.class}.png)` }}>
              <h1 className="m-1 text-3xl">Race: {character.race}</h1>
              <h1 className="m-1 text-3xl">Class: {character.class}</h1>
              <label className="m-1 text-3xl">
                Remaining atributte points:{' '}
                <input
                  value={atrPoints}
                  readOnly
                  className="mr-1 w-10 rounded border"
                />
              </label>

              {arr.map((e: CharacterProperties) => (
                <Attribute
                  key={e}
                  defaultAtr={character[e]}
                  name={e}
                  setPoints={setPoints}
                  remaining={atrPoints}
                  change={(atrValue: number, atrName: CharacterProperties) => {
                    setCharacter((character) => ({
                      ...character,
                      ...{ [atrName]: atrValue },
                    }));
                  }}
                />
              ))}
            </div>

            <button
              className={
                atrPoints
                  ? 'invisible m-1 rounded border bg-white text-3xl'
                  : 'm-1  rounded border bg-white text-3xl'
              }
              type="button"
              onClick={confirmation}
            >
              confirm attributes
            </button>
          </>
        )}
        {character.race && character.class && confirmAtr && (
          <>
            <div className="grid w-1/5 grid-cols-2 gap-2 rounded-xl bg-yellow-700 p-4 text-3xl bg-contain bg-center bg-no-repeat bg-opacity-75" style={{ backgroundImage: `url(/${character.class}.png)`}}>
              <p>Race:</p>
              <p className='align-items-end'>{character.race}</p>
              <p>Class:</p>
              <p>{character.class}</p>
              <p>Strength:</p>
              <p>{character.str}</p>
              <p>Dexterity:</p>
              <p>{character.dex}</p>
              <p>Constitution:</p>
              <p>{character.con}</p>
              <p>Wisdom: </p>
              <p>{character.wis}</p>
              <p>Inteligence:</p>
              <p>{character.int}</p>
              <p>Charisma:</p>
              <p>{character.char}</p>
              <label className="col-start-1 col-end-3">
                Name :{' '}
                <input
                  ref={nameOfChar}
                  className="rounded border-4 "
                  type="text"
                />
              </label>
              <button
                onClick={resetChar}
                className="m-1  rounded border bg-white"
              >
                reset char
              </button>
              <button
                className="m-1  rounded border bg-white"
                onClick={createChar}
              >
                create char
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const ssg = await createProxySSGHelpers({
    router: appRouter,
    ctx: { session: null },
    transformer: superjson, // optional - adds superjson serialization
  });

  // prefetch `races and classes`
  await ssg.dbRouter.getAllRaces.prefetch();
  await ssg.dbRouter.getAllClasses.prefetch();
  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  };
};

export default createNewChar;
