import { Scissors, Sparkles } from 'lucide-react';
import React from 'react'

const RemoveObject = () => {
  const [inputValue, setInputValue] = React.useState('');
  const [object, setObject] = React.useState('');

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    // Handle form submission
  }
  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      {/* left col */}
      <form onSubmit={onSubmitHandler}  className='w-full  max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#4A7AFF]'/>
          <h1 className='text-xl font-semibold'>Object Removal</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Upload Image</p>

        <input onChange={(e) => setInputValue(e.target.files[0])} accept='image/*' type="file"  className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600' required/>
        
         <p className='mt-6 text-sm font-medium'>Describe Object name to remove</p>

        <textarea onChange={(e) => setObject(e.target.value)} value={object} rows={4} className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' placeholder='e.g., Watch or spoon , Only single object name' required/>
        <button className='w-full flex items-center justify-center gap-2 px-4 py-2 mt-6 text-sm text-white  bg-gradient-to-r from-[#417DF6] to-[#8E37EB] rounded-lg cursor-pointer'>
          <Scissors className='w-5'/>
          Remove Object
        </button>

      </form>


      {/* right col */}
      <div className='w-full max-w-lg bg-white rounded-lg flex flex-col border border-gray-200 p-4 min-h-96 '>
        <div className='flex items-center gap-3'>
          <Scissors className='size-5 text-[#4A7AFF]'/>
          <h1 className='text-xl font-semibold'>Processes Image</h1>
        </div>

        <div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5 text-gray-500'>
            <Scissors className='w-9 h-9'/>
            <p>Upload a image and click "Remove Object" to process your image</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default RemoveObject