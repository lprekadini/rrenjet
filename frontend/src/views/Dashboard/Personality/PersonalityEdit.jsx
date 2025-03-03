import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import {
  getPersonalityById,
  updatePersonality,
  createPersonality,
  fetchCategories,
} from "../../../services/api";
import { useParams, useNavigate } from "react-router-dom";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function PersonalityEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [personality, setPersonality] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const fetchPersonality = async () => {
      try {
        const response = await getPersonalityById(id);
        setPersonality(response.data);
        setPreview(`${API_BASE_URL}${response.data.image_url}`);

        // Pre-select existing categories
        if (response.data.Categories) {
          setSelectedCategories(response.data.Categories.map((cat) => cat.id));
        }
      } catch (error) {
        console.error("❌ Error fetching personality:", error);
      }
    };

    if (id && id !== "new") {
      fetchPersonality();
    } else {
      setPersonality({
        name: "",
        biography: "",
        birth_date: "",  short_description: "", death_date: "",
        image_url: "",
      });
      setPreview("");
    }

    const getCategories = async () => {
      try {
        const response = await fetchCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategories();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const toggleCategorySelection = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", personality.name);
    formData.append("biography", personality.biography);
    formData.append("death_date", personality.death_date);
    formData.append("short_description", personality.short_description);
    formData.append("birth_date", personality.birth_date.split("T")[0]);
    formData.append("categories", JSON.stringify(selectedCategories));

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

  if (!personality) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold text-gray-900">
            {id && id !== "new" ? "Edit" : "Add"} Personality
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
                  type="text"
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
                  rows={9}
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
            </div>
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-900">
                Short Description
              </label>
              <div className="mt-2">
                <textarea
                  rows={4}
                  value={personality?.short_description || ""}
                  onChange={(e) =>
                    setPersonality({
                      ...personality,
                      short_description: e.target.value,
                    })
                  }
                  className="block w-full rounded-md border border-gray-300 p-2 text-base text-gray-900"
                />
              </div>
            </div>

            {/* Multi-Select Categories */}
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium text-gray-900">
                Categories
              </label>
              <Listbox
                value={selectedCategories}
                onChange={toggleCategorySelection}
                multiple
              >
                <div className="relative mt-2">
                  <ListboxButton className="w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 border border-gray-300">
                    <span className="block truncate">
                      {selectedCategories.length > 0
                        ? categories
                            .filter((cat) =>
                              selectedCategories.includes(cat.id)
                            )
                            .map((cat) => cat.name)
                            .join(", ")
                        : "Select categories"}
                    </span>
                    <ChevronUpDownIcon className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 size-5" />
                  </ListboxButton>

                  <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
                    {categories.map((category) => (
                      <ListboxOption
                        key={category.id}
                        value={category.id}
                        onClick={() => toggleCategorySelection(category.id)}
                        className={`relative cursor-pointer select-none py-2 pl-3 pr-9 ${
                          selectedCategories.includes(category.id)
                            ? "bg-indigo-100 text-indigo-900"
                            : "text-gray-900"
                        }`}
                      >
                        <span
                          className={`block truncate ${
                            selectedCategories.includes(category.id)
                              ? "font-semibold"
                              : "font-normal"
                          }`}
                        >
                          {category.name}
                        </span>
                        {selectedCategories.includes(category.id) && (
                          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                            <CheckIcon className="size-5" />
                          </span>
                        )}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
            </div>

            {/* Birthday */}
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium text-gray-900">
                Birthday
              </label>
              <input
                type="date"
                value={
                  personality?.birth_date
                    ? personality.birth_date.split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setPersonality({ ...personality, birth_date: e.target.value })
                }
                className="block w-full rounded-md border border-gray-300 p-2 text-base text-gray-900"
              />
            </div>
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium text-gray-900">
                Death Day
              </label>
              <input
                type="date"
                value={
                  personality?.death_date
                    ? personality.death_date.split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setPersonality({ ...personality, death_date: e.target.value })
                }
                className="block w-full rounded-md border border-gray-300 p-2 text-base text-gray-900"
              />
            </div>
          </div>
          <div className="mt-5 flex items-center gap-x-3">
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

      {/* Buttons */}
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-sm font-semibold text-gray-900"
        >
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
