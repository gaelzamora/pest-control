import { useState } from "react"
import Navbar from "../components/Navbar"
import RegistersComponent from "../components/RegistersComponent"
import ManageManagementComponent from "../components/ManageManagementComponent"
import DashboardComponent from "../components/DashboardComponent"
import OwnersComponent from "../components/OwnersComponent"
import TechniquesComponent from "../components/TechniquesComponent"
    
function HomePage() {
  const [showComponent, setShowComponent] = useState("Dashboard")

  return (
    <div className="grid grid-cols-6 h-screen w-screen overflow-hidden bg-gray-100">
      
      <Navbar 
        showComponent={showComponent} 
        setShowComponent={setShowComponent} 
      />

      <div className="h-screen w-screen py-2">

          {showComponent === "Dashboard" && <DashboardComponent />}
          {showComponent === "Registers" && <RegistersComponent />}
          {showComponent === "Manager management" && <ManageManagementComponent />}
          {showComponent === "Owners" && <OwnersComponent />}
          {showComponent === "Techniques" && <TechniquesComponent /> }
      </div>
    </div>
  )
}

export default HomePage
