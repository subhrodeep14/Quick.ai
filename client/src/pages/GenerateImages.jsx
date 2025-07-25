import { Image, Sparkles } from 'lucide-react';
import React from 'react'

const GenerateImages = () => {
   const ImageStyle=[ 'Realistic', 'Cartoon', 'Abstract', 'Surreal', 'Impressionist', 'Cubist', 'Minimalist', 'Maximalist', 'Photorealistic', 'Line Art', 'Ghibli'
   ]
    const [selectedStyle, setSelectedStyle] = React.useState(ImageStyle[0]);
    const [inputValue, setInputValue] = React.useState('');

    const  [publish, setPublish] = React.useState(false);

      const onSubmitHandler = async(e) => {
        e.preventDefault();
        // Handle form submission
      }
  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      {/* left col */}
      <form onSubmit={onSubmitHandler}  className='w-full  max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#00AD25]'/>
          <h1 className='text-xl font-semibold'>AI Image Generator</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Describe Your Image</p>

        <textarea onChange={(e) => setInputValue(e.target.value)} value={inputValue} rows={4} className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' placeholder='Describe your image...' required/>

        <p className='mt-4 text-sm font-medium'>Style</p>

        <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
          {ImageStyle.map((item) => (
           <span onClick={()=>setSelectedStyle(item)} className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedStyle === item ? 'bg-green-50 text-green-700' : 'text-gray-600 border-gray-300'}`} key={item}>{item}</span>
          ))}
        </div>

          <div className='my-6 flex items-center gap-2'>
            <label className='relative cursor-pointer'>
              <input type='checkbox' className='sr-only peer' onChange={(e) => setPublish(e.target.checked)} checked={publish}/>

              <div className='w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition '></div>
              <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4'></span>
            </label>
            <p className='text-sm'>Make this image public</p>
          </div>

        <br/>
        <button className='w-full flex items-center justify-center gap-2 px-4 py-2 mt-6 text-sm text-white  bg-gradient-to-r from-[#00AD25] to-[#04FF50] rounded-lg cursor-pointer' type='submit'>
          <Image className='w-5'/>
          Generate Image
        </button>

      </form>


      {/* right col */}
      <div className='w-full max-w-lg bg-white rounded-lg flex flex-col border border-gray-200 p-4 min-h-96 '>
        <div className='flex items-center gap-3'>
          <Image className='size-5 text-[#00AD25]'/>
          <h1 className='text-xl font-semibold'>Generate Images</h1>
        </div>

        <div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5 text-gray-500'>
            <Image className='w-9 h-9'/>
            <p>Enter a topic and click "Generate Image" to create your image.</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default GenerateImages