import React from 'react'
import { Toaster} from 'sonner';

import { RouterProvider } from 'react-router-dom';

import router from './routes';

export const App = () => {
  return (
     <>
        <Toaster richColors />
        <RouterProvider  router={router}/>
     </>
      
  )
}


export default App;