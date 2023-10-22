import { useState, useEffect } from "react";
import axios from "axios";

interface HttpClientProps {
  onSuccess: (data: any) => {};
  onError: (data: any) => {};
}

const useHttpClient = (props: HttpClientProps) => {
  const [axiosData, setAxiosData] = useState({
    url: "",
    method: "GET",
    body: null,
    headers: null,
  });
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<number | null>(null);

  const sourceToken = axios.CancelToken.source();
  const fetchApi = async () => {
    setLoading(true);
    setData(null);
    setError(null);
    setStatus(null);
    try {
      const data = axiosData?.body ? { data: axiosData?.body } : {};
      const headers = axiosData?.headers ? { headers: axiosData?.headers } : {};
      const response = await axios({
        url: axiosData.url,
        method: axiosData.method ?? "GET",
        cancelToken: sourceToken.token,
        ...data,
        ...headers,
      });
      setLoading(false);
      setStatus(response?.status);
      setData(response?.data);
      if (props.onSuccess) props.onSuccess(response?.data);
    } catch (error) {
      const errorMsg = error as any["message"];
      setLoading(false);
      setError(errorMsg.toString());
      setStatus(error as any["response"]["status"]);
      if (props.onError) props.onError(errorMsg);
    }
  };

  useEffect(() => {
    if (axiosData.url != null) {
      fetchApi();
    }
    // abort the fetch if screen is dead/inactive
    return () => sourceToken.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [axiosData]);

  // return [setPostData, data, error, loading, status];
  return { axios: setAxiosData, data, error, loading, status };
};

export default useAxios;
