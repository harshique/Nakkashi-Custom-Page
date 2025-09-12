import { useEffect, useRef, useState } from "react";

const productTypes = [
  {
    id: "necklace",
    label: "NECKLACE",
    img: "https://www.astridandmiyu.com/cdn/shop/files/Q1PartB2953_a5059151-0843-45b1-95f7-736df3cce84e.webp?v=1706887315&width=720", // replace with actual image
  },
  {
    id: "anklet",
    label: "ANKLET",
    img: "https://www.astridandmiyu.com/cdn/shop/files/Q1PartB2953_a5059151-0843-45b1-95f7-736df3cce84e.webp?v=1706887315&width=720",
  },
  {
    id: "bracelet",
    label: "BRACELET",
    img: "https://www.astridandmiyu.com/cdn/shop/files/Q1PartB2953_a5059151-0843-45b1-95f7-736df3cce84e.webp?v=1706887315&width=720",
  },
];

const charmsTypes = ["fruits-charms", "motif-charms"];

const RenderProductTypes = ({
  customProductDetails,
  setCustomProductDetails,
}: any) => {
  return (
    <div className="grid-container">
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
    </div>
  );
};

const RenderStylesTypes = ({
  stylesProducts,
  customProductDetails,
  setCustomProductDetails,
}: any) => {
  return (
    <div className="grid-container">
      {stylesProducts.map((product: any) => (
        <div
          className={`grid-item ${
            customProductDetails.style.id === product.id ? "selected" : ""
          }`}
          key={product.id}
          onClick={() => {
            setCustomProductDetails({
              ...customProductDetails,
              style: {
                id: product.id,
                title: product.title,
              },
            });
          }}
        >
          <img src={product.images[0]} />
          <div className="label">{product.title}</div>
          <div className="price">{product.price}</div>
        </div>
      ))}
    </div>
  );
};

const RenderLengthTypes = ({
  customProductDetails,
  setCustomProductDetails,
}: any) => {
  return (
    <>
      <div className="options-container">
        <div
          className={`length-option ${
            customProductDetails.length === "40cm"
              ? "length-option-selected"
              : ""
          }`}
          onClick={() =>
            setCustomProductDetails({
              ...customProductDetails,
              length: "40cm",
            })
          }
        >
          <span className="length-option-label">Size - 40cm</span>
          <span
            className={`length-option-circle ${
              customProductDetails.length === "40cm"
                ? "length-option-circle"
                : ""
            }`}
          ></span>
        </div>
        <div
          className={`length-option ${
            customProductDetails.length === "45cm"
              ? "length-option-selected"
              : ""
          }`}
          onClick={() =>
            setCustomProductDetails({
              ...customProductDetails,
              length: "45cm",
            })
          }
        >
          <span className="length-option-label">Size - 45cm</span>
          <span
            className={`length-option-circle ${
              customProductDetails.length === "45cm"
                ? "length-option-circle"
                : ""
            }`}
          ></span>
        </div>
        <div
          className={`length-option ${
            customProductDetails.length === "50cm"
              ? "length-option-selected"
              : ""
          }`}
          onClick={() =>
            setCustomProductDetails({
              ...customProductDetails,
              length: "50cm",
            })
          }
        >
          <span className="length-option-label">Size - 50cm</span>
          <span
            className={`length-option-circle ${
              customProductDetails.length === "50cm"
                ? "length-option-circle"
                : ""
            }`}
          ></span>
        </div>
        <div
          className={`length-option ${
            customProductDetails.length === "60cm"
              ? "length-option-selected"
              : ""
          }`}
          onClick={() =>
            setCustomProductDetails({
              ...customProductDetails,
              length: "60cm",
            })
          }
        >
          <span className="length-option-label">Size - 60cm</span>
          <span
            className={`length-option-circle ${
              customProductDetails.length === "60cm"
                ? "length-option-circle"
                : ""
            }`}
          ></span>
        </div>
      </div>
    </>
  );
};

const RenderCharmsTypes = ({
  collectionData,
  customProductDetails,
  setCustomProductDetails,
}: any) => {
  const [openedCharmSections, setOpenedCharmSections] = useState<string>("");

  return (
    <div className="charms-container">
      <div className="distance-selector">
        <div className="distance-label">Distance between charms</div>
        <div className="distance-options">
          <span className="distance-option">0.5cm</span>
          <span className="distance-option">1cm</span>
          <span className="distance-option">2cm</span>
          <span className="distance-option active">3cm</span>
        </div>
      </div>

      {charmsTypes.map((charmType) => {
        const charmsCollection = collectionData.find(
          (col: any) => col.handle === charmType
        );
        if (!charmsCollection) return null;

        return (
          <div className="charm-section">
            <div
              className="charm-header"
              onClick={() => {
                if (openedCharmSections === charmType) {
                  setOpenedCharmSections("");
                  return;
                }
                setOpenedCharmSections(charmType);
              }}
            >
              <div className="charm-title">{charmsCollection.title}</div>
              <div className="charm-count">
                <span>{charmsCollection.products_count} options</span>
                <div className="dropdown-arrow"></div>
              </div>
            </div>

            {openedCharmSections === charmType && (
              <div className="grid-container">
                {charmsCollection.products.map((product: any) => (
                  <div className="grid-item" key={product.id}>
                    <img src={product.images[0]} />
                    <div className="quantity-selector">
                      <button className="quantity-btn minus-btn">−</button>
                      <div className="quantity-display" id="quantity">
                        0
                      </div>
                      <button className="quantity-btn plus-btn">+</button>
                    </div>
                    <div className="label">{product.title}</div>
                    <div className="price">{product.price}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default function RightPanel({
  collectionsData,
}: {
  collectionsData: any;
}) {
  const [currentTab, setCurrentTab] = useState("productType");

  const [customProductDetails, setCustomProductDetails] = useState({
    productType: "",
    style: { id: "", title: "" },
    length: "",
    charms: [] as any[],
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

  console.log("customProductDetails", customProductDetails);

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
          {customProductDetails.style.title && customProductDetails.style.title}
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
          {customProductDetails.length && customProductDetails.length}
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
        {currentTab === "productType" ? (
          <RenderProductTypes
            customProductDetails={customProductDetails}
            setCustomProductDetails={setCustomProductDetails}
          />
        ) : currentTab === "style" ? (
          <RenderStylesTypes
            stylesProducts={collectionsData
              .find((col: any) => col.handle === "necklace-chain-styles")
              ?.products.filter((prod: any) =>
                prod.tags.includes(customProductDetails.productType)
              )}
            customProductDetails={customProductDetails}
            setCustomProductDetails={setCustomProductDetails}
          />
        ) : currentTab === "length" ? (
          <RenderLengthTypes
            customProductDetails={customProductDetails}
            setCustomProductDetails={setCustomProductDetails}
          />
        ) : (
          <RenderCharmsTypes
            collectionData={collectionsData}
            customProductDetails={customProductDetails}
            setCustomProductDetails={setCustomProductDetails}
          />
        )}
      </div>
    </div>
  );
}
