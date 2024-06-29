import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomizeStore = () => {
  const [productType, setProductType] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!productType) newErrors.productType = 'Product type is required';

    if (Object.keys(newErrors).length === 0) {
      navigate('/productForm');
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="customize-store" style={{ marginTop: 50 }}>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');
        .customize-store {
          font-family: 'Montserrat', sans-serif;
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        h3 {
          color: black;
          margin-bottom: 10px;
          font-weight: 700;
        }
        .form-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .input-group {
          display: flex;
          flex-direction: column;
        }
        label {
          color: #333;
          font-weight: 700;
          margin-bottom: 5px; /* Added margin-bottom to align labels at the beginning */
          align-self: flex-start; /* Align labels at the beginning */
        }
        input[type="text"] {
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 400;
        }
        .error {
          color: red;
          font-size: 12px;
          margin-top: 5px;
        }
        .button-group {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 20px; /* Adjusted margin-top for button group */
        }
        button {
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 700;
        }
        button[type="button"] {
          background-color: #ccc;
          color: #333;
        }
        button[type="submit"] {
          background-color: #0066cc;
          color: white;
        }
        .diagram-container {
          text-align: center;
        }
        .hierarchy-diagram img {
          max-width: 100%;
          height: auto;
          border-radius: 4px;
        }
        @media (min-width: 768px) {
          .customize-store {
            flex-direction: row;
          }
          .form-container {
            flex: 1;
            margin-right: 20px;
          }
          .diagram-container {
            flex: 1;
            margin-left: 20px;
          }
        }
      `}</style>

      <div className="form-container">
        <h3>Let's add a type, Category, and Sub-category</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group" style={{ marginTop: 20 }}>
            <label htmlFor="productType">Add a Product type</label>
            <input
              type="text"
              id="productType"
              placeholder="e.g. books"
              value={productType}
              onChange={(e) => {
                setProductType(e.target.value);
                if (errors.productType) {
                  setErrors({ ...errors, productType: '' });
                }
              }}
            />
            {errors.productType && <div className="error">{errors.productType}</div>}
          </div>

          <div className="input-group" style={{ marginTop: 20 }}>
            <label htmlFor="category">Add a Category (optional)</label>
            <input
              type="text"
              id="category"
              placeholder="e.g. Academic book"
            />
          </div>

          <div className="input-group" style={{ marginTop: 20 }}>
            <label htmlFor="subCategory">Add a Sub-Category (optional)</label>
            <input
              type="text"
              id="subCategory"
              placeholder="e.g. medical book"
            />
          </div>

          <div className="button-group">
            <button type="button" onClick={() => navigate('/cards')}>Back</button>
            <button type="submit">Next</button>
          </div>
        </form>
      </div>

      <div className="diagram-container">
        <div className="hierarchy-diagram">
          <img src="https://admin.shopnix.io/static/images/type_category_flow.webp" alt="Hierarchy Diagram" />
        </div>
      </div>
    </div>
  );
};

export default CustomizeStore;
