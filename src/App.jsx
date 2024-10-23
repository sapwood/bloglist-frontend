import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
 

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
  

    try {
      const user = await loginService.login({username,password})
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (error) {
      console.log('login failed')
    }
    

    

  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

const loginForm = () => {
  return (
    <form onSubmit={handleLogin}>
    <h2>log in to application</h2>
    <div>
      username <input type="text" name="username" value={username} onChange={handleUsernameChange} />
    </div>
    <div>
      password <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
    </div>
    <button type="submit">login</button>
  </form>
  )
}

const blogList = () => {
  return (
    <>
    
    <h2>blogs</h2>
    <p>{user.name} logged in</p>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
    </>
  )
}

  return (

    <div>

      {user === null ? loginForm() : blogList()}
    </div>
  )
}

export default App