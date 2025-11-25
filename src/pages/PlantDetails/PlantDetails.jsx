import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import Button from "../../components/Shared/Button/Button";
import PurchaseModal from "../../components/Modal/PurchaseModal";
import { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const PlantDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();

  // Fetch plant data
  const { data: plantData, isLoading } = useQuery({
    queryKey: ["plant", id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/plants/${id}`);
      return res.data; // <-- important: return data, not full response
    },
  });

  const closeModal = () => setIsOpen(false);

  if (isLoading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  // Destructure plant data
  const plant = plantData || {};
  const { name, category, description, quantity, price, image, seller } = plant;

  return (
    <Container>
      <div className="mx-auto flex flex-col lg:flex-row justify-between w-full gap-12">
        {/* Plant Image */}
        <div className="flex-1">
          <div className="w-full overflow-hidden rounded-xl">
            <img
              className="object-cover w-full"
              referrerPolicy="no-referrer"
              src={image}
              alt={name}
            />
          </div>
        </div>

        {/* Plant Info */}
        <div className="flex-1 flex flex-col gap-6">
          <Heading
            title={name}
            subtitle={`Category: ${category}`}
          />
          <hr className="my-6" />

          <p className="text-lg font-light text-neutral-500">{description}</p>
          <hr className="my-6" />

          <div className="flex items-center gap-3 text-lg">
            <p className="font-semibold">Seller: {seller?.name}</p>
            {seller?.image && (
              <img
                className="rounded-full"
                width={30}
                height={30}
                src={seller.image}
                alt={seller.name}
                referrerPolicy="no-referrer"
              />
            )}
          </div>
          <hr className="my-6" />

          <p className="text-lg font-light text-neutral-500">
            Quantity: {quantity} Units Left Only!
          </p>
          <hr className="my-6" />

          <div className="flex justify-between items-center">
            <p className="font-bold text-3xl text-gray-500">Price: {price}৳</p>
            <Button onClick={() => setIsOpen(true)} label="Purchase" />
          </div>

          <PurchaseModal plant={plant} closeModal={closeModal} isOpen={isOpen} />
        </div>
      </div>
    </Container>
  );
};

export default PlantDetails;
