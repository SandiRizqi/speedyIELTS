'use client'
import { useState, useEffect } from "react";
import { useUser} from "@/app/service/user";
import { SignOut } from "@/app/service/firebase";
import withProtected from "../_hook/withProtected";


const ProfileMenu = ({indexOpen, setIndexOpen}) => {
    const [isOpen, setIsOpen] = useState(false);
    const user = useUser();

    const toggleMenu = () => {
        setIndexOpen(null);
        setIsOpen(!isOpen);
    };

    useEffect(()=> {
        if(indexOpen){
            setIsOpen(false);
        }

    }, [indexOpen])



    return (

        <div className="sm:flex sm:gap-4 relative">
            <button className="rounded hidden md:block" onClick={toggleMenu}>
                <img
                    alt=""
                    src={user.picture? user.picture : "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"}
                    className="size-9 rounded-full object-cover"
                />
            </button>

            {isOpen && (
                <div
                className="absolute end-0 z-10 mt-10 w-max divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg hidden md:block "
                role="menu"
            >
                <div className="p-2">
                    <a
                        href="#"
                        className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        role="menuitem"
                    >
                        <img
                            alt=""
                            src={user.picture? user.picture : "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"}
                            className="size-7 rounded-full object-cover"
                        />
                        <p className="text-xs">{user.displayName? user.displayName: user.email}</p>
                    </a>

                    <a
                        href="#"
                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        role="menuitem"
                    >
                        Settings
                    </a>
                    <a
                        href="#"
                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        role="menuitem"
                        onClick={SignOut}
                    >
                        Sign out
                    </a>
                </div>
            </div>
            )}
        </div>

    );
}

export default withProtected(ProfileMenu);