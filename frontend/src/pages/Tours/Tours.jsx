import React, { useState, useEffect } from "react";
import CommonSection from "../../shared/CommonSection";
import "./tour.css";
import TourCard from "../../shared/TourCard";
import SearchBar from "../../shared/SearchBar";
import Newsletter from "../../shared/Newsletter";
import { Container, Row, Col } from "reactstrap";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";

const Tours = () => {
  const [pagaCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const {
    data: tour,
    loading,
    error,
  } = useFetch(`${BASE_URL}/tours?page=${page}`);
  const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`);

  useEffect(() => {
    const pages = Math.ceil(tourCount / 8);
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page, tourCount, page]);

  return (
    <>
      <CommonSection title={"ALL Tours"} />
      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          {loading && (
            <h4 className="text-center pt-5">Loanding.............</h4>
          )}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          <Row>
            {tour?.map((tours) => (
              <Col lg="3" className="mb-4" key={tours._id}>
                <TourCard tours={tours} />
              </Col>
            ))}
            <Col lg="12">
              <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                {[...Array(pagaCount).keys()].map((number) => (
                  <span
                    key={number}
                    onClick={() => setPage(number)}
                    className={page === number ? "active__page" : ""}
                  >
                    {number + 1}
                  </span>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default Tours;
