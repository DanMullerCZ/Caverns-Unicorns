import React, { useState, useEffect, useRef } from 'react';
import ClassList from 'components/ClassList';
import RaceList from 'components/RaceList';
import styles from '../styles/character-creation.module.css';
import { trpc } from 'utils/trpc';
import { useSession } from 'next-auth/react';
import { Class, Race } from '@prisma/client';
import { appRouter } from 'server/routers/_app';
import superjson from 'superjson';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import Head from 'next/head';
import { prisma } from 'server/db/client';
import Attribute from 'components/Attribute';


const createNewChar = () => {
  const dataRaces = trpc.dbRouter.getAllRaces.useQuery()
  const races = dataRaces.data
  const dataClasses = trpc.dbRouter.getAllClasses.useQuery()
  const classes = dataClasses.data
  const sessionData = useSession();
  const [confirmAtr, setConfirmAtr] = useState(false)
  const nameOfChar = useRef<HTMLInputElement>(null);
  type CharacterProperties = 'str' | 'con' | 'dex' | 'int' | 'wis' | 'char';
  const arr: CharacterProperties[] = ['str', 'dex', 'con', 'wis', 'char', 'int'];
  const [character, setCharacter] = useState({
    race: '',
    class: '',
    str: 10,
    con: 10,
    dex: 10,
    int: 10,
    wis: 10,
    char: 10
  });
  const setRace = (x: string) => {
    const updatedRace = { race: x };
    setCharacter((character) => ({
      ...character,
      ...updatedRace,
    }));
  };
  const confirmation = () => setConfirmAtr(true)
  const delRace = () => {
    const updatedRace = { race: '' };
    setCharacter((character) => ({
      ...character,
      ...updatedRace,
    }));
  };
  const setClass = (x: string) => {
    const updatedClass = { class: x };
    setCharacter((character) => ({
      ...character,
      ...updatedClass,
    }));
  };

  const delClass = () => {
    const updatedClass = { class: '' };
    setCharacter((character) => ({
      ...character,
      ...updatedClass,
    }));
  };
  const addChar = trpc.backend.addChar.useMutation();
  const createChar = async () => {
    addChar.mutate({
      class: character.class,
      race: character.race,
      user_id: sessionData.data!.user!.id,
      name: nameOfChar.current!.value,
      str:character.str,
      dex:character.dex,
      con:character.con,
      int:character.int,
      wis:character.wis,
      char:character.char,
    });
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
      {(!character.race || !character.class) && (
        <div test-id='creation-container' className={styles.container}>
          {!character.race && races && (
            <div test-id='race-selection'>
              <h1>SELECT RACE</h1>
              <RaceList setRace={setRace} creation={true} races={races} />
            </div>
          )}
          {!character.class && character.race && classes && (
            <div test-id='class-selection'>
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
          {arr.map((e: CharacterProperties) => (<Attribute key={e} defaultAtr={character[e]} name={e} bonus={2} change={(atrValue:number,atrName:CharacterProperties) => {
            setCharacter((character) => ({
              ...character,
              ...{[atrName]:atrValue},
            }))
          }} />))}
          <button type='button' onClick={confirmation}>confirm attributes</button>
        </>
      )}
      {character.race && character.class && confirmAtr && (
        <>
          <input ref={nameOfChar} className="border-4" type="text" />
          <div>{character.race}</div>
          <button onClick={delRace}>X</button>
          <div>{character.class}</div>
          <button onClick={delClass}>X</button>
          <div>{JSON.stringify(character)}</div>
          <br />
          <button className="border-4" onClick={createChar}>
            create char
          </button>
        </>
      )}
    </>
  );
};

export const getStaticProps = async () => {
  const ssg = await createProxySSGHelpers({
    router: appRouter,
    ctx: { session: null },
    transformer: superjson, // optional - adds superjson serialization
  });

  // prefetch `races`
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
