import React, { useState, useEffect } from 'react';
import { Rate, Card, message as antMessage, Button, Input, List, Avatar } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import BookApi from '../../entities/book/BookApi';
import { axiosInstance } from '../../shared/lib/axiosInstance';
// import './OneBookCard.module.css'; // Создайте файл стилей для карточек

function OneBookCard({ book, setBooks, user  }) {
  // console.log(loading);
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const { id } = useParams();

  console.log(id);
  console.log(user?.id);
  console.log(book);
  console.log(rating);

  useEffect(() => {
    if (book) {
      setShowUpdateForm(true);
    }
  }, [book]);

  async function deleteBookHandler(title) {
    setLoading(true);
    try {
      const { data, message, error, statusCode } = await BookApi.deleteBookById(book.id);

      if (error) {
        antMessage.error(error);
        return;
      }
      if (statusCode === 200) {
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

  async function setRatingFunc(user_id, book_id, rating) {
    setLoading(true);
    try {
      const userData = { user_id, book_id, rating };
      await axiosInstance.post('/rating', userData);
      antMessage.success('Рейтинг успешно добавлен');
    } catch (error) {
      antMessage.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function addComment(user_id, book_id, comment) {
    setLoading(true);
    try {
      const userData = { user_id, book_id, text: comment };
      await axiosInstance.post('/comments', userData);
      antMessage.success('Комментарий успешно добавлен');
      setComment(''); // Очищаем поле ввода комментария
    } catch (error) {
      antMessage.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteComment(commentId) {
    setLoading(true);
    try {
      await axiosInstance.delete(`/comments/${commentId}`);
      antMessage.success('Комментарий успешно удален');
      // Обновляем список комментариев
      setBooks((prevBooks) =>
        prevBooks.map((b) =>
          b.id === book.id
            ? {
                ...b,
                Comments: b.Comments.filter((c) => c.id !== commentId),
              }
            : b
        )
      );
    } catch (error) {
      antMessage.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function redirectButtonHandler() {
    navigate(`/books/${book.id}`);
  }
console.log(book);

  return (
    <Card 
      className="book-card"
      style={{ width: 800 }}
      cover={<img alt={book.title} src={book.photo} className="book-cover" />}
      actions={[
        <Button key="more" type="primary" onClick={redirectButtonHandler}>
          Подробнее
        </Button>,
        user && (
          <Button key="delete" type="danger" onClick={() => deleteBookHandler(book.title)}>
            Удалить
          </Button>
        ),
        user && (
          <Button
            key="update"
            type="warning"
            onClick={() => setShowUpdateForm((prev) => !prev)}
          >
            {showUpdateForm ? 'Скрыть' : 'Показать комментарии'}
          </Button>
        ),
      ]}
    >
      <div className="book-info">
        <Card.Meta
          title={`${book.title}`}
          description={`Автор: ${book.author}`}
        />
        <Rate 
          defaultValue={Math.floor(book.Ratings.reduce((sum, e) => sum + (e.rating || 0), 0) / book.Ratings.length) || 0} 
          count={10} 
          onChange={(rating) => { 
            setRating(rating);
            setRatingFunc(user.id, book.id, rating);
          }}
        />
      </div>
      <p>Средний рейтинг: {(book.Ratings.reduce((sum, e) => sum + (e.rating || 0), 0) / book.Ratings.length) || 'Нет оценок'}</p>

      {user && (
        <>
          <Input.TextArea
            rows={4}
            placeholder="Добавить комментарий"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button 
            type="primary" 
            onClick={() => addComment(user.id, book.id, comment)}
            style={{ marginTop: '10px' }}
          >
            Добавить комментарий
          </Button>
        </>
      )}

      {showUpdateForm && book && book.Comments && (
        <List
          itemLayout="horizontal"
          dataSource={book.Comments}
          renderItem={item => (
            <List.Item
              actions={user && user.id === item.user_id ? [<Button type="link" onClick={() => deleteComment(item.id)}>Удалить</Button>] : []}
            >
              <List.Item.Meta
                avatar={item.User ? <Avatar>{item.User.username[0]}</Avatar> : <Avatar>?</Avatar>}
                title={item?.User ? `${item.User.username}` : 'Unknown User'}
                description={item.text}
              />
            </List.Item>
          )}
        />
      )}
    </Card>
  );
}

export default OneBookCard;