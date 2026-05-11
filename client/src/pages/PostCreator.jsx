
import { Send, Sparkles, Copy, Check } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const PostCreator = () => {

    const tones = ['Professional', 'Casual', 'Witty', 'Inspirational', 'Urgent']
    const platforms = ['Twitter', 'LinkedIn', 'Instagram', 'Facebook', 'Threads']

    const [selectedTone, setSelectedTone] = useState(tones[0])
    const [selectedPlatform, setSelectedPlatform] = useState(platforms[0])
    const [topic, setTopic] = useState('')
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState('')
    const [copied, setCopied] = useState(false)

    const { getToken } = useAuth()

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const { data } = await axios.post('/api/ai/generate-post', { topic, tone: selectedTone, platform: selectedPlatform }, {
                headers: { Authorization: `Bearer ${await getToken()}` }
            })

            if (data.success) {
                setContent(data.content)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
        setLoading(false)
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(content)
        setCopied(true)
        toast.success('Copied to clipboard!')
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
            {/* left col */}
            <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
                <div className='flex items-center gap-3'>
                    <Sparkles className='w-6 text-[#4A7AFF]' />
                    <h1 className='text-xl font-semibold'>Post Configuration</h1>
                </div>

                <p className='mt-6 text-sm font-medium'>Post Topic</p>
                <input onChange={(e) => setTopic(e.target.value)} value={topic} type="text" className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' placeholder='What do you want to post about?' required />

                <div className="flex gap-4 mt-4">
                    <div className="flex-1">
                        <p className='text-sm font-medium'>Tone</p>
                        <select onChange={(e) => setSelectedTone(e.target.value)} value={selectedTone} className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 cursor-pointer'>
                            {tones.map((t, i) => <option key={i} value={t}>{t}</option>)}
                        </select>
                    </div>
                    <div className="flex-1">
                        <p className='text-sm font-medium'>Platform</p>
                        <select onChange={(e) => setSelectedPlatform(e.target.value)} value={selectedPlatform} className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 cursor-pointer'>
                            {platforms.map((p, i) => <option key={i} value={p}>{p}</option>)}
                        </select>
                    </div>
                </div>

                <br />
                <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer hover:shadow-lg transition-all'>
                    {
                        loading ? <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
                            : <Send className='w-4' />
                    }
                    Generate Post
                </button>
            </form>
            {/* Right col */}
            <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-64 max-h-[600px]'>

                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <Send className='w-5 h-5 text-[#4A7AFF]' />
                        <h1 className='text-xl font-semibold'>Generated Post</h1>
                    </div>
                    {content && (
                        <button onClick={copyToClipboard} className='flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 transition-colors'>
                            {copied ? <Check className='w-4 h-4 text-green-500' /> : <Copy className='w-4 h-4' />}
                            {copied ? 'Copied' : 'Copy'}
                        </button>
                    )}
                </div>

                {!content ? (
                    <div className='flex-1 flex justify-center items-center'>
                        <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                            <Send className='w-9 h-9' />
                            <p>Enter a topic and click "Generate Post" to get started</p>
                        </div>
                    </div>
                ) : (
                    <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-600 p-4 bg-gray-50 rounded-md border border-gray-100'>
                        <div className='reset-tw'>
                            <Markdown>{content}</Markdown>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default PostCreator
