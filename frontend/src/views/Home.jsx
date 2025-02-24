"use client";

import React from "react";
import { useState } from "react";
import ademJashariImg from "../assets/adem_jashari.jpg";
import HomeSearch from "../components/Home/HomeSearch";
import Testimonial from "../components/Home/Testimonial";


export default function Home() {

  return (
    <div className="bg-white">
      <main className="isolate overflow-hidden">
        <HomeSearch img={ademJashariImg}/>
        <Testimonial img={ademJashariImg}/>
      </main>
    </div>
  );
}
