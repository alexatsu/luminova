import { Hero, Footer } from "@/layouts";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {children}
    </div>
  );
};
export function Home() {
  return (
    <Container>
      <Hero />
      <Footer />
    </Container>
  );
}
