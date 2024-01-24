


const BookingRow = ({ house, index,bookingId, setDeleteBookingId,setDeleteConfirm }) => {
  
  console.log('bookingId',bookingId)
  const { name, city, bedrooms, bathrooms, roomSize, rentPerMonth, picture } = house;

  const showDeleteModal = ()=>{
    setDeleteConfirm(true)
    setDeleteBookingId(bookingId)
  }

  return (
    <tr>
      <th>{index + 1}</th>
      <th>
        <div className="avatar">
          <div className="w-20 rounded">
            <img src={picture} alt="Tailwind-CSS-Avatar-component" />
          </div>
        </div>
      </th>
      <td>{name}</td>
      <td>{city}</td>
      <td>{bedrooms}</td>
      <td>{bathrooms}</td>
      <td>{roomSize}</td>
      <td>{rentPerMonth}</td>
      <td>
        <label
          // onClick={() => setDeleteConfirm(house)}
          onClick={showDeleteModal}
          htmlFor="delete-booking-modal"
          className="btn btn-sm bg-red-300 modal-button"
        >
          Delete
        </label>
      </td>
    </tr>
  );
};

export default BookingRow;
