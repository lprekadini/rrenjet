import { useState, useEffect } from "react";
import {
  getCategoryById,
  updateCategory,
  createCategory,
} from "../../../services/api";
import { useParams, useNavigate } from "react-router-dom";

export default function CategoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log('category:', category);
      if (category.id) {
        await updateCategory(category.id, {name: category.name});
        alert("kategorija u ndryshua me sukses!");
      } else {
        const response = await createCategory({name: category.name});
        setCategory(response.data);
        alert("kategorija u krijua me sukses!");
      }
    } catch (error) {
      console.error("❌ Gabim gjatë shtimit të kategoris:", error);
    }
  };

  useEffect(() => {
      const fetchPersonality = async () => {
        try {
          const response = await getCategoryById(id);
          setCategory(response.data);
        } catch (error) {
          console.error("❌ Error fetching category:", error);
        }
      };
    if (id && id != 'new'){ fetchPersonality();}
    else {
      // Reset form for new category
      setCategory({
        name: "",
      });
    }
  }, [id]);

  if (!category) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold text-gray-900">
            {id && id != 'new' ? 'Edit' : 'Add'} Category
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* Name */}
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium text-gray-900">
                Category Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="janesmith"
                  value={category?.name || ""}
                  onChange={(e) =>
                    setCategory({ ...category, name: e.target.value })
                  }
                  className="block w-full rounded-md border border-gray-300 p-2 text-base text-gray-900"
                />
              </div>
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