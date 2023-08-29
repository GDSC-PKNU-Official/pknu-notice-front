export interface ImageInfo {
  src: string;
  link: string;
  title: string;
}

interface CarouselInfo {
  title: string;
  images: ImageInfo[];
}

export const carouselInfo: CarouselInfo = {
  title: '웨일비',
  images: [
    {
      src: 'https://whalebe.pknu.ac.kr/upload/program/2023/08/21/ce5f5595-90b9-4b1d-a432-cde4bf263abd.jpg',
      link: 'https://whalebe.pknu.ac.kr/main/65?action=get&yy=2023&shtm=U0003002&nonsubjcCd=N202308007&nonsubjcCrsCd=C202308002',
      title: '슬기로운 부경생활 에세이 공모전',
    },
    {
      src: 'https://whalebe.pknu.ac.kr/upload/program/2023/05/03/2938c88f-046d-478a-baa8-17598303b87f.png',
      link: 'https://whalebe.pknu.ac.kr/main/65?action=get&yy=2023&shtm=U0003001&nonsubjcCd=N202305004&nonsubjcCrsCd=C202108005',
      title: '맞춤형 진로·취업 상담',
    },
    {
      src: 'https://whalebe.pknu.ac.kr/upload/program/2023/08/22/64f7e85a-1504-4e51-96d2-24275ba82579.png',
      link: 'https://whalebe.pknu.ac.kr/main/65?action=get&yy=2023&shtm=U0003001&nonsubjcCd=N202308022&nonsubjcCrsCd=C201900053',
      title: '산업체현장견학',
    },
    {
      src: 'https://whalebe.pknu.ac.kr/images/front/program_defult_0.png',
      link: 'https://whalebe.pknu.ac.kr/main/65?action=get&yy=2023&shtm=U0003002&nonsubjcCd=N202308028&nonsubjcCrsCd=C202308005',
      title: '메타버스 경진대회',
    },
  ],
};
