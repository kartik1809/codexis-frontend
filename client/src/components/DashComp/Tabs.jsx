import React, { useEffect, useRef } from 'react';
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

  const handleOnClick = (fileId, event) => {
    event.stopPropagation();
    console.log(tabs)
    const newTabs = tabs.filter(tab => tab.id !== fileId);
    dispatch(setOpenTabs(newTabs));
  };

  const handleTabClick = (fileContent) => {
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
    <div className='tabs'>
      <ul className='tabs-list' ref={scrollContainerRef}>
        {tabs.map((tab) => (
          <li key={tab.id} className='tab li-tab' onClick={() => handleTabClick(tab.fileContent)}>
            {tab.fileName && tab.fileName.length > 10 ? tab.fileName.slice(0, 10) + '...' : tab.fileName}
            <CloseIcon className='closeIcon' onClick={(e) => handleOnClick(tab.id, e)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tabs;
