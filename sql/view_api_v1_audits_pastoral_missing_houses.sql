CREATE OR REPLACE VIEW DB2INST1.VIEW_API_V1_AUDITS_PASTORAL_MISSING_HOUSES (
  CONTACT_ID,
  CONTACT_TYPE,
  CONTACT_NAME
) AS

WITH current_students AS (
  SELECT student.contact_id, 'Student' AS "CONTACT_TYPE" FROM TABLE(EDUMATE.get_currently_enroled_students(current date)) gces
  INNER JOIN student ON student.student_id = gces.student_id
  WHERE student.house_id IS null
),

current_staff AS (
  SELECT group_membership.contact_id, 'Staff' AS "CONTACT_TYPE" FROM group_membership
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
)

SELECT * FROM (
  SELECT
    combined.contact_id,
    combined.contact_type,
    COALESCE(contact.preferred_name, contact.firstname) || ' ' || contact.surname AS "CONTACT_NAME"

  FROM combined
  INNER JOIN contact ON contact.contact_id = combined.contact_id
  ORDER BY contact_type DESC, UPPER(contact.surname), contact.preferred_name, contact.firstname
)