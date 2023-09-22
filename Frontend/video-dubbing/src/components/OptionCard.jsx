import React, { useState } from "react";
// import gradient from '../style'
import playButton from "../assests/playLogo.png";

const OptionCard = (props) => {
  const [selectedLanguage, setSelectedLanguage] = useState("hin");
  const languageOptions = [
    { value: "hin", label: "Hindi" },
    { value: "mar", label: "Marathi" },
    { value: "guj", label: "Gujarathi" },
    { value: "kan", label: "Kanada" },
    { value: "tel", label: "Telugu" },
  ];

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const addPart = () => {
    //"Add This Part" button is clicked.
    console.log(`Part added in ${selectedLanguage}`);
  };

  return (
    <div className="flex justify-center">
    <div className="boxStyle w-[767px] h-[261px] justify-center relative ">
      <img class="w-[73px] h-[57px] rounded-[5px]  m-5" src={playButton} />
      <h1 className="cardText p-10">{props.title}</h1>
      <select className="hover:bg-violet-400 active:bg-violet-400 rounded-md mx-20" value={selectedLanguage} onChange={handleLanguageChange}>
        {languageOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <button onClick={addPart} className="buttonStyle">
        Download
      </button>
    </div>
    </div>
  );
};

export default OptionCard;
