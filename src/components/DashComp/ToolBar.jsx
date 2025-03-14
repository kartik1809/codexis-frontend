// src/ToolBar.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCodeLanguage } from '../../redux/languageSlice';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import BugReportIcon from '@mui/icons-material/BugReport';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';
import CodeIcon from '@mui/icons-material/Code';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import DescriptionIcon from '@mui/icons-material/Description';
import LanguageIcon from '@mui/icons-material/Language';
import { useNavigate } from 'react-router-dom';

import './ToolBar.css';
import { ComboboxDemo } from './Tabs/LangSelect';
import { TerminalDrawer } from './Terminal';
import GenerateDialog from './ToolBar/GenerateDialog';
import OptimizeDialog from './ToolBar/OptimizeDialog';
import { Translate } from '@mui/icons-material';
import TranslateDialog from './ToolBar/TranslateDialog';

const ToolBar = () => {
  const codeLanguage = useSelector((state) => state.language.codeLanguage);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    dispatch(setCodeLanguage(event.target.value));
  };

  const handleHomeClick = () => {
    navigate('/projects');
  }

  return (
    <div className='tool-bar bg-gray-950'>
      <span className='home bg-gray-950' onClick={handleHomeClick}><HomeIcon /><KeyboardArrowDownIcon /></span>
      <div className='tools'>
        <OptimizeDialog/>
        <TranslateDialog/> 
        <span><DescriptionIcon /> Documentation</span>
        <GenerateDialog/>
      </div>
      <div className='language border-none'>
        <TerminalDrawer/>
        <ComboboxDemo className='bg-gray-800' />
      </div>
      {/* <select value={codeLanguage} onChange={handleChange} className="language">
        <option value="" disabled><LanguageIcon />Select a Language</option>
        <option value="javascript">JavaScript</option>
        <option value="java">Java</option>
        <option value="cpp">C++</option>
        <option value="python">Python</option>
        <option value="csharp">C#</option>
      </select> */}
    </div>
  );
};

export default ToolBar;
