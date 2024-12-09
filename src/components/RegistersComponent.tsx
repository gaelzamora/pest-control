import { useQuery } from "@tanstack/react-query";
import PestDetector from "./PestDetector";
import { useAuthStore } from "../store/auth";
import { Register, Token } from "../interfaces";
import { jwtDecode } from "jwt-decode";
import { getRegisters } from "../api/registers";
import { BeatLoader } from "react-spinners";
import { FaRegEye } from "react-icons/fa";
import { useState } from "react";
import {delay, motion} from 'framer-motion';
import { modalVariants } from "../animations/animations";
import { itemOpacity } from "../animations/animations";

function RegistersComponent() {
  const token: string = useAuthStore.getState().access;
  const tokenDecoded: Token = jwtDecode(token);
  const pk = tokenDecoded.id;
  const branch = tokenDecoded.branch;

  const { data, isLoading } = useQuery({
    queryKey: ["registers", pk],
    queryFn: getRegisters,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);

  const openModal = (image: string) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalImage(null);
    setIsModalOpen(false);
  };

  return (
    <motion.div 
      className="shadow-lg w-full h-full border-2 rounded-lg border-gray-200 bg-white p-6"
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="p-10 w-4/5">
        <p className="text-2xl font-bold text-gray-700">
          All registers <span className="text-gray-400">{data?.length || 0}</span>
        </p>
        <p className="text-xs text-gray-500 font-semibold mt-1">
          You can view your registers.
        </p>

        <div className="mt-8">
          <PestDetector />
        </div>

        <section className="mt-10">
          <p className="text-xs text-gray-500 uppercase font-bold">Registers</p>
          <div className="mt-8">
            {isLoading ? (
              <div className="flex justify-center items-center font-bold">
                <BeatLoader />
              </div>
            ) : (
              <>
                {data && data.length > 0 ? (
                  <div className="flex flex-col gap-4 max-h-96 overflow-y-auto">
                    {data.map((register: Register, index: number) => (
                      <motion.div
                        className="flex items-center space-x-4"
                        key={index}
                        custom={{delay: (index+1) * 0.4}}
                        variants={itemOpacity}
                        initial='hidden'
                        animate='visible'
                        layoutId={register.pest_name}
                      >
                        <img
                          src={`http://localhost:8000${register.image}/`}
                          alt="Imagen"
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-semibold tracking-tighter">
                            {register.pest_name}
                          </p>
                          <p className="font-semibold text-gray-500 text-xs">
                            {branch}
                          </p>
                          <p className="font-semibold text-gray-500 text-xs">
                            {register.created}
                          </p>
                        </div>
                        <div className="flex flex-1" />
                        <FaRegEye
                          className="text-gray-500 font-semibold cursor-pointer"
                          size={20}
                          onClick={() =>
                            openModal(`http://localhost:8000${register.image}/`)
                          }
                        />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No registers found.</p>
                )}
              </>
            )}
          </div>
        </section>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded shadow-lg max-w-lg">
              <img
                src={modalImage || ""}
                alt="Registro"
                className="max-w-full h-auto rounded"
              />
              <button
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default RegistersComponent;
