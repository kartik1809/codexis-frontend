import React, { useState } from 'react';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenTabs } from '../../../../redux/tabsDataSlice';
import { setDeleteItem, setItems, setRenameItem } from '../../../../redux/Files/fileSlice';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator
} from "../../../ui/context-menu";

const Folder = ({ explorer, setExplorerData }) => {
  const dispatch = useDispatch();
  const tabs = useSelector((state) => state.tabsData.OpenTabs);
  const [expand, setExpand] = useState(false);
  const [renameVisible, setRenameVisible] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const [inputValue, setInputValue] = useState('');
  const [name, setName] = useState('');

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
      fileContent: "/* CSS code */" // Customize this as needed.
    };
    const newTabs = [...tabs, obj];
    dispatch(setOpenTabs(newTabs));
  };

  const handleOpen = () => {
    addInTabs();
  };

  const handleRename = (e) => {
    e.stopPropagation();
    setRenameVisible(true);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      const res = await fetch('http://127.0.0.1:3001/api/projects/deleteitem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ item_id: explorer.id })
      });
      const result = await res.json();
      dispatch(setDeleteItem({ id: explorer.id }));
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRenameDown = async (e) => {
    if (e.key === 'Enter') {
      const newName = name;
      try {
        const res = await fetch('http://127.0.0.1:3001/api/projects/renameitem', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ item_id: explorer.id, new_name: newName })
        });
        dispatch(setRenameItem({ id: explorer.id, newName }));
        setName('');
        setRenameVisible(false);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleRenameSubmit = async (e) => {
    const newName = name;
    try {
      const res = await fetch('http://127.0.0.1:3001/api/projects/renameitem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ item_id: explorer.id, new_name: newName })
      });
      dispatch(setRenameItem({ id: explorer.id, newName }));
      setName('');
      setRenameVisible(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleFolderRename = (e) => {
    console.log('rename');
    e.stopPropagation();
    setRenameVisible(true);
  };

  if (!explorer.isFolder) {
    return (
      <ContextMenu>
        <ContextMenuTrigger>
          <div>
            {renameVisible && (
              <div className="fixed inset-0 bg-zinc-950 bg-opacity-90 flex justify-center items-center z-50">
                <div className="bg-gray-900 rounded-2xl shadow-2xl relative max-w-lg w-[90vw] h-auto p-6 flex flex-col items-center space-y-4">
                  <h2 className="text-2xl font-bold text-white mb-2">Rename Your Item</h2>
                  <input
                    type="text"
                    placeholder="Enter new Name"
                    className="h-12 rounded-lg bg-gray-800 text-white p-4 w-full outline-none border-2 border-transparent focus:border-blue-500 transition-all"
                    onChange={handleChange}
                    onKeyDown={handleRenameDown}
                  />
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setRenameVisible(false)}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={(e) => handleRenameSubmit(e)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
            <span
              className="file-name mt-2 ml-3 flex gap-1"
              id={explorer.id}
              onClick={addInTabs}
            >
              <InsertDriveFileIcon className="file-icon" />
              {explorer.label}
            </span>
          </div>
        </ContextMenuTrigger>

        <ContextMenuContent>
          <ContextMenuItem onSelect={handleOpen}>Open</ContextMenuItem>
          <ContextMenuItem onSelect={handleRename}>Rename&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;⌘ E</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem onSelect={handleDelete} className='hover:bg-red-700'>Delete &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;⌘ D</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        {renameVisible && (
          <div className="fixed inset-0 bg-zinc-950 bg-opacity-90 flex justify-center items-center z-50">
            <div className="bg-gray-900 rounded-2xl shadow-2xl relative max-w-lg w-[90vw] h-auto p-6 flex flex-col items-center space-y-4">
              <h2 className="text-2xl font-bold text-white mb-2">Rename Your Item</h2>
              <input
                type="text"
                placeholder="Enter new Name"
                className="h-12 rounded-lg bg-gray-800 text-white p-4 w-full outline-none border-2 border-transparent focus:border-blue-500 transition-all"
                onChange={handleChange}
                onKeyDown={handleRenameDown}
              />
              <div className="flex space-x-4">
                <button
                  onClick={() => setRenameVisible(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={(e) => handleRenameSubmit(e)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
                >
                  Save
                </button>
              </div>
            </div>
          </div>

        )}
        <div className="folder flex mt-1  items-center" id={explorer.id} onClick={() => setExpand(!expand)}>
          <span className="folder-line flex items-center justify-center" id={explorer.id}>
            <ArrowRightIcon />
            {expand ? <FolderIcon /> : <FolderIcon />}
            {explorer.label.length > 15 ? explorer.label.slice(0, 15) + '...' : explorer.label}
          </span>
          <span className="file-op-span">
            <CreateNewFolderIcon className="file-op" onClick={(e) => handleNewFolder(e, true)} />
            <NoteAddIcon className="file-op" onClick={(e) => handleNewFolder(e, false)} />
          </span>
        </div>
      </ContextMenuTrigger>

      {!explorer.root && <ContextMenuContent>
        <ContextMenuItem onSelect={(e) => { handleFolderRename(e) }} >Rename</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onSelect={handleDelete}>Delete</ContextMenuItem>
      </ContextMenuContent>}

      <div style={{ display: expand ? 'block' : 'none', paddingLeft: 25 }}>
        {showInput.visible && (
          <div className="input-container mt-1 flex items-center space-x-2">
          <span className="text-gray-400">{showInput.isFolder ? <FolderIcon className="text-blue-500"/> : <InsertDriveFileIcon className="text-green-500"/>}</span>
          <input
            type="text"
            className="bg-gray-800 text-white w-[250px] rounded-lg p-1 pl-4 pr-12 outline-none shadow-md focus:ring-1 focus:ring-blue-500 transition-all"
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
    </ContextMenu>
  );
};

export default Folder;
