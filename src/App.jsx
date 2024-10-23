import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newBlog,setNewBlog] = useState({'title':'','author':'','url':''}) 

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if (loggedUserJson){
      const user = JSON.parse(loggedUserJson)
      setUser(user)
    }
  },[])



  const handleLogin = async (event) => {
    event.preventDefault()
  

    try {
      const user = await loginService.login({username,password})
  
      window.localStorage.setItem('loggedUser',JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (error) {
      console.log('login failed')
    }
    

    

  }

const createBlog = async (event) => {
  event.preventDefault()
  try {
    const createdBlog = await blogService.create(newBlog)
    
    setBlogs(blogs.concat(createdBlog))
    setNewBlog({'title':'','author':'','url':''})
  }
  catch(error){
    console.error('Error creating blog:', error)
  }

}

const logout = () => {
  window.localStorage.removeItem('loggedUser')
  setUser(null)
}

const loginForm = () => {
  return (
    <form onSubmit={handleLogin}>
    <h2>log in to application</h2>
    <div>
      username <input type="text" name="username" value={username} onChange={({target}) => {setUsername(target.value)}} />
    </div>
    <div>
      password <input type="password" name="password" value={password} onChange={({target}) => {setPassword(target.value)}}/>
    </div>
    <button type="submit">login</button>
  </form>
  )
}
const CreateForm = () => {
  return (
      <div>
          <h2>create new blog</h2>
          <form onSubmit={createBlog}>
            <div>
                title <input type="text" name="title" value={newBlog.title} onChange={({target}) => {setNewBlog({...newBlog,"title":target.value})}} />
            </div>
            <div>
                author <input type="text" name="author" value={newBlog.author} onChange={({target}) => {setNewBlog({...newBlog,"author":target.value})}} />
            </div>
            <div>
                url <input type="text" name="url" value={newBlog.url} onChange={({target}) => {setNewBlog({...newBlog,"url":target.value})}} />
            </div>
            <button type='submit'>create</button>
          </form>
      </div>
  )
}
const blogList = () => {
  return (
    <>
    
    <h2>blogs</h2>
    <p>{user.name} logged in</p>
    <button onClick={logout}>Log out</button>

    {CreateForm()}
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