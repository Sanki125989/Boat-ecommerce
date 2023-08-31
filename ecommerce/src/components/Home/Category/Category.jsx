import { Card } from "antd";
import "./Category.scss";
import { useNavigate } from "react-router-dom";

const Category = ({ categories, setSearchModal }) => {
  const navigate = useNavigate();
  return (
    <div className="category-main-content">
      <h3 className="ui2-heading">
        <b> Shop by Categories</b>
      </h3>
      <div className="catagories card-container">
        {categories?.map((item) => (
          <div
            key={item.id}
            className="catagory card product-category-card "
            onClick={() => {
              setSearchModal(false);
              navigate(`/category/${item.id}`);
            }}
          >
            <img
              src={
                process.env.REACT_APP_STRIPE_APP_DEV_URL +
                item.attributes.img.data.attributes.url
              }
              alt=" Immortal 121 "
              loading="lazy"
            />
            <Card>
              <span
                style={{
                  display: "block",
                  color: "black",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                {item.attributes.title}
              </span>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
