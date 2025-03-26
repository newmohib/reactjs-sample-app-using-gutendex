// BookDetail.js
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`https://gutendex.com/books/${id}`);
        if (!response.ok) throw new Error('Book not found');
        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (isLoading) return <div className="container">Loading...</div>;
  if (error) return <div className="container error">{error}</div>;

  return (
    <div className="container book-detail">
      <Link to="/" className="back-link">← Back to Home</Link>
      
      <div className="detail-header">
        {book.formats['image/jpeg'] && (
          <img 
            src={book.formats['image/jpeg']} 
            alt={book.title} 
            className="detail-cover"
          />
        )}
        <div className="detail-info">
          <h1>{book.title}</h1>
          <p className="author">
            by {book.authors?.map(author => author.name).join(', ') || 'Unknown Author'}
          </p>
          <p className="id">Book ID: {book.id}</p>
          <p className="downloads">
            📥 {book.download_count.toLocaleString()} Downloads
          </p>
        </div>
      </div>

      <div className="detail-meta">
        <div className="genres">
          <h3>Genres & Subjects</h3>
          <ul>
            {book.subjects?.map((subject, index) => (
              <li key={index}>{subject}</li>
            ))}
          </ul>
        </div>

        <div className="formats">
          <h3>Available Formats</h3>
          <div className="format-links">
            {Object.entries(book.formats).map(([format, url]) => (
              !url.includes('zip') && !format.startsWith('image') && (
                <a 
                  key={format} 
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="format-btn"
                >
                  {format.split('/')[1].toUpperCase()}
                </a>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;