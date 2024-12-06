import React, { useEffect, useState } from 'react';
import OneBookCard from '../../widgets/OneBookCard/OneBookCard';
import { useParams } from 'react-router-dom';
import { message as antMessage } from 'antd';
import BookApi from '../../entities/book/BookApi'; // Убедитесь, что у вас есть этот файл с API

function OneBookPage({ user }) {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadOneBook = async () => {
        setLoading(true);
        try {
            const { data, message, error, statusCode } = await BookApi.getBookById(id);

            if (error) {
                setError(error);
                return;
            }
            if (statusCode === 200) {
                setBook(data);
            }
        } catch (err) {
            setError(err.message);
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOneBook();
    }, [id]);

    return (
        <div>
            {loading && <h3>Загрузка...</h3>}
            {error && <h3 style={{ color: 'red' }}>{error}</h3>}
            {book && <OneBookCard book={book} setBook={setBook} user={user} loading={loading}/>}
        </div>
    );
}

export default OneBookPage;