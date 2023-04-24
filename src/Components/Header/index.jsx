import Logo from "../Logo";
import Switcher from "../Switcher";
import style from "./Header.module.scss";

export default function Header({ isDarkTheme, onChange }) {
  return (
    <header className={style.header}>
      <div className={style.header__container}>
        <Logo />
        <Switcher isDarkTheme={isDarkTheme} onChange={onChange} />
      </div>
    </header>
  );
}
