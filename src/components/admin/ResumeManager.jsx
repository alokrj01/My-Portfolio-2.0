import { useRef, useState } from "react";
import { supabase } from "../../lib/supabase";
import LogoutButton from "./LogoutButton";

export default function ResumeManager() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);


  const uploadResume = async () => {
    if (!file) {
      alert("Select a PDF file");
      return;
    }

    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      return;
    }

    setLoading(true);
     
    try {
    const { error } = await supabase.storage
      .from("resume")
      .upload("resume.pdf", file, {
        cacheControl: "0",
        upsert: true,
      });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Resume updated successfully!");
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

  } catch (err) {
    alert(err.message);
  }
    finally {
    setLoading(false);
    }
  };

  
  return (
    //<div className="min-h-screen flex items-center justify-center">
      <div className="border p-6 rounded-xl w-[400px]">
        <h1 className="text-2xl font-bold mb-4">Resume Admin Panel</h1>

        <input
        ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          onClick={uploadResume}
          disabled={loading}
          className="w-full mt-4 px-4 py-2 bg-black text-white rounded"
        >
          {loading ? "Uploading..." : "Upload Resume"}
          </button>

      </div>
    //</div>
  );
}
