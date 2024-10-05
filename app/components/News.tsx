"use client";

import { useEffect, useState } from "react";

export default function News() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch(
          "https://newsapi.org/v2/everything?q=cryptocurrency&sortBy=popularity&language=en&apiKey=e442b0106cc140a49bbe1dc0f82096b6"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
    {/* Navigation Header */}
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-lg font-bold text-black">Crypto Dashboard</div>
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="text-black hover:underline">
              Dashboard
            </a>
          </li>
          <li>
            <a href="/portfolio" className="text-black hover:underline">
              Portfolio
            </a>
          </li>
          <li>
            <a href="/news" className="text-black hover:underline">
              News
            </a>
          </li>
          <li>
            <a href="/alerts" className="text-black hover:underline">
              Alerts
            </a>
          </li>

          <li>
              <a href="/signup" className="text-black hover:underline">
                SignUp
              </a>
            </li>
            
        </ul>
      </div>
    </nav>

    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-black">Cryptocurrency News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {articles.filter((article) => article.author).map((article, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-bold text-black">{article.title}</h2>
            <p className="text-black">Author: {article.author || "Unknown"}</p>
            <p className="text-black">Source: {article.source.name}</p>
            <p className="text-black">Published: {new Date(article.publishedAt).toLocaleDateString()}</p>
            <p className="text-black">{article.description}</p>
            <a
              href={article.url}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}