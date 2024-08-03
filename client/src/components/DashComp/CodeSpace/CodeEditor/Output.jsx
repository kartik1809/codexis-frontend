import React from 'react'
import './Output.css'
import { useState } from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { executeCode } from './executeCode';
const Output = ({edref,codeLanguage}) => {
    const [isClose, setIsClose] = useState(true)
    const [isExpand,setIsExpand] = useState(false)
    const [output, setoutput] = useState(null)
    const handleOpen = ()=>{
        setIsExpand(!isExpand)
        setIsClose(!isClose)
    }
    const runCode= async ()=>{
       const code = edref.current.getValue();
       if(!code) return;
       try{
            const {run:result}=await executeCode(codeLanguage,code)
            setoutput(result.output)
       }
       catch(err){
           console.log(err)
       }
        
    }
  return (
    <>
        <span onClick={handleOpen} className={`outputToggler ${isExpand?'':'closeToggler'}`}>{isClose?<ArrowBackIosIcon></ArrowBackIosIcon>:<ArrowForwardIosIcon></ArrowForwardIosIcon>}</span>
        <div className={`output ${isExpand?'':'close-output'}`}>
            <p>CCStudio\Users\karti\CodeSpace\src:</p>
            <button onClick={runCode}>Run Code</button>
            {
                 output && output.split('\n').map((line)=>{
                    return <p>{line}</p>
                 })
            }
        </div>
    </>
  )
}

export default Output
