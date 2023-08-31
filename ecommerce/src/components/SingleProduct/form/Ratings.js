import React, { useContext, useEffect, useState } from "react";
import "./Ratings.scss";
import "./ReviewForm.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import { Context } from "../../../utils/context";

const Ratings = ({ data }) => {
  const [rating, setRating] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const {
    storeFetchData,
    separateRating,
    setSeparateRating,
    setStoreFetchData,
    averageRating,
    setAverageRating,
    totalCount,
    setTotalCount,
  } = useContext(Context);
  const [showForm, setShowForm] = useState(false);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReviews = storeFetchData?.slice(startIndex, endIndex);
  const showratings = currentReviews?.map((data, index) => {
    return data?.attributes?.rating;
  });
  console.log("showratings", showratings);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    review: "",
  });
  const [errors, setErrors] = useState({});

  const handleButtonClick = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  console.log("single product data", data?.data?.[0]?.id);

  useEffect(() => {
    const product = data?.data?.[0]?.attributes;
    const ratingCounts = product?.reviews?.data?.reduce(
      (counts, review) => {
        const rating = review?.attributes?.rating;
        counts[rating] += 1;
        return counts;
      },
      { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    ); // Initial counts object with default values

    setStoreFetchData(product?.reviews?.data);
    setSeparateRating(ratingCounts);
    setTotalCount(product?.reviews?.data?.length);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (storeFetchData && storeFetchData.length > 0) {
      let totalRating = 0;
      for (const review of storeFetchData) {
        totalRating += review?.attributes?.rating || 0; // Handle potential null or undefined ratings
      }
      const avgRating = totalRating / storeFetchData.length;
      setAverageRating(avgRating);
    }
  });

  const handleStarClick = (event) => {
    setRating(event + 1);
  };
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });

    // Validation for required fields
    if (value.trim() === "" && e.target.hasAttribute("required")) {
      setErrors({ ...errors, [name]: "This field is required." });
    }
  };
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      name: event.target.elements.name.value,
      email: event.target.elements.email.value,
      title: event.target.elements.title.value,
      review: event.target.elements.review.value,
      rating: rating,
      product: data?.data?.[0]?.id,
      averageRating: averageRating,
      date: new Date(),
    };
    console.log("formData?????", formData);
    axios
      .post("http://localhost:1337/api/reviews", {
        data: formData,
      })
      .then((response) => {
        handleButtonClick();
        // window.location.reload();
        console.log("Form data submitted successfully:", response);
      })
      .catch((error) => {
        toast.error("something went wrong");
        console.error("Error submitting form data:", error);
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="ratings-container">
      <hr className="divider" />
      <div className="user-rating">
        <span className="heading">Honest Reviews</span>
        <button className="btn-form" onClick={handleButtonClick}>
          {showForm ? "Close Form" : "Write Rating"}
        </button>
        <span className="desc">{`Based on ${totalCount} Reviews`}</span>
        <div>
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className="star-icon"
              style={{
                color: index + 1 <= averageRating ? "gold" : "gray",
                fontSize: "25px",
              }}
            />
          ))}
        </div>
        <span className="rating-count">{averageRating?.toFixed(1)}</span>
      </div>

      <hr className="divider" />

      <div className="ratings-bar">
        <div className="rating-row">
          <div className="middle">
            <div className="bar-container">
              {" "}
              <FaStar
                className="star-icon"
                style={{ color: "gold", fontSize: "17px" }}
              />{" "}
              <FaStar
                className="star-icon"
                style={{ color: "gold", fontSize: "17px" }}
              />{" "}
              <FaStar
                className="star-icon"
                style={{ color: "gold", fontSize: "17px" }}
              />{" "}
              <FaStar
                className="star-icon"
                style={{ color: "gold", fontSize: "17px" }}
              />
              <FaStar
                className="star-icon"
                style={{ color: "gold", fontSize: "17px" }}
              />
            </div>
          </div>
          <div className="side right">{separateRating?.[5]}</div>
        </div>
        <div className="rating-row">
          <div className="middle">
            <div className="bar-container">
              <FaStar
                className="star-icon"
                style={{ color: "gold", fontSize: "17px" }}
              />{" "}
              <FaStar
                className="star-icon"
                style={{ color: "gold", fontSize: "17px" }}
              />{" "}
              <FaStar
                className="star-icon"
                style={{ color: "gold", fontSize: "17px" }}
              />{" "}
              <FaStar
                className="star-icon"
                style={{ color: "gold", fontSize: "17px" }}
              />
            </div>
          </div>
          <div className="side right">{separateRating?.[4]}</div>
        </div>
        <div className="rating-row">
          <div className="middle">
            <div className="bar-container">
              <FaStar
                className="star-icon"
                style={{ color: "gold", fontSize: "17px" }}
              />{" "}
              <FaStar
                className="star-icon"
                style={{ color: "gold", fontSize: "17px" }}
              />{" "}
              <FaStar
                className="star-icon"
                style={{ color: "gold", fontSize: "17px" }}
              />
            </div>
          </div>
          <div className="side right">{separateRating?.[3]}</div>
        </div>
        <div className="rating-row">
          <div className="middle">
            <div className="bar-container">
              <FaStar
                className="star-icon"
                style={{ color: "gold", fontSize: "17px" }}
              />{" "}
              <FaStar
                className="star-icon"
                style={{ color: "gold", fontSize: "17px" }}
              />
            </div>
          </div>
          <div className="side right">{separateRating?.[2]}</div>
        </div>
        <div className="rating-row">
          <div className="middle">
            <div className="bar-container">
              <FaStar
                className="star-icon"
                style={{ color: "gold", fontSize: "17px" }}
              />
            </div>
          </div>
          <div className="side right">{separateRating?.[1]}</div>
        </div>
      </div>
      {showForm && (
        <div>
          <form onSubmit={handleSubmit} className="jdgm-form">
            <br />
            <div className="jdgm-form__name-fieldset">
              <label htmlFor="jdgm_review_reviewer_name_sobcy4yx7">
                Name
                <span className="required" style={{ color: "red" }}>
                  *
                </span>
              </label>
            </div>
            <div className="name">
              <input
                id="jdgm_review_reviewer_name_sobcy4yx7"
                name="name"
                type="text"
                placeholder="Enter your name"
                aria-label="Name"
                required
                value={formData.name}
                onChange={handleChange}
                style={{
                  borderColor: errors.name ? "red" : "initial",
                }}
              />
              {errors.name && (
                <div className="error-message">{errors.name}</div>
              )}
            </div>
            <div className="jdgm-form__email-fieldset">
              <label htmlFor="jdgm_review_reviewer_email_sobcy4yx7">
                Email
                <span className="required" style={{ color: "red" }}>
                  *
                </span>
              </label>
              <input
                id="jdgm_review_reviewer_email_sobcy4yx7"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                aria-label="Email"
                aria-required="true"
                value={formData.email}
                onChange={handleChange}
                style={{
                  borderColor: errors.email ? "red" : "initial",
                }}
              />
              {errors.email && (
                <div className="error-message">{errors.email}</div>
              )}
            </div>
            <div className="jdgm-form__title-fieldset">
              <label htmlFor="jdgm_review_title_sobcy4yx7">
                Review Title
                <span className="required" style={{ color: "red" }}>
                  *
                </span>
              </label>
              <span className="jdgm-countdown"></span>
              <input
                id="jdgm_review_title_sobcy4yx7"
                name="title"
                type="text"
                placeholder="Give your review a title"
                aria-label="Review Title"
                required
                value={formData.title}
                onChange={handleChange}
                style={{
                  borderColor: errors.title ? "red" : "initial",
                }}
              />
              {errors.title && (
                <div className="error-message">{errors.title}</div>
              )}
            </div>
            <div className="jdgm-form__body-fieldset">
              <label htmlFor="jdgm_review_body_sobcy4yx7">
                Review
                <span className="required" style={{ color: "red" }}>
                  *
                </span>
              </label>
              <span className="jdgm-countdown"></span>
              <textarea
                id="jdgm_review_body_sobcy4yx7"
                rows="5"
                name="review"
                placeholder="Write your comments here"
                aria-label="Review"
                required
                value={formData.review}
                onChange={handleChange}
                style={{
                  borderColor: errors.review ? "red" : "initial",
                }}
              ></textarea>
              {errors.review && (
                <div className="error-message">{errors.review}</div>
              )}
            </div>
            <br />
            <label htmlFor="jdgm_review_body_sobcy4yx7">
              Rating
              <span className="required" style={{ color: "red" }}>
                *
              </span>
            </label>
            <div className="jdgm-form__rating">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className="star-icon"
                  style={{
                    color: index < rating ? "gold" : "gray",
                    fontSize: "17px",
                  }}
                  onClick={() => handleStarClick(index)}
                />
              ))}
            </div>
            <br />
            <input
              type="submit"
              className="jdgm-submit-rev btn btn_c button"
              value="Submit Review"
            />
          </form>
        </div>
      )}

      <div className="review-comment">
        <hr className="divider" />
        <div className="jdgm-rev__br"></div>
        {currentReviews?.map((reviewData, index) => (
          <div className="jdgm-rev">
            <div>
              {[...Array(5)].map((_, starIndex) => (
                <FaStar
                  key={starIndex}
                  className="star-icon"
                  style={{
                    color:
                      starIndex + 1 <= reviewData?.attributes?.rating
                        ? "gold"
                        : "gray",
                    fontSize: "15px",
                  }}
                />
              ))}
            </div>

            <span>{formatDate(reviewData?.attributes?.date)}</span>
            <div></div>
            <span className="jdgm-rev__author-wrapper">
              <span className="review-name">
                {reviewData?.attributes?.name}
              </span>
            </span>
            <div className="jdgm-rev__content">
              <div style={{ overflowWrap: "break-word" }}>
                <p>{reviewData?.attributes?.review}</p>
              </div>
            </div>
          </div>
        ))}
        <div>
          {/* Pagination controls */}
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            {"<"}
          </button>{" "}
          <button
            onClick={handleNextPage}
            disabled={endIndex >= (storeFetchData?.length || 0)}
          >
            {">"}
          </button>
        </div>
        <hr className="divider" />
      </div>
    </div>
  );
};

export default Ratings;
