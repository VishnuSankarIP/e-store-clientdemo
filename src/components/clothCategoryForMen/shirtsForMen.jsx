import { useContext } from "react";
import { ModalContext } from "../../context/modalContext";
import RenderProductsInCategory from "./productsInCategoryForMen";






export default function ShirtsForMen() {

    const {productUrl}= useContext(ModalContext);

    return (
        <RenderProductsInCategory 
            subCategory= {["shirt"]} 
            heading={"Men Shirts"} 
            url={productUrl.filterProduct}
            gender={"Men"}/>

    )
}