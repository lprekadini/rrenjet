import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import {
  getPersonalityById,
  updatePersonality,
  createPersonality,
} from "../../../services/api";
import { useParams, useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ParticipantsEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [personality, setPersonality] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(personality?.image_url || "");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", personality.name);
    formData.append("biography", personality.biography);
    formData.append("birth_date", personality.birth_date.split("T")[0]);

    if (image) {
      formData.append("image", image);
    }

    try {
      if (personality.id) {
        await updatePersonality(personality.id, formData);
        alert("Personaliteti u ndryshua me sukses!");
      } else {
        const response = await createPersonality(formData);
        setPersonality(response.data);
        alert("Personaliteti u krijua me sukses!");
      }
    } catch (error) {
      console.error("❌ Gabim gjatë shtimit të personalitetit:", error);
    }
  };

  useEffect(() => {
      const fetchPersonality = async () => {
        try {
          const response = await getPersonalityById(id);
          setPersonality(response.data);
          setPreview(`${API_BASE_URL}${response.data.image_url}`);
        } catch (error) {
          console.error("❌ Error fetching personality:", error);
        }
      };
console.log('idddd: ', id);
    if (id && id != 'new'){ fetchPersonality();}
    else {
      // Reset form for new person
      setPersonality({
        name: "",
        biography: "",
        birth_date: "",
        image_url: "",
      });
      setPreview("");
    }
  }, [id]);

  if (!personality) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold text-gray-900">
            Add/Edit Participants
          </h2>
          <p className="mt-1 text-sm text-gray-600">Fill all inputs below.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* Name */}
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="janesmith"
                  value={personality?.name || ""}
                  onChange={(e) =>
                    setPersonality({ ...personality, name: e.target.value })
                  }
                  className="block w-full rounded-md border border-gray-300 p-2 text-base text-gray-900"
                />
              </div>
            </div>

            {/* Biography */}
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-900">
                Biography
              </label>
              <div className="mt-2">
                <textarea
                  id="biography"
                  name="biography"
                  rows={4}
                  value={personality?.biography || ""}
                  onChange={(e) =>
                    setPersonality({
                      ...personality,
                      biography: e.target.value,
                    })
                  }
                  className="block w-full rounded-md border border-gray-300 p-2 text-base text-gray-900"
                />
              </div>
              <p className="mt-3 text-sm text-gray-600">
                Write a few sentences about this person.
              </p>
            </div>

            {/* Birthday */}
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium text-gray-900">
                Birthday
              </label>
              <div className="mt-2">
                <input
                  id="birth_date"
                  name="birth_date"
                  type="date"
                  value={
                    personality?.birth_date
                      ? personality.birth_date.split("T")[0]
                      : ""
                  } // Extract only YYYY-MM-DD
                  onChange={(e) =>
                    setPersonality({
                      ...personality,
                      birth_date: e.target.value,
                    })
                  }
                  className="block w-full rounded-md border border-gray-300 p-2 text-base text-gray-900"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-900">
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-32 w-32 rounded-full object-cover"
                  />
                ) : (
                  <UserCircleIcon
                    className="size-12 text-gray-300"
                    aria-hidden="true"
                  />
                )}

                <label
                  htmlFor="image_url"
                  className="cursor-pointer rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                  <input
                    id="image_url"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              {/* <div className="mt-2 flex items-center gap-x-3">
                <UserCircleIcon className="size-12 text-gray-300" />
                <button
                  type="button"
                  className="rounded-md border border-gray-300 px-2.5 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Change
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" onClick={() => navigate(-1)} className="text-sm font-semibold text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          Save
        </button>
      </div>
    </form>
  );
}
