import axios from "axios";
import { useEffect, useState } from "react";


const Appexampl = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      async function fetchArticles() {
        try {
          // 1. Встановлюємо індикатор в true перед запитом
          setLoading(true);
          const response = await axios.get(
            "https://hn.algolia.com/api/v1/search?query=react"
          );
          setArticles(response.data.hits);
          console.log(response);
        } catch (error) {
          // Тут будемо обробляти помилку
        } finally {
          // 2. Встановлюємо індикатор в false після запиту
          setLoading(false);
        }
      }
  
      fetchArticles();
    }, []);
  
    return (
        <div>
        <h1>Latest articles</h1>
  
        {articles.length > 0 && (
          <ul>
            {articles.map(({ objectID, url, title }) => (
              <li key={objectID}>
                <a href={url} target="_blank" rel="noreferrer noopener">
                  {title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  export default Appexampl;