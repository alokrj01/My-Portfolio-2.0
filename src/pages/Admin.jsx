import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Admin() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const uploadResume = async () => {
    if (!file) {
      alert ('Select a PDF file')
      return
    }

    if (file.type !== 'application/pdf') {
    alert('Only PDF files are allowed')
    return
    }

    setLoading(true)

    const { data, error } = await supabase.storage
    .from('resume')
    .upload('resume.pdf', file, {
      cacheControl: "0",
      upsert: true,
    })

    setLoading(false)

    console.log(data)
    console.log(error)

    if (error) {
      alert(error.message)
      return
    }

    alert('Resume updated successfully!')
  };

  const handleLogout = async() => {
    await supabase.auth.signOut();

    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border p-6 rounded-xl w-[400px]">
        <h1 className="text-2xl font-bold mb-4">
          Resume Admin Panel
        </h1>

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          onClick={uploadResume}
          className="w-full mt-4 px-4 py-2 bg-black text-white rounded"
        >
          {loading ? 'Uploading...' : 'Upload Resume'}
        </button>

        <button onClick={handleLogout}>
        Logout
        </button>
      </div>
    </div>
  )
}