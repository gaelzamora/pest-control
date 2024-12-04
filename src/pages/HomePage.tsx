import { useState } from "react"
import Navbar from "../components/Navbar"
import RegistersComponent from "../components/RegistersComponent"
import ManageManagementComponent from "../components/ManageManagementComponent"
    
function HomePage() {
  const [showNavbar, setShowNavbar] = useState(false)
  const [showComponent, setShowComponent] = useState(3)

  return (
    <div className="grid grid-cols-6 h-screen w-screen overflow-hidden bg-gray-100">
      
      <Navbar setShowComponent={setShowComponent} />

      <div className="h-screen w-screen py-2">
        <div className="shadow-lg w-full h-full border-2 rounded-lg border-gray-200 bg-white p-6">
          {showComponent === 2 && <RegistersComponent />}
          {showComponent === 3 && <ManageManagementComponent />}         
        </div>
      </div>
    </div>
  )
}

export default HomePage
