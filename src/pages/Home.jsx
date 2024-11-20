import './styles/Home.css';
import { SearchBar } from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleSearch = (newQuery) => {
    navigate(`/searchResults?query=${newQuery}`);
  };

  return (
    <div className="home-app">
      <div className="home-pre-wrapper">
        <div className="home-container">
          <div className="w-4/5 m-2 md:w-7/10 lg:w-3/5">
            <h2 className="home-logo mb-8 text-center text-primary text-4xl font-bold">
              SemanticSnap
            </h2>
            <div className="w-full drop-shadow-md">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
