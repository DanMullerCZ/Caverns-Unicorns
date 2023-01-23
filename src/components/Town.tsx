import { Characters } from '@prisma/client';
import { useState } from 'react';
import styles from '../styles/Town.module.css';

const Town = ({
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
      <div className={styles.container}>
        <div style={{ backgroundImage: `url(/maps/town/market.jpg)` }}>
          <h2>Marketplace</h2>
          <button onClick={showMarket}>Shop</button>
        </div>
        <div style={{ backgroundImage: `url(/maps/town/cathedral.jpg)` }}>
          <h2>Cathedral</h2>
        </div>
        <div style={{ backgroundImage: `url(/maps/town/inn.jpg)` }}>
          <h2>Inn</h2>
          <button onClick={sleep}>Sleep</button>
        </div>
        <div style={{ backgroundImage: `url(/maps/town/townhall.jpg)` }}>
          <h2>Town Hall</h2>
          <button onClick={() => setQuestVisibility(true)}>Quests</button>
        </div>
      </div>
      {questVisibility && <div><p>Missing list of quests.</p><button onClick={()=>setQuestVisibility(false)}>X</button></div>}
      {marketVisibility && (
        <div>
          <p>
            Marketplace will be implemented in future, just wait a few decades.
          </p>
          <button onClick={()=>setMarketVisibility(false)}>X</button>
        </div>
      )}
      <div>{heroInTown.currentHP}</div>
      <button onClick={leaveTown}>Leave Town</button>
    </>
  );
};

export default Town;
