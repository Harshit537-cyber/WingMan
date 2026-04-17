import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppLayout from '../../components/AppLayout/AppLayout';
import './Appreciate.css';
import bgImage from '../../assets/Frame (2).jpg'; 

const Appreciate = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Functionality: Move to next screen after 3 seconds
        const timer = setTimeout(() => {
            // Update '/religion' to whatever your next route is (e.g., /habit or /religion)
            navigate('/uploads', { state: { ...location.state } }); 
        }, 3000);
        
        return () => clearTimeout(timer);
    }, [navigate, location.state]);

    return (
        <AppLayout>
            <div className="appreciate-screen-wrapper animate-fade-in">
                
                {/* Background Image (Handshake at bottom) */}
                <img 
                    src={bgImage} 
                    alt="background" 
                    className="appreciate-bg-image" 
                />

                {/* Text Content */}
                <div className="appreciate-content-overlay">
                    <div className="appreciate-text-style fade-in-up">
                        <h1>
                            Appreciate your <br />
                            honesty
                        </h1>
                    </div>
                </div>

            </div>
        </AppLayout>
    );
};

export default Appreciate;