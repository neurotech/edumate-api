CREATE OR REPLACE VIEW DB2INST1.VIEW_API_V1_ISSUES_TOTAL (
  id,
  total_issues
) AS

-- TODO: Add case statement to generate_total to sum(1 if > 0 else 0)

WITH count_issues AS (
  SELECT 'Missing Detention Classes 1' AS ISSUE, COUNT(id) AS "TOTAL_ISSUES" FROM DB2INST1.view_api_v1_issues_missing_detention_classes
/*   UNION ALL
  SELECT 'Missing Detention Classes 2' AS ISSUE, COUNT(id) + 1786 AS "TOTAL_ISSUES" FROM DB2INST1.view_api_v1_issues_missing_detention_classes
  UNION ALL
  SELECT 'Missing Detention Classes 3' AS ISSUE, COUNT(id) + 1 AS "TOTAL_ISSUES" FROM DB2INST1.view_api_v1_issues_missing_detention_classes */
),

generate_total AS (
  SELECT
    issue,
    SUM(CASE WHEN total_issues > 0 THEN 1 ELSE 0 END) AS "TOTAL_ISSUES"
  FROM count_issues
  
  GROUP BY issue
)

SELECT
  INTEGER(ROW_NUMBER() OVER ()) AS "ID",
  SUM(total_issues) AS "TOTAL_ISSUES"

FROM generate_total