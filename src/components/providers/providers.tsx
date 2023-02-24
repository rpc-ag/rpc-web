/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import styles from "./providers.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Providers = () => {
  return (
    <section className={styles.main + " provider-slide"}>
      <div className={styles.logo}>
        <img src="/images/common/rpc-main.png" alt="RPC" />
      </div>

      <div className="container position-relative">
        <div className={styles.lines}></div>
        <Swiper
          className={styles.slider}
          spaceBetween={10}
          slidesPerView={4}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          onInit={(swiper) => {
            document.querySelector(".provider-slide")?.classList.add("active");
          }}
          breakpoints={{
            992: {
              slidesPerView: 6,
            },
            1400: {
              slidesPerView: 8,
            },
          }}
        >
          <SwiperSlide className={styles.item}>
            <img src="/images/providers/ankr.png" />
          </SwiperSlide>
          <SwiperSlide className={styles.item}>
            <img src="/images/providers/quickNode.png" />
          </SwiperSlide>
          <SwiperSlide className={styles.item}>
            <img src="/images/providers/pokt.png" />
          </SwiperSlide>
          <SwiperSlide className={styles.item}>
            <img src="/images/providers/nodereal.png" />
          </SwiperSlide>
          <SwiperSlide className={styles.item}>
            <img src="/images/providers/onfinality.png" />
          </SwiperSlide>
          <SwiperSlide className={styles.item}>
            <img src="/images/providers/infura.png" width={100} />
          </SwiperSlide>
          <SwiperSlide className={styles.item}>
            <img src="/images/providers/chainstack.png" width={110} />
          </SwiperSlide>
          <SwiperSlide className={styles.item}>
            <img src="/images/providers/blast.png" width={100} />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Providers;
