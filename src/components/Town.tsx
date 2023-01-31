import { Characters, Quest } from '@prisma/client';
import { useEffect, useState } from 'react';
import { trpc } from 'utils/trpc';
import styles from '../styles/Town.module.css';

const HumanTown = ({
  hero,
  setHero,
  setVisible,
}: {
  hero: Characters;
  setHero: (x: Characters) => void;
  setVisible: (x: string) => void;
}) => {
  const sleep = () => {
    setHeroInTown((prev) => {
      return { ...prev, currentHP: heroInTown.maxHP };
    });
  };
  const [heroInTown, setHeroInTown] = useState<Characters>(hero);
  const [questVisibility, setQuestVisibility] = useState(false);
  const [marketVisibility, setMarketVisibility] = useState(false);
  const quests = trpc.dbRouter.getQuests.useMutation();
  const acceptingQ = trpc.dbRouter.acceptQuest.useMutation()
  const showMarket = () => {
    setMarketVisibility(true);
  };
  const leaveTown = () => {
    setHero(heroInTown);
    setVisible('nada');
  };
  const acceptQuest = (questId:number)=>{
      acceptingQ.mutate({questId:questId,heroName:heroInTown.name})
  }
  useEffect(() => {
    quests.mutate();
  }, []);
  return (
    <>
      <div
        className={styles.container}
        style={{ backgroundImage: `url(/maps/town/city.jpg)` }}
      >
        <div className={styles.inn}>
          <h2 className="parttitle font-LOTR">Inn</h2>
          <button
            onClick={sleep}
            title="Rest and heal yourself."
            className="town-button font-LOTR"
          >
            Sleep
          </button>
        </div>

        <div className={styles.cathedral}>
          <h2 className="parttitle font-LOTR">Cathedral</h2>
          <h2 className="parttitle font-LOTR">Town Hall</h2>
        </div>
        <div className={styles.marketplace}>
          <h2 className="parttitle font-LOTR">Marketplace</h2>
          <button
            onClick={showMarket}
            className="town-button font-LOTR"
            title="Visit marketplace to buy awesome gear and potions."
          >
            Shop
          </button>
        </div>
        <div className={styles.townhall}>
          <button
            onClick={() => setQuestVisibility(true)}
            className="town-button font-LOTR"
            title="If you are looking for job, enter town hall."
          >
            Quests
          </button>
        </div>
        <button
          onClick={leaveTown}
          className="leavebutton font-LOTR"
          title="Just get out, we never wanted you here!"
        >
          Leave Town
        </button>

        {questVisibility && (
          <div className={styles.questList}>
            <>
              {quests.data &&
                quests.data.map((e: Quest) => {
                  return (
                    <>
                      <div className='font-LOTR'>{e.description}</div>
                      <button className='font-LOTR' onClick={()=>acceptQuest(e.id)}>Accept quest.</button>
                    </>
                  );
                })}

              <button
                className={styles.closeButton}
                onClick={() => setQuestVisibility(false)}
                style={{ backgroundImage: `url(/deleteCross.png)` }}
              >
              </button>
            </>
          </div>
        )}
        {marketVisibility && (
          <div className={styles.shop}>
            <button
              className={styles.closeButton}
              onClick={() => setMarketVisibility(false)}
            >
              ×
            </button>
            <p className="font-LOTR">
              Marketplace will be implemented in future, just wait a few
              decades.
            </p>
          </div>
        )}
      </div>
      <div>{heroInTown.currentHP}</div>
    </>
  );
};

export default HumanTown;
