import { Outlet } from "react-router-dom";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
};

export default MainLayout;
