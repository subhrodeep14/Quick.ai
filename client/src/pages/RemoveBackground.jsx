import { Eraser, Sparkles } from 'lucide-react';
import React from 'react'

const RemoveBackground = () => {

   
      const [inputValue, setInputValue] = React.useState('');
    
      const onSubmitHandler = async(e) => {
        e.preventDefault();
        // Handle form submission
      }
  return (
     <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      {/* left col */}
      <form onSubmit={onSubmitHandler}  className='w-full  max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#FF4938]'/>
          <h1 className='text-xl font-semibold'>Background Remover</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Upload Image</p>

        <input onChange={(e) => setInputValue(e.target.files[0])} accept='image/*' type="file"  className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600' required/>
        
        <p className='text-xs text-gray-500 font-light mt-1'>Supports JPG, PNG, and other image formats</p>
        <button className='w-full flex items-center justify-center gap-2 px-4 py-2 mt-6 text-sm text-white  bg-gradient-to-r from-[#F6AB41] to-[#FF4938] rounded-lg cursor-pointer'>
          <Eraser className='w-5'/>
          Remove background
        </button>

      </form>


      {/* right col */}
      <div className='w-full max-w-lg bg-white rounded-lg flex flex-col border border-gray-200 p-4 min-h-96 '>
        <div className='flex items-center gap-3'>
          <Eraser className='size-5 text-[#FF4938]'/>
          <h1 className='text-xl font-semibold'>Processes Image</h1>
        </div>

        <div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5 text-gray-500'>
            <Eraser className='w-9 h-9'/>
            <p>Upload a image and click "Remove Background" to process your image</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default RemoveBackground