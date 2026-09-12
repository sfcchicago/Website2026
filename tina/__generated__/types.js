export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const SettingsPartsFragmentDoc = gql`
    fragment SettingsParts on Settings {
  __typename
  tagline
  address
  phone
  email
  liveUrl
  giveUrl
  eventsUrl
  verseText
  verseRef
  facebookUrl
  youtubeUrl
  instagramUrl
}
    `;
export const ServicesPartsFragmentDoc = gql`
    fragment ServicesParts on Services {
  __typename
  items {
    __typename
    name
    day
    time
    note
  }
}
    `;
export const PastorPartsFragmentDoc = gql`
    fragment PastorParts on Pastor {
  __typename
  name
  role
  since
  location
  bio
  photo
  photoPosition
  photoScale
}
    `;
export const AboutPartsFragmentDoc = gql`
    fragment AboutParts on About {
  __typename
  mission
  vision
  history
}
    `;
export const BeliefsPartsFragmentDoc = gql`
    fragment BeliefsParts on Beliefs {
  __typename
  items {
    __typename
    title
    body
  }
}
    `;
export const LeadershipPartsFragmentDoc = gql`
    fragment LeadershipParts on Leadership {
  __typename
  board {
    __typename
    name
    role
    photo
    photoPosition
    photoScale
  }
  ministerialSupport {
    __typename
    name
    role
    photo
    photoPosition
    photoScale
  }
  sundaySchool {
    __typename
    name
    role
    photo
    photoPosition
    photoScale
  }
}
    `;
export const PastorHistoryPartsFragmentDoc = gql`
    fragment PastorHistoryParts on PastorHistory {
  __typename
  items {
    __typename
    name
    years
    photo
    photoPosition
    photoScale
  }
}
    `;
export const SettingsDocument = gql`
    query settings($relativePath: String!) {
  settings(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...SettingsParts
  }
}
    ${SettingsPartsFragmentDoc}`;
export const SettingsConnectionDocument = gql`
    query settingsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: SettingsFilter) {
  settingsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...SettingsParts
      }
    }
  }
}
    ${SettingsPartsFragmentDoc}`;
export const ServicesDocument = gql`
    query services($relativePath: String!) {
  services(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ServicesParts
  }
}
    ${ServicesPartsFragmentDoc}`;
export const ServicesConnectionDocument = gql`
    query servicesConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ServicesFilter) {
  servicesConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ServicesParts
      }
    }
  }
}
    ${ServicesPartsFragmentDoc}`;
export const PastorDocument = gql`
    query pastor($relativePath: String!) {
  pastor(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PastorParts
  }
}
    ${PastorPartsFragmentDoc}`;
export const PastorConnectionDocument = gql`
    query pastorConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PastorFilter) {
  pastorConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PastorParts
      }
    }
  }
}
    ${PastorPartsFragmentDoc}`;
export const AboutDocument = gql`
    query about($relativePath: String!) {
  about(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...AboutParts
  }
}
    ${AboutPartsFragmentDoc}`;
export const AboutConnectionDocument = gql`
    query aboutConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: AboutFilter) {
  aboutConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...AboutParts
      }
    }
  }
}
    ${AboutPartsFragmentDoc}`;
export const BeliefsDocument = gql`
    query beliefs($relativePath: String!) {
  beliefs(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...BeliefsParts
  }
}
    ${BeliefsPartsFragmentDoc}`;
export const BeliefsConnectionDocument = gql`
    query beliefsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: BeliefsFilter) {
  beliefsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...BeliefsParts
      }
    }
  }
}
    ${BeliefsPartsFragmentDoc}`;
export const LeadershipDocument = gql`
    query leadership($relativePath: String!) {
  leadership(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...LeadershipParts
  }
}
    ${LeadershipPartsFragmentDoc}`;
export const LeadershipConnectionDocument = gql`
    query leadershipConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: LeadershipFilter) {
  leadershipConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...LeadershipParts
      }
    }
  }
}
    ${LeadershipPartsFragmentDoc}`;
export const PastorHistoryDocument = gql`
    query pastorHistory($relativePath: String!) {
  pastorHistory(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PastorHistoryParts
  }
}
    ${PastorHistoryPartsFragmentDoc}`;
export const PastorHistoryConnectionDocument = gql`
    query pastorHistoryConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PastorHistoryFilter) {
  pastorHistoryConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PastorHistoryParts
      }
    }
  }
}
    ${PastorHistoryPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    settings(variables, options) {
      return requester(SettingsDocument, variables, options);
    },
    settingsConnection(variables, options) {
      return requester(SettingsConnectionDocument, variables, options);
    },
    services(variables, options) {
      return requester(ServicesDocument, variables, options);
    },
    servicesConnection(variables, options) {
      return requester(ServicesConnectionDocument, variables, options);
    },
    pastor(variables, options) {
      return requester(PastorDocument, variables, options);
    },
    pastorConnection(variables, options) {
      return requester(PastorConnectionDocument, variables, options);
    },
    about(variables, options) {
      return requester(AboutDocument, variables, options);
    },
    aboutConnection(variables, options) {
      return requester(AboutConnectionDocument, variables, options);
    },
    beliefs(variables, options) {
      return requester(BeliefsDocument, variables, options);
    },
    beliefsConnection(variables, options) {
      return requester(BeliefsConnectionDocument, variables, options);
    },
    leadership(variables, options) {
      return requester(LeadershipDocument, variables, options);
    },
    leadershipConnection(variables, options) {
      return requester(LeadershipConnectionDocument, variables, options);
    },
    pastorHistory(variables, options) {
      return requester(PastorHistoryDocument, variables, options);
    },
    pastorHistoryConnection(variables, options) {
      return requester(PastorHistoryConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "http://localhost:4001/graphql",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
