import React from "react";
import { Link } from "react-router-dom";
import "../Styles/DashBoard.css";

function DashBoard() {
  return (
    <>
      <div className="primeDashboard-container container mt-4">
        <div className="header-container">
          <p style={{ fontFamily: "cursive", float: "left", color: "orange" }}>
            <i class="fa-solid fa-tag" style={{ color: "orange" }}></i>
            ARRA
          </p>
        </div>
        <br />
        <br />
        <div className="row">
          <div className="col-md-6">
            <div className="mid-container">
              <h1>
                Welcome to{" "}
                <span style={{ fontFamily: "cursive", color: "orange" }}>
                  {" "}
                  <i class="fa-solid fa-tag"></i>
                  ARRA
                </span>
              </h1>
              <p>
                ARRA, an innovative e-commerce platform, redefines the shopping
                experience with a curated fusion of cutting-edge gadgets and the
                latest fashion trends. The site's homepage features handpicked
                selections of gadgets and fashion collections, showcasing a
                perfect blend of style and technology. Exclusive deals and a
                'Deal of the Day' section add excitement to daily shopping. With
                responsive design and a user-friendly interface, ARRAsphere
                caters to tech-savvy and fashion-forward customers, ensuring a
                seamless experience across devices. Customer reviews and an
                ARRAdise loyalty program enhance customer engagement, while an
                insightful blog provides valuable insights into the world of
                tech and fashion.
              </p>
              <Link to="/register">
                <button
                  className="btn"
                  style={{ backgroundColor: "dodgerblue" }}
                >
                  Sign in to{" "}
                  <span style={{ fontFamily: "cursive" }}>
                    {" "}
                    <i class="fa-solid fa-tag"></i>
                    ARRA
                  </span>
                </button>
              </Link>
            </div>
          </div>
          <div className="col-md-6">
            <div className="image-container">
              <img
                src="https://img.freepik.com/free-photo/african-american-man-looks-clothes-online-touch-screen-monitor-fashion-boutique-mall-self-service-board-male-customer-looking-trendy-clothes-items-retail-kiosk-display_482257-63314.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703203200&semt=ais"
                height={"800px"}
                width={"900px"}
                alt="Image"
              />
            </div>
          </div>
        </div>
      </div>
      {/* <FooterContainer /> */}
    </>
  );
}

export default DashBoard;
