/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { FaGooglePlay } from "react-icons/fa";
import styles from "./EarlyBirdPopup.module.css";

const STORAGE_KEY_CLOSED = "diwalisale_closed";
const CTA_URL = "https://maarulaclasses.classx.co.in/new-courses";
const APP_URL = "https://play.google.com/store/apps/details?id=com.maarula.classes";

export default function EarlyBirdPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasClosed = sessionStorage.getItem(STORAGE_KEY_CLOSED);
    if (!hasClosed) {
      const t = setTimeout(() => setIsOpen(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, mounted]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY_CLOSED, "true");
    } catch {}
  }, []);

  const handleOverlayClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) handleClose();
    },
    [handleClose]
  );

  if (!mounted || !isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Diwali Mega Sale Popup"
    >
      <div className={styles.modal}>
        {/* Close Button */}
        <button
          className={styles.closeBtn}
          onClick={handleClose}
          aria-label="Close popup"
        >
          ✕
        </button>

        {/* Banner Image linked to courses */}
        <div className={styles.imageWrapper}>
          <a
            href={CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
            className={styles.imageLink}
            title="Explore Maarula Classes Diwali Sale"
          >
            <Image
              src="/images/diwali sale.webp"
              alt="Maarula Classes Diwali Sale - Discounts on All MCA Exam Batches & Test Series"
              width={1280}
              height={720}
              className={styles.heroImage}
              loading="lazy"
            />
          </a>
        </div>

        {/* Content below image */}
        <div className={styles.content}>
          <div className={styles.saleHeader}>
            <h3 className={styles.saleTitle}>🪔 Diwali Mega Sale is LIVE!</h3>
            <p className={styles.saleDescription}>
              Huge festive discounts across <strong>All MCA Entrance Batches &amp; Test Series</strong> — NIMCET, CUET-PG, IGDTUW, Jamia, MAH-CET &amp; more.
            </p>
          </div>

          {/* Action Buttons */}
          <div className={styles.buttonGroup}>
            <a
              href={CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaButton}
              onClick={handleClose}
            >
              <span>Explore Batches &amp; Test Series</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>

            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.appButton}
              onClick={handleClose}
            >
              <FaGooglePlay size={18} />
              <span>Download Maarula Mathem App</span>
            </a>
          </div>

          {/* Offer note */}
          <p className={styles.offerNote}>
            ⏳ Limited period festive offer. Valid for new admissions.
          </p>
        </div>
      </div>
    </div>
  );
}
