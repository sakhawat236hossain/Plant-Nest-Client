import { Link } from "react-router";

const Card = ({ Plant }) => {
  return (
    <Link
      to={`/plant/${Plant._id}`}
      className="col-span-1 cursor-pointer group shadow-xl p-3 rounded-xl"
    >
      <div className="flex flex-col gap-2 w-full">
        {/* Image */}
        <div
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          <img
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={Plant.image}
            alt={Plant.name}
          />
        </div>

        {/* Plant Name */}
        <div className="font-semibold text-lg">{Plant.name}</div>

        {/* Category */}
        <div className="font-semibold text-lg">
          Category: {Plant.category}
        </div>

        {/* Quantity */}
        <div className="font-semibold text-lg">
          Quantity: {Plant.quantity}
        </div>

        {/* Price */}
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">Price: {Plant.price}৳</div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
