import { useState } from 'react'

import './App.css'
import Info from './components/info';

function App() {
  const [input, setInput] = useState('');
  const [repos, setRepos] = useState([]);
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  async function fetchUSerRepos(username) {
    setLoading(true);
    const response = await fetch(`https://api.github.com/users/${username}/repos`, {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.github.v3+json', // Specify the GitHub API version
        
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const repos = await response.json();
    console.log(response);
    setRepos(repos);
    setLoading(false);

  };
  async function fetchUserData(username) {
    const data = await fetch(`https://api.github.com/users/${username}`)
    if (!data.ok) {
      throw new Error(`Error fetching user data: ${image.statusText}`);
    }
    const userdata = await data.json();
    setData(userdata);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    await fetchUSerRepos(input);
    await fetchUserData(input);
    console.log(repos);
  }
  return (
    <div>
      <h1 id='heading'>Git-Hub User Finder</h1>
      <form onSubmit={handleSubmit}>
        <input id='input' type='text' value={input} required placeholder='Enter a gitHub username' onChange={(e) => setInput(e.target.value)}></input>
        <button type='submit'>Search</button>
      </form>
      {loading && <p id='work'>Loading...</p>}
      {!loading && (
        <div className='abc'>
          <img className='img'src={Data.avatar_url}/>
          <div className='user-details'>
            <h1 id='username'>{Data.name}</h1>
            <p><strong>Bio:</strong> {Data.bio || 'No bio available'}</p>
            <p><strong>Followers:</strong> {Data.followers || 0}</p>
            <p><strong>Public Repositories:</strong> {Data.public_repos || 0}</p>
          </div>
          {!loading && repos.length > 0 && (repos.slice(0, 5).map((repo, index) => (
            <div className='container'>
              <Info data={repo} num={index + 1} />
            </div>
          ))
          )
          }
        </div>)}
      {!loading && repos.length === 0 && <p id='work'>No repositiries found.</p>}
    </div>
  )
}

export default App
