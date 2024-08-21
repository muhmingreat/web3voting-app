import React from "react";
import { useState, useEffect, useContext } from "react";
import CountDown from "react-countdown";
import { VotingContext } from "../context/Voter";
import Card from "../components/Card/Card";
import Image from "../assets/candidate-1.jpg";
import AllowVoters from "./allowd-voters";

const index = () => {
  const { dataTitle } = useContext(VotingContext);
  return (
    <div>
      {dataTitle}
      <AllowVoters />
    </div>
  );
};

export default index;
