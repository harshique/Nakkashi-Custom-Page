import { useEffect, useRef, useState } from "react";

const productTypes = [
  {
    id: "Necklace",
    label: "NECKLACE",
    img: "https://www.astridandmiyu.com/cdn/shop/files/Q1PartB2953_a5059151-0843-45b1-95f7-736df3cce84e.webp?v=1706887315&width=720", // replace with actual image
  },
  {
    id: "Anklet",
    label: "ANKLET",
    img: "https://www.astridandmiyu.com/cdn/shop/files/Q1PartB2953_a5059151-0843-45b1-95f7-736df3cce84e.webp?v=1706887315&width=720",
  },
  {
    id: "Bracelet",
    label: "BRACELET",
    img: "https://www.astridandmiyu.com/cdn/shop/files/Q1PartB2953_a5059151-0843-45b1-95f7-736df3cce84e.webp?v=1706887315&width=720",
  },
];

const RenderProductTypes = ({
  customProductDetails,
  setCustomProductDetails,
}: any) => {
  return (
    <>
      {productTypes.map((product) => (
        <div
          className={`grid-item ${
            customProductDetails.productType === product.id ? "selected" : ""
          }`}
          key={product.id}
          onClick={() => {
            setCustomProductDetails({
              ...customProductDetails,
              productType: product.id,
            });
          }}
        >
          <img src={product.img} alt="Necklace" />
          <div className="label">{product.label}</div>
        </div>
      ))}
    </>
  );
};

const RenderStylesTypes = ({
  stylesProducts,
  customProductDetails,
  setCustomProductDetails,
}: any) => {
  return (
    <>
      {stylesProducts.map((product: any) => (
        <div
          className={`grid-item ${
            customProductDetails.style === product.title ? "selected" : ""
          }`}
          key={product.id}
          onClick={() => {
            setCustomProductDetails({
              ...customProductDetails,
              style: product.title,
            });
          }}
        >
          <img src={product.images[0]} />
          <div className="label">{product.title}</div>
          <div className="price">{product.price}</div>
        </div>
      ))}
    </>
  );
};

export default function RightPanel({
  collectionsData,
}: {
  collectionsData: any;
}) {
  console.log("Collections Data:", collectionsData);
  const [currentTab, setCurrentTab] = useState("productType");

  const [customProductDetails, setCustomProductDetails] = useState({
    productType: "",
    style: "",
    length: "",
    charms: [] as string[],
  });

  const ref = useRef(document.getElementById("third-screen-section-2"));

  useEffect(() => {
    if (!ref.current) return;

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === "attributes" &&
          mutation?.attributeName?.startsWith("data-")
        ) {
          setCustomProductDetails({
            ...customProductDetails,
            productType:
              (mutation.target as Element).getAttribute(
                mutation.attributeName
              ) ?? "",
          });
        }
      }
    });

    observer.observe(ref.current, {
      attributes: true,
      attributeOldValue: true,
    });

    return () => observer.disconnect();
  }, [ref]);

  return (
    <div className="container">
      <div className="left-panel">
        {/* Product Type */}
        <div
          className={`panel-section ${
            currentTab === "productType" ? "highlighted" : ""
          }`}
          onClick={() => setCurrentTab("productType")}
        >
          <h3 className="section-title">PRODUCT TYPE</h3>
          {customProductDetails.productType && customProductDetails.productType}
          <button className="expand-btn">›</button>
        </div>

        {/* Style */}
        <div
          className={`panel-section ${
            currentTab === "style" ? "highlighted" : ""
          }`}
          onClick={() => setCurrentTab("style")}
        >
          <h3 className="section-title">STYLE</h3>
          {customProductDetails.style && customProductDetails.style}
          <button className="expand-btn">›</button>
        </div>

        {/* Length */}
        <div
          className={`panel-section ${
            currentTab === "length" ? "highlighted" : ""
          }`}
          onClick={() => setCurrentTab("length")}
        >
          <h3 className="section-title">LENGTH</h3>
          <button className="expand-btn">›</button>
        </div>

        {/* Charms */}
        <div
          className={`panel-section ${
            currentTab === "charms" ? "highlighted" : ""
          }`}
          onClick={() => setCurrentTab("charms")}
        >
          <h3 className="section-title">CHARMS</h3>
          <span className="charms-count">0/7 SELECTED</span>
          <button className="expand-btn">›</button>
        </div>
      </div>
      <div className="right-panel">
        <div className="grid-container">
          {currentTab === "productType" ? (
            <RenderProductTypes
              customProductDetails={customProductDetails}
              setCustomProductDetails={setCustomProductDetails}
            />
          ) : currentTab === "style" ? (
            <RenderStylesTypes
              stylesProducts={
                collectionsData.find(
                  (col: any) => col.handle === "necklace-chain-styles"
                )?.products
              }
              customProductDetails={customProductDetails}
              setCustomProductDetails={setCustomProductDetails}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
