import { Button, Spinner } from "@material-tailwind/react";
import  { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddService = () => {
  const [loader, setLoader] = useState(false)
  return (
    <form className='mt-5 md:mt-0 md:p-5 lg:p-10' >
      <h5 className='text-xl md:text-3xl text-primary font-semibold'>
        Add Service
      </h5>
      <div className='grid md:grid-cols-2 gap-2.5 md:gap-5 mt-5 md:mt-10'>
        <div className='flex flex-col gap-2.5'>
          <label>Select Icon</label>
          <input
            type='file'
            className=''
           
          />
        </div>
        <div className='flex flex-col gap-2.5'>
          <label>Select Thumbnail</label>
          <input
            type='file'
            className=''
           
          />
        </div>
        <div className='flex flex-col gap-2.5'>
          <label>Enter Title</label>
          <input
            type='text'
            name='title'
            className='px-4 py-2 outline-none border border-primary rounded'
            placeholder='Enter Title'
          />
        </div>
        <div className='flex flex-col gap-2.5'>
          <label>Enter Slogan</label>
          <input
            type='text'
            name='slogan'
            className='px-4 py-2 outline-none border border-primary rounded'
            placeholder='Enter Slogan'
          />
        </div>
      </div>
      <div className='mt-5 flex flex-col gap-2.5'>
        <label className=''>Enter Content</label>
        <ReactQuill theme='snow'  />
      </div>
      <Button
        type='submit'
        className='bg-primary mt-2.5 flex gap-2 items-center'
      >
        Submit
        {loader && <Spinner className='h-4 w-4' />}
      </Button>
    </form>
  )
}

export default AddService