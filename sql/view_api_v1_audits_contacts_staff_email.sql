CREATE OR REPLACE VIEW DB2INST1.VIEW_API_V1_AUDITS_CONTACTS_STAFF_EMAIL (
  CONTACT_ID,
  STAFF_NAME,
  USERNAME,
  EMAIL_ADDRESS
) AS

WITH current_staff AS (
  SELECT contact_id FROM group_membership
  WHERE
    groups_id = 386
    AND
    effective_start <= (current date)
    AND
    (effective_end IS NULL OR effective_end > (current date))
)

SELECT * FROM (
  SELECT
    contact.contact_id,
    COALESCE(contact.preferred_name, contact.firstname) || ' ' || contact.surname AS "STAFF_NAME",
    sys_user.username,
    contact.email_address
    
  FROM contact

  INNER JOIN staff ON staff.contact_id = contact.contact_id
  INNER JOIN sys_user ON sys_user.contact_id = contact.contact_id

  WHERE contact.contact_id IN (SELECT contact_id FROM current_staff) AND contact.email_address IS null

  ORDER BY contact.surname, contact.preferred_name, contact.firstname
)