import React,{useState} from 'react'

const DropArea = ({onDrop,fullHeight}) => {
    const [showDrop, setShowDrop] = useState(false)
  return (
    <section onDragEnter={()=>{setShowDrop(true)}} onDragLeave={()=>{setShowDrop(false)}}
    onDrop={()=>{onDrop();setShowDrop(false)}}
    onDragOver={(e)=>{e.preventDefault()}}
    className={(showDrop?'text-slate-400 p-1 pt-8 pb-7 h-32 flex items-center justify-center rounded-lg border-2 border-dotted border-gray-400': 'opacity-0 text-sm')+(fullHeight?'p-30':'')}
    >Drop Here</section>
  )
}

export default DropArea
