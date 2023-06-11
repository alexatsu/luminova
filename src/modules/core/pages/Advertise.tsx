import { Navbar } from "@/layouts";
import { Header } from "../components/advertise/header/Header";
import { Brands } from "../components/advertise/brands/Brands";
import { DirectAdv } from "../components/advertise/direct-adv/DirectAdv";
import { NativeAdv } from "../components/advertise/native-adv/NativeAdv";
import { Audience } from "../components/advertise/audience/Audience";
import { AdvContainer } from "../components/advertise/AdvContainer";
import { ProgressBar } from "@/components";

export const Advertise = () => {
  const dataBrands = [
    {
      url: "./img/logo-bluehost.svg",
      alt: "bluehost",
    },
    {
      url: "./img/logo-canva.svg",
      alt: "canva",
    },
    {
      url: "./img/logo-creativemarket.svg",
      alt: "creativemarket",
    },
    {
      url: "./img/logo-envato.svg",
      alt: "envato",
    },
    {
      url: "./img/logo-grammarly.svg",
      alt: "grammarly",
    },
    {
      url: "./img/logo-hotjar.svg",
      alt: "hotjar",
    },
  ];

  const dataAdvItems = [
    {
      url: "./img/direct-download.svg",
      title: "Download",
      descr: `Associate your brand with user’s positive emotion of finding the
        perfect photo for their creation.`,
    },
    {
      url: "./img/direct-feed.svg",
      title: "Feed",
      descr: `Reach creative professionals when they’re most focused on finding the perfect image.`,
    },
    {
      url: "./img/direct-homepage.svg",
      title: "Homepage",
      descr: `Taking over the homepage increases your brand’s
        relevance with the entirety of Luminova’s audience.`,
    },
    {
      url: "./img/direct-video.svg",
      title: "Video",
      descr: `Use eye-grabbing videos to give users a better understanding of your brand’s value-add.`,
    },
  ];

  const dataAudienceItems = [
    {
      bgColor: "#111",
      title: "All Creative Professionals",
      descr: `Luminova attracts all creative professionals, ranging from Fortune 500 industry
        leaders to the growing demographic of professionals empowered by the democratization
        of creativity.`,
    },
    {
      bgColor: "#f5f5f5",
      title: "Targeting Capability",
      descr: `Geo-targeting ads, by safelisting or blocklisting desired countries`,
    },
    {
      bgColor: "red",
      title: "Up to 2.00% clickthrough rate",
      descr: `10x higher than Pinterest 3x higher than Dribbble`,
    },
    {
      bgColor: "#f5f5f5",
      title: "75%",
      descr: `of visitors are between the ages of 18–34`,
    },
    {
      bgColor: "#f5f5f5",
      title: "71%",
      descr: `of visitors have a university degree`,
    },
    {
      bgColor: "#f5f5f5",
      title: "51%",
      descr: `of our users have a household income of more than $100k/year`,
    },
  ];

  return (
    <div className="advertise">
      <Navbar />

      <AdvContainer>
        <Header />

        <Brands dataBrands={dataBrands} />
      </AdvContainer>

      <DirectAdv dataAdvItems={dataAdvItems} />

      <NativeAdv />

      <AdvContainer>
        <Audience dataAudienceItems={dataAudienceItems} />
      </AdvContainer>

      <ProgressBar />
    </div>
  );
};
