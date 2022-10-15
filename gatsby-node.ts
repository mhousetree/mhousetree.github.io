import { GatsbyNode } from 'gatsby'

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
  async ({ actions }) => {
    const { createTypes } = actions
    const typeDefs = `
    type GraphCMS_History implements Node {
      from: Date!
      to: Date
      subHistories: [GraphCMS_History!]
    }
    type GraphCMS_Skill implements Node {
      from: Date!
    }
    type GraphCMS_Certification implements Node {
      date: Date!
    }
  `
    createTypes(typeDefs)
  }
