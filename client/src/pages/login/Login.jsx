import React, { useState } from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { app } from '../../firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userData/userSlice';
import { persistor } from '../../redux/store';
import { store } from '../../redux/store';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const resetState = () => ({
    type: 'RESET_STATE',
  });


  const handleGoogleClick = async () => {
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const res = await fetch('http://localhost:3001/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: result.user.email,
          photoURL: result.user.photoURL,
          name: result.user.displayName
        })
      })
      const data = await res.json();
      localStorage.clear()
      persistor.purge();
      store.dispatch(resetState());
      dispatch(setUser(data))
      navigate('/projects')
    }
    catch (e) {
      console.log(e)
    }
  }

  const handleGithubClick = async () => {
    try {
      const auth = getAuth(app);
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const res = await fetch('http://localhost:3001/api/auth/github', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: result.user.email,
          photoURL: result.user.photoURL,
          name: result.user.displayName
        })
      })
      const data = await res.json();
      localStorage.clear()
      persistor.purge();
      store.dispatch(resetState());
      dispatch(setUser(data))
      navigate('/projects')
    }
    catch (e) {
      console.log(e)
    }
  }



  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (!formData.email || !formData.password) {
      setError('Please fill all the fields')
      setLoading(false)
      return;
    }
    try {
      const res = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (data.message) return;
      localStorage.clear()
      persistor.purge();
      store.dispatch(resetState());
      dispatch(setUser(data))
      setLoading(false)
      navigate('/projects')
    }
    catch (err) {
      console.log(err)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }


  return (
    <>
      <div className='flex items-center justify-center h-screen register-div'>
        <div className='flex flex-col gap-2 bg-black rounded-lg p-6'>
          <p className='self-center'>Login with</p>
          <div className='flex gap-5 self-center'>
            <button onClick={handleGoogleClick} className='bg-slate-600 w-40 rounded-lg text-white hover:border-0 hover:after:border-0 hover:before:border-0 OAuth-btn'><GoogleIcon /> &nbsp;Google</button>
            <button onClick={handleGithubClick} className='bg-slate-600 w-40 rounded-lg text-white hover:border-0 hover:after:border-0 hover:before:border-0 OAuth-btn'><GitHubIcon /> &nbsp;Github</button>
          </div>
          <p className="flex items-center text-gray-500 before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">Or</p>
          <form onSubmit={handleSubmit} className='w-full'>
            <div className='flex flex-col gap-2 my-3'>
              <span className='flex flex-col hover:text-white gap-2'>
                <label htmlFor="">Email</label>
                <input type="email" placeholder='Email' className='p-3 rounded-lg' onChange={handleInputChange} />
              </span>
              <span className='flex flex-col hover:text-white gap-2'>
                <label htmlFor="">Password</label>
                <div className='w-full flex items-center password-container rounded-lg pr-3'>
                  <input type={showPassword ? 'text' : 'password'} placeholder='Password' className='p-3 w-full focus:outline-none rounded-lg' onChange={handleInputChange} />
                  <p onClick={() => { setShowPassword(!showPassword) }}>{showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}</p>
                </div>
                <p className='text-sm text-slate-100 mb-4 text-yellow-100'>Forgot Password?</p>
              </span>
              {error && <p className='text-red-500 mb-4'>{error}</p>}
              <button className=''>{loading ? 'Loading...' : 'Log In'}</button>
            </div>
          </form>
          <p className='self-center'>Don&apos;t have an account? <Link to={'/register'}> <span className='text-yellow-300 cursor-pointer'>Register</span></Link></p>
        </div>
      </div>
    </>
  )
}

export default Login
