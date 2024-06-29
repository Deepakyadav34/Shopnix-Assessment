import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductForm.css';

const ProductForm = () => {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [image, setImage] = useState(null);
    const [skuCode, setSkuCode] = useState('');
    const [hsnCode, setHsnCode] = useState('');
    const [listPrice, setListPrice] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState('');
    const [gstRate, setGstRate] = useState('');
    const [shippingCharge, setShippingCharge] = useState('');
    const [netPrice, setNetPrice] = useState('');
    const [stockLevel, setStockLevel] = useState('');
    const [inclusiveOfGst, setInclusiveOfGst] = useState(false);
    const [hasHsnCode, setHasHsnCode] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        calculateNetPrice();
    }, [listPrice, discountPercentage, shippingCharge]);

    const calculateNetPrice = () => {
        if (listPrice && discountPercentage !== '' && shippingCharge !== '') {
            const discountAmount = (listPrice * discountPercentage) / 100;
            const calculatedNetPrice = parseFloat(listPrice) - discountAmount + parseFloat(shippingCharge);
            setNetPrice(calculatedNetPrice.toFixed(2));
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!productName) newErrors.productName = 'Product name is required';
        if (!productDescription) newErrors.productDescription = 'Product description is required';
        if (!image) newErrors.image = 'Image is required';
        if (!listPrice) newErrors.listPrice = 'List price is required';
        if (!discountPercentage) newErrors.discountPercentage = 'Discount percentage is required';
        if (!shippingCharge) newErrors.shippingCharge = 'Shipping charge is required';
        if (hasHsnCode && !hsnCode) newErrors.hsnCode = 'HSN/SAC code is required';
        if (!stockLevel) newErrors.stockLevel = 'Stock level is required';
        if (inclusiveOfGst && !gstRate) newErrors.gstRate = 'GST rate is required';

        if (Object.keys(newErrors).length === 0) {
            console.log({
                productName, productDescription, image, skuCode, hsnCode, listPrice, discountPercentage,
                gstRate, shippingCharge, netPrice, stockLevel, inclusiveOfGst
            });
            alert('Details saved');
            window.location.reload();
        } else {
            setErrors(newErrors);
        }
    };

    const handleImageRemove = () => {
        setImage(null);
        document.getElementById('imageUpload').value = null; // Clear file input
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 form-section">
                    <div className="scrollable-section">
                        <h2 className="header-text">Let's add your first product</h2>
                        <h3 className="subheader-text text-start mt-3">Basic Details</h3>
                        <form onSubmit={handleFormSubmit}>
                            <div className="form-group text-start mt-5">
                                <label className="form-label">Product name</label>
                                <input
                                    type="text"
                                    className="form-control input-box"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    placeholder="e.g. Anatomy Book"
                                />
                                {errors.productName && <div className="error">{errors.productName}</div>}
                            </div>
                            <div className="form-group text-start mt-3">
                                <label className="form-label">Product Description</label>
                                <textarea
                                    className="form-control input-box"
                                    rows="3"
                                    value={productDescription}
                                    onChange={(e) => setProductDescription(e.target.value)}
                                    placeholder="Product description"
                                ></textarea>
                                {errors.productDescription && <div className="error">{errors.productDescription}</div>}
                            </div>
                            <div className="form-group text-start mt-3">
                                <label className="form-label">Add Image(s)</label>
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        className="custom-file-input"
                                        id="imageUpload"
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                    <label className="custom-file-label" htmlFor="imageUpload">
                                        {image ? image.name : 'Choose file'}
                                    </label>
                                    {image && (
                                        <button type="button" className="btn btn-danger btn-sm ml-2" onClick={handleImageRemove}>
                                            Remove
                                        </button>
                                    )}
                                </div>
                                {errors.image && <div className="error">{errors.image}</div>}
                            </div>
                            <div className="form-group form-check text-start mt-3">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="skuCheck"
                                    onChange={(e) => setSkuCode(e.target.checked ? 'PROD0001' : '')}
                                />
                                <label className="form-check-label" htmlFor="skuCheck">
                                    This product has an SKU code
                                </label>
                                {skuCode && (
                                    <input
                                        type="text"
                                        className="form-control mt-2 input-box"
                                        value={skuCode}
                                        readOnly
                                    />
                                )}
                            </div>
                            <div className="form-group form-check text-start mt-3">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="hsnCheck"
                                    onChange={(e) => setHasHsnCode(e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="hsnCheck">
                                    This product has HSN/SAC code
                                </label>
                                {hasHsnCode && (
                                    <input
                                        type="text"
                                        className="form-control mt-2 input-box"
                                        value={hsnCode}
                                        onChange={(e) => setHsnCode(e.target.value)}
                                        placeholder="e.g. 1234"
                                    />
                                )}
                                {errors.hsnCode && <div className="error">{errors.hsnCode}</div>}
                            </div>
                            <hr />
                            <h3 className="subheader-text text-start mt-3">Pricing Details</h3>
                            <div className="form-group text-start mt-3">
                                <label className="form-label">List price</label>
                                <input
                                    type="text"
                                    className="form-control input-box"
                                    value={listPrice}
                                    onChange={(e) => setListPrice(e.target.value)}
                                    placeholder="e.g. 1000"
                                />
                                {errors.listPrice && <div className="error">{errors.listPrice}</div>}
                            </div>
                            <div className="form-group text-start mt-3">
                                <label className="form-label">Discount percentage</label>
                                <input
                                    type="text"
                                    className="form-control input-box"
                                    value={discountPercentage}
                                    onChange={(e) => setDiscountPercentage(e.target.value)}
                                    placeholder="e.g. 10"
                                />
                                {errors.discountPercentage && <div className="error">{errors.discountPercentage}</div>}
                            </div>
                            <div className="form-group text-start mt-3">
                                <label className="form-label">Shipping charge</label>
                                <input
                                    type="text"
                                    className="form-control input-box"
                                    value={shippingCharge}
                                    onChange={(e) => setShippingCharge(e.target.value)}
                                    placeholder="e.g. 50"
                                />
                                {errors.shippingCharge && <div className="error">{errors.shippingCharge}</div>}
                            </div>
                            <div className="form-group form-check text-start mt-3">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="inclusiveOfGstCheck"
                                    onChange={(e) => setInclusiveOfGst(e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="inclusiveOfGstCheck">
                                    Inclusive of GST
                                </label>
                            </div>
                            <div className="form-group text-start mt-3">
                                <label className={`form-label ${!inclusiveOfGst ? 'blurred' : ''}`}>GST rate</label>
                                <input
                                    type="text"
                                    className={`form-control input-box ${!inclusiveOfGst ? 'blurred' : ''}`}
                                    value={gstRate}
                                    onChange={(e) => setGstRate(e.target.value)}
                                    placeholder="e.g. 18"
                                    disabled={!inclusiveOfGst}
                                />
                                {errors.gstRate && <div className="error">{errors.gstRate}</div>}
                            </div>
                            <div className="form-group text-start mt-3">
                                <label className="form-label">Net price</label>
                                <input
                                    type="text"
                                    className="form-control input-box"
                                    value={netPrice}
                                    onChange={(e) => setNetPrice(e.target.value)}
                                    placeholder="e.g. 900"
                                    readOnly
                                />
                                {errors.netPrice && <div className="error">{errors.netPrice}</div>}
                            </div>
                            <div className="form-group text-start mt-3">
                                <label className="form-label">Stock level</label>
                                <input
                                    type="text"
                                    className="form-control input-box"
                                    value={stockLevel}
                                    onChange={(e) => setStockLevel(e.target.value)}
                                    placeholder="e.g. 100"
                                />
                                {errors.stockLevel && <div className="error">{errors.stockLevel}</div>}
                            </div>
                            <div className="form-buttons mt-3">
                                <button type="button" className="btn btn-secondary me-2" onClick={() => navigate('/customizeStore')}>
                                    Back
                                </button>
                                <button type="submit" className="btn btn-primary" onClick={handleFormSubmit}>
                                    Next
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-md-6 preview-section">
                    <div className="card product-card">
                        <img
                            src={image ? URL.createObjectURL(image) : 'https://via.placeholder.com/150'}
                            className="card-img-top"
                            alt="Product"
                        />
                        <div className="card-body">
                            <h5 className="card-title">{productName || 'Product title'}</h5>
                            <p className="card-text">{productDescription || 'Product description goes here...'}</p>
                            <p className="card-text price-text">
                                {discountPercentage && listPrice && (
                                    <s>₹{listPrice}</s>
                                )}
                                {listPrice && (
                                    <span> ₹{netPrice}</span>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductForm;
