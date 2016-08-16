CREATE OR REPLACE VIEW DB2INST1.VIEW_API_V1_ISSUES_EMAIL_ADDRESSES (
  category,
  sort,
  issue,
  details,
  actual,
  expected,
  fix
) AS

WITH current_staff AS (
  SELECT 'Staff' AS "TYPE", contact_id FROM group_membership
  WHERE
    groups_id = 386
    AND
    effective_start <= (current date)
    AND
    (effective_end IS NULL OR effective_end > (current date))
),

current_students AS (
  SELECT 'Student' AS "TYPE", student.contact_id
  FROM TABLE(EDUMATE.get_currently_enroled_students(current date)) gces
  INNER JOIN student ON student.student_id = gces.student_id
),

all_users AS (
  SELECT * FROM current_staff
  UNION ALL
  SELECT * FROM current_students
)

SELECT * FROM (
  SELECT
    'Email' AS "CATEGORY",
    INTEGER(ROW_NUMBER() OVER (ORDER BY all_users.type ASC, UPPER(contact.surname), contact.preferred_name, contact.firstname)) AS "SORT",
    'No Email Address (' || all_users.type || ')' AS "ISSUE",
    COALESCE(contact.preferred_name, contact.firstname) || ' ' || contact.surname || ' (' || (CASE
      WHEN all_users.type = 'Staff' THEN staff.staff_number
      WHEN all_users.type = 'Student' THEN student.student_number
      ELSE '!'
    END) || ')' AS "DETAILS",
    '-' AS "ACTUAL",
    '-' AS "EXPECTED",
    'Update manually in Edumate' AS "FIX"

  FROM all_users

  INNER JOIN contact ON contact.contact_id = all_users.contact_id
  LEFT JOIN staff ON staff.contact_id = contact.contact_id AND all_users.type = 'Staff'
  LEFT JOIN student ON student.contact_id = contact.contact_id AND all_users.type = 'Student'

  WHERE contact.email_address IS null
)
