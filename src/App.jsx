import { useState, useEffect } from 'react';
import './App.css';
import ScaleLoader  from "react-spinners/ScaleLoader";
function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

const [delayedLoading, setDelayedLoading] = useState(true)

  useEffect(() => {


      const timer = setTimeout(() => {
        setDelayedLoading(false);
      }, 2000); // Set the delay time in milliseconds (e.g., 1000ms = 1 second)
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();


    return () => clearTimeout
  }, []);

  const indexofLastPost = currentPage * postsPerPage;
  const indexofFirstPost = indexofLastPost - postsPerPage;
  const currentPosts = data.slice(indexofFirstPost, indexofLastPost);
  const totalPages = Math.ceil(data.length / postsPerPage);

  const paginate = (page) => setCurrentPage(page);

  if (loading || delayedLoading) return <p><ScaleLoader /></p>;

  return (
    <>
      <h2>Simple Pagination</h2>
      <ul>
        {currentPosts.map(post => (
          <li key={post.id}>
            {post.id} - {post.title}
          </li>
        ))}
      </ul>
      <div className='pagination'>
        <button onClick={() => paginate(1)} disabled={currentPage === 1}>First</button>
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? 'active' : ''}
            onClick={() => paginate(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
        <button onClick={() => paginate(totalPages)} disabled={currentPage === totalPages}>Last</button>
      </div>
    </>
  );
}

export default App;
