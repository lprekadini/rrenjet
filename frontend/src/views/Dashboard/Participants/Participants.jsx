import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPersonalities, deletePersonality } from "../../../services/api";

export default function Participants() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [personalities, setPersonalities] = useState([]);
  const deletePerson = async (id, e) => {
    e.preventDefault();
    try {
      await deletePersonality(id);
      alert("Personaliteti u fshi me sukses!");
    } catch (error) {
      console.error("❌ Gabim gjatë fshirjes të personalitetit:", error);
    }
  };
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
    <>
      <div class="mb-6 flex items-center justify-end gap-x-6">
        <Link
          key="new"
          to={`/dashboard/participants/new`}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          add new
        </Link>
      </div>

      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
      >
        {personalities.map((person) => (
          <li
            key={person.id}
            className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
          >
            <div className="flex flex-1 flex-col p-8">
              <img
                alt={person.name}
                src={API_BASE_URL + person.image_url}
                className="mx-auto size-32 shrink-0 rounded-full"
              />
              <h3 className="mt-6 text-sm font-medium text-gray-900">
                {person.name}
              </h3>
              <dl className="mt-1 flex grow flex-col justify-between">
                <dt className="sr-only">Role</dt>
                <dd className="mt-3">
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    {person.birth_date.split("T")[0]}
                  </span>
                </dd>
              </dl>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  <button
                    onClick={(event) => deletePerson(person.id, event)}
                    className="relative -mr-px inline-flex text-red-500 w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    <TrashIcon
                      aria-hidden="true"
                      className="size-5 text-red-500"
                    />
                    Delete
                  </button>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <Link
                    key={person.id}
                    to={`/dashboard/participants/${person.id}`}
                    className="relative inline-flex text-yellow-500 w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    <PencilIcon
                      aria-hidden="true"
                      className="size-5 text-yellow-500"
                    />
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
