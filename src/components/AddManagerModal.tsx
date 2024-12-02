import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { createManager } from "../api/users";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/auth";

interface AddManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddManager: () => void;
}

const AddManagerModal = ({ isOpen, onClose, onAddManager }: AddManagerModalProps) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [branch, setBranch] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const token = useAuthStore().access

    const registerMutation = useMutation({
        mutationFn: () => createManager(email, firstName, lastName, branch, password, token),
        onSuccess: () => {
          onClose();
          onAddManager(); 
          toast.success("Manager added successfully!");
        },
        onError: () => {
          toast.error("Error adding manager!");
        },
      });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        registerMutation.mutate()
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-1/4">
            <h2 className="text-2xl font-semibold mb-4">Add Manager</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Branch</label>
                <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
                />
            </div>
            <div className="flex justify-end">
                <button
                type="button"
                className="mr-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                onClick={onClose}
                >
                Cancel
                </button>
                <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                Add Manager
                </button>
            </div>
            </form>
        </div>
        </div>
    );
};

export default AddManagerModal;