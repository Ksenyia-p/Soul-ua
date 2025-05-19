import React from "react";
import styles from "./VideoBanner.module.css";

const VideoBanner = ({ videoSrc, posterSrc }) => {
  return (
    <div className={styles.videoContainer}>
      <video
        className={styles.video}
        src={videoSrc}
        poster={posterSrc}
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  );
};

export default VideoBanner;
