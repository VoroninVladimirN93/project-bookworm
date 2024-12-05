import { useEffect, useState } from "react";
import { message as antMessage } from "antd";
import BookForm from "../../widgets/BookForm/BookForm";
import BooksList from "../../widgets/BooksList/BooksList";

function BookPage({ user }) {
    const mockupBook = [
        { id:1, title: 'Убить пересмешника', author: 'Харпер Ли', photo: 'http://localhost:3000/to_kill_a_mockingbird.jpg', createdAt: new Date(), updatedAt: new Date() },
        { id:2, title: '1984', author: 'Джордж Оруэлл', photo: 'http://localhost:3000/1984.jpg', createdAt: new Date(), updatedAt: new Date() },
        { id:3, title: 'Гордость и предубеждение', author: 'Джейн Остин', photo: 'http://localhost:3000/pride_and_prejudice.jpg', createdAt: new Date(), updatedAt: new Date() },
        { id:4, title: 'Великий Гэтсби', author: 'Ф. Скотт Фицджеральд', photo: 'http://localhost:3000/the_great_gatsby.jpg', createdAt: new Date(), updatedAt: new Date() },
        { id:5, title: 'Сто лет одиночества', author: 'Габриэль Гарсиа Маркес', photo: 'http://localhost:3000/one_hundred_years_of_solitude.jpg', createdAt: new Date(), updatedAt: new Date() },
        { id:6, title: 'Моби Дик', author: 'Герман Мелвилл', photo: 'http://localhost:3000/moby_dick.jpg', createdAt: new Date(), updatedAt: new Date() },
        { id:7, title: 'Война и мир', author: 'Лев Толстой', photo: 'http://localhost:3000/war_and_peace.jpg', createdAt: new Date(), updatedAt: new Date() },
        { id:8, title: 'Одиссея', author: 'Гомер', photo: 'http://localhost:3000/the_odyssey.jpg', createdAt: new Date(), updatedAt: new Date() },
        { id:9, title: 'Преступление и наказание', author: 'Фёдор Достоевский', photo: 'http://localhost:3000/crime_and_punishment.jpg', createdAt: new Date(), updatedAt: new Date() },
        { id:10,title: 'Над пропастью во ржи', author: 'Джером Д. Сэлинджер', photo: 'http://localhost:3000/the_catcher_in_the_rye.jpg', createdAt: new Date(), updatedAt: new Date() }
      ]

  const [books, setBooks] = useState([]); //! добавил моковые данные . После добавления ручек вернуть пустой массив
  const [loading, setLoading] = useState(false);

  const loadBooks = async () => {setBooks(mockupBook)
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
    loadBooks();
  }, []);

  return (
    <div>
      {loading && <h3>Загрузка...</h3>}
      {/* {error && <h3 style={{ color: 'red' }}>{error}</h3>} */}
      {user && <BookForm setBooks={setBooks} setLoading={setLoading} />}
      <BooksList books={books} setBooks={setBooks} user={user} />
    </div>
  );
}

export default BookPage;
