import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import Link from 'next/link';
import { summaryBanners } from '@/data/students';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from './SuccessCarousel.module.css';

const SuccessCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    pauseOnHover: true,
    swipeToSlide: true,
    arrows: false,
    adaptiveHeight: false
  };

  return (
    <div className={styles.carouselContainer} aria-label="Toppers and Results Showcase">
      <Slider {...settings}>
        {summaryBanners.map((banner, index) => {
          const content = (
            <div className={styles.aspectBox}>
              <Image
                src={banner.imageUrl}
                alt={banner.altText}
                className={styles.bannerImage}
                priority={index === 0}
                fetchPriority={index === 0 ? "high" : "auto"}
                width={2466}
                height={1215}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 95vw, 1800px"
              />
            </div>
          );

          return (
            <div key={banner.id}>
              {banner.link ? (
                <Link href={banner.link} className={styles.bannerLink} title={banner.altText}>
                  {content}
                </Link>
              ) : (
                content
              )}
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default SuccessCarousel;
