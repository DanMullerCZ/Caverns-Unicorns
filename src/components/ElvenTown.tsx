import { Characters } from '@prisma/client';
import { useState } from 'react';
import styles from '../styles/ElvenTown.module.css';

const ElvenTown = ({
  hero,
  setHero,
}: {
  hero: Characters;
  setHero: (x: Characters) => void;
}) => {
  const sleep = () => {
    setHeroInTown((prev) => {
      return { ...prev, currentHP: heroInTown.maxHP };
    });
  };
  const [heroInTown, setHeroInTown] = useState<Characters>(hero);
  const [questVisibility, setQuestVisibility] = useState(false);
  const [marketVisibility, setMarketVisibility] = useState(false);
  const showMarket = () => {
    setMarketVisibility(true);
  };
  const leaveTown = () => {
    setHero(heroInTown);
    window.location.href = '/playground';
  };
  return (
    <>
      <div
        className={styles.container}
        style={{ backgroundImage: `url(/maps/town/elvenCity.jpg)` }}
      >
        <div className={styles.marketplace}>
          <h2 className="elven-parttitle font-LOTR">Marketplace</h2>
          <button
            onClick={showMarket}
            className="elven-town-button font-LOTR"
            title="Visit marketplace to buy awesome gear and potions."
          >
            Shop
          </button>
        </div>

        <div className={styles.cathedral}></div>
        <div className={styles.townhall}>
          <h2 className="elven-parttitle font-LOTR">Town Hall</h2>
          <button
            onClick={() => setQuestVisibility(true)}
            className="elven-town-button font-LOTR"
            title="If you are looking for job, enter town hall."
          >
            Quests
          </button>
        </div>
        <div className={styles.inn}>
          <h2 className="elven-parttitle font-LOTR">Inn</h2>
          <button
            onClick={sleep}
            title="Rest and heal yourself."
            className="elven-town-button font-LOTR"
          >
            Sleep
          </button>
        </div>
        <button
          onClick={leaveTown}
          className="elven-leavebutton font-LOTR"
          title="Just get out, we never wanted you here!"
        >
          Leave Town
        </button>

        {questVisibility && (
          <div className={styles.questList}>
            <p className="font-LOTR">Missing list of quests.</p>
            <button
              className={styles.closeButton}
              onClick={() => setQuestVisibility(false)}
            >
              ×
            </button>
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
    </>
  );
};

export default ElvenTown;
