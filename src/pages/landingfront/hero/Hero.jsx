import React from "react";
import "./Hero.css";

import centerImg from "../../../assets/landingimg/center.svg";
import leftImg from "../../../assets/../assets/landingimg/left.svg";
import rightImg from "../../../assets/landingimg/right.svg";
import halo from "../../../assets/landingimg/halo.svg";


export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">

        <h1 className="hero-title">
          Everyone is swiping. Everyone is chatting.
          <br />
          Almost no one is actually meeting.
        </h1>

        <div className="hero-text left-text">
          WingMann exists because modern
          dating is loud, fast, and strangely lonely.
        </div>

        <div className="hero-text right-text">
          WingMann exists because modern
          dating is loud, fast, and strangely lonely.
        </div>

        <img src={leftImg} alt="left" className="side-img left-img" />
        <img src={rightImg} alt="right" className="side-img right-img" />

        <div className="center-wrapper">
          <div className="purple-bg"></div>
          <img src={centerImg} alt="center" className="center-img" />
           <img src={halo} alt="halo" className="halo" />
      
        </div>

      </div>
    </section>
  );
}
