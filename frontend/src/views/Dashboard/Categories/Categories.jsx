import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCategories, deleteCategory } from "../../../services/api";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const handleDeleteCategory = async (id, e) => {
  e.preventDefault();
  try {
    await deleteCategory(id);
    alert("Kategorija u fshi me sukses!");
  } catch (error) {
    console.error("❌ Gabim gjatë fshirjes të kategoris:", error);
  }
};

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetchCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("❌ Gabim gjatë marrjes së kategoris:", error);
      }
    };

    getCategories();
  }, []);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-x-6">
        <h2 className="text-sm font-medium text-gray-500">All Categories</h2>
        <Link
          key="new"
          to={`/dashboard/category/new`}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          add new
        </Link>
      </div>
      <ul
        role="list"
        className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
      >
        {categories.map((category) => (
          <li
            key={category.name}
            className="col-span-1 flex rounded-md shadow-sm"
          >
            <div
              className={classNames(
                "flex w-16 shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white bg-indigo-500"
              )}
            >
              {category.name[0]}
            </div>
            <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
              <div className="flex-1 truncate px-4 py-2 text-sm">
                <a className="font-medium text-gray-900 hover:text-gray-600">
                  {category.name}
                </a>
              </div>
              <Link
                key="new"
                to={`/dashboard/category/${category.id}`}
                className="p-3"
              >
                <PencilIcon
                  aria-hidden="true"
                  className="size-5 text-yellow-500"
                />
              </Link>
              <button
                className=" p-3"
                onClick={(event) => handleDeleteCategory(category.id, event)}
              >
                <TrashIcon aria-hidden="true" className="size-5 text-red-500" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
