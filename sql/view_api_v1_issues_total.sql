CREATE OR REPLACE VIEW DB2INST1.VIEW_API_V1_ISSUES_TOTAL (
  id,
  total_issues
) AS

WITH count_issues AS (
  SELECT COUNT(id) AS "TOTAL_ISSUES" FROM DB2INST1.view_api_v1_issues_missing_detention_classes
  --UNION ALL
  --SELECT COUNT(id) AS "TOTAL_ISSUES" FROM DB2INST1.view_api_v1_issues_ETC_ETC
),

generate_total AS (
  SELECT SUM(total_issues) AS "TOTAL_ISSUES" FROM count_issues
)

SELECT
  INTEGER(ROW_NUMBER() OVER ()) AS "ID",
  total_issues

FROM generate_total