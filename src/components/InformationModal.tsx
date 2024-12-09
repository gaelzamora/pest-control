import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { User } from "../interfaces";
import { getMyInformation, updateInformation } from "../api/users";

type Props = {
  setIsInformationModalOpen: (state: boolean) => void;
};

function InformationModal({ setIsInformationModalOpen }: Props) {
  const [image, setImage] = useState<File | null>(null); 
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { data, isLoading } = useQuery<User>({
    queryKey: ["information"],
    queryFn: getMyInformation,
  });

  const updateInformationMutation = useMutation({
    mutationFn: () => updateInformation(firstName, lastName, image),
    onSuccess: () => {
      setIsInformationModalOpen(false)
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  useEffect(() => {
    if (data) {
      setFirstName(data.first_name);
      setLastName(data.last_name);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateInformationMutation.mutate(); 
  };

  const image_data = data?.image;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={() => setIsInformationModalOpen(false)}
        >
          ✕
        </button>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative w-32 h-32 mx-auto">
            <label htmlFor="image-upload" className="cursor-pointer group">
              {image_data ? (
                <img
                  src={`http://localhost:8000${image_data}`}
                  alt="Uploaded"
                  className="w-32 h-32 rounded-full object-cover border-2 border-gray-300 group-hover:opacity-50"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  <span>No Image</span>
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <FaPencilAlt className="text-gray-700 text-2xl" />
              </div>
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your first name"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your last name"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InformationModal;
