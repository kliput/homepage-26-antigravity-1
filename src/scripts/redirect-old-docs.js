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
 * Eg. https://onedata.org/#/home/api/stable/onezone?anchor=operation/health ->
 * http://onedata.org/docs/api/25.0/onezone/operation/health
 * @param {string} hash
 * @returns {string | undefined}
 */
function apiAnchorMatcher(hash) {
  const fullApiMatch = hash.match(
    /#\/home\/api\/(?<version>(?:(?:\d|\.)+)|stable|latest)\/(?<product>.*)\?anchor=(?<anchor>.*)/,
  );
  if (!fullApiMatch) {
    return;
  }
  let { version, product, anchor } = fullApiMatch.groups;
  if (anchor.startsWith("tag/")) {
    anchor = anchor.toLowerCase();
  }
  return `/api/${version}/${product}/${anchor}`;
}

/**
 * @param {string} hash
 * @returns {string | undefined}
 */
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

// FIXME: change 25 to "stable" when available
const legacyDocsMap = {
  "administering_onedata/luma.html": "docs/topic/luma",
  "advanced/cdmi.html": "docs/25/user-guide/interfaces/cdmi",
  "using_onedata/qos.html": "docs/25/user-guide/rule-based-replication-qos",
  "using_onedata/replication_management.html#advanced-operations-using-views":
    "docs", // FIXME: find or create new docs
  "using_onedata/using_onedata_from_cli.html": "docs", // FIXME: find or create new docs
  "administering_onedata/administering_onedata_from_cli.html": "docs", // FIXME: find or create new docs
  "administering_onedata/openid_saml_configuration/openid_saml_configuration_19_02[authority-delegation].html":
    "docs/25/admin-guide/onezone/configuration/oidc-saml/#authority-delegation",
  "using_onedata/tokens[access-tokens].html":
    "docs/25/user-guide/tokens#access-tokens",
  "using_onedata/tokens[identity-tokens].html":
    "docs/25/user-guide/tokens#identity-tokens",
  "using_onedata/tokens[invite-tokens].html":
    "docs/25/user-guide/tokens#invite-tokens",
  "using_onedata/tokens[named-and-temporary-tokens].html":
    "docs/25/user-guide/tokens#named-and-temporary-tokens",
  "using_onedata/tokens[token-caveats].html":
    "docs/25/user-guide/tokens#token-caveats",
  "using_onedata/tokens[service].html": "docs/25/user-guide/tokens#service",
  "using_onedata/tokens[consumer].html": "docs/25/user-guide/tokens#consumer",
  "using_onedata/tokens[data-access-caveats].html":
    "docs/25/user-guide/tokens#data-access-caveats",
};

function legacyDocsMatcher(hash) {
  const match = hash.match(/^#\/home\/documentation\/doc\/(?<legacySlug>.*)$/);
  if (!match) {
    return;
  }
  const { legacySlug } = match.groups;
  const redirectPath = legacyDocsMap[legacySlug];
  if (!redirectPath) {
    return "/docs";
  }
  return `/${redirectPath}`;
}

/**
 * @param {string} hash
 * @returns {string | undefined}
 */
function convertHash(hash) {
  const matchers = [
    topicDocPathMatcher,
    fullDocsPathMatcher,
    apiAnchorMatcher,
    apiProductMatcher,
    apiIndexMatcher,
    homeContactMatcher,
    homeVersionsMatcher,
    legacyDocsMatcher,
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
