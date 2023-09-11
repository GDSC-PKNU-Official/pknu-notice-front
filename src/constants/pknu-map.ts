import { BuildingType, Location, PKNUBuilding } from '@type/map';
import { CSSProperties } from 'react';

type PKNUBuildings = {
  [key in BuildingType]: {
    activeColor: CSSProperties['color'];
    buildings: PKNUBuilding[];
  };
};

export const PKNU_BUILDINGS: PKNUBuildings = {
  A: {
    activeColor: '#FF6F91',

    buildings: [
      {
        buildingNumber: 'A11',
        buildingName: '대학본부',
        latlng: [35.134009202001316, 129.10309425666023],
      },
      {
        buildingNumber: 'A12',
        buildingName: '웅비관',
        latlng: [35.13448507894045, 129.10319425736515],
      },
      {
        buildingNumber: 'A13',
        buildingName: '누리관',
        latlng: [35.13477742833195, 129.10309482297396],
      },
      {
        buildingNumber: 'A15',
        buildingName: '워커하우스',
        latlng: [35.13541800394449, 129.10382983225276],
      },
      {
        buildingNumber: 'A15',
        buildingName: '향파관',
        latlng: [35.135348948698365, 129.10287641587055],
      },
      {
        buildingNumber: 'A21',
        buildingName: '미래관',
        latlng: [35.133959884079516, 129.10217153151783],
      },
      {
        buildingNumber: 'A22',
        buildingName: '디자인관',
        latlng: [35.13425800209641, 129.10147987520727],
      },
      {
        buildingNumber: 'A23',
        buildingName: '나래관',
        latlng: [35.13486547457253, 129.10178619206036],
      },
      {
        buildingNumber: 'A26',
        buildingName: '부산창업카페 2호점',
        latlng: [35.135198384658516, 129.10116672530137],
      },
    ],
  },
  B: {
    activeColor: '#FF9671',
    buildings: [
      {
        buildingNumber: 'B11',
        buildingName: '위드센터',
        latlng: [35.133987101586925, 129.10566334469846],
      },

      {
        buildingNumber: 'B12',
        buildingName: '나비센터',
        latlng: [35.13405879317518, 129.10633434445595],
      },
      {
        buildingNumber: 'B13',
        buildingName: '충무관',
        latlng: [35.13503097184985, 129.1052294985021],
      },
      {
        buildingNumber: 'B14',
        buildingName: '환경해양관',
        latlng: [35.135040804141354, 129.10634867710766],
      },
      {
        buildingNumber: 'B15',
        buildingName: '자연과학1관',
        latlng: [35.13555903353968, 129.10543781395603],
      },
      {
        buildingNumber: 'B16',
        buildingName: '수위실(후문)',
        latlng: [35.13625012336413, 129.1065059931721],
      },
      {
        buildingNumber: 'B21',
        buildingName: '가온관',
        latlng: [35.13401856418254, 129.1050196840027],
      },
      {
        buildingNumber: 'B22',
        buildingName: '청운관',
        latlng: [35.134428237691154, 129.10478067047796],
      },
    ],
  },
  C: {
    activeColor: '#81C26E',
    buildings: [
      {
        buildingNumber: 'C11',
        buildingName: '수산질병관리원',
        latlng: [35.13377917592698, 129.10868013710467],
      },
      {
        buildingNumber: 'C12',
        buildingName: '장영실관',
        latlng: [35.13481165172098, 129.1089014835836],
      },
      {
        buildingNumber: 'C13',
        buildingName: '해양공동연구관',
        latlng: [35.13545371419755, 129.10877269623805],
      },
      {
        buildingNumber: 'C14',
        buildingName: '부경대학교 어린이집',
        latlng: [35.13488945181894, 129.10947940662655],
      },
      {
        buildingNumber: 'C21',
        buildingName: '수산과학관',
        latlng: [35.133540074964145, 129.10779091303866],
      },
      {
        buildingNumber: 'C22',
        buildingName: '건축관',
        latlng: [35.134692788637274, 129.10770545102733],
      },
      {
        buildingNumber: 'C23',
        buildingName: '호연관',
        latlng: [35.135246989425255, 129.10770602771154],
      },
      {
        buildingNumber: 'C24',
        buildingName: '자연과학2관',
        latlng: [35.13567570498883, 129.10766771682054],
      },
      {
        buildingNumber: 'C25',
        buildingName: '인문사회경영관',
        latlng: [35.13422315762162, 129.1077646460986],
      },

      {
        buildingNumber: 'C26',
        buildingName: '해양수산LMO격리사육동',
        latlng: [35.1330329, 129.1073065],
      },
      {
        buildingNumber: 'C27',
        buildingName: '수조실험동',
        latlng: [35.133012828243714, 129.1075359886025],
      },
      {
        buildingNumber: 'C28',
        buildingName: '아름관',
        latlng: [35.13303461466008, 129.1079671063524],
      },
    ],
  },
  D: {
    activeColor: '#FFC75F',
    buildings: [
      {
        buildingNumber: 'D12',
        buildingName: '테니스장',
        latlng: [35.13187281113036, 129.1065028981342],
      },
      {
        buildingNumber: 'D13',
        buildingName: '대운동장',
        latlng: [35.1326944387007, 129.1062827382093],
      },
      {
        buildingNumber: 'D14',
        buildingName: '한울관',
        latlng: [35.13233118040464, 129.1069617150524],
      },
      {
        buildingNumber: 'D21',
        buildingName: '대학극장',
        latlng: [35.13237660740733, 129.10499660318473],
      },
      {
        buildingNumber: 'D22',
        buildingName: '체육관',
        latlng: [35.133109374732555, 129.10496336478204],
      },
      {
        buildingNumber: 'D23',
        buildingName: '안전관리관',
        latlng: [35.132382375868424, 129.1051832332297],
      },
      {
        buildingNumber: 'D24',
        buildingName: '수상레저관',
        latlng: [35.13266402562087, 129.10492173196255],
      },
    ],
  },
  E: {
    activeColor: '#D65DB1',
    buildings: [
      {
        buildingNumber: 'E11',
        buildingName: '세종1관',
        latlng: [35.1312221, 129.1049895],
      },
      {
        buildingNumber: 'E12',
        buildingName: '세종2관',
        latlng: [35.13121085834351, 129.10414663049266],
      },
      {
        buildingNumber: 'E13',
        buildingName: '공학1관',
        latlng: [35.13164265713184, 129.1034118237889],
      },
      {
        buildingNumber: 'E14',
        buildingName: '학술정보관',
        latlng: [35.13265930161191, 129.10376706621912],
      },
      {
        buildingNumber: 'E21',
        buildingName: '공학2관',
        latlng: [35.13161038816922, 129.1028049341183],
      },
      {
        buildingNumber: 'E22',
        buildingName: '동원 장보고관',
        latlng: [35.13317876403389, 129.10291383413244],
      },
      {
        buildingNumber: 'E29',
        buildingName: '양어장관리사',
        latlng: [35.1330880354213, 129.10152110317765],
      },
    ],
  },
};

export const PKNU_MAP_LIMIT = {
  LEVEL: 4,
  TOP: 35.14126547655272,
  RIGHT: 129.11383219075216,
  BOTTOM: 35.12545545221074,
  LEFT: 129.09694451219139,
} as const;

export const PKNU_MAP_CENTER: Location = {
  LAT: 35.132990223842,
  LNG: 129.1052030382,
} as const;

export const NO_PROVIDE_LOCATION: Location = {
  LAT: -1,
  LNG: -1,
} as const;

export const PKNU_MAP_CENTER_LOCATION = new window.kakao.maps.LatLng(
  PKNU_MAP_CENTER.LAT,
  PKNU_MAP_CENTER.LNG,
);
