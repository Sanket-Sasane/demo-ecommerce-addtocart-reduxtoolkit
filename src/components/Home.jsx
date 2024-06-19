import React, { useState } from "react";
import "./style.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import cardsData from "../data";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cartSlice";
import toast from "react-hot-toast";

const Home = () => {
  const [cartData, setCartData] = useState(cardsData);
  const dispatch = useDispatch();

  const send = (item) => {
    // console.log("item selected : ", item);
    dispatch(addToCart(item));
    toast.success("Item added your cart")
  };

  return (
    <>
      <section className="item_section mt-4 container">
        <h2 className="px-4" style={{ fontWeight: 400 }}>
          Hotels in Kolhapur now....
        </h2>
        <div className="row mt-2 d-flex justify-content-around align-items-center">
          {cartData.map((item, index) => {
            return (
              <>
                <Card
                  style={{ width: "22rem", border: "none" }}
                  className="hove mb-4"
                >
                  <Card.Img variant="top" className="cd" src={item.imgdata} />

                  <div className="card_body">
                    <div className="upper_data d-flex justify-content-between align-items-center">
                      <h4 className="mt-2">{item.dish}</h4>
                      <span>{item.rating}&nbsp;★</span>
                    </div>

                    <div className="lower_data d-flex justify-content-between">
                      <h5>{item.address}</h5>
                      <span>{item.price}</span>
                    </div>
                    <div className="extra"></div>

                    <div className="last_data d-flex justify-content-between align-items-center">
                      <img src={item.arrimg} className="limg" alt="" />
                      <Button
                        style={{
                          width: "150px",
                          background: "#ff3054db",
                          border: "none",
                        }}
                        variant="outline-light"
                        className="mt-2 mb-2"
                        onClick={()=>send(item)}
                      >
                        Add to Cart
                      </Button>
                      <img src={item.delimg} className="laimg" alt="" />
                    </div>
                  </div>
                </Card>
              </>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Home;
