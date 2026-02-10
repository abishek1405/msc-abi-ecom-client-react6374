'use client';

import "./index.css";

const ProductsHeader = (props) => {
  const { sortbyOptions, activeOptionId, changeSortby } = props;

  const onChangeSortby = (event) => {
    changeSortby(event.target.value);
  };

  return (
    <div className="products-header">
      <h1 className="products-heading">All Products</h1>
      <div className="sort-by-container">
        <span className="sort-label">Sort by</span>
        <select
          className="sort-select"
          value={activeOptionId}
          onChange={onChangeSortby}
        >
          {sortbyOptions.map((eachOption) => (
            <option key={eachOption.optionId} value={eachOption.optionId}>
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProductsHeader;
