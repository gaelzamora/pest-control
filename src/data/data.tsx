import { MdOutlineSpaceDashboard } from 'react-icons/md'
import { FiDatabase } from 'react-icons/fi'
import { FaRegUser, FaSearch } from 'react-icons/fa'
import { IoPeopleSharp } from 'react-icons/io5'

export const generalNavbar = [
    {name: 'Dashboard', icon: MdOutlineSpaceDashboard, show: 1},
    {name: 'Registers', icon: FiDatabase, show: 2},
]

export const techniqueNavbar = [
    {name: 'Dashboard', icon: MdOutlineSpaceDashboard, show: 1},
    {name: 'Owners', icon: IoPeopleSharp, show: 2}
]

export const ownerNavbar = [
    {name: 'Dashboard', icon: MdOutlineSpaceDashboard, show: 1},
    {name: 'Registers', icon: FiDatabase, show: 2},
    {name: 'Manager management', icon: FaRegUser, show: 3},
    {name: 'Techniques', icon: FaSearch, show: 4}
]