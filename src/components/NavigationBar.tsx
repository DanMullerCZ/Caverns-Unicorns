import Image from 'next/image';
import ArrowIcon from '../../public/iconsNavBar/arrow.svg';

import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

export function NavigationBar() {
  return (
    <Navbar>
      <NavItem>
        <DropdownMenu></DropdownMenu>
      </NavItem>
    </Navbar>
  );
}

function Navbar(props: any) {
  return (
    <nav className="navbar font-LOTR">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props: any) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-butto gold goldeffect text-2xl pl-20" onClick={() => setOpen(!open)}>
        Menu
        {props.icon}
      </a>
      {open && props.children}
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState<any>(null);
  const dropdownRef = useRef<any>(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeigh);
  }, []);

  function calcHeight(el: any) {
    const height = el.offsetHeight;
    setMenuHeight(height + 30);
  }

  function DropdownItem(props: any) {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        {/* <span className="icon-button">{props.leftIcon}</span> */}
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="races">Races</DropdownItem>
          <DropdownItem goToMenu="classes">Classes</DropdownItem>
          <DropdownItem goToMenu="quests">Quests</DropdownItem>
          <DropdownItem goToMenu="races">Spells</DropdownItem>
          <DropdownItem goToMenu="races">Shop</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'races'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main">
            <Image src={ArrowIcon} alt="" height={20} width={20}></Image>
          </DropdownItem>
          <DropdownItem>Human</DropdownItem>
          <DropdownItem>Elf</DropdownItem>
          <DropdownItem>Dwarf</DropdownItem>
          <DropdownItem>Hobbit</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'classes'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main">
            <Image src={ArrowIcon} alt="" height={20} width={20}></Image>
          </DropdownItem>
          <DropdownItem leftIcon="🦘">Fighter</DropdownItem>
          <DropdownItem leftIcon="🐸">Cleric</DropdownItem>
          <DropdownItem leftIcon="🦋">Paladin</DropdownItem>
          <DropdownItem leftIcon="🦔">Hunter</DropdownItem>
          <DropdownItem leftIcon="🦔">Hunter</DropdownItem>
          <DropdownItem leftIcon="🦔">Hunter</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default NavigationBar;
