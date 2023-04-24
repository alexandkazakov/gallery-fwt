import { useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import cn from "classnames/bind";
import useOutsideClick from "../../hooks/useOutsideClick";
import Arrow from "../Arrow";
import "./SimpleBar.scss";
import styles from "./Select.module.scss";

const cx = cn.bind(styles);

const Select = ({
  className,
  disabled = false,
  options,
  isDarkTheme = false,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const toggleOpen = () => setIsOpen((prev) => !prev);
  useOutsideClick(ref, toggleOpen);

  const [selectValue, setSelectValue] = useState(value);

  return (
    <div
      ref={isOpen ? ref : null}
      className={cx(className, "Select", {
        "Select--open": isOpen,
        "Select--dark": isDarkTheme,
      })}
      onClick={!disabled ? toggleOpen : () => {}}
      aria-hidden="true"
    >
      {!selectValue && <span className={cx("Select__title")}>Choose an option</span>}
      <span className={cx("Select__title")}>{selectValue}</span>
      <Arrow
        isOpen={isOpen}
        className={cx("Select__arrow")}
        isDarkTheme={isDarkTheme}
      />
      {isOpen && options && (
        <ul
          className={cx("Select__optionContainer", {
            "Select__optionContainer--open": isOpen,
            "Select__optionContainer--dark": isDarkTheme,
          })}
        >
          <SimpleBar style={{ maxHeight: "inherit" }}>
            {options.map((option) => (
              <li
                onClick={() => {
                  onChange(option.name);
                  setSelectValue(option.name);
                }}
                className={cx("Select__option", {
                  "Select__option--dark": isDarkTheme,
                })}
                key={option.id}
                aria-hidden="true"
              >
                <p className={cx("Select__optionName")}>{option.name}</p>
              </li>
            ))}
          </SimpleBar>
        </ul>
      )}
    </div>
  );
};

export default Select;
