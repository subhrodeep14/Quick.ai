import { Edit, Sparkles } from 'lucide-react'
import React from 'react'

const WriteArticle = () => {
  const articleLength=[
    {length: 800, text: 'Short (500-800 words)'},
    {length: 1200, text: 'Medium (800-1200 words)'},  
    {length: 1600, text: 'Long (1500+ words)'},
  ]

  const [selectedLength, setSelectedLength] = React.useState(articleLength[0]);
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
          <Sparkles className='w-6 text-[#4A7AFF]'/>
          <h1 className='text-xl font-semibold'>Article Configuration</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Article Topic</p>

        <input onChange={(e) => setInputValue(e.target.value)} value={inputValue} type="text"  className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' placeholder='The future of AI is...' required/>

        <p className='mt-4 text-sm font-medium'>Article Length</p>

        <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
          {articleLength.map((item, index) => (
           <span onClick={()=>setSelectedLength(item)} className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedLength.text === item.text ? 'bg-blue-50 text-blue-700' : 'text-gray-600 border-gray-300'}`} key={index}>{item.text}</span>
          ))}
        </div>
        <br/>
        <button className='w-full flex items-center justify-center gap-2 px-4 py-2 mt-6 text-sm text-white  bg-gradient-to-r from-[#226BFF] to-[#65ADFF] rounded-lg cursor-pointer' type='submit'>
          <Edit className='w-5'/>
          Generate Article
        </button>

      </form>


      {/* right col */}
      <div className='w-full max-w-lg bg-white rounded-lg flex flex-col border border-gray-200 p-4 min-h-96 max-h-[600px]'>
        <div className='flex items-center gap-3'>
          <Edit className='size-5 text-[#4A&AFF]'/>
          <h1 className='text-xl font-semibold'>Generate article</h1>
        </div>

        <div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5 text-gray-500'>
            <Edit className='w-9 h-9'/>
            <p>Enter a topic and click "Generate Article" to create your article.</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default WriteArticle