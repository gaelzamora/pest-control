import { useQuery } from "@tanstack/react-query";
import { getTechnicians, receivedStatusTechnicians } from "../api/users";
import { Technician, Token } from "../interfaces";
import { useAuthStore } from "../store/auth";
import { jwtDecode } from "jwt-decode";
import { BeatLoader } from "react-spinners";
import { useState } from "react";
import { motion } from "framer-motion";
import { modalVariants } from "../animations/animations";
import TechnicianCard from "./TechnicianCard";

function TechniquesComponent() {
    const [search, setSearch] = useState("");
    const token: string = useAuthStore.getState().access;
    const tokenDecoded: Token = jwtDecode(token);
    const pk = tokenDecoded.id;
  
    const { data, isLoading } = useQuery({
        queryKey: ["technicians", pk, search],
        queryFn: () => getTechnicians(search, token)
    });

    const { data: status } = useQuery({
        queryKey: ["status"],
        queryFn: () => receivedStatusTechnicians()
    });

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
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
                <p className="text-3xl font-bold tracking-tighter">
                    Technicians Actives
                </p>
                <div className="flex mt-20">
                    <input
                        type="search"
                        placeholder="Search"
                        value={search}
                        onChange={handleSearch}
                        className="outline outline-1 outline-gray-400 text-sm pl-5 py-2 w-2/4 rounded-lg focus:outline-blue-300 focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <section className="mt-10">
                    <p className="text-xs text-gray-500 uppercase font-bold">Technicians</p>
                    <div className="mt-8">
                        {isLoading ? (
                            <div className="flex justify-center items-center mt-10">
                                <BeatLoader />
                            </div>
                        ) : (
                            <>
                                {data && data.length > 0 ? (
                                    <div className="flex flex-col gap-y-8 max-h-96 overflow-y-auto">
                                        {data.map((technician: Technician) => {
                                            const technicianStatus = status.find(
                                                (technician_status: any) => technician_status.technician_id === technician.id
                                            );

                                            if (technicianStatus) {
                                                return (
                                                    <TechnicianCard
                                                        key={technician.id}
                                                        technician={technician}
                                                        status={technicianStatus.status}                                                    />
                                                );
                                            }
                                            return (
                                              <TechnicianCard
                                                          key={technician.id}
                                                          technician={technician}
                                                          status={undefined}
                                              />
                                            )
                                        })}
                                    </div>
                                ) : (
                                    <p className="text-gray-500">No technicians found.</p>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </div>
        </motion.div>
    );
}

export default TechniquesComponent;
