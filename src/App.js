
// App.js
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookDetail from './BookDetail';
import './App.css';

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

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/wishlist" className="nav-link">Wishlist</Link>
    </nav>
  );
};

const Home = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    const fetchBooks = async () => {
      const params = new URLSearchParams({
        page: currentPage,
        search: searchQuery,
        topic: selectedGenre
      });
      
      const response = await fetch(`https://gutendex.com/books?${params}`);
      const data = await response.json();
      setBooks(data.results);
    };

    fetchBooks();
  }, [currentPage, searchQuery, selectedGenre]);

  const toggleWishlist = (book) => {
    setWishlist(prev => prev.some(b => b.id === book.id) 
      ? prev.filter(b => b.id !== book.id)
      : [...prev, book]
    );
  };

  return (
    <div className="container">
      <div className="filters">
        <input
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">All Genres</option>
          {[...new Set(books.flatMap(book => book.subjects))].slice(0, 10).map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      <div className="book-list">
        {books.map(book => (
          <BookCard
            key={book.id}
            book={book}
            isWishlisted={wishlist.some(b => b.id === book.id)}
            toggleWishlist={toggleWishlist}
          />
        ))}
      </div>

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={() => setCurrentPage(prev => prev + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

const BookCard = ({ book, isWishlisted, toggleWishlist }) => {
  const coverImg = book.formats['image/jpeg'] || book.formats['image/png'];

  return (
    <div className="book-card">
      <Link to={`/book/${book.id}`}>
        {coverImg && <img src={coverImg} alt={book.title} />}
        <h3>{book.title}</h3>
      </Link>
      <p>Author: {book.authors?.[0]?.name || 'Unknown'}</p>
      <p>Genre: {book.subjects?.[0] || 'N/A'}</p>
      <p>ID: {book.id}</p>
      <button
        className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
        onClick={() => toggleWishlist(book)}
      >
        ♥
      </button>
    </div>
  );
};

const Wishlist = () => {
  const [wishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  return (
    <div className="container">
      <h2>Your Wishlist</h2>
      <div className="book-list">
        {wishlist.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default App;