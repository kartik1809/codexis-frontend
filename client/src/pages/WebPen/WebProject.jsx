import React, { useState, useRef, useEffect } from 'react';
import Split from 'react-split';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { css as codemirrorCss } from '@codemirror/lang-css';
import { html as codemirrorHtml } from '@codemirror/lang-html';
import WebHeader from '../../components/WebPen/WebHeader';
import './SplitReact.css';
import { useDispatch, useSelector } from 'react-redux';
import { setHtml, setCss, setJs } from '../../redux/WebPenContent/WebPenSlice';
import { setLoading } from '../../redux/LoaderSlice';

const WebProject = () => {
  const html = useSelector((state) => state.webPen.html);
  const css = useSelector((state) => state.webPen.css);
  const js = useSelector((state) => state.webPen.js);
  const [activeTab, setActiveTab] = useState('html');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    if (html !== '' && css !== '' && js !== '') {
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 800)
      return;
    }
    const initHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Futuristic Code Editor</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Write Your Code Here</h1>
        <div class="editor-container">
            <img class='imgForDirect' src="https://i.ibb.co/Qn6Nymt/happy-man-points-something-character-advertisement-guy-shows-direction-with-hand-cartoon-style-16542.png" alt="img" />
        </div>
        <button id="toggleMode">Toggle Dark Mode</button>
    </div>
    <script src="script.js"></script>
</body>
</html>
`

    const initCSS = `/* General Styles */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
}

body {
    background: linear-gradient(135deg, #1f1c2c, #928DAB);
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

h1 {
    font-size: 2.5rem;
    color: white;
    margin-bottom: 20px;
    text-align: center;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(255, 255, 255, 0.05);
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.18);
}

/* Code Editor Styles */
.editor-container {
    width: 500px;
    background: rgba(255, 255, 255, 0.1);
    
  display:flex;
  justify-content:center;
    border-radius: 10px;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

textarea {
    width: 100%;
    height: 200px;
    background: transparent;
    border: none;
    outline: none;
    font-size: 1.2rem;
    color: white;
    resize: none;
    font-family: 'Courier New', monospace;
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.6);
}

/* Button Styles */
button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 1.1rem;
    background: linear-gradient(135deg, #f9ff00, #00ff85);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
    transition: transform 0.3s ease;
}

button:hover {
    transform: scale(1.05);
}

/* Dark Mode */
body.dark-mode {
    background: linear-gradient(135deg, #000000, #333333);
}

body.dark-mode h1 {
    color: #00ff85;
    text-shadow: 0 0 15px rgba(0, 255, 255, 0.8);
}

body.dark-mode .container {
    border: 1px solid rgba(255, 255, 255, 0.25);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  display:flex;
  justify-content:center;
}

body.dark-mode textarea {
    color: #00ff85;
    text-shadow: 0 0 15px rgba(0, 255, 255, 0.8);
}

.imgForDirect{
  width:200px;
}
`
    const initJS = `document.getElementById('toggleMode').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
});
`
    dispatch(setHtml(initHTML));
    dispatch(setCss(initCSS));
    dispatch(setJs(initJS));
    
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 800)
  }, []);

  const tabsData = {
    html: {
      title: 'HTML',
      content: html
    },
    css: {
      title: 'CSS',
      content: css
    },
    js: {
      title: 'JavaScript',
      content: js
    },
  };




  const handleClick = (key) => {
    setActiveTab(key);
  };

  const handleChange = (value) => {
    tabsData[activeTab].content = value;
    if (activeTab === 'html') {
      dispatch(setHtml(value));
    }
    if (activeTab === 'css') {
      dispatch(setCss(value));
    }
    if (activeTab === 'js') {
      dispatch(setJs(value));
    }
  };



  const getExtensions = () => {
    switch (activeTab) {
      case 'html':
        return [codemirrorHtml()];
      case 'css':
        return [codemirrorCss()];
      case 'js':
        return [javascript()];
      default:
        return [];
    }
  };

  return (
    <div className='web-project-container bg-gray-950' style={{ height: '100vh' }}>
      <WebHeader />
      <Split
        sizes={[50, 50]}
        minSize={300}
        gutterSize={5}
        direction="horizontal"
        style={{ height: 'calc(100vh - 64px)', display: 'flex', padding: 0, overflow: 'hidden' }}
      >
        <div className='text-red-50 w-1/2 h-full overflow-hidden'>
          <div className='h-10 relative w-full bg-gray-900 flex z-1 justify-between'>
            <div className='flex'>
              {
                Object.keys(tabsData).map((key, index) => (
                  <button
                    key={index}
                    onClick={() => handleClick(key)}
                    className={`flex-1 bg-transparent text-center py-2 px-4 font-semibold transition-colors duration-200 ${activeTab === key ? 'bg-gray-800 text-white border-b-2 border-blue-500' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
                  >
                    {tabsData[key].title}
                  </button>
                ))
              }
            </div>
          </div>
          <div className='editor-content w-full h-full'>
            <CodeMirror
              value={tabsData[activeTab].content}
              extensions={getExtensions()}
              theme="dark"
              height='100%'
              width='100%'
              style={{ height: '100%' }}
              onChange={(value) => handleChange(value)}
            />
          </div>
        </div>
        <div className='w-full h-full flex flex-col bg-white border border-gray-300 rounded-md shadow-lg'>
          <div className='flex items-center bg-gray-800 p-2 rounded-t-md overflow-hidden'>
            <div className='flex space-x-2'>
              <button className='w-6 h-6 rounded-full bg-gray-600 text-white flex items-center justify-center'>
                ←
              </button>
              <button className='w-6 h-6 rounded-full bg-gray-600 text-white flex items-center justify-center'>
                →
              </button>
              <button className='w-6 h-6 rounded-full bg-gray-600 text-white flex items-center justify-center'>
                ↻
              </button>
              <button className='w-6 h-6 rounded-full bg-gray-600 text-white flex items-center justify-center'>
                ⯈
              </button>
            </div>
            <input
              type="text"
              value="http://localhost:3000"
              readOnly
              className='flex-1 ml-2 overflow-hidden bg-gray-700 text-white p-1 rounded-md text-sm'
            />
          </div>
          <div className='flex-1 overflow-hidden'>
            <iframe
              title='output'
              srcDoc={`
              <html>
                <style>${css}</style>
                <body>${html}</body>
                <script>${js}</script>
              </html>
            `}
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          </div>
        </div>
      </Split>
    </div>
  );
};

export default WebProject;
