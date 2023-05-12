import { Navbar, Hero, Footer } from "@/layouts";

export function Home() {
  return (
    <div
      style={{
        height: "100%",
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
