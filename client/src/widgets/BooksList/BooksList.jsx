import React from 'react';
import BookCard from '../BookCard/BookCard';
import './BooksList.css'; // Создайте файл стилей для списка книг

function BookList({ books, setBooks, user }) {
  return (
    <div className="book-list">
      {books?.length !== 0 ? (
        books?.map((book) => (
          <BookCard key={book.id} book={book} setBooks={setBooks} user={user} />
        ))
      ) : (
        <h3>Нет данных по книгам</h3>
      )}
    </div>
  );
}

export default BookList;