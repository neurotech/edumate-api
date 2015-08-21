CREATE OR REPLACE VIEW DB2INST1.VIEW_API_V1_PERIODS (
  ID,
  CURRENT,
  WEEK,
  PERIOD,
  SHORT_NAME,
  PERIOD_TYPE,
  START_TIME,
  END_TIME,
  AM_PM
) AS

WITH periods AS (
  SELECT
    (CASE
      WHEN period.period = 'CoCurricular' THEN 'Co-Curricular'
      WHEN period.period = 'Period 7' THEN 'After School'
      ELSE period.period
    END) AS "PERIOD",
    (CASE WHEN period.short_name = '7' THEN 'AS' ELSE period.short_name END) AS "SHORT_NAME",
    period_type.period_type,
    (period.start_time - 1 MINUTE) AS "START_TIME",
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
    ((SELECT end_of_day FROM gates)) AS "START_TIME",
    TIME('23:59:00') AS "END_TIME",
    'Evening' AS "AM_PM"

  FROM SYSIBM.SYSDUMMY1
),

current_week AS (
  SELECT
    (SELECT (int(days(current date) / 7) - int(days(term.start_date) / 7)) +1 FROM sysibm.sysdummy1) AS "WEEK",
    (CASE
      WHEN gtcdd.day_index BETWEEN 1 and 5 THEN 'A'
      WHEN gtcdd.day_index BETWEEN 6 and 10 THEN 'B'
    ELSE '' END) AS "AB"

  FROM TABLE(EDUMATE.get_timetable_cycle_day_date((current date), (current date))) gtcdd

  INNER JOIN timetable ON timetable.timetable_id = gtcdd.timetable_id
  INNER JOIN term ON term.timetable_id = gtcdd.timetable_id

  WHERE
    timetable.default_flag = 1
    AND
    (current date) BETWEEN term.start_date AND term.end_date
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
    (SELECT week || ab FROM current_week) AS "WEEK",
    period,
    short_name,
    period_type,
    start_time,
    end_time,
    am_pm

  FROM combined

  ORDER BY start_time
)