CREATE OR REPLACE VIEW DB2INST1.VIEW_API_V1_ISSUES (
  id,
  category,
  sort,
  issue,
  details,
  actual,
  expected,
  fix,
  freshness
) AS

WITH class_type_issues AS (
  SELECT
    TO_CHAR(category) AS "CATEGORY",
    INTEGER(sort) AS "SORT",
    TO_CHAR(issue) AS "ISSUE",
    TO_CHAR(details) AS "DETAILS",
    TO_CHAR(actual) AS "ACTUAL",
    TO_CHAR(expected) AS "EXPECTED",
    TO_CHAR(fix) AS "FIX"

  FROM DB2INST1.view_api_v1_issues_class_type
),

co_curricular_issues AS (
  SELECT
    TO_CHAR(category) AS "CATEGORY",
    INTEGER(sort) AS "SORT",
    TO_CHAR(issue) AS "ISSUE",
    TO_CHAR(details) AS "DETAILS",
    TO_CHAR(actual) AS "ACTUAL",
    TO_CHAR(expected) AS "EXPECTED",
    TO_CHAR(fix) AS "FIX"

  FROM DB2INST1.view_api_v1_issues_co_curricular
),

detention_issues AS (
  SELECT
    TO_CHAR(category) AS "CATEGORY",
    INTEGER(sort) AS "SORT",
    TO_CHAR(issue) AS "ISSUE",
    TO_CHAR(details) AS "DETAILS",
    TO_CHAR(actual) AS "ACTUAL",
    TO_CHAR(expected) AS "EXPECTED",
    TO_CHAR(fix) AS "FIX"

  FROM DB2INST1.view_api_v1_issues_detention
),

email_addresses_issues AS (
  SELECT
    TO_CHAR(category) AS "CATEGORY",
    INTEGER(sort) AS "SORT",
    TO_CHAR(issue) AS "ISSUE",
    TO_CHAR(details) AS "DETAILS",
    TO_CHAR(actual) AS "ACTUAL",
    TO_CHAR(expected) AS "EXPECTED",
    TO_CHAR(fix) AS "FIX"

  FROM DB2INST1.view_api_v1_issues_email_addresses
),

pastoral_issues AS (
  SELECT
    TO_CHAR(category) AS "CATEGORY",
    INTEGER(sort) AS "SORT",
    TO_CHAR(issue) AS "ISSUE",
    TO_CHAR(details) AS "DETAILS",
    TO_CHAR(actual) AS "ACTUAL",
    TO_CHAR(expected) AS "EXPECTED",
    TO_CHAR(fix) AS "FIX"

  FROM DB2INST1.view_api_v1_issues_pastoral
),

all_issues AS (
  SELECT * FROM class_type_issues
  UNION ALL
  SELECT * FROM co_curricular_issues
  UNION ALL
  SELECT * FROM detention_issues
  UNION ALL
  SELECT * FROM email_addresses_issues
  UNION ALL
  SELECT * FROM pastoral_issues
)

SELECT * FROM (
  SELECT
    INTEGER(ROW_NUMBER() OVER ()) AS "ID",
    category,
    sort,
    issue,
    details,
    actual,
    expected,
    fix,
    (current timestamp) AS "FRESHNESS"
  
  FROM all_issues
  
  ORDER BY category, sort
)