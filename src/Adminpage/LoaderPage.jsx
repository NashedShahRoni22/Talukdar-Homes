import { Spinner } from '@material-tailwind/react'

const LoaderPage = () => {
  return (
    <div className='min-h-[60vh] flex justify-center items-center'>
      <Spinner className='h-8 w-8' />
    </div>
  )
}

export default LoaderPage
