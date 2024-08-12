import React, { useEffect, useState } from 'react';
import Folder from './Folder';
import explorer from './FolderData';

import './FileExplorer.css';

const FileExplorer = () => {
  const [explorerData, setExplorerData] = useState(explorer);
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
      setExplorerData({
        id: data.folder_id,
        label: data.folder_name,
        isFolder: true,
        root: true,
        items: fetchedData
      });
      console.log(data);
    }
    catch(err){
      console.log(err);
    }
  }
  useEffect(  () => {
      getExplorer("be904e84-a86d-4e30-b6e8-819fdcc74876","0222cb20-bac9-49b1-a52b-e2740a437692");
  }, []);


  return (
    <div className='file-system'>
      <div className='explorer-head'>
        <h2 className='file-head'>File Explorer</h2>
        <button className='new-project'>New Project</button>
      </div>
      <Folder 
        explorer={explorerData}
        getExplorer={getExplorer}
        setExplorerData={setExplorerData}
      />
      <div className='get-code-down'>
        <button className='down-btn'>Download</button>
        <button className='save-btn'>Save</button>
      </div>
    </div>
  );
};

export default FileExplorer;
