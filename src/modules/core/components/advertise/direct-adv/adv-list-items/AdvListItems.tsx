import { AdvItem } from "../adv-item/AdvItem";
import "../../../../styles/advertise/AdvListItems.scss";

export const AdvListItems = ({ dataAdvItems }: any) => {
  const items = dataAdvItems.map((item: any, index: number) => (
    <AdvItem key={index} url={item.url} title={item.title} descr={item.descr} />
  ));

  return <div className="adv-list-items">{items}</div>;
};
