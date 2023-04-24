import { useState, useEffect } from "react";
import Header from "./Components/Header";
import Sort from "./Components/Sort";
import Gallery from "./Components/Gallery";
import Spinner from "./Components/Spinner";
import "./App.scss";

function LoadPage(attributes) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // загрузка темы
  const isDarkThemeRestored = JSON.parse(localStorage.getItem("theme"));
  const [isDarkTheme, setChangeTheme] = useState(false);

  useEffect(() => {
    if (isDarkThemeRestored !== null) {
      setChangeTheme(isDarkThemeRestored);
    }
  }, [isDarkThemeRestored]);

  if (isDarkTheme) {
    document.body.style.backgroundColor = "#000";
    document.body.style.color = "#fff";
  } else {
    document.body.style.backgroundColor = "#fff";
    document.body.style.color = "#000";
  }

  // загрузка авторов
  const [isLoadedAuthors, setIsLoadedAuthors] = useState(false);
  const [errorLoadAuthors, setErrorLoadAuthors] = useState(null);
  const [authorsList, setAuthorsList] = useState([]);

  useEffect(() => {
    fetch("https://test-front.framework.team/authors")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoadedAuthors(true);
          setAuthorsList(result);
        },
        (error) => {
          setIsLoadedAuthors(true);
          setErrorLoadAuthors(error);
        }
      );
  }, []);

  // загрузка локаций
  const [isLoadedLocations, setIsLoadedLocations] = useState(false);
  const [errorLoadLocations, setErrorLoadLocations] = useState(null);
  const [locationsList, setLocationsList] = useState([]);

  useEffect(() => {
    fetch("https://test-front.framework.team/locations")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoadedLocations(true);
          const arr = [];
          result.forEach((item) => {
            arr.push({
              id: item.id,
              name: item.location,
            });
          });
          setLocationsList(arr);
        },
        (error) => {
          setIsLoadedLocations(true);
          setErrorLoadLocations(error);
        }
      );
  }, []);

  // загрузка списка страниц
  const [isLoadedCountPages, setIsLoadedCountPages] = useState(false);
  const [errorLoadCountPages, setErrorLoadCountPages] = useState(null);
  const [countPages, setCountPages] = useState(1);

  useEffect(() => {
    fetch(`https://test-front.framework.team/paintings?${attributes}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoadedCountPages(true);
          setCountPages(Math.ceil(result.length / 12));
        },
        (error) => {
          setIsLoadedCountPages(true);
          setErrorLoadCountPages(error);
        }
      );
  }, [attributes]);

  // загрузка данных картин и текущей страницы
  const [isLoadedPaintings, setIsLoadedPaintings] = useState(false);
  const [errorLoadPaintings, setErrorLoadPaintings] = useState(null);
  const [paintingsList, setPaintingsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(
      `https://test-front.framework.team/paintings?${attributes}&_page=${currentPage}&_limit=12`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoadedPaintings(true);
          setPaintingsList(result);
        },
        (error) => {
          setIsLoadedPaintings(true);
          setErrorLoadPaintings(error);
        }
      );
  }, [currentPage, attributes]);

  useEffect(() => {
    if (
      isLoadedAuthors &&
      isLoadedLocations &&
      isLoadedCountPages &&
      isLoadedPaintings
    ) {
      setIsLoaded(true);
      setError(
        errorLoadAuthors,
        errorLoadLocations,
        errorLoadCountPages,
        errorLoadPaintings
      );
    }
  }, [
    isLoadedAuthors,
    isLoadedLocations,
    isLoadedCountPages,
    isLoadedPaintings,
    errorLoadAuthors,
    errorLoadLocations,
    errorLoadCountPages,
    errorLoadPaintings,
  ]);

  return {
    error,
    isLoaded,
    isDarkTheme,
    setChangeTheme,
    authorsList,
    locationsList,
    countPages,
    paintingsList,
    currentPage,
    setCurrentPage,
  };
}

function App() {
  const [attributes, setAttributes] = useState("");

  const {
    error,
    isLoaded,
    isDarkTheme,
    setChangeTheme,
    authorsList,
    locationsList,
    countPages,
    paintingsList,
    currentPage,
    setCurrentPage,
  } = LoadPage(attributes);

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  return (
    <>
      <Header isDarkTheme={isDarkTheme} onChange={setChangeTheme} />
      <Sort
        authorsList={authorsList}
        locationsList={locationsList}
        isDarkTheme={isDarkTheme}
        setAttributes={setAttributes}
      />
      <Gallery
        paintingsList={paintingsList}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        countPages={countPages}
        isDarkTheme={isDarkTheme}
        authorsList={authorsList}
        locationsList={locationsList}
      />
    </>
  );
}

export default App;
