import React, { useState, useEffect, useRef } from 'react'
import Classes from 'components/Classes'
import Races from 'components/Races'
import styles from '../styles/character-creation.module.css'
import { trpc } from 'utils/trpc'
import { useSession } from 'next-auth/react';

const createNewChar = ({ ...props }) => {
    const sessionData = useSession()
    const nameOfChar = useRef<HTMLInputElement>(null)
    const [character, setCharacter] = useState({
        race: '',
        class: ''
    })
    const setRace = (x: string) => {
        const updatedRace = { race: x }
        setCharacter(character => ({
            ...character,
            ...updatedRace,
        }))
    }
    const delRace = () => {
        const updatedRace = { race: '' }
        setCharacter(character => ({
            ...character,
            ...updatedRace,
        }))
    }
    const setClass = (x: string) => {
        const updatedClass = { class: x }
        setCharacter(character => ({
            ...character,
            ...updatedClass,
        }))
    }
    const delClass = () => {
        const updatedClass = { class: '' }
        setCharacter(character => ({
            ...character,
            ...updatedClass,
        }))
    }
    const addChar = trpc.backend.addChar.useMutation();
    const createChar = async () => {
        addChar.mutate({ class: character.class, race: character.race, user_id: sessionData.data!.user!.id, name: nameOfChar.current!.value })

    }
    if (addChar.isSuccess) { window.location.href = 'character-list' }
    if (addChar.isError) { window.alert(addChar.error.message) }
    return (
        <>
            {(!character.race || !character.class) && (<div className={styles.container}>
                {(!character.race && props.races) && (
                    <div>
                        <h1>SELECT RACE</h1>
                        <Races setRace={setRace} creation={true} races={props.races} />
                    </div>
                )}
                {(!character.class && character.race && props.classes) && (
                    <div>
                        <h1>SELECT CLASS</h1>
                        <Classes creation={true} setClass={setClass} classes={props.classes} />
                    </div>
                )}
            </div>)}
            {(character.race && character.class) && (
                <>
                    <input ref={nameOfChar} className='border-4' type="text" />
                    <div>{character.race}</div>
                    <button onClick={delRace}>X</button>
                    <div>{character.class}</div>
                    <button onClick={delClass}>X</button>
                    <br/>
                    <button className='border-4' onClick={createChar}>create char</button>
                </>
            )}
        </>
    )
}

export const getStaticProps = async () => {
    const races = await prisma?.race.findMany({
        orderBy: {
            name: 'asc',
        },
    });
    const classes = await prisma?.class.findMany({
        orderBy: {
            name: 'asc',
        },
    })
    return {
        props: { races: races, classes: classes }
    }
}

export default createNewChar