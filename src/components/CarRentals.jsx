import { useNavigate } from "react-router-dom";
import { right } from "../assets/icons";
import PlacesCardV2 from "../container/PlacesCardV2";
import { maldivs, mongolia, morocco } from "../assets/images";
import toyotaLogo from "../assets/images/bmw.jpg"
import privatePlane from "../assets/images/private-plane.webp"
import bike from "../assets/images/bike.jpg"
import yacht from "../assets/images/yacht.webp"

const CarRentals = () => {

  const navigate = useNavigate()

  const handleSeeAllClick = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    navigate('/hotels')
    
  };
  return (
    <>
      <div className="px-8 flex flex-col gap-7">
        <div className="flex items-center justify-between">
          <p className="text-[#6E7491] font-medium md:font-bold sm:text-base md:text-[24px] md:leading-8">
            Luxurious
            <span className="text-[#54cdb7]">Travel Options</span>
          </p>
          <div className="flex items-start justify-center gap-1 cursor-pointer" onClick={handleSeeAllClick}>
            {/* <p className="text-[#A1B0CC] text-sm md:text-lg">All</p>
            <img src={right} alt="arrow" className="w-5 h-5 md:w-6 md:h-6" /> */}
          </div>
        </div>
        <div className="flex gap-16 flex-wrap items-start ">
          <PlacesCardV2
            image={toyotaLogo}
            title="Car"
            name="Rental"
            desc="Rent a car hassle-free! Choose from economy, luxury, or SUVs for any trip. Affordable rates, flexible bookings, and 24/7 support ensure a smooth journey."
          />
          <PlacesCardV2
            image={privatePlane}
            title="Private"
            name="Plane Rental"
            desc="Experience ultimate luxury and convenience with private flight rentals. Fly on your schedule with privacy, comfort, and top-tier service. Book your exclusive journey today!"
          />
          <PlacesCardV2
            image={bike}
            title="Bike "
            name="Rental"
            desc="Discover the city or countryside with our premium bike rentals. Choose from mountain, road, or electric bikes. Affordable prices, easy booking, and ultimate riding comfort."
          />
          <PlacesCardV2
            image={yacht}
            title="Yacht "
            name="Rental"
            desc="Sail in luxury with our private yacht rentals. Perfect for parties, vacations, or corporate retreats. Enjoy breathtaking views, professional crew, and unmatched relaxation on board."
          />
        </div>
      </div>
    </>
  );
};

export default CarRentals;
