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
        latlng: [35.13397705691482, 129.10312908129794],
      },
      {
        buildingNumber: 'A12',
        buildingName: '웅비관',
        latlng: [35.13444674928486, 129.1031985811075],
      },
      {
        buildingNumber: 'A13',
        buildingName: '누리관',
        latlng: [35.134732247837064, 129.10310188800958],
      },
      {
        buildingNumber: 'A15',
        buildingName: '향파관',
        latlng: [35.135256431017474, 129.10288500581757],
      },
      {
        buildingNumber: 'A21',
        buildingName: '미래관',
        latlng: [35.13393257601037, 129.10218728388455],
      },
      {
        buildingNumber: 'A22',
        buildingName: '디자인관',
        latlng: [35.134206208658554, 129.10147854379952],
      },
      {
        buildingNumber: 'A23',
        buildingName: '나래관',
        latlng: [35.134827192477715, 129.10178520781048],
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
        latlng: [35.13400446186596, 129.10583108004366],
      },
      {
        buildingNumber: 'B12',
        buildingName: '나비센터',
        latlng: [35.134004748015656, 129.1063348228572],
      },
      {
        buildingNumber: 'B13',
        buildingName: '충무관',
        latlng: [35.13498344411026, 129.10524198684462],
      },
      {
        buildingNumber: 'B14',
        buildingName: '환경해양관',
        latlng: [35.13498225522856, 129.10634867710766],
      },
      {
        buildingNumber: 'B15',
        buildingName: '자연과학1관',
        latlng: [35.13550268883498, 129.10543781395603],
      },
      {
        buildingNumber: 'B21',
        buildingName: '가온관',
        latlng: [35.1339439662216, 129.10503421773143],
      },
      {
        buildingNumber: 'B22',
        buildingName: '청운관',
        latlng: [35.13436049066275, 129.10478989598502],
      },
    ],
  },
  C: {
    activeColor: '#81C26E',
    buildings: [
      {
        buildingNumber: 'C11',
        buildingName: '수산질병관리원',
        latlng: [35.13369791744112, 129.10868013710467],
      },
      {
        buildingNumber: 'C12',
        buildingName: '장영실관',
        latlng: [35.13473949619139, 129.1089014835836],
      },
      {
        buildingNumber: 'C13',
        buildingName: '해양공동연구관',
        latlng: [35.135455506575745, 129.10905796000708],
      },
      {
        buildingNumber: 'C14',
        buildingName: '부경대학교 어린이집',
        latlng: [35.134968609898955, 129.1095911476619],
      },
      {
        buildingNumber: 'C21',
        buildingName: '수산과학관',
        latlng: [35.133483825666744, 129.10779091303866],
      },
      {
        buildingNumber: 'C22',
        buildingName: '건축관',
        latlng: [35.13461392516209, 129.10770616016015],
      },
      {
        buildingNumber: 'C23',
        buildingName: '호연관',
        latlng: [35.13516362219819, 129.10770602771154],
      },
      {
        buildingNumber: 'C24',
        buildingName: '자연과학2관',
        latlng: [35.13561514272967, 129.10766771682054],
      },
      {
        buildingNumber: 'C25',
        buildingName: '인문사회경영관',
        latlng: [35.134130687473196, 129.1077646460986],
      },
      {
        buildingNumber: 'C27',
        buildingName: '수조실험동',
        latlng: [35.13302052706407, 129.10735244658267],
      },
      {
        buildingNumber: 'C28',
        buildingName: '아름관',
        latlng: [35.13297601808968, 129.1079671063524],
      },
    ],
  },
  D: {
    activeColor: '#FFC75F',
    buildings: [
      {
        buildingNumber: 'D12',
        buildingName: '테니스장',
        latlng: [35.13190780493772, 129.10618953917788],
      },
      {
        buildingNumber: 'D13',
        buildingName: '대운동장',
        latlng: [35.132864569032215, 129.10621774816596],
      },
      {
        buildingNumber: 'D14',
        buildingName: '한울관',
        latlng: [35.132256439236, 129.1069844702002],
      },
      {
        buildingNumber: 'D15',
        buildingName: '창의관',
        latlng: [35.132942918173015, 129.1068924664527],
      },
      {
        buildingNumber: 'D21',
        buildingName: '대학극장',
        latlng: [35.132302199965665, 129.10500017213562],
      },
      {
        buildingNumber: 'D22',
        buildingName: '체육관',
        latlng: [35.13316402584487, 129.1048002278217],
      },
      {
        buildingNumber: 'D23',
        buildingName: '안전관리관',
        latlng: [35.13230801606284, 129.1051832332297],
      },
      {
        buildingNumber: 'D24',
        buildingName: '수상레저관',
        latlng: [35.13273884835734, 129.10476459993706],
      },
    ],
  },
  E: {
    activeColor: '#D65DB1',
    buildings: [
      {
        buildingNumber: 'E11',
        buildingName: '세종1관',
        latlng: [35.13111642272434, 129.1050436853718],
      },
      {
        buildingNumber: 'E12',
        buildingName: '세종2관',
        latlng: [35.13112044963247, 129.10414663049266],
      },
      {
        buildingNumber: 'E13',
        buildingName: '공학1관',
        latlng: [35.13166260843009, 129.103170430803],
      },
      {
        buildingNumber: 'E14',
        buildingName: '학술정보관',
        latlng: [35.13251893742042, 129.10393622427503],
      },
      {
        buildingNumber: 'E21',
        buildingName: '공학2관',
        latlng: [35.13158970912741, 129.10256856014524],
      },
      {
        buildingNumber: 'E22',
        buildingName: '장보고관',
        latlng: [35.133090750102795, 129.10291383413244],
      },
      {
        buildingNumber: 'E29',
        buildingName: '양어장관리사',
        latlng: [35.13301817930939, 129.10152110317765],
      },
    ],
  },
};

export const PKNU_MAP_LIMIT = {
  LEVEL: 4,
  TOP: 35.13721948060767,
  RIGHT: 129.11007126926492,
  BOTTOM: 35.130069837592465,
  LEFT: 129.1011933930719,
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

export type DIRECTION = 'TOP' | 'RIGHT' | 'BOTTOM' | 'LEFT';

type ResetCoordinates = {
  [key in DIRECTION]: {
    lat: number;
    lng: number;
  };
};

export const RESET_COORDINATES: ResetCoordinates = {
  TOP: {
    lat: 35.13705148213289,
    lng: 129.10524862449614,
  },
  RIGHT: {
    lat: 35.134931648840876,
    lng: 129.11003172959985,
  },
  BOTTOM: {
    lat: 35.130615149123834,
    lng: 129.1053680842128,
  },
  LEFT: {
    lat: 35.13335600658278,
    lng: 129.10113856930465,
  },
};
