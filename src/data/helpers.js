import axios from 'axios';
import { SERVER_API_URL } from '../common/constants/config';

// eslint-disable-next-line import/prefer-default-export
export const request = async props => {
  try {
    const response = await axios({
      method: 'post',
      url: `${SERVER_API_URL}request?`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      withCredentials: true,
      data: `function=${
        props.func
      }&format=JSON&extraParam=&params=${JSON.stringify(props.params)}`
    });
    return response.data;
  } catch (e) {
    console.log('We have the error', e);
  }

  return null;
};
