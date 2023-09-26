import sass from "@/shared/styles/layouts/PageWrapper.module.scss";

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return <div className={sass.wrapper}>{children}</div>;
}
