CREATE OR REPLACE VIEW DB2INST1.VIEW_API_V1_PERIODS (
  ID,
  CURRENT,
  PERIOD,
  SHORT_NAME,
  PERIOD_TYPE,
  START_TIME,
  END_TIME,
  AM_PM
) AS

WITH periods AS (
  SELECT
    (CASE WHEN period.period = 'CoCurricular' THEN 'Co-Curricular' ELSE period.period END) AS "PERIOD",
    period.short_name,
    period_type.period_type,
    period.start_time,
    period.end_time,
    am_pm.am_pm
  
  FROM TABLE(EDUMATE.get_timetable_cycle_day_date((current date), (current date))) gt
  
  INNER JOIN period_cycle_day pcd ON pcd.cycle_day_id = gt.cycle_day_id
  INNER JOIN period ON period.period_id = pcd.period_id
  INNER JOIN period_type ON period_type.period_type_id = period.period_type_id
  INNER JOIN am_pm ON am_pm.am_pm_id = period.am_pm_id
  
  WHERE timetable_id = (
    SELECT timetable_id FROM timetable tt
    WHERE tt.default_flag = 1 AND tt.academic_year_id = (
      SELECT academic_year_id FROM academic_year WHERE academic_year = TO_CHAR((current date), 'YYYY')
    )
  )
),

gates AS (
  SELECT
    MIN(start_time) AS "START_OF_DAY",
    MAX(end_time) AS "END_OF_DAY"
  
  FROM periods
),

dawn AS (
  SELECT
    'School Closed' AS "PERIOD",
    'SC' AS "SHORT_NAME",
    'Closed' AS "PERIOD_TYPE",
    TIME('00:01:00') AS "START_TIME",
    ((SELECT start_of_day FROM gates) - 1 MINUTE) AS "END_TIME",
    'Dawn' AS "AM_PM"
  
  FROM SYSIBM.SYSDUMMY1
),

dusk AS (
  SELECT
    'School Closed' AS "PERIOD",
    'SC' AS "SHORT_NAME",
    'Closed' AS "PERIOD_TYPE",
    ((SELECT end_of_day FROM gates) + 1 MINUTE) AS "START_TIME",
    TIME('23:59:00') AS "END_TIME",
    'Evening' AS "AM_PM"

  FROM SYSIBM.SYSDUMMY1
),

combined AS (
  SELECT * FROM dawn
  UNION ALL
  SELECT * FROM periods
  UNION ALL
  SELECT * FROM dusk 
)

SELECT * FROM (
  SELECT
    ROW_NUMBER() OVER () AS "ID",
    (CASE WHEN (current time) BETWEEN start_time AND end_time THEN 1 ELSE 0 END) AS "CURRENT",
    period,
    short_name,
    period_type,
    start_time,
    end_time,
    am_pm

  FROM combined

  ORDER BY start_time
)