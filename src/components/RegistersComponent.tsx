import PestDetector from "./PestDetector"

function RegistersComponent() {
  return (
    <div className="p-10 w-4/5">  
      <p className="text-3xl font-bold tracking-tighter">
        Registers management
      </p>
      <p className="text-xs text-gray-500 font-semibold mt-1">Manage your registers and their permissions here.</p>
      <p className="text-2xl font-bold mt-10 text-gray-700">All registers <span className="text-gray-400">{'20'}</span></p>

      <input 
        type="search" 
        placeholder="Search"
        className="outline mt-10 outline-1 outline-gray-400 text-sm pl-5 py-3 w-2/4 rounded-lg focus:outline-blue-300 focus:ring-2 focus:ring-blue-400"
      />

      <section className="mt-10">
        <p className="text-xs text-gray-500 uppercase font-bold">Registers</p>
        <div className="mt-8">
          <PestDetector />
        </div>
      </section>
    </div>

  )
}

export default RegistersComponent
