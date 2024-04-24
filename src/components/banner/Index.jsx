import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import image_slider_1 from '/img/doku.png';
import image_slider_2 from '/img/duitku.png';
import image_slider_3 from '/img/images.png';
import image_slider_4 from '/img/xendit.png';
import "../../App.css";

function Banner() {
  return (
    // <Banner />
    <div className="pembungkus" >
      <div className="heading">Coba</div>
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          scale: 1,
          slideShadows: true,
        }}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        <SwiperSlide><img src={image_slider_1} /></SwiperSlide>
        <SwiperSlide><img src={image_slider_2} /></SwiperSlide>
        <SwiperSlide><img src={image_slider_3} /></SwiperSlide>
        <SwiperSlide><img src={image_slider_4} /></SwiperSlide>
        <SwiperSlide><img src={image_slider_1} /></SwiperSlide>
        <SwiperSlide><img src={image_slider_2} /></SwiperSlide>
        <SwiperSlide><img src={image_slider_3} /></SwiperSlide>
        <SwiperSlide><img src={image_slider_4} /></SwiperSlide>
        <div className="slider-controller">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  )
}

export default Banner;
