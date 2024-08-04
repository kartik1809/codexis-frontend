import React,{useState} from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './register.css'
import {getAuth, GoogleAuthProvider, signInWithPopup,GithubAuthProvider} from 'firebase/auth';
import { app } from '../../firebase';
import {useDispatch} from 'react-redux';
import { loginSuccess } from '../../redux/userData/userSlice';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    first_name:'',
    last_name:'',
    username:'',
    email:'',
    password:''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate=useNavigate()
  const dispatch = useDispatch()



  const handleGoogleClick= async ()=>{
      try{
          const auth=getAuth(app);
          const provider=new GoogleAuthProvider();
          const result=await signInWithPopup(auth,provider);
          const res=await fetch('http://localhost:3001/api/auth/google',{
              method:'POST',
              headers:{
                  'Content-Type':'application/json'
              },
              body:JSON.stringify({
                  email:result.user.email,
                  photoURL:result.user.photoURL,
                  name:result.user.displayName
              })
          })
          const data=await res.json();
          dispatch(loginSuccess(data))
          navigate('/dashboard')
      }
      catch(e){
          console.log(e)
      }
  }

  const handleGithubClick= async ()=>{
      try{
          const auth=getAuth(app);
          const provider=new GithubAuthProvider();
          const result=await signInWithPopup(auth,provider);
          const res=await fetch('http://localhost:3001/api/auth/github',{
              method:'POST',
              headers:{
                  'Content-Type':'application/json'
              },
              body:JSON.stringify({
                  email:result.user.email,
                  photoURL:result.user.photoURL,
                  name:result.user.displayName
              })
          })
          const data=await res.json();
          console.log(data)
          navigate('/dashboard')
      }
      catch(e){
          console.log(e)
      }
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    if(formData.password.length<8){
      setError('Password should be atleast 8 characters long')
      setLoading(false)
      return;
    }
    else if(formData.username==='' || formData.email==='' || formData.first_name==='' || formData.last_name===''){
      setError('All fields are required')
      setLoading(false)
      return;
    }
    try{
      const res=await fetch('http://localhost:3001/api/auth/register',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      })
      const data = await res.json()
      console.log(data)
      setLoading(false)
      navigate('/login')
    }
    catch(err){
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
        <p className='self-center'>Register with</p>
        <div className='flex gap-5 self-center'>
          <button onClick={handleGoogleClick} className='bg-slate-600 w-40 rounded-lg text-white hover:border-0 hover:after:border-0 hover:before:border-0 OAuth-btn'><GoogleIcon/> &nbsp;Google</button>
          <button onClick={handleGithubClick} className='bg-slate-600 w-40 rounded-lg text-white hover:border-0 hover:after:border-0 hover:before:border-0 OAuth-btn'><GitHubIcon/> &nbsp;Github</button>
        </div>
        <p className="flex items-center text-gray-500 before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">Or</p>
        <form onSubmit={handleSubmit} className='w-full'>
          <div className='flex gap-2 name-container'>
            <span className='flex flex-col hover:text-white gap-2'>
              <label htmlFor="">First Name</label>
              <input type="text" id='first_name' placeholder='First Name' className='p-3 rounded-lg'  onChange={handleInputChange}/>
            </span>
            <span className='flex flex-col hover:text-white gap-2'>
              <label htmlFor="">Last Name</label>
              <input type="text" id='last_name' placeholder='Last Name'  className='p-3 rounded-lg' onChange={handleInputChange}/>
            </span>
          </div>
          <div className='flex flex-col gap-2 my-3'>
            <span className='flex flex-col hover:text-white gap-2'>
              <label htmlFor="">Username</label>
              <input type="text" id='username' placeholder='Username'  className='p-3 rounded-lg' onChange={handleInputChange}/>
            </span>
            <span className='flex flex-col hover:text-white gap-2'>
              <label htmlFor="">Email</label>
              <input type="email" id='email' placeholder='Email'  className='p-3 rounded-lg' onChange={handleInputChange}/>
            </span>
            <span className='flex flex-col hover:text-white gap-2'>
              <label htmlFor="">Password</label>
              <div className='w-full flex items-center password-container rounded-lg pr-3'>
                <input type={showPassword?'text':'password'} id='password' placeholder='Password'  className='p-3 w-full focus:outline-none rounded-lg' onChange={handleInputChange}/>
                <p onClick={()=>{setShowPassword(!showPassword)}}>{showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}</p>
              </div>
              <p className='text-sm text-slate-100 mb-4'>Minimum length is 8 characters</p>
            </span>
            {
              error && <p className='text-red-500 mb-4'>{error}</p>
            }
            <button className=''>{loading?'Loading...':'Sign Up'}</button>
          </div>
        </form>
        <p className='self-center'>Already have an account? <Link to={'/login'}><span className='text-yellow-300 cursor-pointer'>Login</span></Link></p>
      </div>
    </div>
    </>
  )
}

export default Register
