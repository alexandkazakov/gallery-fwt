import useTheme from "../../hooks/useTheme";
import Card from "../Card";
import Pagination from "../common/Pagination";
import style from "./Gallery.module.scss";

export default function Gallery({
  paintingsList,
  currentPage,
  setCurrentPage,
  countPages,
  authorsList,
  locationsList,
}) {
  const { isDarkTheme } = useTheme();

  return (
    <div className={style.gallery}>
      <div className={style.gallery__container}>
        <div className={style.gallery__paintings}>
          {paintingsList.map((painting) => {
            return (
              <Card
                key={painting.id}
                authorsList={authorsList}
                locationsList={locationsList}
                imageUrl={painting.imageUrl}
                name={painting.name}
                authorId={painting.authorId}
                locationId={painting.locationId}
                created={painting.created}
              />
            );
          })}
        </div>
        <div>
          <Pagination
            isDarkTheme={isDarkTheme}
            pagesAmount={countPages}
            currentPage={currentPage}
            onChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
