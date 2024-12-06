import React, { useState } from 'react';
import { Rate, Card, message as antMessage, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './BookCard.css'; // Создайте файл стилей для карточек

function BookCard({ book, setBooks, user }) {

  // console.log(book);
  
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
 console.log(book);
  async function deleteBookHandler(title) {
    if (user.id !== book.userId) {
      antMessage.error(`No rights to delete book with id ${book.id}`);
      return;
    }
    setLoading(true);
    try {
      const { data, message, error, statusCode } = await BookApi.deleteBookById(book.id);

      if (error) {
        antMessage.error(error);
        return;
      }
      if (statusCode === 200) {
        setBooks((prev) => prev.filter((el) => el.id !== data.id));
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
    <Card 
      className="book-card"
      cover={<img alt={book.title} src={book.photo} />}
      actions={[
        <a key="more" href={`/books/${book.id}`} className="full-width-button">
          <Button type="primary">Подробнее</Button>
        </a>,
        // user?.id === book.userId && (
        //   <Button key="delete" type="danger" onClick={() => deleteBookHandler(book.title)}>
        //     Удалить
        //   </Button>
        // ),
        // user?.id === book.userId && (
        //   <Button
        //     key="update"
        //     type="warning"
        //     onClick={() => setShowUpdateForm((prev) => !prev)}
        //   >
        //     {showUpdateForm ? 'Скрыть' : 'Изменить'}
        //   </Button>
        // ),
      ]}
    >
      <Rate disabled defaultValue={Math.floor(book.Ratings.reduce((sum, e) => sum + (e.rating || 0), 0) / book.Ratings.length) || 0} count={10} onChange={(star) => console.log(star)}/>
      <p></p>
      <Card.Meta
        title={book.title}
        description={book.author}
      />

      {showUpdateForm && user.id === book.userId && (
        <BookUpdateForm
          user={user}
          book={book}
          setBooks={setBooks}
          setLoading={setLoading}
          setShowUpdateForm={setShowUpdateForm}
        />
      )}
      <p>Средний рейтинг: {(book.Ratings.reduce((sum, e) => sum + (e.rating || 0), 0) / book.Ratings.length) || 'Нет оценок'}</p>
    </Card>
  );
}

export default BookCard;