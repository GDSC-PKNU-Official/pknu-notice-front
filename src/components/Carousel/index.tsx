import { ImageInfo } from '@constants/carouselInfo';
import styled from '@emotion/styled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface CarouselProps {
  images: ImageInfo[];
}

const Carousel = ({ images }: CarouselProps) => {
  const settings = {
    dots: true,
    slidesToShow: 1,
    infinite: true,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <CarouselContainer>
      <Slider {...settings}>
        {images.map((image) => (
          <div
            key={image.src}
            onClick={() =>
              window.open('https://whalebe.pknu.ac.kr/main', '_blank')
            }
          >
            <SliderWrapper>
              <img src={image.src} width="100%" height={200} />
            </SliderWrapper>
            {image.title}
          </div>
        ))}
      </Slider>
    </CarouselContainer>
  );
};

export default Carousel;

const CarouselContainer = styled.div`
  padding: 1rem 0 1rem;
  width: 100%;
  margin: 0 auto;
  &: hover {
    cursor: pointer;
  }
`;

const SliderWrapper = styled.div`
  overflow: hidden;
  padding-bottom: 10px;
`;
