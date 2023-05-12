import { Navbar, Hero, Footer } from "@/layouts";

export function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}
