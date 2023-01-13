"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useComponentVisible = exports.NavigationBar = void 0;
const image_1 = __importDefault(require("next/image"));
const arrow_svg_1 = __importDefault(require("../../public/iconsNavBar/arrow.svg"));
const link_1 = __importDefault(require("next/link"));
const react_1 = __importStar(require("react"));
const react_transition_group_1 = require("react-transition-group");
const trpc_1 = require("utils/trpc");
function NavigationBar() {
    return (<Navbar>
      <NavItem>
        <DropdownMenu></DropdownMenu>
      </NavItem>
    </Navbar>);
}
exports.NavigationBar = NavigationBar;
function Navbar(props) {
    return (<nav className="navbar font-LOTR">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>);
}
function NavItem(props) {
    //   const [open, setOpen] = useState(false);
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
    return (<li className="nav-item" ref={ref}>
      <a href="#" className="icon-butto gold goldeffect pl-20 text-2xl" onClick={() => setIsComponentVisible(!isComponentVisible)} ref={ref}>
        Menu
        {props.icon}
      </a>
      {isComponentVisible && props.children}
    </li>);
}
function DropdownMenu() {
    const [activeMenu, setActiveMenu] = (0, react_1.useState)('main');
    const [menuHeight, setMenuHeight] = (0, react_1.useState)(null);
    const dropdownRef = (0, react_1.useRef)(null);
    //   const { ref, isComponentVisible } = useComponentVisible(true);
    const dataRaces = trpc_1.trpc.dbRouter.getAllRaces.useQuery();
    const races = dataRaces.data;
    const dataClasses = trpc_1.trpc.dbRouter.getAllClasses.useQuery();
    const classes = dataClasses.data;
    (0, react_1.useEffect)(() => {
        var _a;
        setMenuHeight((_a = dropdownRef.current) === null || _a === void 0 ? void 0 : _a.firstChild.offsetHeigh);
    }, []);
    function calcHeight(el) {
        const height = el.offsetHeight;
        setMenuHeight(height + 30);
    }
    function DropdownItem(props) {
        return (<a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        {/* <span className="icon-button">{props.leftIcon}</span> */}
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>);
    }
    return (
    // <div ref={ref}>
    //   {isComponentVisible && (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <react_transition_group_1.CSSTransition in={activeMenu === 'main'} timeout={500} classNames="menu-primary" unmountOnExit onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="races">Races</DropdownItem>
          <DropdownItem goToMenu="classes">Classes</DropdownItem>
          {/* <DropdownItem goToMenu="quests">Quests</DropdownItem>
        <DropdownItem goToMenu="races">Spells</DropdownItem> */}
          <link_1.default href="/shop">
            <DropdownItem>Shop</DropdownItem>
          </link_1.default>
        </div>
      </react_transition_group_1.CSSTransition>

      <react_transition_group_1.CSSTransition in={activeMenu === 'races'} timeout={500} classNames="menu-secondary" unmountOnExit onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="main">
            <image_1.default src={arrow_svg_1.default} alt="" height={20} width={20}></image_1.default>
          </DropdownItem>
          <link_1.default href={`/races`}>
            <DropdownItem>All Races</DropdownItem>
          </link_1.default>
          {races === null || races === void 0 ? void 0 : races.map((e) => (<link_1.default key={e} href={`/races/${e.name}`}>
              <DropdownItem>{e.name}</DropdownItem>
            </link_1.default>))}
        </div>
      </react_transition_group_1.CSSTransition>

      <react_transition_group_1.CSSTransition in={activeMenu === 'classes'} timeout={500} classNames="menu-secondary" unmountOnExit onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="main">
            <image_1.default src={arrow_svg_1.default} alt="" height={20} width={20}></image_1.default>
          </DropdownItem>
          <link_1.default href={`/classes`}>
            <DropdownItem>All Classes</DropdownItem>
          </link_1.default>
          {classes === null || classes === void 0 ? void 0 : classes.map((e) => (<link_1.default key={e} href={`/classes/${e.name}`}>
              <DropdownItem>{e.name}</DropdownItem>
            </link_1.default>))}
        </div>
      </react_transition_group_1.CSSTransition>
    </div>
    //   )}
    // </div>
    );
}
function useComponentVisible(initialIsVisible) {
    const [isComponentVisible, setIsComponentVisible] = (0, react_1.useState)(initialIsVisible);
    const ref = (0, react_1.useRef)(null);
    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsComponentVisible(false);
        }
    };
    (0, react_1.useEffect)(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);
    return { ref, isComponentVisible, setIsComponentVisible };
}
exports.useComponentVisible = useComponentVisible;
exports.default = NavigationBar;
