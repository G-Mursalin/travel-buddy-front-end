import Footer from "@/components/shared/Footer/Footer";
import NavBar from "@/components/shared/NavBar/NavBar";
import { ReactNode } from "react";

export default function CommonLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavBar />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
}
