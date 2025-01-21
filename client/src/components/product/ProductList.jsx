/* eslint-disable react/prop-types */
import ProductCard from "./ProductCard";

const ProductList = function ({ equipment }) {
  return (
    <>
      <div>
        <h2
          className="font-bold text-lg mb-4"
          style={{ fontFamily: "montserrat" }}>
          Product List
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
          {equipment.map((item) => {
            return (
              <ProductCard
                key={item.equipmentid}
                id={item.equipmentid}
                name={item.name}
                price={item.price}
                availability={item.availabilitystatus}
                path={item.imageurl}
                rating={item.rating}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProductList;
