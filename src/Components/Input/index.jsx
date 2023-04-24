import styles from "./Input.module.scss";
import cn from "classnames/bind";

const cx = cn.bind(styles);

export default function Input({
  name,
  value,
  isDarkTheme,
  onChange,
  className,
}) {
  return (
    <>
      <input
        type="text"
        name={name}
        id={name}
        className={cx(className, "Input", {
          "Input--dark": isDarkTheme,
        })}
        placeholder={value}
        onChange={onChange}
      />
    </>
  );
}
