import React, { useState } from 'react'
import './style.css';
const FileInput = ({accept,id,fileHandleFnc,text}) => {
    const [fileSelected,setFileSelected]=useState("")
   
    const onChange=(e)=>{
        console.log(e.target.files)
        setFileSelected(e.target.files[0].name)
        fileHandleFnc(e.target.files[0])

         }
  return (
    <div>
        <label
         htmlFor={id}  className={`custom-input ${!fileSelected ? "label-input" : "active"}`}>
            {fileSelected ?`The File ${fileSelected} was Selected`:text}
            </label>
      
      <input type='file' accept={accept}
       id={id} style={{display:"none"}} 
       onChange={onChange}/>
    </div>
  )
}

export default FileInput;