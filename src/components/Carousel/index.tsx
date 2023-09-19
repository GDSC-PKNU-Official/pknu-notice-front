import http from '@apis/http';
import { SERVER_URL } from '@config/index';
import styled from '@emotion/styled';
import { THEME } from '@styles/ThemeProvider/theme';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface WhalebeData {
  title: string;
  date: string;
  imgUrl: string;
}

const Carousel = () => {
  const [carouselData, setCarouselData] = useState<WhalebeData[]>();

  const fetchData = async () => {
    const res = await http.get<WhalebeData[]>(
      `${SERVER_URL}/api/announcement/whalebe`,
    );
    setCarouselData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        {carouselData &&
          carouselData.map((data) => (
            <div
              key={data.title}
              onClick={() =>
                window.open('https://whalebe.pknu.ac.kr/main', '_blank')
              }
            >
              <SliderWrapper>
                <img src={data.imgUrl} width="100%" height={200} />
              </SliderWrapper>
              <Title>{data.title}</Title>
              <Date>모집기간: ~{data.date}</Date>
              <Button>자세히보기</Button>
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

const Title = styled.div`
  font-weight: bold;
`;

const Date = styled.div`
  color: ${THEME.TEXT.GRAY};
  margin-top: 2rem;
`;

const Button = styled.button`
  border: 1px solid ${THEME.PRIMARY};
  color: ${THEME.PRIMARY};
  background: none;
  width: 100%;
  height: 3rem;
  border-radius: 0.5rem;
  margin-top: 1rem;

  &: hover {
    cursor: pointer;
  }
`;
