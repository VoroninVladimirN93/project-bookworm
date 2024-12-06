import React, { useState } from 'react';
import Button from '../../shared/ui/Button/Button';
import { message as antMessage } from 'antd';
import BookApi from '../../entities/book/BookApi';
import styles from './BookForm.module.css';

export default function BookForm({ setBooks, setLoading }) {
    const [inputs, setInputs] = useState({ author: '', title: '', photo: '' });
    console.log(inputs);

    function onChangeHandler(e) {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const isEmptyFormData = 
        inputs.author.trim().length === 0 || inputs.title.trim().length === 0;

    async function createBookHandler() {
   
        try {
            const { data, message, error, statusCode } = await BookApi.createBook(inputs);
            if (error) {
                antMessage.error(error);
                return;
            }
            antMessage.success(message);
            if (statusCode === 201) {
              
                setInputs({ author: '', title: '', photo: '' });
            }
        } catch (error) {
            antMessage.error(error.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.formContainer}>
            <input 
                className={styles.inputField}
                value={inputs.author} 
                name='author' 
                onChange={onChangeHandler} 
                placeholder='Название книги'
            />
            <input 
                className={styles.inputField}
                value={inputs.title} 
                name='title' 
                onChange={onChangeHandler} 
                placeholder='Автор'
            />
            <input 
                className={styles.inputField}
                value={inputs.photo} 
                name='photo' 
                onChange={onChangeHandler} 
                placeholder='Добавьте обложку книги'
            />
            <Button
                className={styles.button}
                text='Создать'
                color='green'
                onClick={createBookHandler}
            
            />
        </div>
    );
}