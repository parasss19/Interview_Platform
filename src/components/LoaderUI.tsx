import {HashLoader} from "react-spinners"

const LoaderUI = () => {
  return (
    <div className='h-screen flex items-center justify-center'>
      <HashLoader color="white" size={100} />
    </div>
  )
}

export default LoaderUI