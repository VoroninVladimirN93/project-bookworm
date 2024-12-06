import React from "react";
import "./ErrorPage.css";

function ErrorPage() {
    return (
        <div className="error-page">
            <iframe
                className="error-video"
                src="https://vk.com/video_ext.php?oid=674507286&id=456239272&hash=5c7b82822d7b987e&autoplay=1"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="404 Video"
            ></iframe>
            <h1 className="celebration-text">
                Поздравляем 3-ю фазу с успешной сдачей экзамена! 
                ОБНЯЛ,ПОДНЯЛ,ЗАБУКСОВАЛ И СДАЛ ЭКЗАМЕН 😎 На следующей пятнице ждем ваши крутые проекты!
            </h1>
        </div>
    );
}

export default ErrorPage;
