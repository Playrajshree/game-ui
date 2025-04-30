import React from 'react'
import { ClipLoader } from 'react-spinners'

const Loader = ({loading, position = "fixed", size = 80}) => {
    if(!loading) return null;
  return (
    <div className={`${position} w-full h-full bg-[rgba(0,0,0,0.6)] top-0 left-0 z-10 flex items-center justify-center`}>
           <ClipLoader size={size} color='white' />
    </div>
  )
}

export default Loader