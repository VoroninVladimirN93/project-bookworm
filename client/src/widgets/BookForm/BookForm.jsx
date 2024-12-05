import React from 'react';

function BookForm(props) {
    return (
        <div>
         <form>
            <input placeholder='Название книги'></input>
            <input placeholder='Автор'></input>
            <input placeholder='Обложка книги'></input>
            </form>   
            нужен мультер для загрузки изображений
        </div>
    );
}

export default BookForm;