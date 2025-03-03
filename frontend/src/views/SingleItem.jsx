"use client";

import { useState, useEffect } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { useParams } from "react-router-dom";
import { getPersonalityById } from "../services/api";

export default function SingleItem() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const getItemById = async () => {
      try {
        const response = await getPersonalityById(id);
        setItem(response.data);
      } catch (error) {
        console.error("❌ Gabim gjatë marrjes së personaliteteve:", error);
      }
    };
    if (id) getItemById();
  }, [id]);

  return (
    <div className="bg-white">
      {item ? (
        <>
          <div className="pb-16 pt-6 sm:pb-24">
            <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
                <div className="lg:col-span-5 lg:col-start-8">
                  <div className="flex justify-between">
                    <div>
                      <h1 className="text-2xl font-medium text-gray-900 m-0">
                        {item.name}
                      </h1>
                      <small className="text-base text-gray-600">
                        {item.profession}
                      </small>
                    </div>
                    <div>
                      {item.birth_date.split("T")[0]}{" "}
                      {item.death_date
                        ? `/ ${item.death_date.split("T")[0]}`
                        : ""}
                    </div>
                  </div>
                  <div className="mt-3">
                    {item.Categories.map((cat) => (
                      <span
                        key={cat.id}
                        className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20 mr-2"
                      >
                        <span>{cat.name}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
                  <h2 className="sr-only">Images</h2>

                  <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
                    <img
                      key={item.id}
                      alt={item.imageAlt}
                      src={`${API_BASE_URL}${item.image_url}`}
                      className={"rounded-lg lg:col-span-2 lg:row-span-2"}
                    />
                  </div>
                </div>

                <div className="mt-1 lg:col-span-5">
                  <div className="mt-1">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.short_description,
                      }}
                      className="mt-4 space-y-4 text-sm/6 text-gray-500"
                    />
                  </div>
                </div>

                <div className="mt-3 lg:col-span-12 lg:gap-4">
                  <div className="mt-10">
                    <h3 className="text-center">Biografija</h3>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.biography,
                      }}
                      className="mt-4 space-y-4 text-sm/6 text-gray-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
