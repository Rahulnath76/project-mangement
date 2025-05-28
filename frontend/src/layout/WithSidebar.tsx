import React, { useState } from 'react'
import Sidebar from '../components/common/Sidebar'

const WithSidebar = ({children}: { children: React.ReactNode}) => {
  const [collapse, setCollapse] = useState<boolean>(false);
  return (
    <>
       <Sidebar collapse={collapse} setCollapse={setCollapse}/>

       <main className={`absolute top-0 ${!collapse ? "left-[270px]" : "left-16"} right-0 bottom-0 m-2 transition-all duration-200`}>
        {children}
       </main>
    </>
  )
}

export default WithSidebar