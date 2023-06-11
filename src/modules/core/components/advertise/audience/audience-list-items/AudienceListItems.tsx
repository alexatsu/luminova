import { AudienceItem } from "../audience-item/AudienceItem";

import "../../../../styles/advertise/AudienceListItems.scss";

export const AudienceListItems = ({ dataAudienceItems }: any) => {
  const items = dataAudienceItems?.map((item: any, index: number) => (
    <AudienceItem
      key={index}
      bgColor={item.bgColor}
      title={item.title}
      descr={item.descr}
    />
  ));

  return (
    <div
      className="audience-list-items"
    >
      {items}
    </div>
  );
};
