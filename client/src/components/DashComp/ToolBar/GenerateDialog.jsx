import React, { useState } from 'react';
import CodeIcon from '@mui/icons-material/Code';

const GenerateDialog = () => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');

    const handleGenerateClick = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handlePromptChange = (e) => {
        setPrompt(e.target.value);
    };

    const handleSubmitPrompt = async () => {
        try {
            const response = await fetch('http://localhost:5000/generate-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            const data = await response.json();
            setGeneratedCode(data.code);
            setDialogOpen(false);
        } catch (error) {
            console.error('Error generating code:', error);
        }
    };

    return (
        <div className="relative p-4">
            <span onClick={handleGenerateClick} className='cursor-pointer'><CodeIcon /> Generate</span>

            {isDialogOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                    <div className="bg-zinc-950 text-white p-6 rounded-2xl shadow-xl w-1/3 max-w-lg border border-gray-700">
                        <h2 className="text-2xl font-bold mb-4 text-blue-400">Enter Your Prompt</h2>
                        <textarea
                            value={prompt}
                            onChange={handlePromptChange}
                            className="w-full p-3 border border-gray-700 rounded-lg mb-4 bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            rows="4"
                        ></textarea>
                        <div className="flex justify-between">
                            <button
                                onClick={handleSubmitPrompt}
                                className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                            >
                                Generate
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

            {generatedCode && (
                <div className="mt-4 p-4 border border-gray-700 rounded-lg bg-zinc-800 shadow-lg">
                    <h3 className="text-xl font-semibold text-blue-400">Generated Code:</h3>
                    <pre className="whitespace-pre-wrap text-white">{generatedCode}</pre>
                </div>
            )}
        </div>
    );
};

export default GenerateDialog;
