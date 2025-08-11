// App.jsx
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [isNarrow, setIsNarrow] = useState(window.innerWidth < 600); // ← עוד useState

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
      .then(r => r.json())
      .then(setPosts);
    }, []);

  useEffect(() => {
    const onResize = () => setIsNarrow(window.innerWidth < 600);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize); // ניקוי
  }, []);

  return (
    <>
      <h2>Top Posts</h2>
      <div className={`main-container ${isNarrow ? 'stack' : ''}`}>
        {posts.map(p => (
          <div className="card" key={p.id}>
            <h4>{p.title}</h4>
            <p>{p.body}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
