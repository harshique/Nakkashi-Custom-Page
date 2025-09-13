import { useEffect, useMemo, useRef, useState } from "react";

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

const lengthTypes = [
  { id: "40cm", label: "Size - 40cm", productType: "necklace" },
  { id: "45cm", label: "Size - 45cm", productType: "necklace" },
  { id: "50cm", label: "Size - 50cm", productType: "necklace" },
  { id: "60cm", label: "Size - 60cm", productType: "necklace" },
  { id: "22cm", label: "Size - 22cm", productType: "anklet" },
  { id: "24cm", label: "Size - 24cm", productType: "anklet" },
  { id: "26cm", label: "Size - 26cm", productType: "anklet" },
  { id: "28cm", label: "Size - 28cm", productType: "anklet" },
  { id: "16.5cm", label: "Size - 16.5cm", productType: "bracelet" },
  { id: "18cm", label: "Size - 18cm", productType: "bracelet" },
  { id: "19.5cm", label: "Size - 19.5cm", productType: "bracelet" },
  { id: "21cm", label: "Size - 21cm", productType: "bracelet" },
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
              style: { id: "", title: "" },
              length: "",
              charms: [] as any[],
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
              length: "",
              charms: [] as any[],
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
        {lengthTypes
          .filter(
            (length) => length.productType === customProductDetails.productType
          )
          .map((length: any) => {
            return (
              <div
                className={`length-option ${
                  customProductDetails.length === length.id
                    ? "length-option-selected"
                    : ""
                }`}
                onClick={() =>
                  setCustomProductDetails({
                    ...customProductDetails,
                    length: length.id,
                    charms: [] as any[],
                  })
                }
              >
                <span className="length-option-label">{length.label}</span>
                <span
                  className={`length-option-circle ${
                    customProductDetails.length === length.id
                      ? "length-option-circle"
                      : ""
                  }`}
                ></span>
              </div>
            );
          })}
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
                {charmsCollection.products.map((product: any) => {
                  const isSelected = customProductDetails.charms.findIndex(
                    (charm: any) => charm.productId === product.id
                  );
                  let selectedCount;
                  if (isSelected !== -1)
                    selectedCount =
                      customProductDetails.charms[isSelected].quantity;
                  else selectedCount = 0;
                  return (
                    <div className="grid-item" key={product.id}>
                      <img src={product.images[0]} />
                      <div className="quantity-selector">
                        <button
                          className="quantity-btn minus-btn"
                          onClick={() => {
                            const newCharmsState = customProductDetails.charms;
                            if (isSelected !== -1) {
                              newCharmsState[isSelected].quantity = Math.max(
                                0,
                                Number(newCharmsState[isSelected].quantity - 1)
                              );
                            }
                            setCustomProductDetails({
                              ...customProductDetails,
                              charms: newCharmsState,
                            });
                          }}
                        >
                          −
                        </button>
                        <div className="quantity-display" id="quantity">
                          {selectedCount}
                        </div>
                        <button
                          className="quantity-btn plus-btn"
                          onClick={() => {
                            const newCharmsState = customProductDetails.charms;
                            if (isSelected !== -1) {
                              newCharmsState[isSelected].quantity = Number(
                                newCharmsState[isSelected].quantity + 1
                              );
                            } else {
                              newCharmsState.push({
                                productId: product.id,
                                quantity: 1,
                              });
                            }
                            setCustomProductDetails({
                              ...customProductDetails,
                              charms: newCharmsState,
                            });
                          }}
                        >
                          +
                        </button>
                      </div>
                      <div className="label">{product.title}</div>
                      <div className="price">{product.price}</div>
                    </div>
                  );
                })}
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

  console.log("customProductDetails", customProductDetails);

  const totalSelectedCharms = useMemo(() => {
    return customProductDetails.charms.reduce(
      (prev, cur) => {
        return Number(prev + cur.quantity);
      },
      [0]
    );
  }, [customProductDetails]);

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
          } ${!customProductDetails.style.id ? "panel-section-disabled" : ""}`}
          onClick={() => {
            if (!customProductDetails.style.id) return;
            setCurrentTab("length");
          }}
        >
          <h3 className="section-title">LENGTH</h3>
          {customProductDetails.length && customProductDetails.length}
          <button className="expand-btn">›</button>
        </div>

        {/* Charms */}
        <div
          className={`panel-section ${
            currentTab === "charms" ? "highlighted" : ""
          } ${!customProductDetails.length ? "panel-section-disabled" : ""} `}
          onClick={() => {
            if (!customProductDetails.length) return;
            setCurrentTab("charms");
          }}
        >
          <h3 className="section-title">CHARMS</h3>
          <span className="charms-count">{totalSelectedCharms}/7 SELECTED</span>
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
