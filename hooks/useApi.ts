import axios from "axios";
import * as ENDPOINTS from "../utils/Endpoints";

export function useApi() {
  const call = (endpoint: ENDPOINTS.Endpoint, ids?: number[]) => {
    const axiosConfig = {
      url: substitueIdsIntoUrl(endpoint.url, ids),
      method: endpoint.method,
    };

    return axios(Object.fromEntries(Object.entries(axiosConfig).filter(([_, value]) => value != null)));
  };

  const substitueIdsIntoUrl = (url: string, ids?: number[]) => {
    // If #0 is in the url, we reserve it for the api_key
    // THIS IS NOT USUALLY HARD CODED!!!!! (but its only a demo)
    let _url = url;
    if (_url.includes("#0")) _url = _url.replace("#0", "GYBsnhXhUBwTZ0rQFvjJVlI02zCQnxJhgZv0JFYl");

    if (!ids) return _url;

    for (let i = 0; i < ids.length; i++) {
      _url = _url.replace(`#${i + 1}`, ids[i].toString());
    }

    console.log(_url);
    return _url;
  };

  return {
    call,
    endpoints: ENDPOINTS,
  };
}
