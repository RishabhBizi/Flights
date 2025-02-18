import { Link } from "react-router-dom";
import { business, economy, plane3 } from "../assets/images";
import { useSelector } from "react-redux";
import {suggestions} from "../data/constant"
import { formatTimeTo12Hour } from "../../utils/formatTimeTo12Hour";
const SeatSelect = () => {
  const flight = useSelector(state=>state?.flightReducer?.flight);
  const passengers = useSelector(state=>state?.passengerReducer?.passenger)
  console.log("selected flight is: ",flight)
  console.log("passenger is: ",passengers)
  const USDateFormatter = (input)=>{
    if(!input) return;
    const date = new Date(input)
    const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' }).format(date);
    return formattedDate;
  }
  
  
  return (
    <>
      <div className="px-4 sm:px-8 w-full h-full flex flex-col lg:flex-row justify-between items-start gap-10 mt-20">
        <div className="relative w-full h-full mx-auto lg:mx-0 sm:w-[400px] sm:h-[850px]">
          <img src={plane3} alt="" className="w-full h-full object-contain" />
        </div>
        <div className="w-full h-full  md:w-[712px] md:h-[850px] bg-white bg-opacity-20 flex flex-col mt-5 gap-10 border-[1px] border-[#f2f0f0] justify-between">
          <div className="w-full h-20 flex justify-between items-center bg-[#27273F]">
            <div className="h-full w-full flex flex-col items-start justify-center px-4">
              <h1 className="text-[#FAFAFA] text-base md:text-xl font-bold">
                {flight?.departureLocation}
              </h1>
              <p className="text-[#E9E8FC] text-xs" style={{fontSize:'10px'}}>{suggestions?.filter(item=>item?.code===flight?.departureLocation)?.at(0)?.name}</p>
            </div>
            <div className="h-full w-full flex flex-col items-start justify-center px-4">
              <h1 className="text-[#FAFAFA] text-base md:text-xl font-bold">
                {flight?.arrivalLocation}
              </h1>
              <p className="text-[#E9E8FC] text-xs" style={{fontSize:'10px'}}>{suggestions?.filter(item=>item?.code===flight?.arrivalLocation)?.at(0)?.name}</p>
            </div>
            <div className="h-full w-full flex flex-col items-start justify-center px-4 hover:bg-[#605DEC] transition-all duration-200">
              <h1 className="text-[#FAFAFA] text-xs sm:text-sm md:text-base font-normal">
                {USDateFormatter(flight?.departureDate)} | {formatTimeTo12Hour(
                                      flight?.flight?.itineraries[0]?.segments[0]?.departure?.at
                                    )}
              </h1>
              <p className="text-[#E9E8FC] text-xs">Departing</p>
            </div>
            <div className="h-full w-full flex flex-col items-start justify-center  px-4 hover:bg-[#605DEC] transition-all duration-200">
              <h1 className="text-[#FAFAFA] text-xs sm:text-sm md:text-base font-normal">
              {USDateFormatter(flight?.departureDate)} | {formatTimeTo12Hour(
                      flight?.flight?.itineraries[0]?.segments[0]?.arrival?.at
                    )}
              </h1>
              <p className="text-[#E9E8FC] text-xs">Arriving</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start gap-5">
            <div className="max-w-[336px] flex flex-col items-start justify-start">
              <img
                src={economy}
                alt=""
                className="w-full h-full object-contain"
              />
              <div className="px-7 mt-5 flex flex-col gap-2">
                <h1 className="text-xl font-semibold text-[#6E7491]">
                  Economy {(flight?.travelClass ==="PREMIUM_ECONOMY" || flight?.travelClass === "ECONOMY") && (
                    <button className="bg-[#5CD6C0] px-1 py-[1px] text-[#FAFAFA] rounded text-sm">
                    Selected
                  </button>
                  )}
                </h1>
                
                <p className="text-[#7C8DB0] text-sm font-normal">
                  Rest and recharge during your flight with extended leg room,
                  personalized service, and a multi-course meal service
                </p>
                <ul className="mt-5 px-3 text-sm flex flex-col gap-4 list-disc text-[#605DEC]">
                  <li className="text-[#6E7491] ">
                    Built-in entertainment system
                  </li>
                  <li className="text-[#6E7491] ">
                    Complimentary snacks and drinks
                  </li>
                  <li className="text-[#6E7491] ">
                    One free carry-on and personal item
                  </li>
                </ul>
              </div>
            </div>
            <div className="max-w-[336px] flex flex-col items-start justify-start">
              <img
                src={business}
                alt=""
                className="w-full h-full object-contain"
              />
              <div className="px-7 mt-5 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-semibold text-[#6E7491]">
                    Business class
                  </h1>
                  {flight?.travelClass ==="BUSINESS" && (
                    <button className="bg-[#5CD6C0] px-1 py-[1px] text-[#FAFAFA] rounded text-sm">
                    Selected
                  </button>
                  )}
                </div>
                <p className="text-[#7C8DB0] text-sm font-normal">
                  Rest and recharge during your flight with extended leg room,
                  personalized service, and a multi-course meal service
                </p>
                <ul className="mt-5 px-3 text-sm flex flex-col gap-4 list-disc">
                  <li className="text-[#5CD6C0]">
                    <span className="text-[#6E7491]">Extended leg room</span>
                  </li>
                  <li className="text-[#5CD6C0]">
                    <span className="text-[#6E7491]">
                      First two checked bags free
                    </span>
                  </li>
                  <li className="text-[#5CD6C0]">
                    <span className="text-[#6E7491]">Priority boarding</span>
                  </li>
                  <li className="text-[#5CD6C0]">
                    <span className="text-[#6E7491]">Personalized service</span>
                  </li>
                  <li className="text-[#5CD6C0]">
                    <span className="text-[#6E7491]">
                      Enhanced food and drink service
                    </span>
                  </li>
                  <li className="text-[#5CD6C0]">
                    <span className="text-[#6E7491]">
                      Seats that recline 40% more than economy
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="w-full h-[93px] border-[1px] border-[#f2f0f0] flex justify-between items-center px-4 gap-3">
            <div className="flex flex-col items-start gap-1">
              <p className="text-[#7C8DB0] text-xs sm:text-sm">Passenger 1</p>
              <h1 className="text-[#6E7491] text-sm sm:text-xl">
                {passengers?.at(passengers?.length-1)?.firstName}
              </h1>
            </div>
            <div className="flex flex-col items-start gap-1">
              <p className="text-[#7C8DB0] text-xs sm:text-sm">Seat number</p>
              <h1 className="text-[#6E7491] text-sm sm:text-xl">{passengers?.at(passengers?.length-1)?.seatNumber}</h1>
            </div>
            <div className="flex flex-row items-center gap-3">
              <button className="hidden sm:block text-[#605DEC] border-[1px] border-[#605DEC] p-2 sm:px-3 sm:py-2 rounded hover:bg-[#605DEC] hover:text-[#FAFAFA] transition-all duration-200 text-xs sm:text-base">
                Save and close
              </button>
              <Link to='/payment'>
              <button className="text-[#FAFAFA] border-[1px] border-[#605DEC] bg-[#605DEC] p-2 sm:px-3 sm:py-2 rounded hover:text-[#605DEC] hover:bg-white transition-all duration-200 text-xs  sm:text-base">
                Payment
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeatSelect;
