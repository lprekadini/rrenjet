// components/PersonalityForm.jsx
import React, { useState } from "react";
import axios from "axios";
import "react-quill/dist/quill.snow.css";

const PersonalityForm = () => {
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [biography, setBiography] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [deathDate, setDeathDate] = useState("");

  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("short_description", shortDescription);
    formData.append("profession", setProfession);
    formData.append("biography", biography);
    formData.append("death_date", deathDate);
    formData.append("birth_date", birthDate);
    if (image) formData.append("image", image);

    try {
      await axios.post("/api/personalities", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Personaliteti u shtua me sukses!");
    } catch (error) {
      console.error("Gabim gjatë shtimit të personalitetit:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Emri"
        required
      />
      <input
        type="text"
        value={profession}
        onChange={(e) => setName(e.target.value)}
        placeholder="Emri"
        required
      />
      {/* <ReactQuill
        value={biography}
        onChange={setBiography}
        placeholder="Përshkrimi (biography)"
      />
      <ReactQuill
        value={short_description}
        onChange={setShortDescription}
        placeholder="Përshkrimi i shkurte"
      /> */}
      <input
        type="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
      />
      deathdate:
      <input
        type="date"
        value={death_date}
        onChange={(e) => setDeathDate(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        accept="image/*"
      />
      <button type="submit">Shto Personalitetin</button>
    </form>
  );
};

export default PersonalityForm;
