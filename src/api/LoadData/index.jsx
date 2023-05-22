import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";

export default function LoadData(attributes) {
  // загрузка авторов
  const {
    isLoaded: isLoadedAuthors,
    error: errorLoadAuthors,
    data: authorsList,
  } = useFetch("https://test-front.framework.team/authors", "authors");

  // загрузка локаций
  const {
    isLoaded: isLoadedLocations,
    error: errorLoadLocations,
    data: locationsList,
  } = useFetch("https://test-front.framework.team/locations", "locations");

  // загрузка списка страниц
  const {
    isLoaded: isLoadedCountPages,
    error: errorLoadCountPages,
    data: countPages,
  } = useFetch(
    `https://test-front.framework.team/paintings?${attributes}`,
    "countPages"
  );

  // загрузка данных картин и текущей страницы
  const [currentPage, setCurrentPage] = useState(1);

  const {
    isLoaded: isLoadedPaintings,
    error: errorLoadPaintings,
    data: paintingsList,
  } = useFetch(
    `https://test-front.framework.team/paintings?${attributes}&_page=${currentPage}&_limit=12`,
    "paintings"
  );

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

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
    authorsList,
    locationsList,
    countPages,
    paintingsList,
    currentPage,
    setCurrentPage,
  };
}
