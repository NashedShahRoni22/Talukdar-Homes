import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Spinner } from '@material-tailwind/react'

import ReactQuill from 'react-quill'
import { useNavigate } from 'react-router-dom'
import LoaderPage from '../Adminpage/LoaderPage'

const Update = () => {
 const { slug } = useParams();
 const [service, setService] = useState({});

 const navigate = useNavigate();
 const [loader, setLoader] = useState(false);
 const [updateLoader, setUpdateLoader] = useState(false);
 //manage data
 const [value, setValue] = useState('');
 const [icon, setIcon] = useState('');
 const [thumbnail, setThumbnail] = useState('');
 const [title, setTitle] = useState('');
 const [slogan, setSlogan] = useState('');

 //get service
 useEffect(() => {
   setLoader(true)
   fetch(
     `https://api.talukderhomes.com.au/api/products/${slug}`
   )
     .then((res) => res.json())
     .then((data) => {
       if (data.status === true) {
         setService(data.data)
         setValue(data.data.content)
         // setIcon(data.data.icon);
         // setThumbnail(data.data.thumbnail);
         setTitle(data.data.title)
         setLoader(false)
       }
     })
 }, [])

 // update service
 const updateService = async (id) => {
   setUpdateLoader(true)

   // console.log("Inside Function",icon, title, thumbnail, slogan, value);

   const formData = new FormData()
   formData.append('image', icon)
   formData.append('title', title)
  //  formData.append('thumbnail', thumbnail)
  //  formData.append('slogan', slogan)
   formData.append('content', value)

   try {
     const response = await fetch(
       `https://api.talukderhomes.com.au/api/products/update/${id}`,
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
       setUpdateLoader(false)
       navigate('/admin/manageService')
     }
     // Handle response data as needed
   } catch (error) {
     console.error('Error:', error)
     setUpdateLoader(false)
   }
 }
  return (
    <section className='mt-5 md:mt-0 md:p-5 lg:p-10 flex flex-col gap-2.5'>
      {loader ? (
        <LoaderPage />
      ) : (
        <>
          {/* <label className='font-semibold'>Update thumbnail</label>
          <img src={service?.thumbnail} alt='' className='size-64' />
          <input
            type='file'
            className=''
            onChange={(e) => setThumbnail(e.target.files[0])}
          /> */}
          <label className='font-semibold'>Update icon</label>
          <img className='size-24' src={service?.icon} alt='' />
          <input
            type='file'
            className=''
            onChange={(e) => setIcon(e.target.files[0])}
          />
          <label className='font-semibold'>Title</label>
          <input
            className='px-4 py-2 border w-full'
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
            type='text'
          />
          {/* <label className='font-semibold'>Slogan</label>
          <input
            className='px-4 py-2 border w-full'
            defaultValue={slogan}
            onChange={(e) => setSlogan(e.target.value)}
            type='text'
          /> */}
          <ReactQuill theme='snow' value={value} onChange={setValue} />
          <Button
            onClick={() => updateService(service?.id)}
            className='bg-blue-500 mt-2.5 flex gap-2 items-center w-fit'
          >
            Update
            {updateLoader && <Spinner className='h-4 w-4' />}
          </Button>
        </>
      )}
    </section>
  )
}

export default Update
