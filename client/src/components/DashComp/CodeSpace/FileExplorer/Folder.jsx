import React, { useState } from 'react';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useDispatch,useSelector } from 'react-redux';
import { setOpenTabs } from '../../../../redux/tabsDataSlice';

const Folder = ({ handleInsertNode,handleRenameNode,handleDeleteNode,explorer }) => {
  const dispatch=useDispatch();
  const tabs=useSelector((state) => state.tabsData.OpenTabs);
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const [inputValue, setInputValue] = useState('');

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setShowInput({ visible: true, isFolder });
    setExpand(true); // Ensure the folder is expanded when adding a new item
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddItem = () => {
    if (inputValue.trim() === ''){
        setShowInput({ visible: false, isFolder: null });
        return;
    }

    const newItem = showInput.isFolder
      ? { isFolder: true, label: inputValue, items: [] }
      : { isFolder: false, label: inputValue };

    explorer.items.push(newItem);
    setInputValue('');
    setShowInput({ visible: false, isFolder: null });
    setExpand(true); // Automatically expand to show the new item
  };

  const addInTabs =()=>{
    console.log('clicked')
    const obj={
      "fileName": explorer.label,
      "fileContent": "/* CSS code */"
    }
    const newTabs = { ...tabs };
    newTabs.uiaaaaadad=obj;
    dispatch(setOpenTabs(newTabs));
  }

  if (!explorer.isFolder) {
    return <span className='file-name' onClick={()=>{addInTabs()}}>📄{explorer.label}</span>;
  }

  return (
    <div>
      <div className='folder' onClick={() => setExpand(!expand)} >
        <span className='folder-line'><FolderIcon className='folder-icon'></FolderIcon>{explorer.label}</span>
        <span className='file-op-span'>
          <CreateNewFolderIcon className='file-op' onClick={(e) => handleNewFolder(e, true)}></CreateNewFolderIcon>
          <NoteAddIcon className='file-op' onClick={(e) => handleNewFolder(e, false)}></NoteAddIcon>
        </span>
      </div>
      <div style={{ display: expand ? 'block' : 'none', paddingLeft: 25 }}>
        {showInput.visible && (
          <div className='input-container'>
            
            <span className='folder-def'>{showInput.isFolder ? <FolderIcon></FolderIcon> : <InsertDriveFileIcon></InsertDriveFileIcon>}</span>
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
        {explorer.items.map((item, index) => (
          <Folder key={index} explorer={item} />
        ))}
      </div>
    </div>
  );
};

export default Folder;
