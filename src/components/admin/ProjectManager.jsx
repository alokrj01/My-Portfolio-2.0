import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function ProjectManager() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techstack, setTechstack] = useState("");
  const [github, setGithub] = useState("");
  const [live, setLive] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

 const handleAddProject = async () => {
  if (!title || !description || !image) {
    alert("Please fill all required fields");
    return;
  }

  setLoading(true);

  try {
    // Generate unique image name
    const fileName = `${Date.now()}-${image.name}`;

    // Upload image
    const { error: imageError } = await supabase.storage
      .from("project-images")
      .upload(fileName, image);

    if (imageError) {
      alert(imageError.message);
      return;
    }

    // Public image URL
    const imageUrl =
      `${import.meta.env.VITE_SUPABASE_URL}` +
      `/storage/v1/object/public/project-images/${fileName}`;

    // Insert into database
    const { error: dbError } = await supabase
      .from("projects")
      .insert([
        {
          title,
          description,
          techstack,
          github,
          live,
          image: imageUrl,
        },
      ]);

    if (dbError) {
      alert(dbError.message);
      return;
    }

    alert("Project added successfully!");

    // Reset form
    setTitle("");
    setDescription("");
    setTechstack("");
    setGithub("");
    setLive("");
    setImage(null);

  } catch (err) {
    alert(err.message);

  } finally {
    setLoading(false);
  }
};

  return (
    <div className="border p-6 rounded-xl w-[400px]">
      <h1 className="text-2xl font-bold mb-6">
        Project Manager
      </h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded h-28"
        />

        <input
          type="text"
          placeholder="Tech Stack"
          value={techstack}
          onChange={(e) => setTechstack(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          placeholder="GitHub Link"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Live Project Link"
          value={live}
          onChange={(e) => setLive(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full"
        />

        {image && (
          <p className="text-sm text-gray-600">
            Selected: {image.name}
          </p>
        )}

        <button
          onClick={handleAddProject}
          disabled={loading}
          className="w-full px-4 py-2 bg-black text-white rounded"
        >
          {loading ? "Adding..." : "Add Project" }
        </button>
      </div>
    </div>
  );
}