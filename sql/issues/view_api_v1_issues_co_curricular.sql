CREATE OR REPLACE VIEW DB2INST1.VIEW_API_V1_ISSUES_CO_CURRICULAR (
  category,
  sort,
  issue,
  details,
  actual,
  expected,
  fix
) AS

WITH all_cc_issues AS (
  SELECT * FROM DB2INST1.view_api_v1_issues_co_curricular_overlong
  UNION ALL
  SELECT * FROM DB2INST1.view_api_v1_issues_co_curricular_duplicate
)

SELECT * FROM (
  SELECT *
  FROM all_cc_issues
)
