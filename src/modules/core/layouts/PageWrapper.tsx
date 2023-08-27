import sass from "../sass/layouts/PageWrapper.module.scss";

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return <div className={sass.pwrapper}>{children}</div>;
}
