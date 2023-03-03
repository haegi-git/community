// import Swiper core and required modules
import { Navigation, Pagination, A11y, Autoplay } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import styled from "styled-components";

const Slide = () => {
  return (
    <SlideWrap>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        loop={true}
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <div>
            <h4>공지사항</h4>
            <p>
              포트폴리오 페이지입니다. <br />
              부족하고 버그가있을 수 있습니다.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <h4>공지사항</h4>
            <p>버그가 있을 경우 알려주세요.</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </SlideWrap>
  );
};
export default Slide;

const SlideWrap = styled.div`
  width: 100%;
  height: 150px;
  margin-top: 10px;
  margin-bottom: 30px;
  padding: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  & > .swiper {
    width: 100%;
    height: 100%;
  }
  & > div {
    text-align: center;
  }
  & h4 {
    margin-bottom: 15px;
  }
  & .swiper-pagination-bullet {
    background-color: black;
  }
  @media screen and (min-width: 1024px) {
    margin-top: 40px;
  }
`;
