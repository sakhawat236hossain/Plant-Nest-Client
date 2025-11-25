import Card from "./Card";
import Container from "../Shared/Container";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";

const Plants = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["plants"],
    queryFn: async () => {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/plants`);
      return result.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      {data && data.length > 0 ? (
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {data.map((Plant) => (
            <Card key={Plant._id} Plant={Plant} />
          ))}
        </div>
      ) : (
        <p className="text-center py-10 text-gray-500">No Plants Found</p>
      )}
    </Container>
  );
};

export default Plants;
