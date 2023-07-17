const handleFetch = async (url: string, method = "GET", body = {}, headers = {}) => {
  const reqHeaders = { ...headers, "Content-Type": "application/json" };
  const reqBody = method === "GET" || method === "DELETE" ? undefined : JSON.stringify(body);

  const response = await fetch(url, { method, headers: reqHeaders, body: reqBody });
 
  const data = await response.json();
  return data;
};

export { handleFetch };

export type Fetch = typeof handleFetch;
