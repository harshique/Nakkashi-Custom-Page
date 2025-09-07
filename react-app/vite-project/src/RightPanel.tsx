export default function RightPanel() {
  return (
    <div className="right-panel">
      {/* Product Type */}
      <div className="panel-section">
        <h3 className="section-title">PRODUCT TYPE</h3>
        <button className="expand-btn">›</button>
      </div>

      {/* Style */}
      <div className="panel-section">
        <h3 className="section-title">STYLE</h3>
        <button className="expand-btn">›</button>
      </div>

      {/* Length */}
      <div className="panel-section">
        <h3 className="section-title">LENGTH</h3>
        <button className="expand-btn">›</button>
      </div>

      {/* Charms */}
      <div className="panel-section">
        <h3 className="section-title">CHARMS</h3>
        <span className="charms-count">0/7 SELECTED</span>
        <button className="expand-btn">›</button>
      </div>
    </div>
  );
}
