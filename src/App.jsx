 import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Components/Loader/Loader"
import "./App.css";
import SearchBar from "./Components/SearchBar/SearchBar";
import ImageGallery from "./Components/ImageGallery/ImageGallery";
import LoadMoreButton from "./Components/LoadMoreButton/LoadMoreButton";
import ImageModal from "./Components/ImageModal/ImageModal"


const App = () => {
const [images, setImages]=useState([]);
const [selectedImage, setSelectedImage] = useState(null);

const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const [query, setQuery] = useState("");
const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(0);

const [isModalOpen, setModalOpen] = useState(false);

const ACCESS_KEY = "QvQPJKEE6RjVYLM_VOPuzkRwEpRRVX5MZ8MxztKFrZE";
const BASE_URL = "https://api.unsplash.com/search/photos?orientation=landscape";

const fetchImages = async (query, page = 1, perPage = 12) => {
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
  } catch(error) {
    setError(error);
    return { results: [], total_pages: 0 };
  }
};

useEffect(() => {
  const getImages = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const data = await fetchImages(query, page);
      setImages((prevImages) => [...prevImages, ...data.results]);
      setTotalPages(data.total_pages);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  getImages();
}, [query, page]);

const handleSearch = (searchQuery) => {
  setQuery(searchQuery);
  setImages([]);
  setPage(1);
  setError(null);
};

const handleLoadMore = () => {
  setPage((prevPage) => prevPage + 1);
};


const openModal = (image) => {
  // console.log('Image object:', image);
  setSelectedImage(
    {
    url: image.urls.regular,
    description: image.description,
    likes: image.likes,
    author: image.user.name,
  }
);
  setModalOpen(true);
  document.body.style.overflow = 'hidden'; // Prevent scrolling
};

const closeModal = () => {
  setModalOpen(false);
  setSelectedImage(null);
  document.body.style.overflow = 'auto'; // Restore scrolling
};



return (
  <>
    <SearchBar onSearch={handleSearch} />
    {loading && page === 1 && (
      <Loader/>
       )}
    {error && <p>Oops... Something went wrong. Error: {error.message}</p>}
    {!loading && images.length === 0 && query && <p>No images found.</p>}
    {images.length > 0 && (
      <>
        <ImageGallery images={images} onClick={openModal} />
        {page < totalPages && (
          <div style={{ textAlign: "center" }}>
            <LoadMoreButton onClick={handleLoadMore} />
          </div>
        )}
      </>
    )}
    {loading && page > 1 && (
       <Loader/>
    )}
    {selectedImage && (
      <ImageModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        selectedImage={selectedImage}
      />
    )}
  </>
);
}

export default App;