import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteManager, searchManagers } from "../api/users";
import { Token } from "../interfaces";
import { useAuthStore } from "../store/auth";
import { jwtDecode } from "jwt-decode";
import { Manager } from "../interfaces";
import { BeatLoader } from "react-spinners";
import { useState } from "react";
import Avatar from '../assets/avatar.png';
import { FaRegTrashAlt } from "react-icons/fa";
import AddManagerModal from './AddManagerModal'; // Importar el modal

function ManageManagementComponent() {
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const token: string = useAuthStore.getState().access;
    const tokenDecoded: Token = jwtDecode(token);
    const pk = tokenDecoded.id;
  
    const queryClient = useQueryClient();
  
    const { data, isLoading } = useQuery({
      queryKey: ["managers", pk, search],
      queryFn: () => searchManagers(search, token),
    });
  
    const { mutate: deleteManagerMutate } = useMutation({
      mutationFn: deleteManager,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["managers"] });
      },
      onError: (error) => {
        console.error(error);
      },
    });
  
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    };
  
    const handleAddManager = () => {
      queryClient.invalidateQueries({ queryKey: ["managers"]});
      setIsModalOpen(false);
    };
  
    return (
      <div className="p-10 w-4/5">
        <p className="text-3xl font-bold tracking-tighter">
          Managers in <span className="text-gray-500 font-bold">{"Nutrisa"}</span>
        </p>
        <div className="flex mt-20">
          <input
            type="search"
            placeholder="Search"
            value={search}
            onChange={handleSearch}
            className="outline outline-1 outline-gray-400 text-sm pl-5 py-2 w-2/4 rounded-lg focus:outline-blue-300 focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex flex-1" />
          <p
            className="px-5 py-3 bg-blue-600 rounded-xl text-gray-100 font-bold uppercase cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            Add Manager
          </p>
        </div>
        <section className="mt-10">
          <p className="text-xs text-gray-500 uppercase font-bold">Managers</p>
          <div className="mt-8">
            {isLoading ? (
              <div className="flex justify-center items-center mt-10">
                <BeatLoader />
              </div>
            ) : (
              <>
                {data && data.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {data.map((manager: Manager) => (
                      <div key={manager.id} className="flex items-center space-x-4">
                        <img src={Avatar} alt="Imagen de perfil" className="w-10 h-10 rounded-full" />
                        <div>
                          <p className="font-semibold tracking-tighter">{manager.first_name} {manager.last_name}</p>
                          <p className="font-semibold text-gray-500 text-xs">{manager.email}</p>
                        </div>
                        <div className="flex flex-1" />
                        <FaRegTrashAlt
                          className="text-gray-500 font-semibold cursor-pointer"
                          size={20}
                          onClick={() => {
                            if (manager.id !== undefined) {
                              deleteManagerMutate(manager.id);
                            }
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No managers found.</p>
                )}
              </>
            )}
          </div>
        </section>
  
        <AddManagerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddManager={handleAddManager}
        />
      </div>
    );
  }
  
export default ManageManagementComponent;