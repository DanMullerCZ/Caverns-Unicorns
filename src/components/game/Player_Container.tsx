const Player_Container = (
    props: {
        hero_name: string
        another_props: {
            x: number;
            y: number;
            orientation: boolean;
            status: {
                battle: boolean;
                alive: boolean;
            };
        },
        map: HTMLDivElement,
        startBattle: () => Promise<void>,
    }
) => {
    return (
        <div
                id='player-container'
                style={{ 
                  position: 'absolute',
                  top: `${props.another_props.y*props.map.clientWidth/1600}px`,
                  left: `${props.another_props.x*props.map.clientWidth/1600}px`,
                  width: `${props.map.clientWidth/50}px`,
                  height: `${props.map.clientWidth/25}px`,
                }}

                key={props.hero_name}
              >
                <div
                  style={{

                    position:"relative",
                    left:`-${12* props.map.clientWidth/1600}px`,
                    top:`-${25* props.map.clientWidth/1600}px`,
                    transform: `scaleX(${props.another_props.orientation ? -1 : 1})`,
                    backgroundImage: `url('/npc/rogue.gif')`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: '100%',
                  }}
                ></div>
                <div>{props.hero_name}</div>
                <div>PosX: {props.another_props.x.toFixed(1)}</div>
                <div>PosY: {props.another_props.y.toFixed(1)}</div>
                <div>{props.another_props.status.battle ? 'true' : 'false'}</div>
                <button 
                  disabled={false}
                  onClick={props.startBattle}
                >
                  Start Battle
                </button>
              </div>
    )
}

export default Player_Container;
