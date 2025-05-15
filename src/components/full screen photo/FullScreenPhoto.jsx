import React, { useEffect, useState, useCallback } from "react";
import styles from "./FullScreenPhoto.module.css";
import Arrow from "../../icons/arrow.svg";
import Cross from "../../icons/cross.svg";

const FullScreenPhoto = ({ images, startIndex, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(startIndex);

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const handlePrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === "ArrowRight") handleNext();
        else if (e.key === "ArrowLeft") handlePrev();
        else if (e.key === "Escape") onClose();
    }, [handleNext, handlePrev, onClose]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div className={styles.overlay} onClick={onClose}>
            {/* Close button */}
            <button
                className={styles.closeButton}
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
                aria-label="Close full screen"
            >
                <img src={Cross} alt="Close" className={styles.icon} />
            </button>

            <button
                className={`${styles.arrow} ${styles.left}`}
                onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                }}
                aria-label="Previous image"
            >
                <img src={Arrow} alt="Prev" className={`${styles.icon} ${styles.leftIcon}`} />
            </button>

            <img
                src={images[currentIndex]}
                alt={`Full Screen ${currentIndex + 1}`}
                className={styles.image}
                onClick={(e) => e.stopPropagation()}
            />

            <button
                className={`${styles.arrow} ${styles.right}`}
                onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                }}
                aria-label="Next image"
            >
                <img src={Arrow} alt="Next" className={`${styles.icon} ${styles.rightIcon}`} />
            </button>
        </div>
    );
};

export default FullScreenPhoto;
