"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const link_1 = __importDefault(require("next/link"));
const image_1 = __importDefault(require("next/image"));
const Character_list_module_css_1 = __importDefault(require("../styles/Character-list.module.css"));
const UserSettings_1 = __importDefault(require("./userSettings/UserSettings"));
const Characters = ({ characters }) => {
    const [hero, setHero] = (0, react_1.useState)({
        name: characters[0].name,
        race: characters[0].race,
        class: characters[0].class,
    });
    const handleClick = (name, race, nameOfClass) => {
        setHero({
            name: name,
            race: race,
            class: nameOfClass,
        });
    };
    return (<>
      <UserSettings_1.default />
      <section className="">
        <div className={Character_list_module_css_1.default.container}>
          <div className={Character_list_module_css_1.default.heroDisplay}>
            <image_1.default className="rounded-lg" src={`/${hero.race}.png`} alt={`${hero.race}`} width={200} height={200}/>
            <div className="">
              <p className="text-2xl">{hero.name}</p>
              <p>
                <span className="text-gray-400">
                  {hero.race} {hero.class}
                </span>
              </p>

            </div>
          </div>
          <link_1.default className={Character_list_module_css_1.default.startGameButton} href="/character-creation">
            <button className="w-full rounded-md bg-blue-600 px-10 py-4 text-white
                duration-300 ease-in hover:bg-blue-500 hover:drop-shadow-md">
              Start the Game
            </button>
          </link_1.default>
          {characters.map((e) => (<div onClick={() => handleClick(e.name, e.race, e.class)} className="flex justify-around items-center col-start-4 col-end-5 row-span-1 cursor-pointer rounded-xl bg-white p-4 drop-shadow" key={e.id}>
              <div>
                <p className="text-2xl">{e.name}</p>
                <p>
                  <span className="text-gray-400">
                    {e.race} {e.class}
                  </span>
                </p>
              </div>
              <image_1.default className="w-8 h-8 rounded-lg" src={`/iconsClasses/${e.class}-icon.jpeg`} alt={`${e.class}`} width={15} height={15}/>
            </div>))}
          <link_1.default className={Character_list_module_css_1.default.createButton} href="/character-creation">
            <button className="w-full rounded-md bg-blue-600 px-10 py-4 text-white
                duration-300 ease-in hover:bg-blue-500 hover:drop-shadow-md">
              Create new character
            </button>
          </link_1.default>
        </div>
      </section>
    </>);
};
exports.default = Characters;
