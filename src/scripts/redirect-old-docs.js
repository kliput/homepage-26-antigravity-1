/**
 * @typedef {Object} FullDocsGroups
 * @property {string} version
 * @property {string} chapter
 * @property {string} slugPath
 */

/**
 * @typedef {Object} DocsSlugWithHeading
 * @property {string} docsSlug
 * @property {string} headingSlug
 */

/**
 * @typedef {Object} TopicDocsGroup
 * @property {string} version
 * @property {string} topic
 */

/**
 * @param {string} url
 * @returns {void}
 */
function redirect(url) {
  window.location.assign(url);
}

/**
 * @param {string} hash
 * @returns {string | undefined}
 */
function fullDocsPathMatcher(hash) {
  /** @type {(RegExpMatchArray & { groups: FullDocsGroups }) | null} */
  const fullDocsMatch = hash.match(
    /#\/home\/documentation\/(?<version>(?:(?:\d|\.)+)|stable|latest)\/(?<chapter>(?:admin-guide|user-guide)?)\/(?<slugPath>.*?)\.html/,
  );
  if (fullDocsMatch) {
    const { version, chapter, slugPath } = fullDocsMatch.groups;
    let docsSlug = slugPath;
    let headingSlug;
    /** @type {(RegExpMatchArray & { groups: DocsSlugWithHeading }) | null} */
    const slugWithHeaderMatch = slugPath.match(
      /(?<docsSlug>.*)\[(?<headingSlug>.*)\]/,
    );
    if (!slugWithHeaderMatch) {
      return;
    }
    if (slugWithHeaderMatch) {
      docsSlug = slugWithHeaderMatch.groups.docsSlug;
      headingSlug = slugWithHeaderMatch.groups.headingSlug;
    }
    return `/docs/${version}/${chapter}/${docsSlug}${headingSlug ? `#${headingSlug}` : ""}`;
  }
}

/**
 * Eg. https://onedata.org/#/home/documentation/topic/21.02/data-access-control
 * @param {string} hash
 * @returns {string | undefined}
 */
function topicDocPathMatcher(hash) {
  /** @type {(RegExpMatchArray & { groups: TopicDocsGroup }) | null} */
  const topicDocsMatch = hash.match(
    /#\/home\/documentation\/topic\/(?<version>(?:(?:\d|\.)+)|stable|latest)\/(?<topic>.*)/,
  );
  if (!topicDocsMatch) {
    return;
  }
  const { version, topic } = topicDocsMatch.groups;
  return `/docs/topic/${version}/${topic}`;
}

/**
 * @param {string} hash
 * @returns {string | undefined}
 */
function convertHash(hash) {
  const matchers = [topicDocPathMatcher, fullDocsPathMatcher];
  for (const fun of matchers) {
    const redirectUrl = fun(hash);
    if (redirectUrl) {
      return redirectUrl;
    }
  }
}

function redirectOldDocs() {
  // console.log(
  //   convertHash(
  //     // "#/home/documentation/25/admin-guide/oneprovider/installation/onedatify-cli[prerequisites].html",
  //     "#/home/documentation/topic/21.02/data-access-control",
  //   ),
  // );
  const redirectUrl = convertHash(window.location.hash);
  if (redirectUrl) {
    redirect(redirectUrl);
  }
}

redirectOldDocs();
window.addEventListener("hashchange", redirectOldDocs);
