
type Props = {
    setIsRegistersModalOpen: (state: boolean) => void
}

function RegistersModal({setIsRegistersModalOpen}: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Registers</h2>
            <p className="text-gray-600">Details about the company's registers.</p>
            <button
              onClick={() => setIsRegistersModalOpen(false)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
            >
              Close
            </button>
          </div>
    </div>

  )
}

export default RegistersModal