import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Heart, Phone, MapPin, 
  Globe, PersonStanding, Moon, Cigarette, 
  Wine, Languages, Accessibility, Film, Coffee 
} from 'lucide-react';
import AppLayout from '../../../components/AppLayout/AppLayout';
import BottomNav from '../../../components/BottomNav/BottomNav';
import profileHero from '../../../assets/match-profile.jpg'; // Hero image
import './ProfileDetail.css';

const ProfileDetail = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="detail-main-container">
        
        {/* HERO IMAGE SECTION */}
        <div className="hero-section">
          <img src={profileHero} alt="Jessica" className="hero-img" />
          
          <button className="top-back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={24} color="#5a3c6d" />
          </button>
          
          <button className="top-fav-heart">
            <Heart size={28} color="#fff" />
          </button>

          <div className="hero-compat-badge">
            90% Compatible
          </div>
        </div>

        <div className="detail-scroll-content slide-up">
          
          {/* INTRO SECTION */}
          <div className="profile-intro-row">
            <div className="intro-text">
              <h1 className="user-name-age">Jessica Parker, 23</h1>
              <p className="user-profession">Software Developer</p>
            </div>
            <button className="call-action-square">
              <Phone size={24} color="#5a3c6d" fill="#5a3c6d" />
            </button>
          </div>

          {/* LOCATION SECTION */}
          <div className="info-block">
            <div className="block-header">
              <h3 className="block-title">Location</h3>
              <span className="dist-badge">1 km</span>
            </div>
            <p className="block-desc">Chicago, IL United States</p>
          </div>

          {/* ABOUT ME CHIPS */}
          <div className="info-block">
            <h3 className="block-title">About me</h3>
            <div className="chips-grid">
              <div className="info-chip"><Globe size={16} /> Bengaluru, India</div>
              <div className="info-chip"><PersonStanding size={16} /> Regularly</div>
              <div className="info-chip"><Moon size={16} /> Hindu</div>
              <div className="info-chip"><Wine size={16} /> ocasionally</div>
              <div className="info-chip"><Cigarette size={16} /> Rarely</div>
              <div className="info-chip"><Languages size={16} /> English</div>
            </div>
          </div>

          {/* STORY SECTION */}
          <div className="info-block">
            <h3 className="block-title">My Story</h3>
            <p className="story-text">
              My name is Jessica Parker and I enjoy meeting new people and finding ways to help them have an uplifting experience. I enjoy reading..
              <span className="read-more">Read more</span>
            </p>
          </div>

          {/* INTERESTS SECTION */}
          <div className="info-block">
            <h3 className="block-title">Interests</h3>
            <div className="chips-grid">
              {/* Yoga ki jagah Accessibility use kiya hai */}
              <div className="interest-chip"><Accessibility size={16} color="#f1c40f" /> Yoga</div>
              {/* Video ki jagah Film use kiya hai */}
              <div className="interest-chip"><Film size={16} /> Film lover</div>
              <div className="interest-chip"><Coffee size={16} color="#d35400" /> Matcha</div>
            </div>
          </div>

          {/* GALLERY SECTION */}
          <div className="gallery-section">
            <div className="block-header">
              <h3 className="block-title">Gallery</h3>
              <span className="see-all">See all</span>
            </div>
            <div className="gallery-grid">
              <div className="gal-big"><img src={profileHero} alt="g1" /></div>
              <div className="gal-big"><img src={profileHero} alt="g2" /></div>
              <div className="gal-small"><img src={profileHero} alt="g3" /></div>
              <div className="gal-small"><img src={profileHero} alt="g4" /></div>
              <div className="gal-small"><img src={profileHero} alt="g5" /></div>
            </div>
          </div>

          {/* ACTION BUTTON */}
          <div className="request-btn-container">
            <button className="request-btn">Request For Call</button>
          </div>

          <div className="footer-spacer"></div>
        </div>

        <BottomNav />
      </div>
    </AppLayout>
  );
};

export default ProfileDetail;