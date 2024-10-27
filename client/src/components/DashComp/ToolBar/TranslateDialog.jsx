import React, { useState } from 'react';
import SubtitlesIcon from '@mui/icons-material/Subtitles';

const TranslateDialog = () => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [code, setCode] = useState('');
    const [translatedCode, setTranslatedCode] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('python'); // Default language

    const handleTranslateClick = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };

    const handleLanguageChange = (e) => {
        setSelectedLanguage(e.target.value);
    };

    const handleSubmitCode = async () => {
        try {
            const response = await fetch('http://localhost:5000/translate-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code, language: selectedLanguage }),
            });

            const data = await response.json();
            setTranslatedCode(data.translatedCode);
            setDialogOpen(false);
        } catch (error) {
            console.error('Error translating code:', error);
        }
    };

    return (
        <div className="relative p-4">
            <span onClick={handleTranslateClick} className='cursor-pointer'><SubtitlesIcon /> Translate Code</span>

            {isDialogOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                    <div className="bg-zinc-950 text-white p-6 rounded-2xl shadow-xl w-1/3 max-w-lg border border-gray-700">
                        <h2 className="text-2xl font-bold mb-4 text-blue-400">Enter Code to Translate</h2>
                        
                        {/* Language Selector */}
                        <div className="mb-4">
                            <label htmlFor="language" className="block text-lg font-medium text-blue-400 mb-2">Select Target Language:</label>
                            <select
                                id="language"
                                value={selectedLanguage}
                                onChange={handleLanguageChange}
                                className="w-full p-2 border border-gray-700 rounded-lg bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            >
                                <option value="python">Python</option>
                                <option value="java">Java</option>
                                <option value="javascript">JavaScript</option>
                                <option value="csharp">C#</option>
                                <option value="cpp">C++</option>
                                {/* Add more programming languages as needed */}
                            </select>
                        </div>

                        <textarea
                            value={code}
                            onChange={handleCodeChange}
                            className="w-full p-3 border border-gray-700 rounded-lg mb-4 bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            rows="4"
                        ></textarea>
                        <div className="flex justify-between">
                            <button
                                onClick={handleSubmitCode}
                                className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                            >
                                Translate
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

            {translatedCode && (
                <div className="mt-4 p-4 border border-gray-700 rounded-lg bg-zinc-800 shadow-lg">
                    <h3 className="text-xl font-semibold text-blue-400">Translated Code:</h3>
                    <pre className="whitespace-pre-wrap text-white">{translatedCode}</pre>
                </div>
            )}
        </div>
    );
};

export default TranslateDialog;
