import React, { useEffect, useRef, useState } from 'react';
import './Tabs.css';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { useSelector, useDispatch } from 'react-redux';
import { setContent } from '../../redux/EditorContentSlice';
import { setOpenTabs } from '../../redux/tabsDataSlice';

const Tabs = () => {
  const tabs = useSelector((state) => state.tabsData.OpenTabs);
  const dispatch = useDispatch();
  const scrollContainerRef = useRef(null);
  
  // Local state to track the active tab
  const [activeTab, setActiveTab] = useState(null);

  const handleOnClick = (fileId, event) => {
    event.stopPropagation();
    const newTabs = tabs.filter(tab => tab.id !== fileId);
    dispatch(setOpenTabs(newTabs));
    
    // If active tab is closed, reset the active tab
    if (activeTab === fileId) {
      setActiveTab(null);
    }
  };

  const handleTabClick = (e, fileId, fileContent) => {
    setActiveTab(fileId); // Set the active tab on click
    dispatch(setContent(fileContent));
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const handleWheel = (e) => {
      e.preventDefault();
      if (e.deltaY !== 0) {
        scrollContainer.scrollLeft += e.deltaY;
      }
    };

    scrollContainer.addEventListener('wheel', handleWheel);

    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className='tabs bg-gray-950'>
      <ul className='tabs-list' ref={scrollContainerRef}>
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={`flex justify-between h-full w-32 first-of-type:rounded-tl-md first-of-type:rounded-bl-md last-of-type:rounded-br-md last-of-type:rounded-tr-md cursor-default items-center p-2 ${
              activeTab === tab.id ? 'bg-gray-700 rounded-sm' : 'bg-gray-800'
            }`}
            onClick={(e) => handleTabClick(e, tab.id, tab.fileContent)}
          >
            {tab.fileName && tab.fileName.length > 10
              ? tab.fileName.slice(0, 10) + '...'
              : tab.fileName}
            <CloseIcon
              className='closeIcon cursor-pointer'
              onClick={(e) => handleOnClick(tab.id, e)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tabs;
