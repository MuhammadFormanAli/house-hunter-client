const HouseCard = ({ house, setAddConfirm }) => {
  const role = "renter";

  const {
    name,
    city,
    address,
    bedrooms,
    bathrooms,
    roomSize,
    rentPerMonth,
    phoneNumber,
    availabilityDate,
    description,
    picture,
  } = house;

  console.log(house);
  return (
    <div className="h-full">
      <div className="card bg-base-300 shadow-xl border">
        <div className="h-60 p-4 box-border">
          <img
            src={picture}
            alt=""
            className="rounded w-full h-full object-cover"
          />
        </div>
        <div className="card-body">
          <h2 className="card-title text-accent font-serif text-2xl ">
            {name}
          </h2>
          <p>
            <span className="font-bold">Address: </span>
            {address} {city}
          </p>
          <p>
            <span className="font-bold">Number of Bedrooms: </span>
            {bedrooms}
          </p>
          <p>
            <span className="font-bold">Number of Bathrooms: </span>
            {bathrooms}
          </p>
          <p>
            <span className="font-bold">Room Size: </span>
            {roomSize}
          </p>
          <p>
            <span className="font-bold">Rent Per Month: </span>
            {rentPerMonth}
          </p>
          <p>
            <span className="font-bold">Phone Number: </span>
            {phoneNumber}
          </p>
          <p>
            <span className="font-bold">Availability Date: </span>
            {availabilityDate}
          </p>
          <p>
            <span className="font-bold">Description: </span>
            {description}
          </p>
          {role === "renter" && (
            <>
              <label
                onClick={() => setAddConfirm(house)}
                htmlFor="add-booking-modal"
                className="btn btn-primary modal-button mt-6"
              >
                Book The House
              </label>
            </>
          )}
          {role === "owner" && (
            <>
              <label disabled className="btn btn-primary modal-button mt-6">
                Book The House
              </label>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HouseCard;
