/* eslint-disable react/prop-types */


const PlacesCard = ({ image, title, name, desc }) => {
  return (
    <>
    <div className="w-[410.67px] flex flex-col justify-start gap-[0.3rem] dealsShadow rounded-b">
       <div className="w-full">
         <img src={image} alt="images" className="w-full h-full object-cover rounded-t"/>
       </div>
       <div className="w-full h-full flex flex-col items-start gap-1 p-[1rem]">
        <h1 className="text-[#6E7491] text-base font-medium capitalize">{title} <span className="text-[#54cdb7]">{name}</span></h1>
        <p className="text-[#7C8DB0] text-sm font-normal">{desc}</p>
       </div>
    </div>
    </>
  )
}

export default PlacesCard