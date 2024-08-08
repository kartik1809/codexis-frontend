import React, { useState } from 'react';
import Split from 'react-split';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { css as codemirrorCss } from '@codemirror/lang-css';
import { html as codemirrorHtml } from '@codemirror/lang-html';
import WebHeader from '../../components/WebPen/WebHeader';
import './SplitReact.css';
import { useDispatch, useSelector } from 'react-redux';
import { setHtml, setCss, setJs } from '../../redux/WebPenContent/WebPenSlice';

const WebProject = () => {
  const html = useSelector((state) => state.webPen.html);
  const css = useSelector((state) => state.webPen.css);
  const js = useSelector((state) => state.webPen.js);

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

  const [activeTab, setActiveTab] = useState('html');
  const dispatch = useDispatch();

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

  // Function to get the appropriate extension for CodeMirror based on the active tab
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
    <div className='web-project-container' style={{ height: '100vh' }}>
      <WebHeader />
      <Split
        sizes={[50, 50]} // Initial sizes of the panes
        minSize={300} // Minimum size for each pane
        gutterSize={5} // Size of the gutter between panes
        direction="horizontal" // Split direction (horizontal or vertical)
        style={{ height: 'calc(100vh - 64px)', display: 'flex', padding: 0, overflow: 'hidden' }} // Adjust height if necessary
      >
        <div className='text-red-50 h-full'>
          <div className='h-10 w-1/2 text-purple-700 flex fixed z-1 top-16 justify-between'>
            <div className='flex'>
            {
              Object.keys(tabsData).map((key, index) => (
                <button
                  key={index}
                  onClick={() => handleClick(key)}
                  className={`tab rounded-none hover:border-none ${activeTab === key ? 'active' : ''}`}
                >
                  {tabsData[key].title}
                </button>
              ))
            }
            </div>
            <button className='p-2 text-sm m-1'>Generate Code</button>
          </div>
          <div className='editor-content overflow-hidden h-full pt-10'>
            <CodeMirror
              value={tabsData[activeTab].content}
              extensions={getExtensions()} // Use the function to get the appropriate extensions
              theme="dark"
              height='100%'
              style={{ height: '100%' }}
              onChange={(value) => handleChange(value)}
            />
          </div>
        </div>
        <div className='text-red-50'>
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
      </Split>
    </div>
  );
};

export default WebProject;
