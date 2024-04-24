import React from 'react';
import notfound from '../assets/404.png';

const NotFoundPage = () => {
  const redirectToHome = () => {
    window.location.href = "https://quircom.netlify.app/";
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={notfound} alt="404 Not Found" className="w-64 h-64 mb-2" />
      <h1 className="text-8xl font-bold mb-2 text-gray-600">404</h1>
      <h2 className="text-3xl font-bold mb-5 text-gray-600">Page Not Found</h2>
      <p className="text-md text-gray-600 mb-2">Sorry, the page you are looking for does not exist.</p>
      <p className="text-md text-gray-600 mb-4"><button className="font-bold text-gray-800 hover:text-gray-600 focus:outline-none" onClick={redirectToHome}>Go back</button> or head over to <a href="https://quircom.netlify.app/" className="font-bold text-gray-800">https://quircom.netlify.app/</a>.</p>
    </div>
  );
};

export default NotFoundPage;
