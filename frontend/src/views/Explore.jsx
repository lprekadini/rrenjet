import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPersonalities, fetchCategories } from "../services/api";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Explore() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("❌ Error fetching categories:", error);
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    const getPersonalities = async () => {
      try {
        const response = await fetchPersonalities(selectedCategory);
        setItems(response.data);
      } catch (error) {
        console.error("❌ Gabim gjatë marrjes së personaliteteve:", error);
      }
    };

    getPersonalities();
  }, [selectedCategory]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="my-3">
          <h2>Filtro sipas kategoris</h2>
          <div className="flex justify-start gap-4 py-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-md ${
                  selectedCategory === category.id
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        <h2 id="products-heading" className="sr-only">
          Lista
        </h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {items.map((person) => (
            <Link key={person.id} to={`/explore/single/${person.id}`} className="group">
              <img
                alt={person.name}
                src={`${API_BASE_URL}${person.image_url}`}
                className="aspect-square w-full overflow-hidden rounded-lg object-cover group-hover:opacity-75 sm:aspect-[2/3]"
              />
              <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                <h3>{person.name}</h3>
                <p className="text-gray-500 text-sm font-light">
                  {new Date(person.birth_date).getFullYear()}{" "}
                  {person.death_date
                    ? `/ ${new Date(person.death_date).getFullYear()}`
                    : ""}
                </p>
              </div>
              <p className="mt-1 text-sm italic text-gray-500">
                {person.profession ?? "--"}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
