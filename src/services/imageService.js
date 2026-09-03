const UNSPLASH_URL = "https://api.unsplash.com/search/photos";

const DESTINATION_IMAGE_MAP = {
  tokyo: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
  paris: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
  bali: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
  dubai: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
  rome: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80",
  "new york": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80",
  london: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80",
  sydney: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80",
};

export async function searchImages(query, perPage = 1) {
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  if (!accessKey || accessKey.includes("your_unsplash")) {
    throw new Error("Unsplash API key is missing or invalid.");
  }

  const url = `${UNSPLASH_URL}?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${accessKey}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Unsplash request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.results;
}

export async function getImageForQuery(query) {
  const normalizedQuery = (query || "").toLowerCase().trim();

  // Try API first if valid key exists
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  if (accessKey && !accessKey.includes("your_unsplash")) {
    try {
      const results = await searchImages(query, 1);
      if (results && results.length > 0) {
        return results[0].urls.regular;
      }
    } catch (err) {
      console.warn("Unsplash API fetch failed, using fallback photo:", err);
    }
  }

  // Fallback to high quality direct photos
  if (DESTINATION_IMAGE_MAP[normalizedQuery]) {
    return DESTINATION_IMAGE_MAP[normalizedQuery];
  }

  // Generic fallback travel image
  return `https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80`;
}
