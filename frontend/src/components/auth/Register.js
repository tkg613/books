import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {register, reset} from "../../features/auth/authSlice"
import Loading from "../layout/Loading"

const Register = () => {

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user, isError, isSuccess, isLoading, message} = useSelector(state => state.auth)

  const {name, email, password, password2} = userInfo

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate('/')
    }
    dispatch(reset())
  }, [isError, isSuccess, navigate, dispatch, message, user])

  const onChange = function(e) {
    setUserInfo(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = function(e) {
    e.preventDefault()
    if (password !== password2) {
      toast.error('Passwords do not match.')
    } else {
      const userData = {
        name,
        email,
        password
      }
      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Loading />
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
          value={name}
          placeholder="Name"
          autoComplete="off"
          required
          onChange={onChange}
        />
        <input 
          name="email"
          id="email"
          type="email"
          value={email}
          placeholder="Email"
          autoComplete="off"
          required
          onChange={onChange}
        />
        <input 
          name="password"
          id="password"
          type="password"
          value={password}
          placeholder="Password"
          required
          onChange={onChange}
        />
        <input 
          name="password2"
          id="password2"
          type="password"
          value={password2}
          placeholder="Confirm Password"
          required
          onChange={onChange}
        />

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>

      <p>
        Already have an account? <Link to='/login'>Sign in</Link>
      </p>

    </div>
  )
}

export default Register