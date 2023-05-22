import { useState } from "react";
import Header from "../Header";
import Sort from "../Sort";
import Gallery from "../Gallery";
import LoadData from "../../api/LoadData";
import Layout from "../Layout";
import "./App.scss";
import { ThemeProvider } from "../../providers/ThemeProvider";

function App() {
  const [attributes, setAttributes] = useState("");

  const {
    error,
    isLoaded,
    authorsList,
    locationsList,
    countPages,
    paintingsList,
    currentPage,
    setCurrentPage,
  } = LoadData(attributes);

  return (
    <ThemeProvider>
      <Layout
        showLoader={!isLoaded}
        error={error}
        HeaderComponent={<Header />}
        SortComponent={
          <Sort
            authorsList={authorsList}
            locationsList={locationsList}
            setAttributes={setAttributes}
          />
        }
        GalleryComponent={
          <Gallery
            paintingsList={paintingsList}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            countPages={countPages}
            authorsList={authorsList}
            locationsList={locationsList}
          />
        }
      />
    </ThemeProvider>
  );
}

export default App;
