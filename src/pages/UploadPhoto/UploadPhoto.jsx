import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Info, X, CheckCircle2 } from 'lucide-react';
import AppLayout from '../../components/AppLayout/AppLayout';
import OnboardingHeader from '../../components/OnboardingHeader/OnboardingHeader';
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton';
import './UploadPhoto.css';

const UploadPhoto = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalStep, setModalStep] = useState(1);
    const photoSlots = [1, 2, 3, 4, 5, 6];

    // Data for the "Perfect Picture" guide shown in your images
    const guideSteps = [
        {
            title: "Visible you",
            desc: "Select a picture where your face is visible and you are by yourself.",
            img1: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200",
            img2: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=200"
        },
        {
            title: "Avoid Filters",
            desc: "Select real pictures of you without heavy filters.",
            img1: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
            img2: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200"
        },
        {
            title: "What you like",
            desc: "Select pictures that captures you with your best interests.",
            img1: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=200",
            img2: "https://images.unsplash.com/photo-1514525253344-f814d0c9e58a?auto=format&fit=crop&q=80&w=200"
        },
        {
            title: "Share Lifestyle",
            desc: "Select pictures of your trips, adventure and real you.",
            img1: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&q=80&w=200",
            img2: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80&w=200"
        }
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
                {/* TOP SECTION: Shared Header (Step 14) */}
                <div className="upload-header-section">
                    <OnboardingHeader 
                        title="Upload Your Photo"
                        description="We'd love to see you. Upload a photo for your dating journey."
                    />
                </div>

                {/* MIDDLE SECTION: Grid */}
                <div className="upload-body-content">
                    <div className="photo-grid-wrapper slide-up-delay">
                        <div className="photo-upload-grid">
                            {photoSlots.map((slot) => (
                                <div key={slot} className="photo-upload-box">
                                    <Camera size={28} color="#8B6FA8" strokeWidth={1.5} />
                                </div>
                            ))}
                        </div>

                        {/* Trigger for Popup */}
                        <div className="guide-trigger" onClick={() => setIsModalOpen(true)}>
                            <Info size={18} color="#8B6FA8" />
                            <span>How to choose the perfect pictures</span>
                        </div>
                    </div>
                </div>

                {/* BOTTOM SECTION: Shared Progress Button */}
                <div className="upload-footer-action">
                    <div className="footer-wavy-decoration"></div>
                    <StepProgressButton 
                        currentStep={14} 
                        totalSteps={15} 
                        onClick={() => navigate('/home')} 
                    />
                </div>

                {/* GUIDE POPUP MODAL */}
                {isModalOpen && (
                    <div className="guide-modal-overlay">
                        <div className="guide-modal-content animate-pop">
                            <button className="modal-close" onClick={closeModal}>
                                <X size={24} color="#8B6FA8" />
                            </button>
                            
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

                            <button className="modal-next-btn" onClick={handleNextModal}>
                                {modalStep === 4 ? "Got it" : "Next"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default UploadPhoto;