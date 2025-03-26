import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import { FlightChoose, SelectDetails } from "../components";
import { Circles } from "react-loader-spinner";
import { FlightDealsCard, PlacesCard } from "../container";
import { right } from "../assets/icons";
import axios from "axios";
import { bed, holes, kenya, seoul, shangai, wall } from "../assets/images";

const FlightExplore = () => {
  const [hotels,setHotels]=useState([]);
  const [isLoading,setIsLoading]=useState(false)
  async function fetchHotels() {
    try {
      let url =import.meta.env.VITE_LETWIZARD_API + '/api/property/v2/SearchResult';
      setIsLoading(true);
      let payload = {
        "isRentalMod": true,
        "typeOfArea": "",
        "typeOfProperty": "Hotel",
        "status": "",
        "cityId": 6149,
        "bedMins": "",
        "bathsMins": "",
        "carParkings": "",
        "priceMin": 0,
        "priceMax": 50000000,
        "rentStatus": "",
        "furnished": "",
        "kitchens": "",
        "currency": "",
        "selectedPriceMin": 0,
        "selectedPriceMax": 0,
        "listedBy": "",
        "propertyStatus": "",
        "propertyRules": "",
        "amenties": "",
        "nearByFacilities": "",
        "services": "",
        "foodAndBeverages": "",
        "reviews": "",
        "rating": "",
        "features": "",
        "facing": "",
        "propertyFacilities": "",
        "buyerPremium": "",
        "purchaseOption": "",
        "userName": null,
        "page": 1,
        "maxResult": 12
    };
    const headers = {
      'Authorization': 'Bearer b31e772e-2413-4dbc-a973-421d6b3a4f0a',
      'Content-Type': 'application/json'
    };
      const response = await axios.post(url,payload,{headers});
      console.log("response is: ",response.data?.responseBody?.data)
      setHotels(response.data?.responseBody?.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Error while fetching letwizard properties: ",error);
      setHotels([]);
      setIsLoading(false);
    }
  }
  useEffect(()=>{
    fetchHotels()
  },[])
  return (
    <>
      <div className="px-8 w-full flex flex-col">
        <div className="mt-10">
          <SelectDetails />
        </div>
        <div className="mt-16">
          <FlightChoose />
        </div>
        <div className="mt-20 flex flex-col gap-7">
          <div className="flex items-center justify-between">
            <p className="text-[#6E7491] font-medium md:font-bold sm:text-base md:text-[24px] md:leading-8">
              Find{" "}
              <span className="text-[#54cdb7]"> places to stay</span> in New Delhi
            </p>
            <Link
              to="/hotels"
              className="flex items-start justify-center gap-1"
            >
              <p className="text-[#A1B0CC] text-sm md:text-lg">All</p>
              <img src={right} alt="arrow" className="w-5 h-5 md:w-6 md:h-6" />
            </Link>
          </div>
          <div className="flex gap-16 flex-wrap items-start ">
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
           
            {hotels?.map(hotel=>{
              console.log("hotels are: ",hotel);
              return (
                <a href={`https://rentalbiz-india.letwizard.com/detail/${hotel?.searchpropertylist[0]?.propertyId}`} target="_blank">
                  <PlacesCard
                image={hotel?.searchpropertylist[0]?.images[0]?.imageUrl}
                name={hotel?.searchpropertylist[0]?.propertyTitle}
                desc={hotel?.searchpropertylist[0]?.address}
              />
                </a>
                
              );
            })}
            {/* <PlacesCard
              image={wall}
              name="HOTEL THE FLAG 大阪市"
              desc="Make a stop in Osaka and stay at HOTEL THE FLAG, just a few minutes walk to experience the food culture surrounding Dontonbori. Just one minute away is the Shinsaibashi shopping street."
            />
            <PlacesCard
              image={holes}
              name="9 Hours Shinjuku"
              desc="Experience a truly unique stay in an authentic Japanese capsule hotel. 9 Hours Shinjuku is minutes from one of Japan’s busiest train stations. Just take the NEX train from Narita airport!"
            /> */}
          </div>
        </div>
        <div className="mt-20 flex flex-col gap-7">
        <div className="flex items-center justify-between">
          <p className="text-[#6E7491] font-medium md:font-bold sm:text-base md:text-[24px] md:leading-8">
          People in <span className="text-[#605DEC]"> San Francisco </span>  also <br className=" block sm:hidden"/> searched for
          </p>
          <Link
            to="/packages"
            className="flex items-start justify-center gap-1"
          >
            <p className="text-[#A1B0CC] text-sm md:text-lg">All</p>
            <img src={right} alt="arrow" className="w-5 h-5 md:w-6 md:h-6" />
          </Link>
        </div>
        <div className="flex gap-16 flex-wrap items-start ">
          <FlightDealsCard
            image={shangai}
            title="Shanghai,"
            name="China"
            price="$598"
            des=" China’s most international city"
          />
          <FlightDealsCard
            image={kenya}
            title="Nairobi, "
            name="Kenya"
            price="$1,248"
            des="Dubbed the Safari Capital of the World"
          />
          <FlightDealsCard
            image={seoul}
            title="Seoul, "
            name="South Korea"
            price="$589"
            des="This modern city is a traveler’s dream"
          />
          
        </div>
        </div>

      </div>
    </>
  );
};

export default FlightExplore;
