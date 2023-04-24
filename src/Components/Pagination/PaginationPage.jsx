import cn from "classnames/bind";
import styles from "./PaginationPage.module.scss";

const cx = cn.bind(styles);

const PaginationPage = ({ isDarkTheme, className, ...other }) => (
  <button
    type="button"
    className={cx(
      "PaginationPage",
      {
        "PaginationPage--dark": isDarkTheme,
      },
      className
    )}
    {...other}
  />
);

export default PaginationPage;
