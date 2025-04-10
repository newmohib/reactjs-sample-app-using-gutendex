
// App.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookDetail from './modules/books/BookDetail';
import './App.css';
import NavBar from './modules/books/NavBar';
import Home from './modules/books/Home';
import Wishlist from './modules/books/Wishlist';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/book/:id" element={<BookDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
