import React, { useReducer, useContext, createContext } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }];
        
            
                case "UPDATE":
                    return state.map(food => {
                      if (food.id === action.id && food.size === action.size) {
                        return { ...food, qty: parseInt(food.qty) + parseInt(action.qty), price: parseInt(food.price) + parseInt(action.price) };
                      }
                      return food;
                    });
                // let arr = [...state]
                // arr.find((food, index) => {
                //     if (food.id === action.id) {
                //         console.log(food.qty, parseInt(action.qty), action.price + food.price)
                //         arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
                //     }
                //     return arr
                // })
                // return arr
            case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;
             
        default:
            console.log("Error in Reducer");
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);


// import React, { useReducer, useContext, createContext } from 'react';

// const CartStateContext = createContext();
// const CartDispatchContext = createContext();

// const reducer = (state, action) => {
//     switch (action.type) {
//         case "ADD":
//             return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }]
//         default:
//             console.log("Error in Reducer");
//             return state;
//     }
// };

// export const CartProvider = ({ children }) => {
//     const [state, dispatch] = useReducer(reducer, []);

//     return (
//         <CartDispatchContext.Provider value={dispatch}>
//             <CartStateContext.Provider value={state}>
//                 {children}
//             </CartStateContext.Provider>
//         </CartDispatchContext.Provider>
//     )
// };
// export const useCart = () => useContext(CartStateContext);
// export const useDispatchCart = () => useContext(CartDispatchContext);
