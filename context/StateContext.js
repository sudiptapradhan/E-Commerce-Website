import React, {createContext, useContext, useState, useEffect} from "react";
import {toast} from 'react-hot-toast';

const Context = createContext();


//we pass the prop children below which means that whenever we call our StateContext, whatever we pass into it are going to be considered children 
//and we can render it out
export const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    //we'll leave the above useState value empty bec, we're going to fill it with the data coming from local storage
    
    //we shall be using local storage -> if a user exits the page and comes back all of his/her data will remain in exactly the state it was before she/he left

    const [totalPrice, setTotalPrice] = useState(0);
    //to keep track of the total price
    const [totalQuantities, setTotalQuantities] = useState(0);
    //to keep track of the total quantities
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const onAdd = (product, quantity) => {
        //to check if the product we want to add is already in the cart
        const checkProductInCart = cartItems.find((item) => item._id === product._id);


        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        // setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + product.price + quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        if(checkProductInCart){
                const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })
            setCartItems(updatedCartItems);
            
        } else {
            product.quantity = quantity;

            setCartItems([...cartItems, {...product}]);
        }
        toast.success(`${qty} ${product.name} added to the cart.`);
    }

    const onRemove = (product) =>{
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id != product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price *foundProduct.quantity);
        setTotalQuantities( prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    }

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id)
        index=cartItems.findIndex((product) => product._id === id);
        const newCartItems = cartItems.filter((item) => item._id != id)

        if(value==='inc'){
            
            //in the line below, updating the cart items -> and we're adding one new element to it
            setCartItems([... newCartItems, {...foundProduct, quantity: foundProduct.quantity+1 }]);
            //we'll now set the total price
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
            //to increase the num of total quantities
            setTotalQuantities( prevTotalQuantities => prevTotalQuantities + 1)

        } else if(value === 'dec'){
            if(foundProduct.quantity > 1){
                //in the line below, updating the cart items -> and we're adding one new element to it
            setCartItems([... newCartItems, {...foundProduct, quantity: foundProduct.quantity-1 }]);
            //we'll now set the total price
            setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
            //to increase the num of total quantities
            setTotalQuantities( prevTotalQuantities => prevTotalQuantities - 1)
            }   
        }
    }

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }

    const decQty = () => {
        setQty((prevQty) => {
            if(prevQty - 1 < 1) return 1;
            return prevQty - 1;
        });
    }

    return(
    <Context.Provider
        value={{
            showCart,
            setShowCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            incQty,
            decQty,
            onAdd,
            toggleCartItemQuantity,
            onRemove,
            setCartItems,
            setTotalPrice,
            setTotalQuantities
        }}
        >
        {children}
    </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);