import React from 'react';
import BookCard from '../BookCard/BookCard';

function BookList({ books, setBooks, user }) {
    return (
        <div>
          {books?.length !== 0 ? (
            books?.map((book) => (
              <BookCard key={book.id} book={book} setBooks={setBooks} user={user} />
            ))
          ) : (
            <h3>Нет данных по задачам</h3>
          )}
        </div>
      );
}

export default BookList;