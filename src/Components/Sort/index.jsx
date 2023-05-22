import Input from "../common/Input";
import Select from "../common/Select";
import RangeComponent from "../common/RangeComponent";
import style from "./Sort.module.scss";
import { useState } from "react";
import useTheme from "../../hooks/useTheme";

export default function Sort({ authorsList, locationsList, setAttributes }) {
  const { isDarkTheme } = useTheme();

  const [dateFrom, setDateFrom] = useState(0);
  const [dateTo, setDateTo] = useState(new Date().getFullYear());

  function filterByLocation(name) {
    const locationId = locationsList.find(
      (location) => location.name === name
    ).id;
    setAttributes(`locationId=${locationId}`);
  }
  function filterByAuthor(name) {
    if (!authorsList) return;
    const authorId = authorsList.find((author) => author.name === name).id;
    setAttributes(`authorId=${authorId}`);
  }

  return (
    <div className={style.sort}>
      <div className={style.sort__container}>
        <Input
          name={"name"}
          isDarkTheme={isDarkTheme}
          value={"Name"}
          id="search-input"
          className={style.sort__input}
          onChange={(event) => setAttributes(`q=${event.target.value}`)}
        />
        <Select
          options={authorsList}
          isDarkTheme={isDarkTheme}
          value={"Authors"}
          className={style.sort__input}
          onChange={filterByAuthor}
        />
        <Select
          options={locationsList}
          isDarkTheme={isDarkTheme}
          value={"Locations"}
          className={style.sort__input}
          onChange={filterByLocation}
        />
        <RangeComponent
          isDarkTheme={isDarkTheme}
          value={"Created"}
          className={style.sort__input}
          dateFrom={dateFrom}
          dateTo={dateTo}
          setDateFrom={setDateFrom}
          setDateTo={setDateTo}
          setAttributes={setAttributes}
        />
      </div>
    </div>
  );
}
