import { Link } from "react-router-dom";

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
  
  export default BookCard;