import React, { useState, useEffect, useRef } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  

  let dispatch = useDispatchCart();
  let data = useCart();
  
  const priceRef = useRef();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  let options = props.options;
  let priceOptions = Object.keys(options);

  // Move finalPrice calculation here after defining options
  let finalPrice = qty * parseInt(options[size]);

  const handleAddtoCart = async () => {
    
    
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
      img: props.foodItem.img,
    });
    
  };
  return (
    <div className="card mt-3" style={{ width: "18rem" }}>
      <img
        src={props.foodItem.img}
        className="card-img-top"
        alt="..."
        style={{height:"120px",objectFit:"fill"}}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{props.foodItem.name}</h5>
        <p className="card-text"></p>
        <div className="d-flex flex-grow-1 justify-content-between align-items-center">
          <select className="m-2 bg-success flex-grow-1" onChange={(e)=>setQty(e.target.value)}>
            {Array.from(Array(6), (e, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <select className="m-2 bg-success" ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
            {priceOptions.map((data)=>{
              return <option key={data} value={data}>{data}</option>
            })}
          </select>
        </div>
        <div className="mt-2 fs-5">${finalPrice}</div>
        <hr></hr>
        <div>
          <button className="btn btn-success mx-2 justify-center" onClick={handleAddtoCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
