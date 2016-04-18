-- GRANT SELECT ON "DB2INST1"."VIEW_API_V1_STAFF_USERS" TO USER API

CREATE OR REPLACE VIEW DB2INST1.VIEW_API_V1_STAFF_USERS (
  staff_id,
  salutation,
  firstname,
  surname,
  email,
  teacher,
  support,
  start_date,
  house
) AS

WITH current_staff AS (
  SELECT contact_id FROM group_membership
  -- The group with the ID of 386 is 'Current Staff'
  WHERE
    groups_id = 386
    AND
    (effective_end IS NULL
    OR
    effective_end > (current date))
)

SELECT * FROM (
  SELECT
    INTEGER(staff.staff_number) AS ID,
    salutation.salutation,
    COALESCE(contact.preferred_name, contact.firstname) AS "FIRSTNAME",
    REPLACE(contact.surname, '&#039;', '''') AS "SURNAME",
    contact.email_address AS "EMAIL",
    (CASE WHEN teacher_status.groups_id = 2 THEN 'true' ELSE 'false' END) AS "TEACHER",
    (CASE WHEN support_status.groups_id = 602 THEN 'true' ELSE 'false' END) AS "SUPPORT",
    staff_employment.start_date,
    (CASE WHEN house.house IS null THEN 'None' ELSE REPLACE(house.house, '&#039;', '''') END) AS "HOUSE"

  FROM current_staff

  INNER JOIN staff ON staff.contact_id = current_staff.contact_id
  INNER JOIN staff_employment ON staff_employment.staff_id = staff.staff_id
  LEFT JOIN house ON house.house_id = staff.house_id
  INNER JOIN contact ON contact.contact_id = current_staff.contact_id
  LEFT JOIN salutation ON salutation.salutation_id = contact.salutation_id

  -- The group with the ID of 2 is 'Current Teachers'
  -- The group with the ID of 602 is 'Current Support Staff'
  LEFT JOIN group_membership teacher_status ON teacher_status.contact_id = current_staff.contact_id
    AND teacher_status.groups_id = 2
    AND (teacher_status.effective_end IS NULL
    OR teacher_status.effective_end > (current date))

  LEFT JOIN group_membership support_status ON support_status.contact_id = current_staff.contact_id
    AND support_status.groups_id = 602
    AND (support_status.effective_end IS NULL OR support_status.effective_end > (current date))

  ORDER BY UPPER(contact.surname), contact.preferred_name, contact.firstname
)
