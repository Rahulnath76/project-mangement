import Inputfield from "./components/Inputfield"
import Sidebar from "./components/Sidebar"


const App = () => {
  
  return (
  <div className="font-inter w-full h-full min-h-screen text-white">
    <Sidebar />
    <main className="">
      <Inputfield />
    </main>
  </div>
)
}

export default App
