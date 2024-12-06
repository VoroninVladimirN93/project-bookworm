import React, { useState } from 'react';
import { Rate, Card, message as antMessage, Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

function OneBookCard({ book, setBooks, user }) {
    // console.log(user);
    // console.log(book);

    
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const { id } = useParams();

  console.log(id);
  console.log(user?.id);
  
  console.log(rating);
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

  async function setRatingFunc(user_id,book_id,rating) {
    if (user.id !== book.userId) {
      antMessage.error(`No rights to delete book with id ${book.id}`);
      return;
    }
    setLoading(true);
    try {
const userData = {user_id,book_id,rating}
      await axiosInstance.post('/rating', userData);
      return data;
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
        <Button key="more" type="primary" onClick={redirectButtonHandler}>
          Подробнее
        </Button>,
        (user?.id === book.userId && (
          <Button key="delete" type="danger" onClick={() => deleteBookHandler(book.title)}>
            Удалить
          </Button>
        )),
        (user?.id === book.userId && (
          <Button
            key="update"
            type="warning"
            onClick={() => setShowUpdateForm((prev) => !prev)}
          >
            {showUpdateForm ? 'Скрыть' : 'Изменить'}
          </Button>
        )),
      ]}
    >
          <Rate defaultValue={rating} count={10} onChange={(rating) => { setRating(rating) 
            return setRatingFunc(rating, user.id, )}}/>

            <p></p>
      <Card.Meta
        title={book.title}
        description={book.author}
        
      />

      {/* {showUpdateForm && user.id === book.userId && (
        <BookUpdateForm
          user={user}
          book={book}
          setBooks={setBooks}
          setLoading={setLoading}
          setShowUpdateForm={setShowUpdateForm}
        />
      )} */}
    </Card>
  );
}

export default OneBookCard;;




