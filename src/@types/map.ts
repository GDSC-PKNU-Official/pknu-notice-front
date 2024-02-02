export type BuildingType = 'A' | 'B' | 'C' | 'D' | 'E';

export interface PKNUBuilding {
  readonly buildingCode: string;
  readonly buildingNumber: string;
  readonly buildingName: string;
  readonly latlng: [number, number];
}

export interface Location {
  LAT: number;
  LNG: number;
}
