import * as React from 'react';
import { $fetch } from 'ohmyfetch';

const useFetch = (url, { params = {} }) => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState(undefined);
  const [error, setError] = React.useState(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await $fetch(url, {
      params,
    });

    setError(res.error);
    setData(res.data);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    error,
    loading,
    refetch: fetchData,
  };
};

export default useFetch;
