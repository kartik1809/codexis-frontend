import {getAuth, GoogleAuthProvider, signInWithPopup,GithubAuthProvider} from 'firebase/auth';
import {app} from '../firebase';
import useNavigate from 'react-router-dom';

const navigate=useNavigate();

export const handleGoogleClick= async ()=>{
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
                photoURL:result.user.photoURL
            })
        })
        const data=await res.json();
        navigate('/dashboard')
    }
    catch(e){
        console.log(e)
    }
}

export const handleGithubClick= async ()=>{
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
                photoURL:result.user.photoURL
            })
        })
        const data=await res.json();
        navigate('/dashboard')
    }
    catch(e){
        console.log(e)
    }
}