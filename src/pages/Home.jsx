

import { useState } from "react";
import HouseCard from "../components/HouseCard";
import AddBookingModal from "../components/AddBookingModal";
import { useQuery } from "react-query";
import axios from "axios";

const Home = () => {
  const [addConfirm, setAddConfirm] = useState(null);

const { data: houses = [], loading } = useQuery({
  queryKey: ['popular'],
  queryFn: async () => {
      const res = await axios(`https://house-hunter-server-wheat.vercel.app/houses`)
      return res.data;
  }
})

if(loading){
  return <div className="h-[500px] bg-red-800">loading...</div>
}

  return (
    <div className=" bg-white ">
      <div className=" py-20 px-2 md:p-6 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 max-w-[1350px]  mx-auto ">
        {houses?.map((house) => (
          <HouseCard
            key={house._id}
            house={house}
            addConfirm={addConfirm}
            setAddConfirm={setAddConfirm}
          ></HouseCard>
        ))}
      </div>
      {addConfirm && (
        <AddBookingModal
          addConfirm={addConfirm}
          setAddConfirm={setAddConfirm}
        ></AddBookingModal>
      )}
    </div>
  );
};

export default Home;
