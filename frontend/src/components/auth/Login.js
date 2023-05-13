import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {useSelector, useDispatch} from 'react-redux'
import {login, reset} from "../../features/auth/authSlice"
import {toast} from 'react-toastify'
import Loading from "../layout/Loading"

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user, isLoading, isSuccess, isError, message} = useSelector(state => state.auth)

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate('/')
    }
    dispatch(reset())
  }, [isError, isSuccess, message, dispatch, navigate, user])

  const onChange = function(e) {
    setUserInfo(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = function(e) {
    e.preventDefault()
    dispatch(login(userInfo))
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="form-container">

    <h1>Welcome Back...</h1>

    <p>Please log in...</p>

      <form onSubmit={onSubmit} className="form-control">
        
        <input 
          name="email"
          id="email"
          type="email"
          value={userInfo.email}
          placeholder="Email"
          autoComplete="off"
          required
          onChange={onChange}
        />
        <input 
          name="password"
          id="password"
          type="password"
          value={userInfo.password}
          placeholder="Password"
          required
          onChange={onChange}
        />

        <button type="submit" className="btn btn-dark">
          Log in
        </button>
      </form>

      <p>
        Don't have an account? <Link to='/register'>Sign up</Link>
      </p>

    </div>
  )
}

export default Login