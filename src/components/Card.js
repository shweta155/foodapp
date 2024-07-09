import React from 'react'
import { useState , useRef ,useEffect} from 'react';
import { useCart, useDispatchCart } from './contextReducer';
import { useNavigate } from 'react-router-dom'

const Card = (props) => {
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    let data = useCart() || [];
    const priceRef = useRef();
    let options = props.options;
    let priceOptions = Object.keys(options);
    let finalPrice = qty * parseInt(options[size]);

    let navigate = useNavigate();
    let foodItem = props.item;
    let dispatch = useDispatchCart();

    const handleClick = () => {
    //     if (!localStorage.getItem("token")) {
    //       navigate("/login")
    //     }
      }
      const handleQty = (e) => {
        setQty(e.target.value);
      }
 
      const handleOptions = (e) => {
        setSize(e.target.value);
      }
      
    const handleAddToCart = async () => {
      let food = data.find(item => item.id === foodItem._id && item.size === size);

      if (food) {
        // If the item exists and the size is the same, update the quantity and price
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty, size: size });
      } else {
        // If the item does not exist, add it as a new item
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc });
        // console.log("Size different or new item, so simply ADD one more to the list");
      }
      // console.log(data);

        // let food = []
        // for (const item of data) {
        //   if (item.id === foodItem._id) {
        //     food = item;
    
        //     break;
        //   }
        // }
        // if (food !== []) {
        //     if (food.size === size) {
        //       await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
        //       return
        //     }
        //     else if (food.size !== size) {
        //       await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        //       console.log("Size different so simply ADD one more to the list")
        //       return
        //     }
        //     return
        //   }
      //     await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })
      //  food = data.find(item => item.id === foodItem._id && item.size === size);
      //   if (food) {
      //       await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty });
      //   } else {
        //     await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc });
        // }
        // console.log(data);
    }
   
    useEffect(() => {
        setSize(priceRef.current.value)
      }, [])

    return (
        <>
            <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                <img src={props.item.img}
                    className="card-img-top" alt="card_food_item_image"
                    style={{ height: "130px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.item.name}</h5>

                    <div className='container w-100'>
                    
                    <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }} onClick={handleClick} onChange={handleQty}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>)
              })}
            </select>
            <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }} ref={priceRef} onClick={handleClick} onChange={handleOptions}>
              {priceOptions.map((i) => {
                return <option key={i} value={i}>{i}</option>
              })}
            </select>

                       
                         {/* <select className='m-2 h-100 bg-success rounded'>
                            {
                                priceOptions.map((data) => {
                                    return <option key={data} value={data} ref={priceRef} 
                                     onChange={(e) => setSize(e.target.value)}>
                                     {priceOptions.map((data) => {
                return <option key={data} value={data}>{data}</option>
              })} */}
                                      {/* </option> */}
                                {/* })
                            }
                        </select>  */}

                        <div className='d-inline h-100 fs-5'> ₹{finalPrice}/-</div>
                    </div>
                    <hr />
                    <button className='btn btn-success ms-2 justify-center' onClick={handleAddToCart}>Add To Cart</button>
                </div>
            </div>
        </>
    )
}

export default Card;