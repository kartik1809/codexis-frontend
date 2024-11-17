import axios from 'axios';
import { version } from 'react';
const API=axios.create({
    baseURL: 'https://emkc.org/api/v2/piston'
})

export const executeCode = async (language, code) => {
    const response=await API.post('/execute', {
        "language": 'javascript',
        version: '18.15.0',
        files: [
            {
                content: code
            }
        ]
    })
    return response.data
}