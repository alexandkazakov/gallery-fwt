import Range from "../Range";
import Input from "../Input";
import style from "./RangeComponent.module.scss";
import cn from "classnames/bind";

const cx = cn.bind(style);

export default function RangeComponent({
  isDarkTheme,
  value,
  className,
  dateFrom,
  dateTo,
  setDateFrom,
  setDateTo,
  setAttributes,
}) {
  function filterFromByCreatedDate(event) {
    setDateFrom(event.target.value);
    setAttributes(`created_gte=${dateFrom}&created_lte=${dateTo}`);
  }
  function filterToByCreatedDate(event) {
    setDateTo(event.target.value);
    setAttributes(`created_gte=${dateFrom}&created_lte=${dateTo}`);
  }
  return (
    <>
      <Range
        isDarkTheme={isDarkTheme}
        aria-hidden="true"
        className={cx(className)}
        value={value}
      >
        <Input
          className={cx("input", {
            "input--dark": isDarkTheme,
          })}
          placeholder="from"
          onChange={filterFromByCreatedDate}
          value={dateFrom}
        />
        <div
          className={cx("separator", {
            "separator--dark": isDarkTheme,
          })}
        />
        <Input
          className={cx("input", {
            "input--dark": isDarkTheme,
          })}
          placeholder="before"
          onChange={filterToByCreatedDate}
          value={dateTo}
        />
      </Range>
    </>
  );
}
