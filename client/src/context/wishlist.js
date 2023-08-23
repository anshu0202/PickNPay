import {useState,useContext, createContext, useEffect} from "react";

import axios from "axios";


const WishListContext=createContext();

const  WishListProvider =({children})=>{
    const [wishList, setWishList]= useState([]);

    useEffect(()=>{
            let existingWishListItem=localStorage.getItem('wishList');
            // console.log("exist wish list ",existingWishListItem)
            if(existingWishListItem){
                setWishList(JSON.parse(existingWishListItem))
            }
           
    },[]);

   
    return (
        
        <WishListContext.Provider value={[wishList, setWishList]}>{children}</WishListContext.Provider>
    )
}

//custom hook

const useWishList=()=> useContext(WishListContext);


export {useWishList,WishListProvider}
