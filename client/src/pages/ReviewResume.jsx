import { FileText, Sparkles } from 'lucide-react';
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {

  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth();


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)


      const fromData = new FormData()

      fromData.append('resume', inputValue);


      const { data } = await axios.post('/api/ai/review-resume', fromData,
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      )

      if (data.success) {
        setContent(data.content)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(data.message)
    }
    setLoading(false)

  }
  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      {/* left col */}
      <form onSubmit={onSubmitHandler} className='w-full  max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#00DA83]' />
          <h1 className='text-xl font-semibold'>Resume Review</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Upload Resume</p>

        <input onChange={(e) => setInputValue(e.target.files[0])} accept='application/pdf' type="file" className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600' required />

        <p className='text-xs text-gray-500 font-light mt-1'>Supports PDF format</p>

        <button disabled={loading} className='w-full flex items-center justify-center gap-2 px-4 py-2 mt-6 text-sm text-white  bg-gradient-to-r from-[#00DA83] to-[#009BB3] rounded-lg cursor-pointer'>
          {loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span> :
            <FileText className='w-5' />}
          Review Resume
        </button>

      </form>


      {/* right col */}
      <div className='w-full max-w-lg bg-white rounded-lg flex flex-col border border-gray-200 p-4 min-h-96  max-h-[600px]'>
        <div className='flex items-center gap-3'>
          <FileText className='size-5 text-[#00DA83]' />
          <h1 className='text-xl font-semibold'>Analysis Results</h1>
        </div>

        {!content ? (<div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5 text-gray-500'>
            <FileText className='w-9 h-9' />
            <p>Upload a resume and click "Review Resume" to process your resume</p>
          </div>
        </div>) : (
          <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-600'>
            <div className='reset-tw'>
              <Markdown>
                {content}
              </Markdown>

            </div>
          </div>
        )}



      </div>
    </div>
  )
}

export default ReviewResume