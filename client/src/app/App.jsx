import MainPage from "../pages/MainPage/MainPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navigation from "../widgets/Navigation/Navigation";
import SignInPage from "../pages/SignInPage/SignInPage.jsx";
import SignUpPage from "../pages/SignUpPage/SignUpPage.jsx";
import { useEffect, useState } from "react";
import UserApi from "../entities/user/UserApi.js";
import { setAccessToken } from "../shared/lib/axiosInstance.js";
import ErrorPage from "../pages/ErrorPage/ErrorPage.jsx";
import BookForm from "../widgets/BookForm/BookForm.jsx";
import OneBookPage from "../pages/OneBookPage/OneBookPage.jsx";

function App() {
  //NOTE - состояние user заведено в корневом компоненте, чтобы иметь возможность прокинуть его в любую точку приложения
  const [user, setUser] = useState(null);

  //NOTE - постоянный перезапрос данных по юзеру и токену
  useEffect(() => {
    UserApi.refreshTokens()
      .then(({ error, data, statusCode }) => {
        if (error) {
          setUser(null);
          return;
        }
        if (statusCode === 200) {
          setAccessToken(data.accessToken);
          setUser(data.user);
        }
      })
      .catch(({ message }) => {
        console.log(message);
      });
  }, []);

  //NOTE - юзера можно прокидывать вниз по роутингу
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigation user={user} setUser={setUser} />,
      children: [
        { path: "/", element: <MainPage user={user} /> },
        { path: "/signin", element: <SignInPage setUser={setUser} /> },
        { path: "/signup", element: <SignUpPage setUser={setUser} /> },
        { path: "/create_book", element: <BookForm user={user} setUser={setUser} /> },
        { path: `/books/:id`, element: <OneBookPage user={user} setUser={setUser} /> },
        
        
        // {
        //   path: '/computers',
        //   element: user ? (
        //     <ComputersPages user={user} />
        //   ) : (
        //     <SignInPage setUser={setUser} />
        //   ),
        // },

        // { path: '/hedgehogs', element: <HedgehogsPage /> },
      ],
    },
    { path: "*", element: <ErrorPage /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
