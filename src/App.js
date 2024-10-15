import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path="/searchResults" Component={SearchResults} />
      </Routes>
    </Router>
  );
}

export default App;
