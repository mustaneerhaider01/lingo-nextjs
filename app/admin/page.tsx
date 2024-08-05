import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

import { isAdmin } from "@/lib/admin";

const App = dynamic(() => import("./components/app"), { ssr: false });

const AdminPage = () => {
  if (!isAdmin()) {
    redirect("/");
  }

  return <App />;
};

export default AdminPage;
