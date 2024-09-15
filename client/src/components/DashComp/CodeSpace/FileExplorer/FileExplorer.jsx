import React, { useEffect, useState } from 'react';
import Folder from './Folder';
import explorer from './FolderData';
import { useSelector,useDispatch } from 'react-redux';
import { setExplorerData } from '../../../../redux/Files/fileSlice';
import './FileExplorer.css';
import { Button } from '../../../../components/ui/button';

const FileExplorer = (props) => {
  const dispatch=useDispatch();
  const explorerData=useSelector(state=>state.files.explorerData);
  const user=useSelector(state=>state.user.currentUser)
  const uuid=user.uuid;
  const folder_id=props.project.folder_id;
  console.log(folder_id)
  
  console.log(uuid )
  const getExplorer = async (folder_id,uuid) => {
    try{
      const explorer = await fetch('http://127.0.0.1:3001/api/projects/getfolder',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({folder_id,uuid})
      });
      const data=await explorer.json();
      const fetchedData = data.items;
      dispatch(setExplorerData({
        id: data.folder_id,
        label: data.folder_name,
        isFolder: true,
        root: true,
        items: fetchedData
      }));
    }
    catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
      getExplorer(folder_id,uuid);
  }, []);


  return (
    <div className='file-system bg-gray-950'>
      <div className='explorer-head'>
        <h2 className='file-head'>File Explorer</h2>
      </div>
      <Folder 
        explorer={explorerData}
      />
      <div className='get-code-down'>
        <Button className='bg-cyan-400'>Download</Button>
        <Button className='bg-cyan-400'>Save</Button>
        {/* <button className='down-btn'>Download</button>
        <button className='save-btn'>Save</button> */}
      </div>
    </div>
  );
};

export default FileExplorer;
