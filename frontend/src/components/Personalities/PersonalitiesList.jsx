import React, { useEffect, useState } from "react";
import { fetchPersonalities } from "../../services/api";
import { Link } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PersonalitiesList = () => {
  const [personalities, setPersonalities] = useState([]);

  useEffect(() => {
    const getPersonalities = async () => {
      try {
        const response = await fetchPersonalities();
        setPersonalities(response.data);
      } catch (error) {
        console.error("❌ Gabim gjatë marrjes së personaliteteve:", error);
      }
    };

    getPersonalities();
  }, []);

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 id="products-heading" className="sr-only">
          Lista
        </h2>
        {personalities.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {personalities.map((product) => (
              <Link
                key={product.id}
                to={`/single/${product.id}`}
                className="group relative"
              >
                <img
                  alt={product.name}
                  src={`${API_BASE_URL}${product.image_url}`}
                  className="aspect-square w-full overflow-hidden rounded-lg object-cover group-hover:opacity-75 sm:aspect-[2/3]"
                />
                <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                  <h3>{product.name}</h3>
                  <div className="absolute top-3 right-3">
                  {product.Categories.map((cat) => (
                    <span key={cat.id} className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20 ml-2">
                      <span>{cat.name}</span>
                    </span>
                  ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p>No results.</p>
        )}
      </div>
    </div>
  );
};

export default PersonalitiesList;
