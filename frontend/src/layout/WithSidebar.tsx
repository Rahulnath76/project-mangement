import React from 'react'
import Sidebar from '../components/common/Sidebar'

const WithSidebar = ({children}: { children: React.ReactNode}) => {
  return (
    <>
       <Sidebar />

       <main className="absolute top-0 left-[270px] right-0 bottom-0 m-2">
        {children}
       </main>
    </>
  )
}

export default WithSidebar