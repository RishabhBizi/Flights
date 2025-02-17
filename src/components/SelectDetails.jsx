import { departure, arrival, calendar, person } from "../assets/icons";

import { Calendar } from "react-date-range";
import { useSearchParams,Link } from "react-router-dom";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { formatUTCDate } from "../../utils/dateFormatter";
import { format } from "date-fns";
import { useState } from "react";

const SelectDetails = () => {
  const [searchParams] = useSearchParams();
  const [openDate, setOpenDate] = useState(false);
  const originLocationCode = searchParams.get("originLocationCode");
  const adults = searchParams.get("adults");
  const children = searchParams.get("children");
  const destinationLocationCode = searchParams.get("destinationLocationCode");
  const departureDate = searchParams.get("departureDate");
  const [departureLocation, setDepartureLocation] =
    useState(originLocationCode);
  const [destinationLocation, setDestinationLocation] = useState(
    destinationLocationCode
  );
  const [departureDateState, setDepartureDateState] = useState(departureDate);
  const [noOfAdults, setNoOfAdults] = useState(adults);
  const [noOfMinors,setNoOfMinors]=useState(children);
  const [date, setDate] = useState([new Date(departureDate)]);
  console.log("date is: ",date)
  const [isNonStop,setIsNonStop]=useState(true);
  const [travelClass,setTravelClass]=useState("ECONOMY")

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    minor: 0,
  });
  const handleTravelClass = (value)=>{
    setTravelClass(value);
  }

  const handleOptions = (name, oparetion) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: oparetion === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const handleTravellersIncrement = (setState)=>{
    setState((prev)=>prev+1)
  }
  const handleTravellersDecrement = (setState)=>{
    setState(prev=>{
      if (prev -1 >=0){
        return prev-1;
      }
      return 0;
    })
  }

  return (
    <>
      <div className="w-full">
        <div className="lg:w-[872px] w-full flex flex-col gap-10">
          <div className="flex w-full h-12 lg:flex-row items-center flex-col lg:shadowCard  relative ">
            <div className="flex w-full lg:w-[173.92px] h-full justify-start items-center border-[1px] border-[#CBD4E6] p-2 rounded-t-[4px] lg:rounded-l-[4px]">
              <img src={departure} alt="departure" />
              <input
                type="text"
                placeholder={departureLocation}
                onChange={(e)=>setDepartureLocation(e.target.value)}
                className="outline-none border-none ml-2 placeholder:text-[#7C8DB0] placeholder:text-sm placeholder:leading-6"
              />
            </div>

            <div className="flex w-full lg:w-[173.92px] h-full justify-start items-center border-[1px] border-[#CBD4E6] p-2">
              <img src={arrival} alt="departure" />
              <input
                type="text"
                onChange={(e)=>setDestinationLocation(e.target.value)}
                placeholder={destinationLocation}
                className="outline-none border-none ml-2 placeholder:text-[#7C8DB0] placeholder:text-sm placeholder:leading-6"
              />
            </div>

            <div className="flex w-full  h-full justify-start items-center border-[1px] border-[#CBD4E6] p-2">
              <img src={calendar} alt="calendar" />
              <span
                className="text-[#7C8DB0] text-sm leading-6 ml-2 cursor-pointer"
                onClick={() => setOpenDate(!openDate)}
              >
                {departureDate}
              </span>
              {openDate && (
                <Calendar
                  editableDateInputs={true}
                  onChange={(item) => {
                    console.log("item: ", item);
                    const localFormattedDate = formatUTCDate(item);
                    setDepartureDateState(localFormattedDate);
                    const returnDate = formatUTCDate(item);
                    // setReturnDate(returnDate);
                    setDate([item]);
                  }}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                  
                  className="absolute top-64 lg:top-20 z-10 "
                />
              )}
            </div>

            <div className="flex w-full h-full justify-start items-center border-[1px] border-[#CBD4E6]  p-2">
              <img src={person} alt="person" />
              <span
                className="text-[#7C8DB0] text-sm leading-6 ml-2 cursor-pointer"
                onClick={() => setOpenOptions(!openOptions)}
              >
                {`${noOfAdults} Adult - ${noOfMinors} Minor `}
              </span>
              {openOptions && (
                <div className="w-52 h-fit flex flex-col gap-4 rounded-md bg-white shadowCard absolute lg:top-[70px] top-64 p-4 z-10">
                  <div className="flex justify-between items-center">
                    <span className="text-[#7C8DB0] text-base leading-6">
                      Adults:
                    </span>
                    <div className="flex items-center gap-4">
                      <button
                        className="border-2 border-[#605DEC] px-2 text-[#7C8DB0] disabled:cursor-not-allowed"
                        onClick={() => handleTravellersDecrement(setNoOfAdults)}
                        disabled={noOfAdults=== 1}
                      >
                        -
                      </button>
                      <span className="text-[#7C8DB0]">{noOfAdults}</span>
                      <button
                        className="border-2 border-[#605DEC] px-2 text-[#7C8DB0]"
                        onClick={() => handleTravellersIncrement(setNoOfAdults)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#7C8DB0] text-base leading-6">
                      Minors:
                    </span>
                    <div className="flex items-center gap-4">
                      <button
                        className="border-2 border-[#605DEC] px-2 text-[#7C8DB0] disabled:cursor-not-allowed"
                        onClick={() => handleTravellersDecrement(setNoOfMinors)}
                        disabled={noOfMinors=== 0}
                      >
                        -
                      </button>
                      <span className="text-[#7C8DB0]">{noOfMinors}</span>
                      <button
                        className="border-2 border-[#605DEC] px-2 text-[#7C8DB0]"
                        onClick={() => handleTravellersIncrement(setNoOfMinors)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="w-full lg:w-[96px] ">
              <Link to={`/explore?originLocationCode=${departureLocation}&destinationLocationCode=${destinationLocation}&departureDate=${departureDateState}&adults=${noOfAdults}&children=${noOfMinors}&nonStop=${isNonStop}&travelClass=${travelClass}&max=10`} className="w-full ">
              <button className="w-full bg-[#605DEC] text-[#FAFAFA] text-lg leading-6 h-[48px] px-5   rounded-b-[4px] lg:rounded-r-[4px]">
                Search
              </button>
              </Link>
            </div>
          </div>

          {/* Select section */}

          <div className="flex flex-wrap items-center  justify-start gap-3 mt-48 lg:mt-1 ">
            {/* <select
              name="price"
              id="max-price"
              className="border-[1px] border-[#CBD4E6] bg-white text-[#27273F] p-1 cursor-pointer"
            >
              <option value="max-price" className="">
                Max price
              </option>
              <option value="$100-300">$100-300</option>
              <option value="$300-600">$300-600</option>
              <option value="$600-1000">$600-1000</option>
            </select>
            <select
              name="shops"
              id="shops"
              className="border-[1px] border-[#CBD4E6] bg-white text-[#27273F] p-1 cursor-pointer"
            >
              <option value="shops" className="">
                Shops
              </option>
            </select>
            <select
              name="times"
              id="times"
              className="border-[1px] border-[#CBD4E6] bg-white text-[#27273F] p-1 cursor-pointer"
            >
              <option value="times" className="">
                Times
              </option>
              <option value="7 AM - 4 PM">7 AM - 4 PM</option>
              <option value="8 AM - 12 PM">8 AM - 12 PM</option>
              <option value="6 PM - 10 PM">6 PM - 10 PM</option>
            </select> */}
            <select
              name="airlines"
              id="airlines"
              className="border-[1px] border-[#CBD4E6] bg-white text-[#27273F] p-1 cursor-pointer"
            >
              <option value="airlines" className="">
                Airlines
              </option>
              <option value="Japan">United Airlines</option>
              <option value="Hawai">Frontier Airlines</option>
              <option value="Dubai">Alaska Airlines</option>
            </select>
            <select
              name="class"
              id="class"
              className="border-[1px] border-[#CBD4E6] bg-white text-[#27273F] p-1 cursor-pointer"
              onChange={(e)=>handleTravelClass(e.target.value)}
            >
              <option value="ECONOMY" className="">
                Select Class
              </option>
              <option value="ECONOMY">Economy</option>
              <option value="PREMIUM_ECONOMY">Premium Economy</option>
              <option value="BUSINESS">Business</option>
              <option value="FIRST">First</option>
            </select>
            {/* <select
              name="price"
              id="max-price"
              className="border-[1px] border-[#CBD4E6] bg-white text-[#27273F] p-1 cursor-pointer"
            >
              <option value="max-price" className="">
                more
              </option>
            </select> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectDetails;
