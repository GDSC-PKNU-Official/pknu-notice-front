import http from '@apis/http';
import { SERVER_URL } from '@config/index';

const postSuggestion = async (value: string | undefined) => {
  await http.post(
    `${SERVER_URL}/api/suggestion`,
    {
      content: value,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

export default postSuggestion;
