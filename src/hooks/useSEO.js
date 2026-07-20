import { useEffect } from 'react';

const useSEO = ({ title, description, schemaData }) => {
  useEffect(() => {
    // 1. Update Document Title
    if (title) {
      document.title = title;
      
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
      }
      ogTitle.setAttribute('content', title);

      let twitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (!twitterTitle) {
        twitterTitle = document.createElement('meta');
        twitterTitle.setAttribute('name', 'twitter:title');
        document.head.appendChild(twitterTitle);
      }
      twitterTitle.setAttribute('content', title);
    }

    // 2. Update Meta Description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);

      let ogDescription = document.querySelector('meta[property="og:description"]');
      if (!ogDescription) {
        ogDescription = document.createElement('meta');
        ogDescription.setAttribute('property', 'og:description');
        document.head.appendChild(ogDescription);
      }
      ogDescription.setAttribute('content', description);

      let twitterDescription = document.querySelector('meta[name="twitter:description"]');
      if (!twitterDescription) {
        twitterDescription = document.createElement('meta');
        twitterDescription.setAttribute('name', 'twitter:description');
        document.head.appendChild(twitterDescription);
      }
      twitterDescription.setAttribute('content', description);
    }

    // 3. Update Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.href);
    
    // Add og:url
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', window.location.href);

    // 4. Inject Schema.org JSON-LD
    let scriptTag = document.querySelector('script[id="dynamic-schema"]');
    if (schemaData) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.type = 'application/ld+json';
        scriptTag.id = 'dynamic-schema';
        document.head.appendChild(scriptTag);
      }
      
      const defaultSchema = {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "MedicalOrganization",
            "name": "Saarthi Homeopathy",
            "url": "https://yashahir30.github.io/Saarthi-App/",
            "logo": "https://yashahir30.github.io/Saarthi-App/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-8733905727",
              "contactType": "customer service"
            }
          },
          {
            "@type": "Physician",
            "name": "Dr. Yogin Baldaniya",
            "medicalSpecialty": "Homeopathy",
            "url": "https://yashahir30.github.io/Saarthi-App/about"
          }
        ]
      };

      // Merge provided schema with default organization/physician schema
      if (schemaData["@graph"]) {
        defaultSchema["@graph"] = [...defaultSchema["@graph"], ...schemaData["@graph"]];
      } else {
        defaultSchema["@graph"].push(schemaData);
      }

      scriptTag.innerHTML = JSON.stringify(defaultSchema);
    } else {
      // Clean up if no schema data provided
      if (scriptTag) scriptTag.remove();
    }

  }, [title, description, schemaData]);
};

export default useSEO;
