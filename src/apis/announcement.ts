import { SERVER_URL } from '@config/index';
import { AnnounceItem } from '@type/announcement';
import Major from '@type/major';

export const getAnnounceList = async (
  major: Major,
): Promise<AnnounceItem[] | null> => {
  const fetchResult = await fetch(`${SERVER_URL}/announcement?major=${major}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!fetchResult) return null;

  return await fetchResult.json();
};
