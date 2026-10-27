import React from "react";

const get = (object, keys, fallback = "") => {
  for (const key of keys) {
    if (
      object?.[key] !== undefined &&
      object?.[key] !== null &&
      object?.[key] !== ""
    ) {
      return object[key];
    }
  }

  return fallback;
};

const getImageUrl = (image) => {
  const fallback = "https://placehold.co/300x200?text=No+Image";

  if (typeof image !== "string" || !image.trim()) {
    return fallback;
  }

  let url = image.trim();

  // Remove Markdown links if the API returns them.
  url = url.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, "$2");

  // Handle invalid image values.
  if (
    url === "string" ||
    /^\d+$/.test(url) ||
    /^(null|undefined)$/i.test(url)
  ) {
    return fallback;
  }

  // Extract URLs from malformed API responses.
  const matches = [...url.matchAll(/https?:\/\/[^/\s]+/gi)];

  if (matches.length > 0) {
    const lastUrlIndex = matches[matches.length - 1].index;
    url = url.substring(lastUrlIndex).replace(/[)\]]+$/, "");
  }

  // Return valid external image URLs.
  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  // Handle relative image paths.
  url = url.replace(/^\/+/, "");

  if (url.startsWith("images/")) {
    return `https://apistore.cybersoft.edu.vn/${url}`;
  }

  return `https://apistore.cybersoft.edu.vn/images/${url}`;
};

export default function ProductCard({ product }) {
  const name = get(
    product,
    ["name", "productName", "title"],
    "Product"
  );

  const image = get(
    product,
    ["image", "img", "imageUrl", "imgUrl"],
    ""
  );

  const price = get(
    product,
    ["price", "priceSale", "unitPrice"],
    0
  );

  const description = get(
    product,
    ["shortDescription", "description"],
    "Shoe collection"
  );

  const imageUrl = getImageUrl(image);

  return (
    <article className="product-card h-100">
      <div className="product-image-wrap">
        <img
          src={imageUrl}
          alt={name}
          className="product-image"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "https://placehold.co/300x200?text=No+Image";
          }}
        />

        <button
          className="favorite-btn"
          aria-label="Add to favorites"
          type="button"
        >
          <i className="bi bi-heart-fill" />
        </button>
      </div>

      <div className="product-info">
        <h6 title={name}>{name}</h6>

        <p className="text-muted small text-truncate mb-3">
          {description}
        </p>

        <div className="product-actions">
          <button
            type="button"
            className="buy-now"
            style={{
              backgroundColor: "#9DE167",
              border: "none",
              color: "#000",
            }}
            onClick={() =>
              window.alert(
                "You can connect the shopping cart functionality here."
              )
            }
          >
            Buy Now
          </button>

          <strong className="product-price">
            {Number(price).toLocaleString("vi-VN")} đ
          </strong>
        </div>
      </div>
    </article>
  );
}