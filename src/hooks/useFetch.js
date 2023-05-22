import { useState, useEffect } from "react";

export default function useFetch(url, dataType) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          if (dataType === "authors" || dataType === "paintings")
            setData(result);

          if (dataType === "locations") {
            const arr = [];
            result.forEach((item) => {
              arr.push({
                id: item.id,
                name: item.location,
              });
            });
            setData(arr);
          }

          if (dataType === "countPages") {
            setData(Math.ceil(result.length / 12));
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [url, dataType]);

  return {
    isLoaded,
    error,
    data,
  };
}
