CREATE OR REPLACE VIEW DB2INST1.VIEW_API_V1_AUDITS_CONTACTS_STUDENTS_EMAIL (
  CONTACT_ID,
  STUDENT_NAME,
  USERNAME,
  EMAIL_ADDRESS,
  FORM_RUN,
  FORM
) AS

WITH current_students AS (
  SELECT student.contact_id FROM TABLE(EDUMATE.get_currently_enroled_students(current date)) gces
  INNER JOIN student ON student.student_id = gces.student_id
)

SELECT * FROM (
  SELECT
    contact.contact_id,
    COALESCE(contact.preferred_name, contact.firstname) || ' ' || contact.surname AS "STUDENT_NAME",
    sys_user.username,
    contact.email_address,
    vsfr.form_run,
    REPLACE(vsfr.form, 'Year ', '') AS "FORM"
    
  FROM contact

  INNER JOIN student ON student.contact_id = contact.contact_id
  INNER JOIN sys_user ON sys_user.contact_id = contact.contact_id
  INNER JOIN view_student_form_run vsfr ON vsfr.student_id = student.student_id AND academic_year = YEAR(current date)

  WHERE contact.contact_id IN (SELECT contact_id FROM current_students) AND contact.email_address IS null

  ORDER BY vsfr.form_id ASC, contact.surname, contact.preferred_name, contact.firstname
)