import { useState } from "react";
import RegistersModal from "./RegistersModal";
import InformationModal from "./InformationModal";
import { useQuery } from "@tanstack/react-query";
import { getMyInformation } from "../api/users";
import {  User } from "../interfaces";
import { BeatLoader } from "react-spinners";
import RegistersChart from "./RegistersChart";
import {motion} from 'framer-motion';
import { modalVariants } from "../animations/animations";
import { useAuthStore } from "../store/auth";
import { jwtDecode } from "jwt-decode";
import { Token } from "../interfaces";
import MultipleRegistersChart from "./MultipleRegistersChart";

function DashboardComponent() {
  const [isRegistersModalOpen, setIsRegistersModalOpen] = useState(false);
  const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);
  const token = useAuthStore.getState().access
  const tokenDecoded: Token = jwtDecode(token)

  const {data, isLoading} = useQuery<User>({
    queryKey: ["information"],
    queryFn: getMyInformation,
  })

  const image = data?.image
  
  return (
    <motion.div 
      className="shadow-lg w-full h-full border-2 rounded-lg border-gray-200 bg-white p-6"
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="flex items-center space-x-4 px-8">
        {isLoading ? (
          <>
            <BeatLoader />
            
          </>
        ): (
          <>
            <img src={`${image}`} alt="Imagen" className="rounded-full w-10 h-10" />
            <p className="text-lg font-semibold tracking-tighter">
              Hi there <span className="text-gray-600">{`${data?.first_name} ${data?.last_name}`}</span>
            </p>
            </>
        )} 
      </div>

      <section className={`grid md:grid-cols-3 ${tokenDecoded.is_technique ? 'md:grid-cols-2' : ''} gap-10 p-6 rounded-lg w-4/5`}>
        <div className={`p-4 rounded-lg shadow-md bg-gray-100 flex flex-col ${tokenDecoded.is_technique ? 'hidden' : ''}`}>
          <p className="text-xs text-gray-500">Company</p>
          <p className="text-lg font-semibold mt-2 text-gray-700">
            {data?.company}
          </p>
          <p className="text-xs font-semibold text-gray-500 mt-1">{data?.branch}</p>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg shadow-md flex flex-col">
          <p className="text-xs text-gray-500">Registers</p>
          <p className="text-lg font-semibold mt-2 text-gray-700">
            {data?.registers_count + " Total Registers"}
          </p>
          <p
            className="cursor-pointer text-blue-500 font-semibold text-sm mt-4"
            onClick={() => setIsRegistersModalOpen(true)}
          >
            View
          </p>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg shadow-md flex flex-col">
          <p className="text-xs text-gray-500">Information</p>
          <p className="text-lg font-semibold mt-2 text-gray-700">
            {`${data?.first_name} ${data?.last_name}` || "No Information Available"}
          </p>
          <p
            className="cursor-pointer text-blue-500 font-semibold text-sm mt-4"
            onClick={() => setIsInformationModalOpen(true)}
          >
            View
          </p>
        </div>
      </section>

      <section className="w-4/5">
        {tokenDecoded.is_technique ? (
          <MultipleRegistersChart />
        ) : (
          <RegistersChart />
        )}
      </section>

      {isRegistersModalOpen && (
        <RegistersModal setIsRegistersModalOpen={setIsRegistersModalOpen} />
      )}

      {isInformationModalOpen && (
        <InformationModal setIsInformationModalOpen={setIsInformationModalOpen} />
      )}

    </motion.div>
  );
}

export default DashboardComponent;
