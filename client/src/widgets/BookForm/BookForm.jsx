import React, { useState } from 'react';
import Button from '../../shared/ui/Button/Button';
import { message as antMessage } from 'antd';
import BookApi from '../../entities/book/BookApi';

export default function BookForm({setBooks, setLoading}) {
    const [imputs, setImputs] = useState({author: '', title: '', photo: ''});

    function onChangeHandler(e) {
        setImputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    const isEmptyFormData = 
        imputs.author.trim().length === 0 ||  imputs.title.trim().length === 0;
        console.log(isEmptyFormData);

        async function createBookHandler() {
            if(isEmptyFormData) {
                antMessage.error('Все поля обязательны к заполнению');
            return;
        }
        setLoading(true);
        try {
            const { data, message, error, statusCode } = await BookApi.createBook(imputs);
            if (error) {
                antMessage.error(error);
                return;
            }
            antMessage.success(message);
            if (statusCode === 201) {
                setBooks((prev) => [...prev, data]);
                setImputs({author: '', title: '', photo: ''});
            }

        } catch (error) {
            antMessage.error(error.message);
            console.log(error)
        } finally {
            setLoading(false);
        }
    }
   
        return (
        <div>
            <input value={imputs.author} name='author' onChange={onChangeHandler} placeholder='Название книги'></input>
            <input value={imputs.title} name='title' onChange={onChangeHandler} placeholder='Автор'></input>
            <input value={imputs.photo} name='photo' onChange={onChangeHandler} placeholder='Добавьте обложку книги'></input>
            <Button
                text='Создать'
                color='green'
                onClick={createBookHandler}
                disabled={isEmptyFormData}
      />
        </div>
    );
}





