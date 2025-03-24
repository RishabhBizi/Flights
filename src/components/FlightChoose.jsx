import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import { map, sea } from "../assets/images";
import {
  delta,
  france,
  hawaiian,
  japan,
  quantas,
  united,
} from "../assets/logo";
import { FlightCard, PriceDetails, PriceGraph } from "../container";
import { Link } from "react-router-dom";
import { authLogin } from "../../utils/authLogin";
import axios from "axios";
import { formatFlightDuration,formatFlightDurationV2 } from "../../utils/formatFlightDuration";
import { formatTimeTo12Hour } from "../../utils/formatTimeTo12Hour";
import { useDispatch } from "react-redux";
import { addFlight } from "../slices/flightSlice";
import { getHardcodedData } from "../data/airlinedata";

const FlightChoose = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFlight,setSelectedFlight]=useState({});
  const originLocationCode = searchParams.get("originLocationCode");
  const destinationLocationCode = searchParams.get("destinationLocationCode");
  const travelClass = searchParams.get("travelClass");
  const departureDate = searchParams.get("departureDate");
  const adults = searchParams.get("adults");
  const children = searchParams.get("children");
  const nonStop = searchParams.get("nonStop");
  const returnDate = searchParams.get("returnDate");
  const max = searchParams.get("max");

  const [flightOptions, setFlightOptions] = useState([]);

  const [priceShown, setPriceShow] = useState(true);
  const [authToken, setAuthToken] = useState("");
  useEffect(() => {
    fetchFlightDetails()
      .then((response) => {
        const data = response?.data;
        console.log("in useEffect", data);
        if (data != undefined && data?.length!=0) {
          console.log("inside if");
          setFlightOptions(data);
          setIsLoading(false);
        }
        else if(data?.length ===0){
          setFlightOptions(getHardcodedData(originLocationCode,destinationLocationCode,departureDate))
          setIsLoading(false);
        }
        else{
          setFlightOptions(getHardcodedData(originLocationCode,destinationLocationCode,departureDate))
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log("error occured while fetching data")
        setFlightOptions(getHardcodedData(originLocationCode,destinationLocationCode,departureDate))
        setIsLoading(false);
      });
  }, [
    originLocationCode,
    destinationLocationCode,
    departureDate,
    travelClass,
    adults,
    children
  ]);
  async function fetchFlightDetails() {
    setIsLoading(true);
    try {
      let url =
        import.meta.env.VITE_FLIGHT_JAVA_BACKEND +
        `/api/v1/flightService/flights/getflights?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&adults=${adults}&travelClass=${travelClass}&nonStop=${nonStop}&max=${max}&currencyCode=USD`;
      const response = await axios.get(url,{
        timeout:30000
      });
      console.log("flights data: ", response.data);
      return response.data;
    } catch (error) {
      console.log("Error occurred while fetching the flight data: ", error);
    }
    return null;
  }
  return (
    <>
      <div className="flex lg:flex-row flex-col items-start justify-between gap-16 ">
        <div className="w-full lg:w-[872px] h-full flex flex-col gap-5">
          <div className="flex items-start justify-start">
            <h1 className="text-[#6E7491]  text-lg leading-6 font-semibold">
              Choose a <span className="text-[#605DEC]">departing </span>/{" "}
              <span className="text-[#605DEC]">returning </span>flight
            </h1>
          </div>
          <div className="w-full flex flex-col items-start justify-start  border-[1px] border-[#E9E8FC] rounded-xl">
            <div className="w-full flex items-center justify-center">
              {isLoading && (
                <Circles
                  height="80"
                  width="80"
                  color="#605DEC"
                  ariaLabel="circles-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={isLoading}
                />
              )}
            </div>

            {!isLoading &&
              flightOptions?.map((flight, index) => (
                <div
                  key={index}
                  className="w-full cursor-pointer border-b-[1px] border-[#E9E8FC] hover:bg-[#F6F6FE] transition-all duration-300 focus:bg-[#F6F6FE]"
                  onClick={() => {
                    setPriceShow(false);
                    setSelectedFlight(flight)
                    dispatch(addFlight({travelClass,departureLocation:originLocationCode,arrivalLocation:destinationLocationCode,departureDate,flight}))
                  }}
                >
                  <FlightCard
                    airlineCode={flight?.validatingAirlineCodes[0]}
                    img={flight?.validatingAirlineCodes[0]}
                    duration={formatFlightDurationV2(
                      flight?.itineraries[0]?.segments[0]?.arrival?.at,
                      flight?.itineraries[0]?.segments[0]?.departure?.at
                    )}
                    name={flight?.validatingAirlineCodes[0]}
                    time={`${formatTimeTo12Hour(
                      flight?.itineraries[0]?.segments[0]?.departure?.at
                    )} - ${formatTimeTo12Hour(
                      flight?.itineraries[0]?.segments[0]?.arrival?.at
                    )}`}
                    stop={"Non Stop"}
                    // hnl="2h 45m in HNL"
                    price={`${
                      flight?.price?.currency === "USD"
                        ? "$"
                        : flight?.price?.currency
                    } ${flight?.price?.total}`}
                    trip="One Way"
                  />
                </div>
              ))}
            {isLoading == false && flightOptions?.length === 0 && (
              <h1 className="text-[#6E7491] w-full flex items-cetner justify-center p-2 text-lg leading-6 font-semibold">
                <span>No Flights Available</span>
              </h1>
            )}
            {/* <div
              className="w-full cursor-pointer border-b-[1px] border-[#E9E8FC]  hover:bg-[#F6F6FE] transition-all duration-300 focus:bg-[#F6F6FE]"
              onClick={() => setPriceShow(false)}
            >
              <FlightCard
                img={japan}
                duration="18h 22m"
                name="Japan Airlines"
                time="7:35AM - 12:15PM"
                stop="1 stop"
                hnl="50m in HKG"
                price="$663"
                trip="round trip"
              />
            </div>
            <div
              className="w-full cursor-pointer border-b-[1px] border-[#E9E8FC]  hover:bg-[#F6F6FE] transition-all duration-300 focus:bg-[#F6F6FE]"
              onClick={() => setPriceShow(false)}
            >
              <FlightCard
                img={delta}
                duration="18h 52m"
                name="Delta Airlines"
                time="9:47 AM - 4:15 PM"
                stop="1 stop"
                hnl="4h 05m in ICN"
                price="$756"
                trip="round trip"
              />
            </div>
            <div
              className="w-full cursor-pointer border-b-[1px] border-[#E9E8FC]  hover:bg-[#F6F6FE] transition-all duration-300 focus:bg-[#F6F6FE]"
              onClick={() => setPriceShow(false)}
            >
              <FlightCard
                img={quantas}
                duration="15h 45m"
                name="Qantas Airlines"
                time="10:55 AM - 8:15 PM"
                stop="Nonstop"
                price="$839"
                trip="round trip"
              />
            </div>
            <div
              className="w-full cursor-pointer  hover:bg-[#F6F6FE] transition-all duration-300 focus:bg-[#F6F6FE]"
              onClick={() => setPriceShow(false)}
            >
              <FlightCard
                img={united}
                duration="16h 05m"
                name="United Airlines"
                time="11:15 AM - 7:45 PM"
                stop="Nonstop"
                price="$837"
                trip="round trip"
              />
            </div>
            <div
              className="w-full cursor-pointer  hover:bg-[#F6F6FE] transition-all duration-300 focus:bg-[#F6F6FE]"
              onClick={() => setPriceShow(false)}
            >
              <FlightCard
                img={france}
                duration="18h 30m"
                name="France Airlines"
                time="10:15 AM - 8:45 PM"
                stop="Nonstop"
                price="$964"
                trip="round trip"
              />
            </div> */}
          </div>
          {/* <div className="w-full lg:mt-12">
            <img src={map} alt="map" className="w-full h-full object-cover" />
          </div> */}
        </div>

        {priceShown && <PriceGraph />}

        {!priceShown && (
          <div className="mt-10 flex flex-col gap-10 justify-end items-start lg:items-end">
            <PriceDetails flight={selectedFlight} />
            <Link to="/passenger-info" className="mt-5">
              <button className="text-[#605DEC] border-2 border-[#605DEC] py-2 px-3 rounded hover:bg-[#605DEC] hover:text-white transition-all duration-200">
                Proceed
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default FlightChoose;
