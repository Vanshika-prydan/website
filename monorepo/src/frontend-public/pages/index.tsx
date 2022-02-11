import { NextPage } from "next";
import Head from "next/head";
import { useTranslation } from "react-i18next";
// import Banner from "../src/components/Banner";
import AboutCleanGreen from "../src/components/AboutCleanGreen";
import BookViaApp from "../src/components/BookViaApp";
import HowAppWork from "../src/components/HowAppWork";
import Service from "../src/components/Service";
import { ServiceModal } from "../src/interface/services";
import ServiceData from "../src/data/services.json";
import Help from "../src/components/Help";
import Video from "../src/components/Video";

const Home: NextPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t("meta_title")}</title>
        <meta name="description" content={t("meta_page_description")} />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content="//wecleangreen.se/images/meta-3.png"
        />
        <meta property="og:url" content="" />
        <meta property="og:title" content={t("meta_title")} />
        <meta property="og:description" content={t("meta_page_description")} />
      </Head>
      <Video />
      
      {/* <Banner /> */}
      <AboutCleanGreen />
      <BookViaApp />
      <HowAppWork />
      {ServiceData.map((serviceItem: ServiceModal) => (
        <Service key={serviceItem.id.toString()} serviceItem={serviceItem} />
      ))}
      <Help />
    </>
  );
};

export default Home;
