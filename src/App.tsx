import { useState } from 'react'
import logo from './assets/full-logo.png'
import './App.css'
import ChatBot from './Chatbot'
import UserProfile from './components/UserProfile'
import { Login } from './Login'
// import ProfilePage from './Profile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={logo} className="logo" alt="Vite logo" />
        </a>
      </div>
      {/* <ProfilePage /> */}
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <Login />
        <Login />
        <ChatBot />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <UserProfile />
    </>
  )
}

export default App
