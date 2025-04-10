import { useState, useEffect } from 'react';
import BookCard from './BookCard';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState(() => {
      const saved = localStorage.getItem('wishlist');
      return saved ? JSON.parse(saved) : [];
    });
  
    const toggleWishlist = (book) => {
      setWishlist(prev => prev.some(b => b.id === book.id)
        ? prev.filter(b => b.id !== book.id)
        : [...prev, book]
      );
    };
  
    useEffect(() => {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);
  
    return (
      <div className="container">
        <h2>Your Wishlist</h2>
        <div className="book-list">
          {wishlist.map(book => (
            <BookCard key={book.id} book={book} isWishlisted={!!book.id}
              toggleWishlist={toggleWishlist} />
          ))}
        </div>
      </div>
    );
  };
  
  export default Wishlist;