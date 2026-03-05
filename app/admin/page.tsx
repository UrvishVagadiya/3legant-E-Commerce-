'use client'

import { useState, ChangeEvent, FormEvent } from "react";
import { createClient } from "@/utils/supabase/client";

type ProductFormData = {
  title: string;
  price: string;
  mrp: string;   
  category: string;
  isNew: boolean;
  discount: string;
};

const categories: string[] = [
  "Living Room",
  "Bedroom",
  "Kitchen",
  "Bathroom",
  "Dining",
  "Outdoor",
];

export default function ProductForm() {
  const supabase = createClient();

  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    price: "",
    mrp: "",
    category: "",
    isNew: false,
    discount: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };


  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please select an image");
      return;
    }

    try {
      setLoading(true);


      const fileName = `${Date.now()}-${imageFile.name}`;

      const { error: uploadError } = await supabase.storage
        .from("product_img")
        .upload(fileName, imageFile);

      if (uploadError) throw uploadError;


      const { data: publicUrlData } = supabase.storage
        .from("product_img")
        .getPublicUrl(fileName);

      const imageUrl = publicUrlData.publicUrl;


      const productData: any = {
        img: imageUrl,
        title: formData.title,
        price: Number(formData.price),
        category: formData.category,
        isNew: formData.isNew,
        discount: formData.discount
          ? Number(formData.discount)
          : 0,
      };


      if (formData.mrp) {
        productData.mrp = Number(formData.mrp);
      }

      const { error: insertError } = await supabase
        .from("products")
        .insert([productData]);

      if (insertError) throw insertError;

      alert("Product Added Successfully!");

      setFormData({
        title: "",
        price: "",
        mrp: "",
        category: "",
        isNew: false,
        discount: "",
      });

      setImageFile(null);
    } catch (error: any) {
      console.error(error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Add Product
        </h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Product Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">
            MRP (Optional)
          </label>
          <input
            type="number"
            name="mrp"
            value={formData.mrp}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <input
            type="checkbox"
            name="isNew"
            checked={formData.isNew}
            onChange={handleChange}
          />
          <label className="font-medium">
            Mark as New
          </label>
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">
            Discount (%)
          </label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {loading ? "Uploading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
