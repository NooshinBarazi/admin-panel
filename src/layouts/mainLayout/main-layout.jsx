import { Outlet } from "react-router-dom";
import { useAppContext } from "../../contexts/app/app-context";
import { useState } from "react";
import Sidebar from "./sidebar";
import TopNav from "./top-nav";

const MainLayout = () => {
  const { language } = useAppContext();
  const [collapseSidebar, setCollapseSidebar] = useState(false);
  return (
    <div className="wrapper" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="main">
        <TopNav />
        <main className="content">
          <div className="container-fluid p-0">
            <Outlet />
          </div>
        </main>
        <footer className="footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <p className="mb-0">
                  © 2023 -{" "}
                  <a href="index.html" className="text-muted">
                    کلاسبن
                  </a>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
