"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface FormData {
  title: string;
  description: string;
  content: string;
  excerpt: string;
  published: boolean;
}

export default function CreateContentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const contentType = searchParams.get("type") as "IMAGE" | "ARTICLE" | null;
  
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    content: "",
    excerpt: "",
    published: false,
  });
  
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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
      const selectedFile = e.target.files[0];
      const maxSize = 1 * 1024 * 1024;
      
      if (selectedFile.size > maxSize) {
        alert(`File size must be less than 1MB. Selected file is ${(selectedFile.size / 1024 / 1024).toFixed(2)}MB`);
        e.target.value = '';
        setFile(null);
        setPreviewUrl(null);
        return;
      }
      
      setFile(selectedFile);
      
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (contentType === "IMAGE") {
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

      router.push(`/admin/content?type=${contentType}`);
    } catch (error) {
      console.error("Error creating content:", error);
      alert(`Failed to create ${contentType?.toLowerCase() || 'content'}`);
    } finally {
      setLoading(false);
    }
  };

  if (!contentType) return null;
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Simple Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/admin")}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Admin Dashboard
              </button>
              <span className="text-gray-400">|</span>
              <button
                onClick={() => router.push("/admin/content")}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Content Management
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="px-4 py-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Create New {contentType === "IMAGE" ? "Image" : "Article"}
          </h1>
          <p className="text-gray-600">
            {contentType === "IMAGE" 
              ? "Upload and manage images for your content using local storage" 
              : "Create and publish articles for your website"
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              placeholder={`Enter ${contentType?.toLowerCase()} title`}
            />
          </div>

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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              placeholder={`Enter ${contentType?.toLowerCase()} description`}
            />
          </div>

          {contentType === "IMAGE" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image File *
              </label>
              <div className="space-y-4">
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Maximum file size: 1MB. Supported formats: JPG, PNG, WebP, GIF
                  </p>
                </div>

                {previewUrl && (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                      <div className="border rounded-lg p-4 bg-gray-50">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="max-w-md max-h-64 rounded-lg shadow-sm object-contain"
                        />
                      </div>
                    </div>

                    {file && (
                      <div className="text-sm text-gray-600">
                        <p><strong>File:</strong> {file.name}</p>
                        <p><strong>Size:</strong> {(file.size / 1024).toFixed(1)} KB</p>
                        <p><strong>Type:</strong> {file.type}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                  placeholder="Brief summary of the article"
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Content *
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={10}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                  placeholder="Write your article content here..."
                />
              </div>
            </>
          )}

          <div className="flex items-center">
            <input
              id="published"
              name="published"
              type="checkbox"
              checked={formData.published}
              onChange={handleInputChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
              Publish immediately
            </label>
          </div>

          <div className="flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push("/admin/content")}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || (contentType === "IMAGE" && !file)}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : `Create ${contentType === "IMAGE" ? "Image" : "Article"}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
