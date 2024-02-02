import http from '@apis/http';
import { SERVER_URL } from '@config/index';

const fetchBuildingInfo = async (buildingCode: string) => {
  try {
    const buildingInfo = await http.get(
      `${SERVER_URL}/api/buildingInfo?code=${buildingCode}`,
    );

    return buildingInfo;
  } catch (error) {
    return error;
  }
};

export default fetchBuildingInfo;
