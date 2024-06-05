import { Button, Spinner } from "@material-tailwind/react";
import  { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from 'react-router-dom'

const AddService = () => {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)
  const [value, setValue] = useState('')
  const [icon, setIcon] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video', 'code-block'],
      ['clean'],
    ],
  }

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ]

  // add a new service
  const addService = async (e) => {
    setLoader(true)
    e.preventDefault()
    const title = e.target.title.value
    const slogan = e.target.slogan.value

    console.log(icon, title, thumbnail, slogan, value)

    const formData = new FormData()
    formData.append('icon', icon)
    formData.append('title', title)
    formData.append('thumbnail', thumbnail)
    formData.append('slogan', slogan)
    formData.append('content', value)
    try {
      const response = await fetch(
        '',
        {
          method: 'POST',
          body: formData,
          headers: {
            // Add any necessary headers, such as authorization
          },
        }
      )
      const data = await response.json()
      if (data.status === true) {
        window.alert(data.msg)
        setLoader(false)
        navigate('/admin/manageService')
      }
      // Handle response data as needed
    } catch (error) {
      console.error('Error:', error)
      setLoader(false)
    }
  }
  return (
    <form className='mt-5 md:mt-0 md:p-5 lg:p-10' onSubmit={addService}>
      <div className='flex justify-between'>
        <h5 className='text-xl md:text-3xl text-primary font-semibold'>
          Add Service
        </h5>
        <Button type='submit' className='bg-primary flex gap-2 items-center'>
          Submit
          {loader && <Spinner className='h-4 w-4' />}
        </Button>
      </div>
      <div className='grid md:grid-cols-2 gap-2.5 md:gap-5 mt-5 md:mt-10'>
        <div className='flex flex-col gap-2.5'>
          <label>Select Icon</label>
          <input
            type='file'
            className=''
            onChange={(e) => setIcon(e.target.files[0])}
          />
        </div>
        <div className='flex flex-col gap-2.5'>
          <label>Select Thumbnail</label>
          <input
            type='file'
            className=''
            onChange={(e) => setThumbnail(e.target.files[0])}
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
        <ReactQuill
          theme='snow'
          value={value}
          onChange={setValue}
          modules={modules}
          formats={formats}
          className='py-2 w-full h-[300px]'
        />
      </div>
    </form>
  )
}

export default AddService