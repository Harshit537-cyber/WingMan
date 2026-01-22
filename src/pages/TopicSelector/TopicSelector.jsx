import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';

import './TopicSelector.css';

// Assets
import broImg from '../../assets/img2/bro.png';
import rafikiImg from '../../assets/img2/rafiki.png';

const TopicSelector = () => {
    const navigate = useNavigate();

    const topics = [
        {
            id: 1,
            title: "Emotional Communication",
            desc: "Responsiveness, vulnerability, expression styles",
            img: broImg 
        },
        {
            id: 2,
            title: "Physical Wellness",
            desc: "Activity levels, fitness goals, health habits",
            img: rafikiImg 
        },
        {
            id: 3,
            title: "Lifestyle Goals",
            desc: "Future planning, travel, daily routine",
            img: rafikiImg 
        }
    ];

    return (
        <div className="topic-selection-wrapper">
            <div className="topic-card-container">
                
                {/* Header Section */}
                <header className="topic-header">
                    <button className="topic-back-btn" onClick={() => navigate(-1)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5D326F" strokeWidth="2.5">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <h2 className="topic-header-title">Pick A Card</h2>
                    <div className="header-spacer"></div> {/* To keep title centered */}
                </header>

                {/* Swiper Slider Section */}
                <div className="topic-slider-section">
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={'auto'}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 2.5,
                            slideShadows: false,
                        }}
                        modules={[EffectCoverflow]}
                        className="topic-swiper"
                    >
                        {topics.map((item) => (
                            <SwiperSlide key={item.id} className="topic-slide">
                                <div className="topic-main-card">
                                    <div className="topic-text-box">
                                        <h3 className="topic-card-title">{item.title}</h3>
                                        <p className="topic-card-desc">{item.desc}</p>
                                    </div>
                                    <div className="topic-img-box">
                                        <img src={item.img} alt={item.title} className="topic-illustration" />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Footer Action */}
                <div className="topic-footer">
                    <button className="topic-continue-btn" onClick={() => navigate('/next-quiz')}>
                        Continue
                    </button>
                </div>

            </div>
        </div>
    );
};

export default TopicSelector;