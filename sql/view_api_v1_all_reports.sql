CREATE OR REPLACE VIEW DB2INST1.VIEW_API_V1_ALL_REPORTS (
  id,
  module,
  kind,
  heading,
  report_name,
  description,
  freshness
) AS

SELECT * FROM (
  SELECT
    module_report_new.module_report_new_id AS "ID",
    module.module AS "MODULE",
    (CASE WHEN module_report_kind.module_report_kind = 'Module Report' THEN 'Module' ELSE module_report_kind.module_report_kind END) AS "KIND",
    module_reports_heading AS "HEADING",
    REPLACE(module_report_new, '&#039;', '''') AS "REPORT_NAME",
    module_report_new.description AS "DESCRIPTION",
    (current timestamp) AS "FRESHNESS"

  FROM module_report_new

  INNER JOIN module ON module.module_id = module_report_new.module_id
  LEFT JOIN module_reports_heading on module_report_new.module_heading_id = module_reports_heading.module_reports_heading_id
  INNER JOIN module_report_kind ON module_report_kind.module_report_kind_id = module_report_new.module_report_kind_id

  ORDER BY module.module, kind, (CASE WHEN module_reports_heading IS null THEN '-' ELSE module_reports_heading END), module_report_new
)
