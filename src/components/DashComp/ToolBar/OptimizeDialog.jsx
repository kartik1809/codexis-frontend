import React, { useState } from 'react';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';

const OptimizeDialog = () => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [input, setInput] = useState('');
    const [optimizedCode, setOptimizedCode] = useState('');

    const handleOptimizeClick = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmitInput = async () => {
        try {
            const response = await fetch('http://localhost:5000/optimize-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ input }),
            });

            const data = await response.json();
            setOptimizedCode(data.code);
            setDialogOpen(false);
        } catch (error) {
            console.error('Error optimizing code:', error);
        }
    };

    return (
        <div className="relative p-4">
            <span onClick={handleOptimizeClick} className='cursor-pointer'><DynamicFormIcon /> Optimize</span>

            {isDialogOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                    <div className="bg-zinc-950 text-white p-6 rounded-2xl shadow-xl w-1/3 max-w-lg border border-gray-700">
                        <h2 className="text-2xl font-bold mb-4 text-blue-400">Enter Code to Optimize</h2>
                        <textarea
                            value={input}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-700 rounded-lg mb-4 bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            rows="4"
                        ></textarea>
                        <div className="flex justify-between">
                            <button
                                onClick={handleSubmitInput}
                                className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                            >
                                Optimize
                            </button>
                            <button
                                onClick={handleCloseDialog}
                                className="bg-red-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {optimizedCode && (
                <div className="mt-4 p-4 border border-gray-700 rounded-lg bg-zinc-800 shadow-lg">
                    <h3 className="text-xl font-semibold text-blue-400">Optimized Code:</h3>
                    <pre className="whitespace-pre-wrap text-white">{optimizedCode}</pre>
                </div>
            )}
        </div>
    );
};

export default OptimizeDialog;
