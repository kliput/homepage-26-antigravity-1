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
 * @typedef {Object} ApiDocsGroup
 * @property {string} version
 * @property {string} product
 * @property {string} anchor
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
 * Eg. https://onedata.org/#/home/api/stable/onezone?anchor=operation/health ->
 * http://onedata.org/docs/api/25.0/onezone/operation/health
 * @param {string} hash
 * @returns {string | undefined}
 */
function apiPathMatcher(hash) {
  /** @type {(RegExpMatchArray & { groups: ApiDocsGroup }) | null} */
  const fullApiMatch = hash.match(
    /#\/home\/api\/(?<version>(?:(?:\d|\.)+)|stable|latest)\/(?<product>.*)\?anchor=(?<anchor>.*)/,
  );
  if (!fullApiMatch) {
    return;
  }
  const { version, product, anchor } = fullApiMatch.groups;
  return `/api/${version}/${product}/${anchor}`;
}

function apiProductMatcher(hash) {
  /** @type {(RegExpMatchArray & { groups: ApiDocsGroup }) | null} */
  const match = hash.match(
    /^#\/home\/api\/(?<version>(?:(?:\d|\.)+)|stable|latest)\/(?<product>.*)$/,
  );
  if (!match) {
    return;
  }
  const { version, product } = match.groups;
  return `/api/${version}/${product}`;
}

function apiIndexMatcher(hash) {
  /** @type {(RegExpMatchArray & { groups: ApiDocsGroup }) | null} */
  const match = hash.match(/^#\/home\/api$/);
  if (match) {
    return `/api/`;
  }
}

function homeContactMatcher(hash) {
  const match = hash.match(/^#\/home\/contact/);
  if (match) {
    return `/contact/`;
  }
}

function homeVersionsMatcher(hash) {
  const match = hash.match(/^#\/home\/versions/);
  if (match) {
    return `/docs/releases/`;
  }
}

/**
 * @param {string} hash
 * @returns {string | undefined}
 */
function convertHash(hash) {
  const matchers = [
    topicDocPathMatcher,
    fullDocsPathMatcher,
    apiPathMatcher,
    apiProductMatcher,
    apiIndexMatcher,
    homeContactMatcher,
    homeVersionsMatcher,
  ];
  for (const fun of matchers) {
    const redirectUrl = fun(hash);
    if (redirectUrl) {
      return redirectUrl;
    }
  }
}

function redirectOldDocs() {
  // FIXME: testing code
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
