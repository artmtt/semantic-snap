import "./styles/SearchResults.css";
import { useEffect, useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { useLocation, useNavigate } from "react-router-dom";
import { ImageGallery } from "../components/ImageGallery";
import { ImagesResult } from "../assets/ImagesResult";
import ImageDetails from "./ImageDetails";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState(
    new URLSearchParams(location.search).get("query"),
  );
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      if (query) {
        setLoading(true);
        try {
          // Call API
          const data = await ImagesResult(query);
          setImages(data);
        } catch (error) {
          console.error("Error while trying to fetch images", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchImages();
  }, [query]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    navigate(`/searchResults?query=${newQuery}`);
  };

  const handleImageClick = (image) => {
    // console.log(image);
    setSelectedImage({
      src: image.src,
      name: image.alt,
      originalURL: image.src,
      width: image.width,
      height: image.height,
    });
  };

  const handleCloseDetails = () => {
    setSelectedImage(null);
  };

  return (
    <div className="results-app">
      <div className="results-container px-5 py-7 w-full lg:w-4/5">
        <div className="w-full drop-shadow-md">
          <SearchBar onSearch={handleSearch} initialQuery={query} />
        </div>
        <div className="w-full py-5">
          <div
            onClick={(e) => {
              const img = e.target.closest("img");
              if (img) {
                handleImageClick(img);
              }
            }}
          >
            <ImageGallery key={query} images={images} />
          </div>
        </div>
      </div>
      {selectedImage && (
        <ImageDetails image={selectedImage} onClose={handleCloseDetails} />
      )}
    </div>
  );
};

export default SearchResults;
