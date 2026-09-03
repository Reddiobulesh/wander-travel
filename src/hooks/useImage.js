import { useEffect, useState } from "react";
import { getImageForQuery } from "../services/imageService";

function useImage(query) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadImage() {
      try {
        setLoading(true);
        setError(null);

        const result = await getImageForQuery(query);

        if (!cancelled) {
          setImage(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    if (query) {
      loadImage();
    }

    return () => {
      cancelled = true;
    };
  }, [query]);

  return {
    image,
    loading,
    error,
  };
}

export default useImage;
