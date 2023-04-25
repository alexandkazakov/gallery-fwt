import { useState } from "react";
import Header from "./Components/Header";
import Sort from "./Components/Sort";
import Gallery from "./Components/Gallery";
import Spinner from "./Components/Spinner";
import LoadPage from './Components/LoadPage';
import "./App.scss";

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
