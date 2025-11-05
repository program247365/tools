// Custom frontmatter fields that we add to our MDX files
// These are not validated by schema but are accessible at runtime
export interface CustomFrontmatter {
  tags?: string;
  date?: string | Date;
}
