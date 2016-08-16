CREATE OR REPLACE VIEW DB2INST1.VIEW_API_V1_ISSUES_PASTORAL (
  category,
  sort,
  issue,
  details,
  actual,
  expected,
  fix
) AS

WITH student_homerooms AS (
  SELECT student_id, class_id, class
  FROM view_student_class_enrolment vsce
  WHERE
    academic_year_id = (SELECT academic_year_id FROM academic_year WHERE academic_year = YEAR(current date))
    AND
    class_type_id = 2
    AND
    DATE(current date) BETWEEN vsce.start_date AND vsce.end_date
),

hr_house AS (
  SELECT
    student.student_id,
    student_homerooms.class AS "HR_FULL_NAME",
    LEFT(student_homerooms.class, (LENGTH(student_homerooms.class) - 14)) AS "HR",
    house.house

  FROM student

  INNER JOIN house ON house.house_id = student.house_id
  INNER JOIN student_homerooms ON student_homerooms.student_id = student.student_id
),

mismatched AS (
  SELECT * FROM hr_house WHERE hr != house
),

current_students AS (
  SELECT student.contact_id, 'Student' AS "TYPE" FROM TABLE(EDUMATE.get_currently_enroled_students(current date)) gces
  INNER JOIN student ON student.student_id = gces.student_id
  WHERE student.house_id IS null
),

current_staff AS (
  SELECT group_membership.contact_id, 'Staff' AS "TYPE" FROM group_membership
  INNER JOIN staff ON staff.contact_id = group_membership.contact_id
  WHERE
    groups_id = 386
    AND
    effective_start <= (current date)
    AND
    (effective_end IS null OR effective_end > (current date))
    AND
    staff.house_id IS null
),

combined AS (
  SELECT * FROM current_students
  UNION
  SELECT * FROM current_staff
),

missing_houses AS (
  SELECT
    'Pastoral' AS "CATEGORY",
    INTEGER(ROW_NUMBER() OVER (ORDER BY combined.type ASC, UPPER(contact.surname), contact.firstname)) AS "SORT",
    'Missing House (' || combined.type || ')' AS "ISSUE",
    COALESCE(contact.preferred_name, contact.firstname) || ' ' || contact.surname || ' (' || (CASE
      WHEN combined.type = 'Staff' THEN staff.staff_number
      WHEN combined.type = 'Student' THEN student.student_number
      ELSE ''
    END) || ')' AS "DETAILS",
    '-' AS "ACTUAL",
    '-' AS "EXPECTED",
    'Manually update in Edumate' AS "FIX"

  FROM combined
  INNER JOIN contact ON contact.contact_id = combined.contact_id
  LEFT JOIN staff ON staff.contact_id = contact.contact_id AND combined.type = 'Staff'
  LEFT JOIN student ON student.contact_id = contact.contact_id AND combined.type = 'Student'
),

mismatched_houses_homerooms AS (
  SELECT
    'Pastoral' AS "CATEGORY",
    INTEGER(ROW_NUMBER() OVER (ORDER BY vsfr.form_run, UPPER(contact.surname), contact.firstname, mismatched.hr_full_name, mismatched.house)) AS "SORT",
    'Mismatched House and Home Room' AS "ISSUE",
    COALESCE(contact.preferred_name, contact.firstname) || ' ' || contact.surname || ' (' || vsfr.form_run || ')' AS "DETAILS",
    REPLACE(mismatched.house, '&#039;', '''') AS "ACTUAL",
    REPLACE(mismatched.hr, '&#039;', '''') AS "EXPECTED",
    'Manually update in Edumate' AS "FIX"

  FROM mismatched

  INNER JOIN view_student_form_run vsfr ON vsfr.student_id = mismatched.student_id AND academic_year = YEAR(current date)
  INNER JOIN student ON student.student_id = mismatched.student_id
  INNER JOIN contact ON contact.contact_id = student.contact_id
),

final_report AS (
  SELECT * FROM mismatched_houses_homerooms
  UNION ALL
  SELECT * FROM missing_houses
)
SELECT * FROM (
  SELECT
    category,
    sort,
    issue,
    details,
    actual,
    expected,
    fix

  FROM final_report
  
  ORDER BY issue, sort
)