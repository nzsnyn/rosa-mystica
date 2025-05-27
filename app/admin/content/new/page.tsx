"use client";

import AdminLayout from "@/components/layouts/AdminLayout";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const NewContentPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const contentType = searchParams.get("type") as "IMAGE" | "ARTICLE" | null;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    excerpt: "",
    published: false,
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Redirect if no type specified
  useEffect(() => {
    if (!contentType || !["IMAGE", "ARTICLE"].includes(contentType)) {
      router.push("/admin/content");
    }
  }, [contentType, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (contentType === "IMAGE") {
        // Handle image upload
        if (!file) {
          alert("Please select an image file");
          setLoading(false);
          return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("file", file);
        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("type", "IMAGE");
        formDataToSend.append("published", formData.published.toString());

        const response = await fetch("/api/content", {
          method: "POST",
          body: formDataToSend,
        });

        if (!response.ok) throw new Error("Failed to upload image");
      } else {
        // Handle article creation
        const response = await fetch("/api/content", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            type: "ARTICLE",
          }),
        });

        if (!response.ok) throw new Error("Failed to create article");
      }

      router.push(`/admin/content?type=${contentType}`);    } catch (error) {
      console.error("Error creating content:", error);
      alert(`Failed to create ${contentType?.toLowerCase() || 'content'}`);
    } finally {
      setLoading(false);
    }
  };

  if (!contentType) return null;

  return (
    <AdminLayout>
      <div className="px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {contentType === "IMAGE" ? "Upload New Image" : "Create New Article"}
          </h1>
        </div>

        <div className="bg-white shadow rounded-lg">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {contentType === "IMAGE" && (
              <div>
                <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                  Image File
                </label>
                <input
                  type="file"
                  id="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            )}

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {contentType === "ARTICLE" && (
              <>
                <div>
                  <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
                    Excerpt
                  </label>
                  <textarea
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    rows={2}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Brief description for article listings..."
                  />
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                    Content
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows={12}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Write your article content here..."
                  />
                </div>
              </>
            )}

            <div className="flex items-center">
              <input
                type="checkbox"
                id="published"
                name="published"
                checked={formData.published}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
                Published
              </label>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? "Creating..." : `Create ${contentType === "IMAGE" ? "Image" : "Article"}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewContentPage;
