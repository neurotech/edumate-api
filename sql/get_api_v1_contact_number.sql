CREATE OR REPLACE FUNCTION DB2INST1.GET_API_V1_CONTACT_NUMBER(ID INTEGER)

RETURNS TABLE ( CONTACT_NUMBER INTEGER )

LANGUAGE SQL
BEGIN ATOMIC
RETURN

  WITH staff_list AS (
    SELECT staff_number, null AS student_number FROM staff WHERE contact_id = ID
  ),
  
  student_list AS (
    SELECT null AS staff_number, student_number FROM student WHERE contact_id = ID
  ),

  combined AS (
    SELECT * FROM student_list
    UNION
    SELECT * FROM staff_list
  )

  SELECT COALESCE(staff_number, student_number) AS "CONTACT_NUMBER" FROM combined;
END