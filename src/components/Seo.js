// src/components/Seo.js
import React from "react";
import { useTranslation } from "react-i18next";

const Seo = ({ title, description }) => {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language === 'en';

  const defaultTitle = isEnglish ? "Voices of Hope | Daily Devotional" : "Voces de Esperanza | Devocional Diario";
  const defaultDescription = isEnglish ? "Daily devotionals to nourish your spirit with hope and wisdom." : "Devocionales diarios para alimentar tu espíritu con esperanza y sabiduría.";

  const siteTitle = title ? `${title} | ${isEnglish ? 'Voices of Hope' : 'Voces de Esperanza'}` : defaultTitle;
  const siteDescription = description || defaultDescription;
  const siteLang = isEnglish ? 'en' : 'es';

  return (
    <>
      <html lang={siteLang} />
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
    </>
  );
};

export default Seo;