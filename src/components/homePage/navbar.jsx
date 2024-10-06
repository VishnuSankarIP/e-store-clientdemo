// import { Link, NavLink, Outlet } from "react-router-dom";
// export default function Navbar() {

//     const navLinks= [
//         {link: "WOMEN", route: "/women"},
//         {link: "MEN", route: "/men"},
        
//     ];

//     return (
//         <div className="text-[20px] bc-red w-full text-white">
//             <div className="flex flex-col items-center justify-center w-full lg:w-[930px] xl:w-[1130px] 2xl:w-full">
               

//                 <div className="flex justify-center w-full lg:justify-between 2xl:justify-around">
//                     <div className="flex flex-1 w-full text-[14px] font-bold lg:ml-[8rem] xl:ml-[15rem]">
//                         {
//                             navLinks.map(item => {
//                                 const {link, route}= item;

//                                 return (
//                                     <NavLink key={link} to={route} className={({ isActive }) =>
//                                         isActive ? "bg-white font-grey w-1/2 lg:w-min"
//                                          : 
//                                         "w-1/2 bc-red text-white border-x-[0.5px] border-white hover:bg-[#df7c7c] lg:w-min"}>
//                                             <div className="flex items-center justify-center w-full px-[25px] py-[12px]">
//                                                 {link}
//                                             </div>
//                                     </NavLink>
//                                 )
//                             })
//                         }
//                     </div>
                    
//                     <Outlet />

//                     <div className="text-[13px] items-center hidden lg:flex xl:pr-[3.5rem]">
//                         <div className="m-[10px]">
//                             <Link to= {"/profile/orders"}>TRACK ORDER</Link>
//                         </div>
//                         <div className="m-[10px]">
//                             <Link to= {"/"}>CONTACT US</Link>
//                         </div>
                      
//                     </div>
//                 </div>
//             </div>

            
//         </div>
//     )
// }



// import { Link, NavLink, Outlet } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axiosInstance from '../../config/axiosconfig';

// export default function Navbar() {
   
//     const [navLinks, setNavLinks] = useState([]);

//     // Fetch categories on component mount
//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await axiosInstance.get('/get-maincategory');
//                 const categories = response.data;

               
//                 const formattedCategories = categories.map(category => ({
//                     link: category.mainCategoryName.toUpperCase(),
//                     route: `/${category.mainCategoryName.toLowerCase()}` 
//                 }));

//                 setNavLinks(formattedCategories); 
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//             }
//         };

//         fetchCategories(); 
//     }, []);

//     return (
//         <div className="text-[20px] bc-red w-full text-white">
//             <div className="flex flex-col items-center justify-center w-full lg:w-[930px] xl:w-[1130px] 2xl:w-full">
//                 <div className="flex justify-center w-full lg:justify-between 2xl:justify-around">
//                     <div className="flex flex-1 w-full text-[14px] font-bold lg:ml-[8rem] xl:ml-[15rem]">
//                         {
//                             navLinks.length > 0 && navLinks.map(item => {
//                                 const {link, route}= item;

//                                 return (
//                                     <NavLink key={link} to={route} className={({ isActive }) =>
//                                         isActive ? "bg-white font-grey w-1/2 lg:w-min"
//                                          : 
//                                         "w-1/2 bc-red text-white border-x-[0.5px] border-white hover:bg-[#df7c7c] lg:w-min"}>
//                                             <div className="flex items-center justify-center w-full px-[25px] py-[12px]">
//                                                 {link}
//                                             </div>
//                                     </NavLink>
//                                 )
//                             })
//                         }
//                     </div>

//                     <Outlet />

//                     <div className="text-[13px] items-center hidden lg:flex xl:pr-[3.5rem]">
//                         <div className="m-[10px]">
//                             <Link to= {"/profile/orders"}>TRACK ORDER</Link>
//                         </div>
//                         <div className="m-[10px]">
//                             <Link to= {"/"}>CONTACT US</Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from '../../config/axiosconfig';

export default function Navbar() {
    const [navLinks, setNavLinks] = useState([]);
    const navigate = useNavigate();  // Initialize the useNavigate hook

    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosInstance.get('/get-maincategory');
                const categories = response.data;

                const formattedCategories = categories.map(category => ({
                    link: category.mainCategoryName.toUpperCase(),
                    route: `/${category.mainCategoryName.toLowerCase()}` 
                }));

                setNavLinks(formattedCategories); 
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories(); 
    }, []);

    const handleCategoryClick = (route) => {
        navigate(route); // Navigate to the route on click
    };

    return (
        <div className="text-[20px] bc-red w-full text-white">
            <div className="flex flex-col items-center justify-center w-full lg:w-[930px] xl:w-[1130px] 2xl:w-full">
                <div className="flex justify-center w-full lg:justify-between 2xl:justify-around">
                    <div className="flex flex-1 w-full text-[14px] font-bold lg:ml-[8rem] xl:ml-[15rem]">
                        {
                            navLinks.length > 0 && navLinks.map(item => {
                                const { link, route } = item;

                                return (
                                    <NavLink 
                                        key={link} 
                                        to={route} 
                                        onClick={() => handleCategoryClick(route)}  // Handle click
                                        className={({ isActive }) =>
                                            isActive ? "bg-white font-grey w-1/2 lg:w-min"
                                             : 
                                            "w-1/2 bc-red text-white border-x-[0.5px] border-white hover:bg-[#df7c7c] lg:w-min"}>
                                        <div className="flex items-center justify-center w-full px-[25px] py-[12px]">
                                            {link}
                                        </div>
                                    </NavLink>
                                )
                            })
                        }
                    </div>

                    <Outlet />  {/* Render the child routes here */}

                    <div className="text-[13px] items-center hidden lg:flex xl:pr-[3.5rem]">
                        <div className="m-[10px]">
                            <Link to= {"/profile/orders"}>TRACK ORDER</Link>
                        </div>
                        <div className="m-[10px]">
                            <Link to= {"/"}>CONTACT US</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
