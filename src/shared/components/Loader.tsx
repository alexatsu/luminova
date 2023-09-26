import { Logo } from "./Logo";

export const Loader = ({ style }: { style?: React.CSSProperties }) => {
  return <Logo className="animate-spin" style={style} />;
};
