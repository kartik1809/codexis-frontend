import React, { useState,useEffect,useRef } from 'react';
import './Tabs.css';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { OpenTabs } from './Tabs/tabsdata';
import { useSelector,useDispatch } from 'react-redux';
import { setContent } from '../../redux/EditorContentSlice';
import { setOpenTabs } from '../../redux/tabsDataSlice';

const Tabs = () => {
  // const [tabs, setTabs] = useState(OpenTabs);
  const tabs = useSelector((state) => state.tabsData.OpenTabs);
  const dispatch = useDispatch();
  const handleOnClick = (tab,event) => {
    event.stopPropagation();
    const newTabs = { ...tabs };
    delete newTabs[tab];
    dispatch(setOpenTabs(newTabs));
  };
  const handle_tab_click = (tab) => {
    console.log('clicked');
    const code=tabs[tab].fileContent;
    dispatch(setContent(code));
  }
  const scrollContainerRef = useRef(null);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;

        const handleWheel = (e) => {
            e.preventDefault(); // Prevent default vertical scroll

            if (e.deltaY !== 0) {
                scrollContainer.scrollLeft += e.deltaY; // Scroll horizontally
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
        {Object.keys(tabs).map((tab) => (
          <li key={tab} className='tab li-tab' onClick={()=>{handle_tab_click(tab)}}>
            {tabs[tab].fileName}
            <CloseIcon className='closeIcon' onClick={(e) => handleOnClick(tab,e)} />
          </li>
        ))}
        <AddIcon className='addIcon' />
      </ul>
    </div>
  );
};

export default Tabs;
