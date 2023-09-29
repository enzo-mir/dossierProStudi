import React from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

const queryClient = new QueryClient();

export default function FetchData() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReturnData />
    </QueryClientProvider>
  );
}

const ReturnData = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(
        "https://ipgeolocation.abstractapi.com/v1/?api_key=2087532f159a43438168390ffbd586c5"
      ).then((res) => res.json()),
  });
  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: {error}</span>;
  }
  return (
    <>
      <h1>Adresse IP : {data.ip_address}</h1>
      <div className="info">
        <p>Ville : {data.city}</p>
        <p>Continent : {data.continent}</p>
        <p>Région : {data.region}</p>
        <p>Pays : {data.country}</p>
        <p>Monnaie : {data.currency.currency_code}</p>
      </div>
      <img
        alt="drapeau"
        src={data.flag.svg}
        title={"drapeau de : " + data.country}
      />
    </>
  );
};
