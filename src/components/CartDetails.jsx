import React, { useEffect, useState } from 'react'
import './cartStyle.css'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeAllItem, removeSingleItem, removeToCart } from '../redux/features/cartSlice';
import toast from 'react-hot-toast';

const CartDetails = () => {

  const [totalPrice,setTotalPrice]=useState(0);
  const [totalQuantity,setTotalQuantity]=useState(0);

  const {carts}=useSelector((state)=>state.allCart);
  const dispatch=useDispatch();

  const handleIncrement=(item)=>{
    dispatch(addToCart(item));
  }

  const handleDecrement=(item)=>{
    dispatch(removeSingleItem(item))
  }

  const handleDelete=(item)=>{
    dispatch(removeToCart(item));
    toast.success("Item is removed from your cart")
  }

  const handleEmptyCart=()=>{
    dispatch(removeAllItem());
    toast.success("Your cart is empty")
  }

  const total=()=>{
    let total=0;
    carts.map((item)=>{
      total = (item.price*item.qnty) + total;
    })
    setTotalPrice(total);
  }

  const totalQuant=()=>{
    let total=0;
    carts.map((item)=>{
      total = item.qnty + total;
    })
    setTotalQuantity(total);
  }

  useEffect(()=>{
    total();
  },[total]);

  useEffect(()=>{
    totalQuant();
  },[totalQuant])

  return (
    <>
      <div className="row justify-content-center m-0">
        <div className="col-md-8 mt-5 mb-5 cardsdetails">
          <div className="card">
            <div className="card-header bg-dark p-3">
              <div className='card-header-flex'>
              <h5 className='text-white m-0'>Your Cart</h5>
              {
                  carts.length >0 ? <button className='btn btn-danger mt-0 btn-sm' onClick={handleEmptyCart}><i className='fa fa-trash-alt mr-2'></i><span>Empty Cart</span></button>
                  :""
              }
              </div>
              
            </div>
            <div className="card-body p-0">
                {
                  carts.length===0 ? <table className='table cart-table mb-0'>
                    <tbody>
                      <tr>
                        <td colSpan={6}>
                          <div className='cart-empty'>
                            <i className='fa fa-shopping-cart'></i>
                            <p>your cart is empty</p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  :
                  <table className='table cart-table mb-0 table-responsive-sm'>
                      <thead>
                        <tr>
                          <th>Action</th>
                          <th>Product</th>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th className='text-right'><span id='amount' className='amount'>Total Amount</span></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          carts.map((data,index)=>{
                            return(
                             <>
                                <tr key={index}>
                                  <td>
                                    <button className='prdct-delete' onClick={()=>handleDelete(data)}><i className='fa fa-trash-alt mr-2'></i></button>
                                  </td>
                                  <td>
                                    <div className="product-img">
                                      <img src={data.imgdata} />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="product-name">
                                      <p>{data.dish}</p>
                                    </div>
                                  </td>
                                  <td>{data.price}</td>
                                  <td>
                                    <div className="prdct-qty-container">
                                      <button className='prdct-qty-btn' type='button' onClick={data.qnty <=1 ? ()=>handleDelete(data) : ()=>handleDecrement(data)} >
                                        <i className='fa fa-minus'></i>         
                                      </button>
                                      <input type="text" className='qty-input-box' value={data.qnty} disabled name='' id='' />   
                                      <button className='prdct-qty-btn' type='button' onClick={()=>handleIncrement(data)} >
                                        <i className='fa fa-plus'></i>         
                                      </button>
                                    </div>
                                  </td>
                                  <td className='text-right'>{data.price * data.qnty}</td>
                                </tr>
                             </>
                            )
                          })
                        }
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>&nbsp;</th>
                          <th colSpan={3}>&nbsp;</th>
                          <th>item in cart <span className='ml-2 mr-2'>:</span><span className='text-danger'>{totalQuantity}</span></th>
                          <th className='text-right'>Total price <span className='ml-2 mr-2'>:</span><span className='text-danger'>{totalPrice}</span></th>
                        </tr>
                      </tfoot>
                  </table>
                } 
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartDetails