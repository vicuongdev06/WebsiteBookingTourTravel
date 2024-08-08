import React, { useEffect, useRef, useState, useContext } from "react";
import "./tour-details.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import calculateAvgRating from "../../utils/avgRating";
import avatar from "../../assets/images/avatar.jpg";
import Booking from "../../components/Booking/Booking";
import Newsletter from "../../shared/Newsletter";
import { BASE_URL } from "../../utils/config";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";

const ToursDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const { user } = useContext(AuthContext);
  /// đây là dữ liệu tĩnh sau này chúng ta sẽ gọi API của mình và tải dữ liệu của chúng ta từ cơ sở dữ liệu
  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);
  ///hủy cấu trúc các thuộc tính khỏi đối tượng tham quan
  const {
    photo,
    title,
    desc,
    price,
    reviews,
    city,
    address,
    distance,
    maxGroupSize,
  } = tour;
  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const options = { day: "numeric", month: "long", year: "numeric" };
  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;
    try {
      if (!user || user === undefined || user === null) {
        alert("Please sign in");
      }
      const reviewObj = {
        username: user?.username,
        reviewText,
        rating: tourRating,
      };
      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(reviewObj),
      });

      const result = await res.json();
      if (!res.ok) {
        alert(result.message);
      }
      alert(result.message);
    } catch (err) {
      alert(err.message);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);
  return (
    <>
      <section>
        <Container>
          {loading && (
            <h4 className="text-center pt-5">Loanding.............</h4>
          )}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              <Col lg="8">
                <div className="tour__content">
                  <img src={photo} alt="" />
                  <div className="tour__info">
                    <h2>{title}</h2>
                    <div className=" d-flex align-items-center gap-5">
                      <span className="tour__rating d-flex align-items-center gap-1">
                        <i className="ri-star-half-fill"></i>
                        {avgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? (
                          " not rated "
                        ) : (
                          <span>({reviews?.length})</span>
                        )}
                      </span>
                      <span>
                        <i className="ri-map-pin-user-fill"></i> {address}
                      </span>
                    </div>
                    <div className="tour__extra-details">
                      <span>
                        <i className="ri-map-pin-line"> {city}</i>
                      </span>
                      <span>
                        <i className="ri-money-dollar-circle-fill"> </i> VND {price}
                        / Mỗi người
                      </span>
                      <span>
                        <i className="ri-pin-distance-line"></i> {distance} k/m{" "}
                      </span>
                      <span>
                        <i className="ri-group-fill"></i> {maxGroupSize} people{" "}
                      </span>
                    </div>
                    <h5>Miêu tả</h5>
                    <p>{desc}</p>
                  </div>
                  <div className=" tour__reviews mt-4">
                    <h4>Reviews ({reviews?.length} reviews)</h4>

                    <Form onSubmit={submitHandler}>
                      <div className="d-flex align-items-center gap-3 mb-4 rating__group ">
                        <span onClick={() => setTourRating(1)}>
                          {" "}
                          1 <i className="ri-star-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(2)}>
                          2 <i className="ri-star-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(3)}>
                          3 <i className="ri-star-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(4)}>
                          4 <i className="ri-star-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(5)}>
                          5 <i className="ri-star-fill"></i>
                        </span>
                      </div>
                      <div className="review__input">
                        <input
                          type="text"
                          ref={reviewMsgRef}
                          placeholder="chat đi"
                          required
                        />
                        <button
                          className="btn primary__btn text-white"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </Form>
                    <ListGroup className="user__reviews">
                      {reviews?.map((reviews) => (
                        <div className="review__item">
                          <img src={avatar} alt="" />
                          <div className="w-100">
                            <div className=" d-flex align-items-center justify-content-between">
                              <div>
                                <h5>{reviews.username}</h5>
                                <p>
                                  {new Date(
                                    reviews.createdAt
                                  ).toLocaleDateString("en-US", options)}{" "}
                                </p>
                              </div>
                              <span className="d-flex align-items-center">
                                {reviews.rating} <i className="ri-star-fill"></i>
                              </span>
                            </div>
                            <h6>{reviews.reviewText}</h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                </div>
              </Col>
              <Col lg="4">
                <Booking tour={tour} avgRating={avgRating} />
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default ToursDetails;
