import React, { useState } from "react";
import playButton from "../assests/playLogo.png";
import "./Opton.css"; 
import axios from "axios";

const OptionCard = (props) => {
  const [selectedLanguage, setSelectedLanguage] = useState("hin");
  const [showDrawer, setShowDrawer] = useState(false); // State to control drawer visibility

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
    // "Add This Part" button is clicked.
    console.log(`Part added in ${selectedLanguage}`);
    // Set showDrawer to true to display the drawer
    setShowDrawer(true);
  };

  const closeDrawer = () => {
    // Close the drawer by setting showDrawer to false
    setShowDrawer(false);
  };

  const downloadAudio = async () => {
    try {
      // Make a GET request to fetch the audio file
      const response = await axios.get(`http://localhost:5000/audio`, {
        responseType: "blob", // Specify response type as blob
        params: {
          language: selectedLanguage,
        },
      });

      if (response.status === 200) {
        // Handle the audio file, e.g., you can play it or initiate a download
        const blob = new Blob([response.data], { type: "audio/mpeg" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "audio.mp3";
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        alert("Failed to download audio.");
      }
    } catch (error) {
      console.error("Error downloading audio:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="boxStyle w-[767px] h-[361px] justify-center relative"> {/* Increased height */}
        <img className="w-[73px] h-[57px] rounded-[5px] m-5" src={playButton} />
        <h1 className="cardText p-10">{props.title}</h1>
        <select
          className="hover:bg-violet-400 active:bg-violet-400 rounded-md mx-20"
          value={selectedLanguage}
          onChange={handleLanguageChange}
        >
          {languageOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <button onClick={addPart} className="buttonStyle">
          Download
        </button>

        {/* Conditionally render the drawer */}
        {showDrawer && (
          <div className="drawer">
            <button onClick={closeDrawer} className="closeButton">
              Close Drawer
            </button>
            <h2>Audio Download Options</h2>
            <button onClick={downloadAudio} className="downloadButton">
              Download Audio
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OptionCard;
