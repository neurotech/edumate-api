CREATE OR REPLACE VIEW DB2INST1.VIEW_API_V1_STUDENT_USERS (
  id,
  firstname,
  surname,
  gender,
  gender_short,
  email,
  house,
  home_room,
  form_short_name,
  form_run,
  freshness
) AS

WITH current_students AS (
  SELECT contact.contact_id
  FROM TABLE(EDUMATE.get_currently_enroled_students((current date))) gces
  INNER JOIN student ON student.student_id = gces.student_id
  INNER JOIN contact ON contact.contact_id = student.contact_id
)

SELECT * FROM (
  SELECT
    INTEGER(student.student_number) AS ID,
    COALESCE(contact.preferred_name, contact.firstname) AS "FIRSTNAME",
    REPLACE(contact.surname, '&#039;', '''') AS "SURNAME",
    gender.gender,
    LEFT(gender.gender, 1) AS "GENDER_SHORT",
    contact.email_address AS "EMAIL",
    REPLACE(LEFT(vsce.class, (LENGTH(vsce.class) - 14)), '&#039;', '''') AS "HOUSE",
    RIGHT(vsce.class, 3) AS "HOME_ROOM",
    form.short_name AS "FORM_SHORT_NAME",
    vsfr.form_run,
    (current timestamp) AS "FRESHNESS"

  FROM current_students

  INNER JOIN student ON student.contact_id = current_students.contact_id
  INNER JOIN contact ON contact.contact_id = current_students.contact_id
  INNER JOIN gender ON gender.gender_id = contact.gender_id
  INNER JOIN view_student_form_run vsfr ON vsfr.student_id = student.student_id
    AND vsfr.academic_year = YEAR(current date)
  INNER JOIN form ON form.form_id = vsfr.form_id
  INNER JOIN view_student_class_enrolment vsce ON vsce.student_id = student.student_id
    AND vsce.class_type_id = 2
    AND vsce.academic_year = YEAR(current date)

  ORDER BY UPPER(contact.surname), contact.preferred_name, contact.firstname
)