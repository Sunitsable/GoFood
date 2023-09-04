import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";

export default function Home() {
  const [search,setsearch]=useState([])
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setFoodCat(response.foodCategory);
    setFoodItem(response.foodItems);
    //console.log(response.foodItems,response.foodCategory);
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div >
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption">
              <form className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e)=>{setsearch(e.target.value)}}
                />
                
              </form>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/300x300/?burger"
                className="d-block w-100"
                alt="Burger"
                style={{height:'850px'}}
                
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/300x300/?momos"
                className="d-block w-100"
                alt="Momos"
                style={{height:'850px'}}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/300x300/?sea"
                className="d-block w-100"
                alt="Sea"
                style={{height:'850px'}}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodCat !== [] ? (
          foodCat.map((data) => {
            return (
              <div className="row mb-3">
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />
                {foodItem !== [] ? (
                  foodItem
                  .filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLocaleString()))
                    .map((filterItems) => {
                      return (
                        <div
                          key={filterItems._id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Card
                            foodItem={filterItems}
                            options={filterItems.options[0]}
                            
                          />
                        </div>
                      );
                    })
                ) : (
                  <div>No such data found</div>
                )}
              </div>
            );
          })
        ) : (
          <div>No data found</div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
