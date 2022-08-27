import { gql } from "apollo-server-express";

export const Query = gql`
  type GetLayoutsResponse {
    data: [Layout!]!
    stats: Stats!
  }

  type GetContentsResponse {
    data: [Content!]!
    stats: Stats!
  }

  input GetLayoutsInput {
    query: LayoutFieldFiltersInput!
    config: FilterConfig
  }

  input GetContentsInput {
    query: ContentFieldFiltersInput!
    config: FilterConfig
  }

  input LayoutFieldFiltersInput {
    _id: [StringFieldFilter]
    name: [StringFieldFilter]
    html: [StringFieldFilter]
    createdAt: [DateFieldFilter]
    updatedAt: [DateFieldFilter]
    created_by: [StringFieldFilter]
  }

  input ContentFieldFiltersInput {
    _id: [StringFieldFilter]
    name: [StringFieldFilter]
    subject: [StringFieldFilter]
    plainText: [StringFieldFilter]
    html: [StringFieldFilter]
    created_by: [StringFieldFilter]
    createdAt: [DateFieldFilter]
    updatedAt: [DateFieldFilter]
    trigger: [StringFieldFilter]
    active: [BooleanFieldFilter]
  }

  extend type Query {
    getLayouts(getLayoutsInput: GetLayoutsInput!): GetLayoutsResponse!
    getContents(getContentsInput: GetContentsInput!): GetContentsResponse!
  }
`;
