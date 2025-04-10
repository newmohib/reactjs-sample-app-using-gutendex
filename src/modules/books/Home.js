
import { useState, useEffect } from 'react';
import BookCard from './BookCard';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState(() => {
      const saved = localStorage.getItem('search');
      return saved ? saved : "";
    });
    const [selectedGenre, setSelectedGenre] = useState(() => {
      const saved = localStorage.getItem('selectedGenre');
      return saved ? saved : "";
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [wishlist, setWishlist] = useState(() => {
      const saved = localStorage.getItem('wishlist');
      return saved ? JSON.parse(saved) : [];
    });
    const [isLoading, setIsLoading] = useState(false);
  
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
        setIsLoading(true)
        const response = await fetch(`https://gutendex.com/books?${params}`);
        const data = await response.json();
        setIsLoading(false)
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
  
    const handleSearch = (vlaue, type) => {
      if (type === "selectedGenre") {
        localStorage.setItem('selectedGenre', vlaue ? vlaue: "");
        setSelectedGenre(vlaue)
      }else{
        localStorage.setItem('search', vlaue? vlaue: "");
        setSearchQuery(vlaue);
  
      }
    }
  
    return (
  
      <>
  
        <div className="container">
          <div className="filters">
            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value, "search")}
            />
            <select
              value={selectedGenre}
              onChange={(e) => handleSearch(e.target.value, "selectedGenre")}
            >
              <option value="">All Genres</option>
              {[...new Set(books.flatMap(book => book.subjects))].slice(0, 10).map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
          <div className="content-wrapper">
            {isLoading && <span className="loading-text">Loading...</span>}
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
  
          </div>
          {/* {isLoading && <span className="loading-text">Loading...</span>} */}
  
  
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
      </>
    );
  };

  export default Home