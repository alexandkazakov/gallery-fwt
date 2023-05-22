import style from "./Layout.module.scss";
import Spinner from "../common/Spinner";
import cn from "classnames/bind";
import useTheme from "../../hooks/useTheme";

const cx = cn.bind(style);

export default function Layout({
  showLoader,
  error,
  HeaderComponent,
  SortComponent,
  GalleryComponent,
}) {
  const { isDarkTheme } = useTheme();

  return (
    <div
      className={cx(style.layout, {
        "layout--dark": isDarkTheme,
      })}
    >
      {error ? <div className={style.error}>{error.message}</div> : null}
      {showLoader ? (
        <Spinner />
      ) : (
        <>
          {HeaderComponent}
          {SortComponent}
          {GalleryComponent}
        </>
      )}
    </div>
  );
}
