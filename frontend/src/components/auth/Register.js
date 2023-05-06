import { useState } from "react"

const Register = () => {

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const onChange = function(e) {
    setUserInfo(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = function(e) {
    e.preventDefault()
  }

  return (
    <div className="form-container">

    <h1>Welcome...</h1>

    <p>Sign up to our website...</p>

      <form onSubmit={onSubmit} className="form-control">
        <input 
          name="name"
          id="name"
          type="text"
          value={userInfo.name}
          placeholder="Name"
          autoComplete="off"
          onChange={onChange}
        />
        <input 
          name="email"
          id="email"
          type="email"
          value={userInfo.email}
          placeholder="Email"
          autoComplete="off"
          onChange={onChange}
        />
        <input 
          name="password"
          id="password"
          type="password"
          value={userInfo.password}
          placeholder="Password"
          onChange={onChange}
        />
        <input 
          name="password2"
          id="password2"
          type="password"
          value={userInfo.password2}
          placeholder="Confirm Password"
          onChange={onChange}
        />

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>

    </div>
  )
}

export default Register