import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./components/Loader/Loader";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreButton from "./components/LoadMoreButton/LoadMoreButton";
import ImageModal from "./components/ImageModal/ImageModal";
import ErrorMesage from "./components/ErrorMessage/ErrorMessage";

const App = () => {
  const [images, setImages] = useState([]);
 const [selectedImage, setSelectedImage] = useState(null);
 const [isModalOpen, setIsModalOpen] = useState(false);
 
 const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);



  const ACCESS_KEY = "QvQPJKEE6RjVYLM_VOPuzkRwEpRRVX5MZ8MxztKFrZE";
  const BASE_URL =
    "https://api.unsplash.com/search/photos?orientation=landscape";

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
    } catch (error) {
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

  const onOpenModal =(image)=>{
    setIsModalOpen(true);
    setSelectedImage(image);
  }
  
  const onCloseModal=()=>{
    setIsModalOpen(false);
    setSelectedImage(null);
  } 

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {loading && page === 1 && <Loader />}
      {error && <ErrorMesage error= {error.message} />}
      {!loading && images.length === 0 && query && <p>No images found.</p>}
      {images.length > 0 && (
        <div>
          <ImageGallery images={images}  
                        onClick={onOpenModal}/>
          {page < totalPages && (
            <div style={{ textAlign: "center" }}>
              <LoadMoreButton onClick={handleLoadMore} />
            </div>
          )}
        
        </div>
      )}
      {loading && page > 1 && <Loader />}
        {isModalOpen && <ImageModal 
        onCloseModal={onCloseModal}
        selectedImage={selectedImage}
        isModalOpen={isModalOpen}
        />}
    </>
  );
};

export default App;
