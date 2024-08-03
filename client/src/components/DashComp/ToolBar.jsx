// src/ToolBar.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCodeLanguage} from '../../redux/languageSlice';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import BugReportIcon from '@mui/icons-material/BugReport';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';
import CodeIcon from '@mui/icons-material/Code';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import DescriptionIcon from '@mui/icons-material/Description';
import LanguageIcon from '@mui/icons-material/Language';

import './ToolBar.css';

const ToolBar = () => {
  const codeLanguage = useSelector((state) => state.language.codeLanguage);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setCodeLanguage(event.target.value));
  };

  return (
    <div className='tool-bar'>
      <span className='home'><HomeIcon /><KeyboardArrowDownIcon /></span>
      <div className='tools'>
        <span><BugReportIcon /> Debug</span>
        <span><DynamicFormIcon /> Optimize</span>
        <span><SubtitlesIcon /> Translate</span>
        <span><DescriptionIcon /> Documentation</span>
        <span><CodeIcon /> Generate</span>
      </div>
      <select value={codeLanguage} onChange={handleChange} className="language">
        <option value="" disabled><LanguageIcon />Select a Language</option>
        <option value="javascript">JavaScript</option>
        <option value="java">Java</option>
        <option value="cpp">C++</option>
        <option value="python">Python</option>
        <option value="csharp">C#</option>
      </select>
    </div>
  );
};

export default ToolBar;
