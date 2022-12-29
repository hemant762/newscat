import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./component/Navbar";
import NewsCategory from "./component/NewsCategory";
import NewsSearch from "./component/NewsSearch";
import LoadingBar from 'react-top-loading-bar'

export default function App() {
  const [progress, setProgress] = useState(0)
  const api_key = process.env.REACT_APP_NEWS_API_KEY;
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <LoadingBar
            color="#f11946"
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
          />
          <Navbar title="News Cat" />
        </>
      ),
      errorElement: <>Error</>,
      children: [
        {
          path: "/",
          element: (
            <NewsCategory setProgress={setProgress}
              key={0}
              heading= "Top Headlines"
              newsUrl={`https://newsapi.org/v2/top-headlines?country=in&apikey=${api_key}`}
            />
          ),
        },
        {
          path: "sports",
          element: (
            <NewsCategory setProgress={setProgress}
              key={1}
              heading="Sports"
              newsUrl={`https://newsapi.org/v2/top-headlines?country=in&category=sports&apikey=${api_key}`}
            />
          ),
        },
        {
          path: "tech",
          element: (
            <NewsCategory setProgress={setProgress}
              key={2}
              heading="Tech"
              newsUrl={`https://newsapi.org/v2/top-headlines?country=in&category=technology&apikey=${api_key}`}
            />
          ),
        },
        {
          path: "search/:q",
          element: (
            <NewsSearch setProgress={setProgress}
              key={3}
              heading="Search Result"
              newsUrl={`https://newsapi.org/v2/everything?apikey=${api_key}`}
            />
          ),
        },
        {
          path: "about",
          element: <>About</>,
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}
