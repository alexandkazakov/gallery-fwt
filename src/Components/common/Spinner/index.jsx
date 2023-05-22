import style from "./Spinner.module.scss";

export default function Spinner() {
  return (
    <div className={style.spinnerWrapper}>
      <div className={style.spinner}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
