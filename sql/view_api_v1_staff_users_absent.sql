SELECT
  staff.staff_number,
  COALESCE(contact.preferred_name, contact.firstname) AS FIRSTNAME,
  contact.surname,
  REPLACE(away_reason.away_reason, '&#039;', '''') AS AWAY_REASON,
  from_date,
  to_date

FROM staff_away

INNER JOIN staff ON staff.staff_id = staff_away.staff_id
INNER JOIN contact ON contact.contact_id = staff.contact_id
INNER JOIN away_reason ON away_reason.away_reason_id = staff_away.away_reason_id

WHERE (current date) BETWEEN DATE(from_date) AND DATE(to_date)

ORDER BY DATE(from_date) DESC, REPLACE(away_reason.away_reason, '&#039;', ''''), UPPER(contact.surname), contact.preferred_name, contact.firstname