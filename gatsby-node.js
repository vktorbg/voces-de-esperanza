/**
 * gatsby-node.js
 * Creates client-only routes for dynamic pages not covered by file-based routing.
 */
exports.createPages = async ({ actions }) => {
  const { createPage } = actions;

  // Mentor student detail: /mentor/:studentId/
  // File-based [studentId].js handles this, but we keep matchPath for SSR safety
  createPage({
    path: "/mentor/estudiante",
    matchPath: "/mentor/:studentId",
    component: require.resolve("./src/pages/mentor/[studentId].js"),
    context: {},
  });
};
