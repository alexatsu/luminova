import { reuseContentful } from "@/shared/services/contentful";
import { useToS } from "../hooks";

export function Privacy() {
  const { renderField } = reuseContentful();
  const privacyEntryId = "2omioSenbdhhHXfuHIGPkg";
  const { content } = useToS(privacyEntryId);

  return (
    <div style={{width: "600px", margin: "0 auto"}}>
      <div>{renderField(content, "header")}</div>
      <div>{renderField(content, "introduction1")}</div>
      <div>{renderField(content, "introduction2")}</div>
      <div>{renderField(content, "contentLinks")}</div>
      <div>{renderField(content, "listOfLinks")}</div>
      <div>{renderField(content, "privacyPolicyAmendments")}</div>
      <div>{renderField(content, "privacyPolicyAmendmentsText")}</div>
      <div>{renderField(content, "personalInformationWeCollect")}</div>
      <div>{renderField(content, "personalInformationWeCollectHeader")}</div>
      <div>{renderField(content, "personalInformationWeCollectText")}</div>
      <div>{renderField(content, "personalInformationWeCollectTextFooter")}</div>
      <div>{renderField(content, "howWeUsePersonalInformation")}</div>
      <div>{renderField(content, "howWeUsePersonalInformationHeader")}</div>
      <div>{renderField(content, "howWeUsePersonalInformationList")}</div>
      <div>{renderField(content, "howWeSharePersonalInformation")}</div>
      <div>{renderField(content, "howWeSharePersonalInformationText1")}</div>
      <div>{renderField(content, "howWeSharePersonalInformationText2")}</div>
      <div>{renderField(content, "howWeSharePersonalInformationText2")}</div>
      <div>{renderField(content, "howWeSharePersonalInformationText3")}</div>
      <div>{renderField(content, "informationSecurity")}</div>
      <div>{renderField(content, "informationSecurityText1")}</div>
      <div>{renderField(content, "informationSecurityText2")}</div>
      <div>{renderField(content, "informationSecurityText3")}</div>
      <div>{renderField(content, "retentionOfPersonalInformation")}</div>
      <div>{renderField(content, "retentionOfPersonalInformationText")}</div>
      <div>{renderField(content, "rightsRegardingYourPersonalInformation")}</div>
      <div>{renderField(content, "rightsRegardingYourPersonalInformationHeader")}</div>
      <div>{renderField(content, "rightsRegardingYourPersonalInformationList")}</div>
      <div>{renderField(content, "rightsRegardingYourPersonalInformationFooter1")}</div>
      <div>{renderField(content, "rightsRegardingYourPersonalInformationFooter2")}</div>
      <div>{renderField(content, "directMarketing")}</div>
      <div>{renderField(content, "directMarketingText1")}</div>
      <div>{renderField(content, "directMarketingText2")}</div>
      <div>{renderField(content, "dataTransfer")}</div>
      <div>{renderField(content, "dataTransferText")}</div>
      <div>{renderField(content, "thirdPartyWebsitesAndServices")}</div>
      <div>{renderField(content, "thirdPartyWebsitesAndServicesText")}</div>
      <div>{renderField(content, "childrensPrivacy")}</div>
      <div>{renderField(content, "childrensPrivacyText")}</div>
      <div>{renderField(content, "contactUs")}</div>
      <div>{renderField(content, "contactUsText")}</div>
      <div>{renderField(content, "updatedAt")}</div>
    </div>
  );
}
