import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

async function getData() {
  const data = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
  const jsonData = await data.json();
  return jsonData;
}

function App() {
  const [posts, setPosts] = useState([])
  console.log(posts)
  useEffect(()=>{
    recieveData();
    async function recieveData(){
      const data = await getData();
      setPosts(data)
    }
  },[])

  return (
    <>
      <h2>Top Posts</h2>
      <div className='main-container'>
        {posts.map(p=>(
          <div className="card">
            <h4>{p.title}</h4>
            <p>{p.body}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
