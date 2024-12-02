import { MdOutlineSpaceDashboard } from 'react-icons/md'
import { FiDatabase } from 'react-icons/fi'
import { FaRegUser } from 'react-icons/fa'
import { IoKeyOutline } from 'react-icons/io5'

export const generalNavbar = [
    {name: 'Dashboard', icon: MdOutlineSpaceDashboard, show: 1},
    {name: 'Registers', icon: FiDatabase, show: 2}
]

export const othersNavbar = [
    {name: 'Manager management', icon: FaRegUser, show: 3},
    {name: 'Security & access', icon: IoKeyOutline, show: 4}
]
