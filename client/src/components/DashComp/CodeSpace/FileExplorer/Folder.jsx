import React, { useState } from 'react';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenTabs } from '../../../../redux/tabsDataSlice';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import CloseIcon from '@mui/icons-material/Close';
import { setDeleteItem, setItems, setRenameItem } from '../../../../redux/Files/fileSlice';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';


const Folder = ({explorer,setExplorerData}) => {
  const dispatch = useDispatch();
  const tabs = useSelector((state) => state.tabsData.OpenTabs);
  const [expand, setExpand] = useState(false);
  const [renameVisible, setRenameVisible] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const [inputValue, setInputValue] = useState('');
  const [name,setName]=useState('');

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setShowInput({ visible: true, isFolder });
    setExpand(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddItem = async () => {
    if (inputValue.trim() === '') {
      setShowInput({ visible: false, isFolder: null });
      return;
    }

    const newItem = showInput.isFolder
      ? { isFolder: true, label: inputValue, items: [] }
      : { isFolder: false, label: inputValue };

    try {
      const response = await fetch('http://127.0.0.1:3001/api/projects/createitem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          folder_id: explorer.id,
          uuid: '0222cb20-bac9-49b1-a52b-e2740a437692',
          item: newItem
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      dispatch(setItems({ id: explorer.id, newItem: data }));
      setInputValue('');
      setShowInput({ visible: false, isFolder: null });
      setExpand(true);
    } catch (err) {
      console.error('Failed to add item:', err);
    }
  };


  const addInTabs = () => {
    let con = false;
    tabs.forEach((tab) => {
      if (tab.id === explorer.id) {
        con = true;
        return;
      }
    });
    if (con) return;
    const obj = {
      id: explorer.id,
      fileName: explorer.label,
      fileContent: "/* CSS code */"
    };
    const newTabs = [...tabs, obj];
    dispatch(setOpenTabs(newTabs));
  };

  const handleOpen = (e, data) => {
    e.stopPropagation();
    addInTabs();
  };
  const handleRename = (e, data) => {
    e.stopPropagation();
    setRenameVisible(true);
  };
  const handleDelete =async (e, data) => {
    e.stopPropagation();
    const target=data.target.id;
    try{
      const res=await fetch('http://127.0.0.1:3001/api/projects/deleteitem',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({item_id:target})
      });
      const data=await res.json();
      dispatch(setDeleteItem({id:target}));
      console.log(data);
    }
    catch(err){
      console.log(err)
    }
  };

  const handleRenameDown =async (e) => {
    if (e.key === 'Enter') {
      const newName = name;
      console.log(newName);
      try{
        const res=await fetch('http://127.0.0.1:3001/api/projects/renameitem',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({item_id:explorer.id,new_name:newName})
        });
        dispatch(setRenameItem({id:explorer.id,newName}));
        setName('');
        setRenameVisible(false);
      }
      catch(err){
        console.log(err);
      }
    }
  };
  const handleChange = (e) => {
    setName(e.target.value);
    console.log(name);
  };

  if (!explorer.isFolder) {
    return <div>
      {
        renameVisible &&
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 rounded-lg relative max-w-sm w-[100vw] h-100px p-2 pr-0 flex items-center">
            <input type="text" placeholder='Enter new Name' className='h-10 rounded-lg p-2 w-[80%]' onChange={handleChange} onKeyDown={handleRenameDown} />
            <button
              onClick={(e) =>{
                e.stopPropagation();
                setRenameVisible(false);
              }}
              className="text-3xl h-10 w-[20%] bg-transparent text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>

          </div>
        </div>
      }
      
        <span className='file-name mt-2 ml-3' id={explorer.id} onClick={() => { addInTabs() }}>📄{explorer.label}</span>
    </div>
  }

  return (
    <div className={'mt-1'}>
      {
        renameVisible &&
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 rounded-lg relative max-w-sm w-[100vw] h-100px p-2 pr-0 flex items-center">
            <input type="text" placeholder='Enter new Name' className='h-10 rounded-lg p-2 w-[80%]  bg-slate-300 text-black' onChange={handleChange} onKeyDown={handleRenameDown} />
            <button
              onClick={(e) =>{
                e.stopPropagation();
                setRenameVisible(false);
              }}
              className="text-3xl h-10 w-[20%] bg-transparent text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>

          </div>
        </div>
      }
      
        <div className='folder' id={explorer.id} onClick={() => setExpand(!expand)} >
          
          <span className='folder-line' id={explorer.id}><ArrowRightIcon/>{expand?<FontAwesomeIcon icon={faFolderOpen} style={{color: "#FFD43B",}} className='w-5 h-5 mr-2' />:<FolderIcon className='folder-icon mr-2' />}{explorer.label && explorer.label.length > 15 ? explorer.label.slice(0, 15) + '...' : explorer.label

          }</span>
          <span className='file-op-span'>
            <CreateNewFolderIcon className='file-op' onClick={(e) => handleNewFolder(e, true)} />
            <NoteAddIcon className='file-op' onClick={(e) => handleNewFolder(e, false)} />
          </span>

        </div>
     
      
      <div style={{ display: expand ? 'block' : 'none', paddingLeft: 25 }}>
        {showInput.visible && (
          <div className='input-container mt-2'>
            <span className='folder-def'>{showInput.isFolder ? <FolderIcon /> : <InsertDriveFileIcon />}</span>
            <input
              type='text'
              className='in-con-input pl-2 ml-1 bg-slate-300 rounded-md p-1 text-black'
              autoFocus
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleAddItem}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddItem();
                }
              }}
            />
          </div>
        )}
        {explorer && explorer.items && explorer.items.map((item) => (
          <Folder key={item.id} explorer={item} />
        ))}
      </div>
    </div>
  );
};

export default Folder;
