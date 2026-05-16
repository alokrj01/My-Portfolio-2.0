import ResumeManager from "../components/admin/ResumeManager";
import ProjectManager from "../components/admin/ProjectManager";
import LogoutButton from "../components/admin/LogoutButton";

export default function Admin() {
  return (
    <div className="min-h-screen flex flex-col items-center gap-8 p-8">
      <LogoutButton />
      <ResumeManager />
      <ProjectManager />
    </div>
  );
}