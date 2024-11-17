import React, { useRef, useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector, useDispatch } from 'react-redux';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { addBoard } from '../../../redux/KanbanBoard/kanbanContentSlice';

const EditTask = (props) => {
  const user = useSelector(state => state.user);
  const [showLabelInput, setShowLabelInput] = useState(false);
  const [editDesc, setEditDesc] = useState(false);

  const uuid = user.currentUser ? user.currentUser.uuid : '000f';
  const [startDate, setStartDate] = useState(new Date());
  const [desc, setDesc] = useState('');
  const [labels, setLabels] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.cardData) {
      setLabels(props.cardData.labels || []);
      setStartDate(props.cardData.date || new Date());
      setDesc(props.cardData.desc || '');
      setTaskTitle(props.cardData.title || '');
    }
  }, []);

  const labelColor = [
    'bg-blue-500',
    'bg-teal-500',
    'bg-indigo-600',
    'bg-purple-500',
    'bg-pink-500',
    'bg-red-600',
    'bg-fuchsia-500',
    'bg-cyan-500',
    'bg-emerald-500',
    'bg-violet-500'
  ];

  const handleClick = (e) => {
    e.stopPropagation();
    props.setIsVisible(false);
  };

  const addLabel = (e) => {
    e.stopPropagation();
    setShowLabelInput(true);
  };

  const editDescription = (e) => {
    e.stopPropagation();
    setEditDesc(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setEditDesc(false);
    }
  };

  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };

  const addLabelToTask = (e) => {
    if (e.key === 'Enter') {
      if (labels.length < 3) {
        setLabels([...labels, e.target.value]);
        setShowLabelInput(false);
        e.target.value = '';
      } else {
        setShowLabelInput(false);
        e.target.value = '';
      }
    }
  };

  const deleteLabel = (e) => {
    e.stopPropagation();
    const newLabels = labels.filter((_, index) => index !== parseInt(e.target.id));
    setLabels(newLabels);
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    props.setIsVisible(false);
  };

  const fetchKanban = async () => {
    try {
      const res = await fetch('http://127.0.0.1:3001/api/kanban/kanban', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uuid })
      });
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await res.json();
      dispatch(addBoard(data.kanbanBoards));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.stopPropagation();
    const boardIdx = props.cardData.board;
    const taskIdx = props.cardData.index;
    const task = {
      id: props.cardData.id,
      title: taskTitle,
      description: desc,
      labels: labels,
      date: startDate
    };

    try {
      const res = await fetch('http://127.0.0.1:3001/api/kanban/updatetask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uuid, idx: boardIdx, taskIdx, task })
      });
      if (!res.ok) {
        throw new Error('Failed to update task');
      }
      fetchKanban();
      props.setIsVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (!props.vis) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 pr-6 rounded-lg relative max-w-sm w-[100vw] h-[80vh] p-6 flex flex-col">
        <button
          onClick={(e) => handleClick(e)}
          className="absolute text-4xl p-1 top-1 right-2 bg-transparent text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>

        <div className="flex-grow pt-8 flex flex-col gap-6 text-gray-900">
          <div>
            <label htmlFor="" className='text-white'>Task Title</label>
            <input
              type="text"
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full h-10 text-black bg-gray-200 p-2 rounded-lg"
              value={taskTitle}
            />
          </div>
          <div>
            <label htmlFor="" className='text-white'>Task Description</label>
            <div className={`relative w-full h-32 border-2 border-gray-300 rounded-lg text-white p-2 ${editDesc ? 'hidden' : ''}`}>
              <div className="absolute top-2 right-2 cursor-pointer" onClick={editDescription}>
                <EditNoteIcon />
              </div>
              <div className="w-full pr-8 break-words">
                {desc}
              </div>
            </div>

            <textarea
              onChange={(e) => handleDescChange(e)}
              onKeyDown={(e) => handleKeyDown(e)}
              className={`relative w-full h-32 border-2 border-gray-300 rounded-lg text-white p-2 resize-none ${editDesc ? '' : 'hidden'}`}
              value={desc}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="" className='text-white'>Task Labels &#40;only three&#41;</label>
            <div className='flex gap-2 items-center'>
              {labels.map((label, index) => (
                <span
                  key={index}
                  className={`label gap-2 rounded-3xl p-2 pt-1 pb-1 text-white flex hover:text-white ${labelColor[Math.floor(Math.random() * labelColor.length)]}`}
                >
                  {label} <p className='cursor-pointer' id={index} onClick={(e) => deleteLabel(e)}>&times;</p>
                </span>
              ))}
              <input
                type="text"
                onKeyDown={(e) => addLabelToTask(e)}
                className={`w-20 h-8 text-black bg-gray-300 p-1 rounded-lg ${!showLabelInput ? 'hidden' : ''}`}
              />
              {labels.length < 3 && (
                <p className="text-white cursor-pointer" onClick={(e) => addLabel(e)}>
                  <AddIcon />
                </p>
              )}
            </div>
          </div>
          <div className='flex gap-2 items-center'>
            <label htmlFor="" className='text-white'>Task Due Date</label>
            <div className="relative max-w-sm w-40">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <DatePicker
                selected={startDate}
                minDate={new Date()}
                onChange={(date) => setStartDate(date)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholderText="Select date"
              />
            </div>
          </div>
        </div>

        <div className='flex justify-end gap-4 mt-4'>
          <button className='bg-slate-300 border-2 border-gray-500 rounded-lg p-2' onClick={(e) => { handleCancel(e) }}>Cancel</button>
          <button className='bg-blue-500 text-white p-2 rounded-lg' onClick={(e) => { handleUpdate(e) }}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
