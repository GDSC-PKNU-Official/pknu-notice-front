export interface Room {
  roomNumber: string;
  roomName: string;
}

export type Floor = 'basement' | 'ground' | 'rooftop';

export type TotalFloorInfo = {
  [key in Floor]: {
    [key: string]: Room[];
  };
};

export type FloorInfo = {
  [key: string]: Room[];
};
