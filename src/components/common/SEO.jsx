import { useEffect } from 'react';

const SEO = ({ title, description, keywords }) => {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | DSofts IT Services - Digital Product Engineering`
      : 'DSofts IT Services | Custom Software, Web & Mobile App Development Company';
    document.title = fullTitle;

    const defaultDesc =
      'DSofts IT Services builds high-performance web applications, mobile apps, SaaS platforms, and enterprise software solutions for growing businesses.';

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description || defaultDesc;

    if (keywords) {
      let metaKw = document.querySelector('meta[name="keywords"]');
      if (!metaKw) {
        metaKw = document.createElement('meta');
        metaKw.name = 'keywords';
        document.head.appendChild(metaKw);
      }
      metaKw.content = keywords;
    }
  }, [title, description, keywords]);

  return null;
};

export default SEO;
