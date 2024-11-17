import React, { useState } from 'react';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenTabs } from '../../../../redux/tabsDataSlice';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import CloseIcon from '@mui/icons-material/Close';


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

  const updateItems = async (newItem) => {
    try {
      const res = fetch('http://127.0.0.1:3001/api/projects/createitem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ folder_id: explorer.id, uuid: '0222cb20-bac9-49b1-a52b-e2740a437692', item: newItem })
      });
      const data = await res.json();
      return data;
    }
    catch (err) {
      console.log(err);
    }
  }

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
      explorer.items.push(data);
      getExplorer(explorer.id,'0222cb20-bac9-49b1-a52b-e2740a437692');
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
      if (tab.file_id === explorer.id) {
        con = true;
        return;
      }
    });
    if (con) return;
    const obj = {
      file_id: explorer.id,
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
      getExplorer(explorer.id,'0222cb20-bac9-49b1-a52b-e2740a437692');
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
        getExplorer(explorer.id,'0222cb20-bac9-49b1-a52b-e2740a437692');
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
      <ContextMenuTrigger id={explorer.id}>
        <span className='file-name mt-1' id={explorer.id} onClick={() => { addInTabs() }}>📄{explorer.label}</span>
      </ContextMenuTrigger>
      <ContextMenu
        id={explorer.id}
        className='context-menu absolute z-60 flex flex-col p-2 border-2 gap-2 rounded-[5px] bg-gray-800'
      >
        <MenuItem data={{ foo: 'bar' }} onClick={handleOpen} className='cursor-pointer'>
          <OpenInBrowserIcon className='mr-2' />
          Open in new Tab
        </MenuItem>
        <MenuItem data={{ foo: 'bar' }} onClick={handleDelete} className='cursor-pointer'>
          <DeleteIcon className='mr-2' />
          Delete File
        </MenuItem>
        <MenuItem data={{ foo: 'bar' }} onClick={handleRename} className='cursor-pointer'>
          <DriveFileRenameOutlineIcon className='mr-2' />
          Rename File
        </MenuItem>
        <MenuItem divider />
        <MenuItem data={{ foo: 'bar' }} className='cursor-pointer border-t-2 pt-2 border-color-CustomNavbar'>
          <CloseIcon className='mr-2' />
          Close
        </MenuItem>
      </ContextMenu>
    </div>
  }

  return (
    <div className='mt-1'>
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
      <ContextMenuTrigger id={explorer.id}>
        <div className='folder' id={explorer.id} onClick={() => setExpand(!expand)} >
          <span className='folder-line' id={explorer.id}><FolderIcon className='folder-icon' />{explorer.label && explorer.label.length > 15 ? explorer.label.slice(0, 15) + '...' : explorer.label

          }</span>
          <span className='file-op-span'>
            <CreateNewFolderIcon className='file-op' onClick={(e) => handleNewFolder(e, true)} />
            <NoteAddIcon className='file-op' onClick={(e) => handleNewFolder(e, false)} />
          </span>

        </div>
      </ContextMenuTrigger>
      {
        !explorer.root &&
        <ContextMenu id={explorer.id} className='context-menu flex flex-col  p-2 border-2 gap-2 rounded-[5px] bg-gray-800 z'>
        <MenuItem data={{ foo: 'bar' }} onClick={handleDelete} className='cursor-pointer'>
          <DeleteIcon className='mr-2' />
          Delete File
        </MenuItem>
        <MenuItem data={{ foo: 'bar' }} onClick={handleRename} className='cursor-pointer'>
          <DriveFileRenameOutlineIcon className='mr-2' />
          Rename File
        </MenuItem>
        <MenuItem divider />
        <MenuItem data={{ foo: 'bar' }} className='cursor-pointer border-t-2 pt-2 border-color-CustomNavbar'>
          <CloseIcon className='mr-2' />
          Close
        </MenuItem>
      </ContextMenu>
      }
      <div style={{ display: expand ? 'block' : 'none', paddingLeft: 25 }}>
        {showInput.visible && (
          <div className='input-container'>
            <span className='folder-def'>{showInput.isFolder ? <FolderIcon /> : <InsertDriveFileIcon />}</span>
            <input
              type='text'
              className='in-con-input'
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
        {explorer.items.map((item) => (
          <Folder key={item.file_id} explorer={item} />
        ))}
      </div>
    </div>
  );
};

export default Folder;
