import { departure, arrival, calendar, person } from "../assets/icons";

import { DateRange,Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { FaMicrophone } from "react-icons/fa";
import { format } from "date-fns";
// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { suggestions } from "../data/constant";
import { formatUTCDate,formatDate } from "../../utils/dateFormatter";
import axios from "axios";




const Hero = () => {
  
  // const navigate = useNavigate();
  const [openDate, setOpenDate] = useState(false);
  const [listOfAirports,setListOfAirports] = useState([]);
  const [fromWhereLocation,setFromWhereLocation]=useState('');
  const [toWhereLocation,setToWhereLocation]=useState('');
  const [departureDate,setDepartureDate]=useState('');
  const [returnDate,setReturnDate]=useState('');
  const [noOfAdults,setNoOfAdults]=useState(1);
  const [noOfMinors,setNoOfMinors]=useState(0);
  const [isNonStop,setIsNonStop]=useState(false);
  const [text, setText] = useState("I am travelling from New York to Washington DC on 23rd March 2025 with my wife and 2 years old child. Give me cheapest flight rates.");
  const [isListening, setIsListening] = useState(false);
  const [llmResponse,setLLMResponse]=useState({});
  let recognition = null;
  useEffect(()=>{
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support Speech Recognition. Try Chrome.");
    } else {
      recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true; // Keeps listening until stopped
      recognition.interimResults = true; // Shows partial results
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setText(transcript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };
    }
  },[])
  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      setIsListening(false);
      recognition.stop();
    }
  };
  const fromWhere = (e) =>{
      console.log("environment variable: ",e.target.value)
      setFromWhereLocation("DTW")
      setToWhereLocation("NYC")
      setDepartureDate("2025-05-03")
  }
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    minor: 0,
  });
  const [input, setInput] = useState('');
    const [toInput,setToInput] = useState('')
  const AutoSuggest = (initialValue) => {
    
    const [matchingSuggestions, setMatchingSuggestions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
  
    const handleInputChange = (event) => {
      const inputValue = event.target.value.toLowerCase();
      setToInput(inputValue);
  
      const filteredSuggestions = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().startsWith(inputValue)
      );
      setMatchingSuggestions(filteredSuggestions);
    };
    const handleInputChangeArrival = (event) => {
      const inputValue = event.target.value.toLowerCase();
      setInput(inputValue);
  
      const filteredSuggestions = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().startsWith(inputValue)
      );
      setMatchingSuggestions(filteredSuggestions);
    };
  
    const handleSuggestionClick = (suggestion) => {
      setFromWhereLocation(suggestion);
      setInput(suggestion)
      setIsOpen(false);
    };
    const handleSuggestionClickArrival = (suggestion) => {
      setToWhereLocation(suggestion);
      setToInput(suggestion)
      setIsOpen(false);
    };
  
    return {
      matchingSuggestions,
      handleInputChangeArrival,
      isOpen,
      setInput,
      setIsOpen,
      handleInputChange,
      handleSuggestionClick,
      handleSuggestionClickArrival
    };
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
  async function getLLMResponse() {
    let url = import.meta.env.VITE_LLM_BACKEND + "/travel/"
    try {
      const response = await axios.post(url,{
        "input":text
      })
      console.log("response is: ",response.data)
      setLLMResponse(response.data);
      setInput(response.data?.departureLocation)
      setToInput(response.data?.arrivalLocation);
      setFromWhereLocation(response.data?.departureLocation);
      setToWhereLocation(response.data?.arrivalLocation);
      if(response.data?.departureDate !=null){
        const departureDate = formatDate(response.data?.departureDate,"MM-DD-YYYY","YYYY-MM-DD");
        setDepartureDate(departureDate)
        console.log("dep: ",departureDate)
      }

    } catch (error) {
      console.log("error while fetching LLM response: ",error);
    }
  }

  const departureSuggest = AutoSuggest('');
  const arrivalSuggest = AutoSuggest('');
  

  return (
    <>
      <header className="flex flex-col items-center relative w-full h-[529px] px-7 py-4">
        <div className="flex justify-center items-center">
          <h1 className="font-extrabold text-5xl sm:text-7xl md:text-8xl text-center leading-[55px] sm:leading-[70px] md:leading-[90px] text-gradient">
          TRAVEL MORE, SPEND LESS <br /> <p className="text-6xl">FLY SMART, SKIP THE FEES!</p>
          </h1>
        </div>

        <div className="flex w-full max-w-[1024px] lg:h-[65px] lg:flex-row items-center flex-col mt-20  shadowCard relative ">
          <div className="flex w-full h-full justify-start items-center border-[1px] border-[#CBD4E6] p-2 lg:rounded-l-[4px] relative">
            <img src={departure} alt="departure" />
            <input
              type="text"
              placeholder="From where?"
              value={input}
              onChange={(e)=>setInput(e.target.value)}
              onFocus={() => departureSuggest.setIsOpen(true)}
              className="uppercase placeholder:capitalize outline-none border-none ml-2 text-base text-[#7C8DB0] placeholder:text-[#7C8DB0] placeholder:text-base placeholder:leading-6"
             
            />
           { departureSuggest.isOpen && ( 
           <ul className="w-[220px] h-56 absolute top-[70px]  bg-white rounded overflow-scroll">
              {suggestions.filter((item) => item.name.startsWith(input.toLocaleUpperCase())).map((suggestion,id) => (
                <li
                  key={id}
                  onClick={() => departureSuggest.handleSuggestionClick(suggestion.code)}
                  className="uppercase  cursor-pointer hover:bg-[#605DEC] px-3 py-1 text-[#7C8DB0] hover:text-[#F6F6FE]  mt-1"
                >
                  {suggestion.code}
                  <p className="text-xs">{suggestion.name}</p>
                </li>
              ))}
            </ul>
            )}
          </div>

          <div className="flex w-full h-full justify-start items-center border-[1px] border-[#CBD4E6] p-2">
            <img src={arrival} alt="arrival" />
            <input
              type="text"
              placeholder="Where to?"
              value={toInput}
        onChange={(e)=>setToInput(e.target.value)}
        onFocus={() => arrivalSuggest.setIsOpen(true)}
              className="uppercase placeholder:capitalize outline-none border-none ml-2 text-base text-[#7C8DB0] placeholder:text-[#7C8DB0] placeholder:text-base placeholder:leading-6"
            />
           { arrivalSuggest.isOpen && (
            <ul className="w-[220px] h-56 absolute top-[70px] bg-white rounded overflow-scroll">
              {suggestions.filter((item) => item.name.startsWith(toInput.toLocaleUpperCase())).map((suggestion,id) => (
                <li
                  key={id}
                  onClick={() => arrivalSuggest.handleSuggestionClickArrival(suggestion.code)}
                  className="uppercase cursor-pointer hover:bg-[#605DEC] px-3 py-1 text-[#7C8DB0] hover:text-[#F6F6FE]  mt-1"
                >
                  {suggestion.code}
                  <p className="text-xs">{suggestion.name}</p>
                </li>
              ))}
            </ul>
            )}
          </div>

          <div className="flex w-full h-full justify-start items-center border-[1px] border-[#CBD4E6] p-2">
            <img src={calendar} alt="calendar" />
            <span
              className="text-[#7C8DB0] text-base leading-6 ml-2 cursor-pointer"
              onClick={() => setOpenDate(!openDate)}
            >
              {departureDate
                ? departureDate
                : "Departure Date"}
            </span>
            {openDate && (
              <Calendar 
                editableDateInputs={true}
                minDate={new Date()}
                date={new Date(departureDate)}
                onChange={(item) => {
                  console.log("item: ",item)
                  const localFormattedDate = formatUTCDate(item);
                  console.log("formatted date: ",localFormattedDate)
                  setDepartureDate(localFormattedDate)
                  const returnDate = formatUTCDate(item);
                  setReturnDate(returnDate);
                  setDate([item])}}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="absolute top-64 lg:top-20 z-10 "
              />
            )}
          </div>

          <div className="flex w-full h-full justify-start items-center border-[1px] border-[#CBD4E6]  p-2">
            <img src={person} alt="person" />
            <span
              className="text-[#7C8DB0] text-base leading-6 ml-2 cursor-pointer"
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

          <Link to={`/explore?originLocationCode=${fromWhereLocation}&destinationLocationCode=${toWhereLocation}&departureDate=${departureDate}&travelClass=ECONOMY&adults=${noOfAdults}&children=${noOfMinors}&nonStop=${isNonStop}&max=10`} className="w-full ">
            <button className="w-full bg-[#605DEC] text-[#FAFAFA] text-lg leading-6 h-[45px] lg:h-[65px] px-5">
              Search
            </button>
          </Link>
          <button onClick={startListening} className="w-fit bg-[#4CAF50] text-[#FAFAFA] text-lg leading-6 h-[45px] lg:h-[65px] px-5  lg:rounded-r-[4px]">
          <FaMicrophone />
            </button>
            
        </div>
        {text && <p className="w-full max-w-[1024px] bg-white border border-[#CBD4E6] rounded-md shadow-md p-4 text-lg text-[#333] mt-4 min-h-[50px] flex items-center">
          {text}
        </p>}
        <button onClick={getLLMResponse}>Send</button>
        
      </header>
    </>
  );
};

export default Hero;

//git push -u origin main
