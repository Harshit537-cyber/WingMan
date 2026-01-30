import React, { useState, useRef } from 'react';
import './UploadPhoto.css';

const UploadPhoto = () => {
  const [step, setStep] = useState(1);
  const [images, setImages] = useState(Array(6).fill(null));
  const [activeBox, setActiveBox] = useState(null);
  const [showOptions, setShowOptions] = useState(false);

  const galleryInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const tips = [
    { title: "Visible you", desc: "Select a picture where your face is visible and you are by yourself.", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400" },
    { title: "Avoid Filters", desc: "Select real pictures of you without heavy filters.", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400" },
    { title: "What you like", desc: "Select pictures that capture you with your best interests.", img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400" },
    { title: "Share Lifestyle", desc: "Select pictures of your trips and adventure.", img: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=400" }
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else setStep(0);
  };

  const handleBoxClick = (index) => {
    setActiveBox(index);
    setShowOptions(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const newImages = [...images];
      newImages[activeBox] = imageUrl;
      setImages(newImages);
    }
    setShowOptions(false);
    e.target.value = null; 
  };

  return (
    <div className="web-container">
      <div className="upload-screen">
        
        <input type="file" accept="image/*" ref={galleryInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
        <input type="file" accept="image/*" capture="environment" ref={cameraInputRef} style={{ display: 'none' }} onChange={handleFileChange} />

        <div className="top-nav-bar">
          <div className="back-arrow" onClick={() => window.history.back()}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </div>
          <div className="header-progress-container">
            <div className="header-progress-fill"></div>
          </div>
        </div>

        <div className="scrollable-content">
          <h1 className="upload-title">Upload Your Photo</h1>
          <p className="upload-subtext">We'd love to see you. Upload a photo for your dating journey.</p>

          <div className="photo-upload-grid">
            {images.map((img, i) => (
              <div key={i} className="photo-upload-box" onClick={() => handleBoxClick(i)}>
                {img ? (
                  <img src={img} alt="uploaded" className="preview-img" />
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5d3d63" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                )}
                <div className="plus-icon">+</div>
              </div>
            ))}
          </div>

          <div className="how-to-choose-container" onClick={() => setStep(1)} style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', cursor:'pointer', marginTop:'15px'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            <span className="how-to-text" style={{color:'#666', fontSize:'14px'}}>How to choose the perfect pictures</span>
          </div>
        </div>

        {showOptions && (
          <div className="modal-overlay" onClick={() => setShowOptions(false)}>
            <div className="options-card" onClick={e => e.stopPropagation()}>
              <h3>Upload Photo</h3>
              <button className="option-btn" onClick={() => cameraInputRef.current.click()}>Take Photo</button>
              <button className="option-btn" onClick={() => galleryInputRef.current.click()}>Choose from Gallery</button>
              <button className="cancel-btn" onClick={() => setShowOptions(false)}>Cancel</button>
            </div>
          </div>
        )}

        {/* --- Tips Modal Fix: Added Image Tag --- */}
        {step > 0 && (
          <div className="modal-overlay">
            <div className="instruction-card">
              <div className="tip-image-container">
                 <img src={tips[step-1].img} alt="Tip" className="tip-card-img" />
              </div>
              <h2 style={{textAlign:'center', fontWeight:'bold', fontSize:'22px', marginTop:'15px'}}>{tips[step-1].title}</h2>
              <p style={{textAlign:'center', color:'#666', fontSize:'14px', margin:'10px 0 25px 0'}}>{tips[step-1].desc}</p>
              <button className="next-btn-purple" onClick={handleNext}>Next</button>
            </div>
          </div>
        )}

        <div className="bottom-wave-container">
           <svg viewBox="0 0 400 100" width="100%"><path d="M-10,80 C100,20 250,120 410,40" fill="none" stroke="#E0E0E0" strokeWidth="3" strokeDasharray="8,8"/></svg>
        </div>

        <div className="action-nav">
          <div className="outer-circle-ring">
            <div className="inner-solid-circle">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPhoto;