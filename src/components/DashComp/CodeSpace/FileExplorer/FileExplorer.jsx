import React, { useState } from 'react';
import Folder from './Folder';
import useTraverseTree from '../../../../hooks/use-traverse-tree'; // Correct import statement
import explorer from './FolderData';
import './FileExplorer.css';

const FileExplorer = () => {
  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode, renameNode, deleteNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const updatedTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(updatedTree);
  };

  const handleRenameNode = (folderId, newName) => {
    const updatedTree = renameNode(explorerData, folderId, newName);
    setExplorerData(updatedTree);
  };

  const handleDeleteNode = (folderId) => {
    const updatedTree = deleteNode(explorerData, folderId);
    setExplorerData(updatedTree);
  };

  return (
    <div className='file-system'>
      <div className='explorer-head'>
        <h2>File Explorer</h2>
        <button className='new-project'>New Project</button>
      </div>
      <Folder 
        handleInsertNode={handleInsertNode} 
        handleRenameNode={handleRenameNode}
        handleDeleteNode={handleDeleteNode}
        explorer={explorerData} 
      />
      <div className='get-code-down'>
        <button className='down-btn'>Download</button>
        <button className='save-btn'>Save</button>
      </div>
    </div>
  );
};

export default FileExplorer;
