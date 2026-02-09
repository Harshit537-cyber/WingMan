import React from 'react';
import './Whyhow.css'; // Import the CSS file

export const Whyhow = () => {
  return (
    <section className="whyhow-section">
      
      {/* Top Dashed Wave */}
      <div className="wave-container top-wave">
        <svg viewBox="0 0 1440 200" xmlns="http://www.w3.org/2000/svg">
          <path className="dashed-path" d="M-50 160C250 40 450 240 750 140C1050 40 1250 240 1550 100" />
        </svg>
      </div>

      <div className="content-container">
        
        {/* Why Section */}
        <div className="why-block">
          <h2 className="section-title">Why?</h2>
          <p className="highlight-text">
            Because endless conversations <br />
            are easier than real intentions.
          </p>
          <button className="read-more-btn">Read More:</button>
        </div>

        {/* How Section */}
        <div className="how-block">
          <h2 className="section-title">How??</h2>
          <div className="how-content">
            <h3 className="highlight-text">
              Slow enough to be intentional. <br />
              Fast enough to be real.
            </h3>
            <div className="sub-text">
              <p>No noise. No swiping addiction.</p>
              <p>No chatting marathons.</p>
              <p>Just a guided path from interest to meeting.</p>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Dashed Wave */}
      <div className="wave-container bottom-wave">
        <svg viewBox="0 0 1440 200" xmlns="http://www.w3.org/2000/svg">
          <path className="dashed-path" d="M-50 60C200 180 500 20 800 120C1100 220 1300 60 1600 160" />
        </svg>
      </div>
      

    </section>
  );
};