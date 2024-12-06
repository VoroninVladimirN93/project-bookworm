import React from 'react';
import OneBookCard from '../../widgets/OneBookCard/OneBookCard';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { message as antMessage } from "antd";
import BookForm from "../../widgets/BookForm/BookForm";
import BooksList from "../../widgets/BooksList/BooksList";

function OneBookPage({ user }) {

    const mockupOneBook = { id:1, title: 'Убить пересмешника', author: 'Харпер Ли', photo: 'http://localhost:3000/to_kill_a_mockingbird.jpg', createdAt: new Date(), updatedAt: new Date() }
      
    const { id } = useParams();

    const [book, setBook] = useState([]);
    const [loading, setLoading] = useState(false);
  
    const loadOneBook = async () => {setBook(mockupOneBook)
      // setLoading(true);
      // try {
      //   const { data, message, error, statusCode } = await BookApi.getBooks(); //! Добавить API
  
      //   if (error) {
      //     antMessage.error(error);
      //     return;
      //   }
      //   antMessage.success(message);
      //   if (statusCode === 200) {
      //     setBooks(data);
      //   }
      // } catch (error) {
      //   antMessage.error(error.message);
      //   console.log(error);
      // } finally {
      //   antMessage.info("Загрузка завершена");
      //   setLoading(false);
      // }
    };

    useEffect(() => {
        loadOneBook();
      }, []);

    return (
        <div>
        {loading && <h3>Загрузка...</h3>}
        {/* {error && <h3 style={{ color: 'red' }}>{error}</h3>} */}
  
        <OneBookCard book={book} setBook={setBook} user={user} />
      </div>
    );
}

export default OneBookPage;


