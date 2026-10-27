import React, { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import {
  fetchCategories,
  fetchProducts,
  fetchProductsByCategory,
} from "../redux/slices/productSlice";

const get = (object, keys, fallback = "") => {
  for (const key of keys) {
    if (object?.[key] !== undefined && object?.[key] !== null) {
      return object[key];
    }
  }

  return fallback;
};

const getCategoryId = (item, index) =>
  String(get(item, ["id", "categoryId", "maDanhMuc"], index));

const getCategoryName = (item, index) =>
  String(
    get(
      item,
      ["category", "name", "categoryName"],
      `Danh mục ${index + 1}`
    )
  );

export default function Search() {
  const dispatch = useDispatch();

  const {
    products: items = [],
    categories = [],
    loading,
    error,
    categoriesLoading: categoryLoading,
    categoriesError: categoryError,
  } = useSelector((state) => state.products);

  const [searchParams, setSearchParams] = useSearchParams();

  // Category selected through the URL or dropdown.
  const category = searchParams.get("category") || "";

  const [keyword, setKeyword] = useState("");
  const [submittedKeyword, setSubmittedKeyword] = useState("");
  const [sort, setSort] = useState("default");

  // Fetch products and categories when the page loads.
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  // Match the URL category to the actual category returned by the API.
  useEffect(() => {
    if (categoryLoading || categories.length === 0) return;

    if (!category) {
      dispatch(fetchProducts());
      return;
    }

    const normalizedCategory = category.trim().toLowerCase();

    const matchedCategory = categories.find((item, index) => {
      const id = getCategoryId(item, index).toLowerCase();
      const name = getCategoryName(item, index).trim().toLowerCase();

      // Supports actual category IDs and names such as Men or Women.
      return (
        id === normalizedCategory ||
        name === normalizedCategory
      );
    });

    if (matchedCategory) {
      const categoryId = getCategoryId(
        matchedCategory,
        categories.indexOf(matchedCategory)
      );

      dispatch(fetchProductsByCategory(categoryId));
    } else {
      console.warn("Category not found:", category);
    }
  }, [dispatch, categories, category, categoryLoading]);

  // Update the URL when the user changes the category dropdown.
  const handleCategory = (value) => {
    setSearchParams((previousParams) => {
      const params = new URLSearchParams(previousParams);

      if (value) {
        params.set("category", value);
      } else {
        params.delete("category");
      }

      return params;
    });
  };

  // Search by product name and sort prices using Lodash.
  const products = useMemo(() => {
    const normalized = submittedKeyword.trim().toLowerCase();

    const filtered = (Array.isArray(items) ? items : []).filter(
      (item) =>
        String(get(item, ["name", "productName", "title"], ""))
          .toLowerCase()
          .includes(normalized)
    );

    if (sort === "ascending") {
      return _.orderBy(
        filtered,
        [
          (item) =>
            Number(get(item, ["price", "priceSale", "unitPrice"], 0)),
        ],
        ["asc"]
      );
    }

    if (sort === "descending") {
      return _.orderBy(
        filtered,
        [
          (item) =>
            Number(get(item, ["price", "priceSale", "unitPrice"], 0)),
        ],
        ["desc"]
      );
    }

    return filtered;
  }, [items, submittedKeyword, sort]);

  return (
    <section className="search-page">
      {/* Search form */}
      <div className="search-panel">
        <form
          className="row align-items-end g-3"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmittedKeyword(keyword);
          }}
        >
          <div className="col-12 col-md-8">
            <label className="form-label" htmlFor="search">
              Search
            </label>

            <input
              id="search"
              className="form-control"
              type="text"
              placeholder="Product name..."
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
          </div>

          <div className="col-12 col-md-4">
            <button
              className="btn btn-primary search-btn w-100"
              type="submit"
            >
              <i className="bi bi-search me-1" />
              SEARCH
            </button>
          </div>
        </form>
      </div>

      {/* Results heading */}
      <div className="gradient-heading">Search result</div>

      {/* Filters */}
      <div className="filter-row row g-3 align-items-end">
        <div className="col-12 col-md-4">
          <label className="form-label" htmlFor="sort">
            Price
          </label>

          <select
            id="sort"
            className="form-select"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="default">Mặc định</option>
            <option value="ascending">Giá tăng dần</option>
            <option value="descending">Giá giảm dần</option>
          </select>
        </div>

        <div className="col-12 col-md-4">
          <label className="form-label" htmlFor="category">
            Category (tùy chọn)
          </label>

          <select
            id="category"
            className="form-select"
            value={
              categories.some(
                (item, index) => getCategoryId(item, index) === category
              )
                ? category
                : categories.find(
                    (item) =>
                      getCategoryName(
                        item,
                        categories.indexOf(item)
                      ).toLowerCase() === category.toLowerCase()
                  )
                  ? getCategoryId(
                      categories.find(
                        (item) =>
                          getCategoryName(
                            item,
                            categories.indexOf(item)
                          ).toLowerCase() === category.toLowerCase()
                      ),
                      categories.indexOf(
                        categories.find(
                          (item) =>
                            getCategoryName(
                              item,
                              categories.indexOf(item)
                            ).toLowerCase() === category.toLowerCase()
                        )
                      )
                    )
                  : ""
            }
            onChange={(event) => handleCategory(event.target.value)}
          >
            <option value="">Tất cả danh mục</option>

            {categories.map((item, index) => {
              const id = getCategoryId(item, index);
              const name = getCategoryName(item, index);

              return (
                <option key={id} value={id}>
                  {name}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Errors */}
      {(error || categoryError) && (
        <div className="alert alert-danger mt-3">
          {String(error || categoryError)}
          <div className="small">
            Kiểm tra API, backend và cấu trúc response.
          </div>
        </div>
      )}

      {/* Loading */}
      {(loading || categoryLoading) && (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Đang tải sản phẩm...</p>
        </div>
      )}

      {/* Empty results */}
      {!loading && !error && products.length === 0 && (
        <div className="alert alert-light mt-3">
          Không tìm thấy sản phẩm phù hợp.
        </div>
      )}

      {/* Product list */}
      <div id="products" className="row g-4 product-grid">
        {products.map((product, index) => (
          <div
            className="col-12 col-sm-6 col-lg-4 col-xl-3"
            key={get(product, ["id", "productId"], index)}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}