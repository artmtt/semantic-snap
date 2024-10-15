import './styles/SearchResults.css';
import { useEffect, useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { useLocation, useNavigate } from 'react-router-dom';
import { ImageGallery } from '../components/ImageGallery';
import { ImagesResult } from '../assets/MockImagesResult';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState(new URLSearchParams(location.search).get('query'));
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(query) {
      setLoading(true);
      try {
        {/* Call API */}
        const data = ImagesResult();
        setImages(data);
      } catch(error) {
        console.error("Error while trying to fetch images", error);
      } finally {
        setLoading(false);
      }
    }
  }, [query]);
  
  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    navigate(`/searchResults?query=${newQuery}`);
  };

  return (
    <div className="results-app">
      <div className="results-container px-5 py-10 w-full lg:w-4/5">
        <div className="w-full">
          <SearchBar onSearch={handleSearch} />
        </div>
        {/* Showing all the retrieved images (no limit) */}
        <div className="w-full py-5">
          {!loading ? (
            <ImageGallery key={query} images={images} />
          ) : (
            <div className="loading-spinner">
              Loading..
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
