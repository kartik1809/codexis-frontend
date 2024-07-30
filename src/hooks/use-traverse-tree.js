import { useCallback } from 'react';

const useTraverseTree = () => {
  const cache = new Map();

  // Helper function to update the tree recursively
  const updateTree = (node, operation, folderId, item, isFolder) => {
    const cacheKey = `${node.id}-${folderId}-${item}-${isFolder}-${operation}`;

    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    let updatedNode;

    switch (operation) {
      case 'insert':
        if (node.id === folderId) {
          const newNode = {
            id: Date.now().toString(),
            name: item,
            isFolder,
            items: []
          };
          updatedNode = { ...node, items: [newNode, ...node.items] };
        } else {
          const updatedItems = node.items.map(childNode =>
            updateTree(childNode, operation, folderId, item, isFolder)
          );
          updatedNode = { ...node, items: updatedItems };
        }
        break;

      case 'rename':
        if (node.id === folderId) {
          updatedNode = { ...node, name: item };
        } else {
          const updatedItems = node.items.map(childNode =>
            updateTree(childNode, operation, folderId, item, isFolder)
          );
          updatedNode = { ...node, items: updatedItems };
        }
        break;

      case 'delete':
        if (node.id === folderId) {
          updatedNode = null; // Mark the node for deletion
        } else {
          const updatedItems = node.items
            .map(childNode =>
              updateTree(childNode, operation, folderId, item, isFolder)
            )
            .filter(childNode => childNode !== null); // Remove deleted nodes
          updatedNode = { ...node, items: updatedItems };
        }
        break;

      default:
        updatedNode = node;
    }

    cache.set(cacheKey, updatedNode);
    return updatedNode;
  };

  const insertNode = useCallback((tree, folderId, item, isFolder) => {
    return updateTree(tree, 'insert', folderId, item, isFolder);
  }, []);

  const renameNode = useCallback((tree, folderId, newName) => {
    return updateTree(tree, 'rename', folderId, newName, null);
  }, []);

  const deleteNode = useCallback((tree, folderId) => {
    return updateTree(tree, 'delete', folderId, null, null);
  }, []);

  return { insertNode, renameNode, deleteNode };
};

export default useTraverseTree;
