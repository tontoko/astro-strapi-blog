/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query queryBlogSettings {\n  blogSetting {\n    data {\n      attributes {\n        title\n        seo {\n          ...Seo\n        }\n      }\n    }\n  }\n}": types.QueryBlogSettingsDocument,
    "query queryPostBySlug($slug: String) {\n  posts(filters: {slug: {eq: $slug}}) {\n    data {\n      attributes {\n        title\n        content\n        slug\n        seo {\n          ...Seo\n        }\n      }\n    }\n  }\n}": types.QueryPostBySlugDocument,
    "query queryPosts {\n  posts {\n    data {\n      attributes {\n        title\n        content\n        slug\n        seo {\n          ...Seo\n        }\n      }\n    }\n  }\n}": types.QueryPostsDocument,
    "fragment Seo on ComponentSharedSeo {\n  metaTitle\n  metaImage {\n    data {\n      attributes {\n        url\n      }\n    }\n  }\n  metaSocial {\n    socialNetwork\n    title\n    description\n  }\n  metaRobots\n  metaViewport\n  metaDescription\n  keywords\n  structuredData\n  canonicalURL\n}": types.SeoFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query queryBlogSettings {\n  blogSetting {\n    data {\n      attributes {\n        title\n        seo {\n          ...Seo\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query queryBlogSettings {\n  blogSetting {\n    data {\n      attributes {\n        title\n        seo {\n          ...Seo\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query queryPostBySlug($slug: String) {\n  posts(filters: {slug: {eq: $slug}}) {\n    data {\n      attributes {\n        title\n        content\n        slug\n        seo {\n          ...Seo\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query queryPostBySlug($slug: String) {\n  posts(filters: {slug: {eq: $slug}}) {\n    data {\n      attributes {\n        title\n        content\n        slug\n        seo {\n          ...Seo\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query queryPosts {\n  posts {\n    data {\n      attributes {\n        title\n        content\n        slug\n        seo {\n          ...Seo\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query queryPosts {\n  posts {\n    data {\n      attributes {\n        title\n        content\n        slug\n        seo {\n          ...Seo\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Seo on ComponentSharedSeo {\n  metaTitle\n  metaImage {\n    data {\n      attributes {\n        url\n      }\n    }\n  }\n  metaSocial {\n    socialNetwork\n    title\n    description\n  }\n  metaRobots\n  metaViewport\n  metaDescription\n  keywords\n  structuredData\n  canonicalURL\n}"): (typeof documents)["fragment Seo on ComponentSharedSeo {\n  metaTitle\n  metaImage {\n    data {\n      attributes {\n        url\n      }\n    }\n  }\n  metaSocial {\n    socialNetwork\n    title\n    description\n  }\n  metaRobots\n  metaViewport\n  metaDescription\n  keywords\n  structuredData\n  canonicalURL\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;