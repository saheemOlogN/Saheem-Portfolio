# Search setup

Production URL: https://saheem-nakhwa.vercel.app/

The build generates readable initial HTML from src/data.ts through seo.ts. React replaces this fallback with the interactive portfolio. Keep the fallback introduction aligned with the visible About copy when editing it. This is an HTML fallback, not React server-side hydration.

Search terms supported by real portfolio content include Saheem Nakhwa, full-stack developer, MERN stack developer, React developer, Node.js developer, REST API development and freelance web development. The requested Saheem Nakwa spelling is included as an alternate name in the Person data. Do not add keyword-stuffed paragraphs or unsupported location/service claims.

After deployment:

1. Add https://saheem-nakhwa.vercel.app/ as a URL-prefix property in Google Search Console and verify ownership using the HTML tag or file Google supplies.
2. Submit https://saheem-nakhwa.vercel.app/sitemap.xml.
3. Inspect the homepage URL, run the live test, and request indexing.
4. Check the deployed page in Google's Rich Results Test. Structured data does not guarantee enhanced search results.
5. Link this exact portfolio URL from your GitHub and LinkedIn profiles. Review Search Console indexing and query performance after Google has crawled the updates.

Search Console: https://search.google.com/search-console
Rich Results Test: https://search.google.com/test/rich-results

Run npm run build and node docs/check-seo.mjs before publishing. No Search Console verification token is fabricated or included. These changes do not deploy the site or submit it to Google. Rankings and indexing are not guaranteed.

If the domain changes, update index.html, seo.ts, public/robots.txt, public/sitemap.xml and docs/check-seo.mjs together. The sitemap lists the single actual page; section anchors are not separate pages. The sharing image reuses the existing midnight-city artwork.
