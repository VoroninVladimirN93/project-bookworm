import React, { useState } from 'react';
import { message as antMessage } from 'antd';
import { useNavigate } from 'react-router-dom';
import Button from '../../shared/ui/Button/Button';

function BookCard({ book, setBooks, user }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
  
    async function deleteBookHandler(title) {
      if (user.id !== book.userId) {
        antMessage.error(`No rights to delete book with id ${book.id}`);
        return;
      }
      setLoading(true);
      try {
        // const response = await fetch(`/api/books/${book.id}`, {
        //   method: 'DELETE',
        // });
  
        // const { data, message, error, statusCode } = await response.json();
        const { data, message, error, statusCode } = await BookApi.deleteBookById(
          book.id
        );
  
        console.log(data);
  
        if (error) {
          antMessage.error(error);
          return;
        }
        if (statusCode === 200) {
          setBooks((prev) => [...prev].filter((el) => el.id !== data.id));
          antMessage.success(message);
        }
      } catch (error) {
        antMessage.error(error.message);
        console.log(error);
      } finally {
        antMessage.info('Загрузка завершена');
        setLoading(false);
      }
    }
  
    function redirectButtonHandler() {
      navigate(`/books/${book.id}`);
    }
    return (
        <div  key={book.title}>
          <span>{book.title}</span>
          <span>{book.author}</span>
          <span>{book.photo}</span>
          <Button text='Подробнее' color='blue' onClick={redirectButtonHandler} />
          {user.id === book.userId && (
            <>
              <Button
                text='Удалить'
                color='red'
                onClick={() => deleteBookHandler(book.title)}
              />
              <Button
                text={showUpdateForm ? 'Скрыть' : 'Изменить'}
                color='orange'
                onClick={() => setShowUpdateForm((prev) => !prev)}
              />
            </>
          )}
          {/* {showUpdateForm && user.id === book.userId && (
            <BookUpdateForm
              user={user}
              book={book}
              setBooks={setBooks}
              setLoading={setLoading}
              setShowUpdateForm={setShowUpdateForm}
            />
          )} */}
        </div>
      );
}

export default BookCard;