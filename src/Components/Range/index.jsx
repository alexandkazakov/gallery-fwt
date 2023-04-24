import { useRef, useState } from "react";
import cn from "classnames/bind";
import Arrow from "../Arrow";
import styles from "./Range.module.scss";
import useOutsideClick from "../../hooks/useOutsideClick";

const cx = cn.bind(styles);

const Range = ({ children, isDarkTheme, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const openMenu = () => {
    setIsOpen(true);
  };

  const hideMenu = () => {
    setIsOpen(false);
  };

  useOutsideClick(ref, hideMenu);

  return (
    <div
      ref={ref}
      className={cx(className, "Range", {
        "Range--open": isOpen,
        "Range--dark": isDarkTheme,
      })}
      aria-hidden="true"
      onClick={isOpen ? hideMenu : openMenu}
    >
      <span className={cx("Range__title")}>Created</span>
      <Arrow
        className={cx("Range__arrow")}
        isOpen={isOpen}
        isDarkTheme={isDarkTheme}
      />
      {isOpen && (
        <div
          className={cx("Range__container", {
            "Range__container--open": isOpen,
            "Range__container--dark": isDarkTheme,
          })}
          onClick={(e) => e.stopPropagation()}
          aria-hidden="true"
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Range;
