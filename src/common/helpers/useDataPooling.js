import { useEffect, useState } from 'react';
import { setLoadingData } from '../../data/reducers/ui';
import { requestReady } from '../../data/helpers';

const useDataPooling = ({ id }) => {
  const [result, setResult] = useState(null);

  // const handleResize = () => {
  //   setSize([window.innerWidth, window.innerHeight]);
  // };

  useEffect(() => {
    const timer = setInterval(async () => {
      const response = await requestReady({
        id
      });
      if (response?.result === 'true') {
        // dispatch(func(response.result));

        setLoadingData(false);
        clearInterval(timer);
        setResult(response);
      }
    },2000);

    return () =>  clearTimeout(timer);
  }, [result]);

  return result;
};

export default useDataPooling;
