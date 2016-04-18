-- GRANT SELECT ON "DB2INST1"."VIEW_API_V1_STAFF_USERS_ABSENT" TO USER API

CREATE OR REPLACE VIEW DB2INST1.VIEW_API_V1_STAFF_USERS_ABSENT (
  sort_key,
  id,
  staff_id,
  away_reason,
  date_from,
  time_from,
  date_to,
  time_to,
  all_day_flag
) AS

WITH current_aways AS (
  SELECT
    staff_away.staff_away_id AS ID,
    staff.staff_number AS STAFF_ID,
    contact.preferred_name,
    contact.firstname,
    contact.surname,
    REPLACE(away_reason.away_reason, '&#039;', '''') AS AWAY_REASON,
    DATE(from_date) AS "DATE_FROM",
    TIME(from_date) AS "TIME_FROM",
    DATE(to_date) AS "DATE_TO",
    TIME(to_date) AS "TIME_TO",
    (CASE WHEN TIME(from_date) = '01:00:00' AND TIME(to_date) = '23:59:00' THEN 1 ELSE 0 END) AS "ALL_DAY_FLAG"
  
  FROM staff_away
  
  INNER JOIN staff ON staff.staff_id = staff_away.staff_id
  INNER JOIN contact ON contact.contact_id = staff.contact_id
  INNER JOIN away_reason ON away_reason.away_reason_id = staff_away.away_reason_id
  
  WHERE (current date) BETWEEN DATE(from_date) AND DATE(to_date)
)

SELECT
  INTEGER((ROW_NUMBER() OVER (ORDER BY date_from DESC, all_day_flag, time_from ASC, away_reason, UPPER(surname), preferred_name, firstname) + 99)) AS SORT_KEY,
  id,
  INTEGER(staff_id) AS STAFF_ID,
  away_reason,
  date_from,
  time_from,
  date_to,
  time_to,
  all_day_flag

FROM current_aways