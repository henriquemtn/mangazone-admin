import Navbar from "@/components/Navbar/Navbar";
import GetUser from "@/components/User/GetUser";
import React from "react";

export default function SettingsPage() {

  return (
    <div className="w-full">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <GetUser />
      </div>
    </div>
  );
}
