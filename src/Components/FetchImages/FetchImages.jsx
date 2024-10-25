import axios from "axios";

const ACCESS_KEY = "QvQPJKEE6RjVYLM_VOPuzkRwEpRRVX5MZ8MxztKFrZE";
const BASE_URL = "https://api.unsplash.com/search/photos";

export const fetchImages = async (query, page = 1, perPage = 12) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        query,
        page,
        per_page: perPage,
        client_id: ACCESS_KEY,
      },
    });
    return response.data;
  } catch (error) {
    return { results: [], total_pages: 0 };
  }
};