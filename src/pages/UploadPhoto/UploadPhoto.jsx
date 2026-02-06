import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Info, X, CheckCircle2 } from 'lucide-react';
import AppLayout from '../../components/AppLayout/AppLayout';
import OnboardingHeader from '../../components/OnboardingHeader/OnboardingHeader';
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton';
import { uploadUserImages } from '../../api/onboarding.api'; // ✅ Import API
import './UploadPhoto.css';

const UploadPhoto = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalStep, setModalStep] = useState(1);
    const [loading, setLoading] = useState(false); // ✅ Loading state

    // --- UPLOAD LOGIC ---
    const [previews, setPreviews] = useState({}); // For UI display (base64)
    const [rawFiles, setRawFiles] = useState({}); // ✅ For Network upload (File objects)
    const [activeSlot, setActiveSlot] = useState(null);
    const fileInputRef = useRef(null);
    const photoSlots = [0, 1, 2, 3, 4, 5];

    const handleCardClick = (index) => {
        setActiveSlot(index);
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && activeSlot !== null) {
            // 1. Save raw file for API
            setRawFiles(prev => ({ ...prev, [activeSlot]: file }));

            // 2. Save preview for UI
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews(prev => ({ ...prev, [activeSlot]: reader.result }));
            };
            reader.readAsDataURL(file);
        }
        event.target.value = null;
    };

    const handleNext = async () => {
        const filesToUpload = Object.values(rawFiles);
        if (filesToUpload.length === 0) {
            alert("Please upload at least one photo");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            filesToUpload.forEach((file) => {
                // ✅ Check with your backend: Is the key 'images' or 'photo'?
                formData.append('images', file);
            });

            // ✅ Debug: Check if token exists before calling
            const token = localStorage.getItem("auth_token");
            console.log("Token being used:", token);

            const response = await uploadUserImages(formData);
            console.log("Upload Success:", response.data);

            navigate('/preferences');
        } catch (error) {
            console.error("Upload Error Details:", error.response || error);

            // If it's still 404, the path '/userData/upload-images' is likely wrong on the server
            if (error.response?.status === 404) {
                alert("Server error: Upload path not found. Please check the API route name.");
            } else {
                alert("Failed to upload images. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    // --- MODAL LOGIC (Existing) ---
    const guideSteps = [
        { title: "Visible you", desc: "Select a picture where your face is visible and you are by yourself.", img1: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200", img2: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=200" },
        { title: "Avoid Filters", desc: "Select real pictures of you without heavy filters.", img1: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200", img2: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200" },
        { title: "What you like", desc: "Select pictures that captures you with your best interests.", img1: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=200", img2: "https://images.unsplash.com/photo-1514525253344-f814d0c9e58a?auto=format&fit=crop&q=80&w=200" },
        { title: "Share Lifestyle", desc: "Select pictures of your trips, adventure and real you.", img1: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&q=80&w=200", img2: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80&w=200" }
    ];

    const handleNextModal = () => {
        if (modalStep < 4) setModalStep(prev => prev + 1);
        else closeModal();
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalStep(1);
    };

    return (
        <AppLayout>
            <div className="upload-screen-container">
                <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />

                <div className="upload-header-section">
                    <OnboardingHeader title="Upload Your Photo" description="We'd love to see you. Upload a photo for your dating journey." />
                </div>

                <div className="upload-body-content">
                    <div className="photo-grid-wrapper slide-up-delay">
                        <div className="photo-upload-grid">
                            {photoSlots.map((index) => (
                                <div key={index} className="photo-upload-box" onClick={() => handleCardClick(index)}>
                                    {previews[index] ? (
                                        <img src={previews[index]} alt="Preview" className="slot-preview-img" />
                                    ) : (
                                        <Camera size={28} color="#8B6FA8" strokeWidth={1.5} />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="guide-trigger" onClick={() => setIsModalOpen(true)}>
                            <Info size={18} color="#8B6FA8" />
                            <span>How to choose the perfect pictures</span>
                        </div>
                    </div>
                </div>

                <div className="upload-footer-action">
                    <div className="footer-wavy-decoration"></div>
                    <StepProgressButton
                        currentStep={15}
                        totalSteps={15}
                        disabled={Object.keys(rawFiles).length === 0 || loading} // ✅ Disable if uploading
                        onClick={handleNext}
                    />
                </div>

                {isModalOpen && (
                    <div className="guide-modal-overlay">
                        <div className="guide-modal-content animate-pop">
                            <button className="modal-close" onClick={closeModal}><X size={24} color="#8B6FA8" /></button>
                            <h2 className="modal-title">{guideSteps[modalStep - 1].title}</h2>
                            <p className="modal-desc">{guideSteps[modalStep - 1].desc}</p>
                            <div className="modal-image-row">
                                <div className="guide-img-box">
                                    <img src={guideSteps[modalStep - 1].img1} alt="Guide 1" />
                                    <CheckCircle2 className="check-badge" size={24} />
                                </div>
                                <div className="guide-img-box">
                                    <img src={guideSteps[modalStep - 1].img2} alt="Guide 2" />
                                    <CheckCircle2 className="check-badge" size={24} />
                                </div>
                            </div>
                            <button className="modal-next-btn" onClick={handleNextModal}>{modalStep === 4 ? "Got it" : "Next"}</button>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default UploadPhoto;