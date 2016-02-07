CREATE OR REPLACE VIEW DB2INST1.VIEW_API_V1_AUDITS_CLASS_TYPE (
  CLASS_ID,
  CLASS,
  ACTUAL,
  EXPECTED
) AS

WITH home_rooms AS (
  SELECT
    '1' AS "SORT_ORDER",
    class_id,
    class,
    class_type.class_type AS "ACTUAL",
    (SELECT class_type FROM class_type WHERE class_type_id = 2) AS "EXPECTED"
  
  FROM class
  
  INNER JOIN class_type ON class_type.class_type_id = class.class_type_id
  INNER JOIN course ON course.course_id = class.course_id
  
  WHERE
    academic_year_id = (SELECT academic_year_id FROM academic_year WHERE academic_year = YEAR(current date))
    AND
    class.class_type_id = 1
    AND
    course.code LIKE '%Home Room%'
),

cc AS (
  SELECT
    '2' AS "SORT_ORDER",
    class_id,
    class,
    class_type.class_type AS "ACTUAL",
    (SELECT class_type FROM class_type WHERE class_type_id = 4) AS "EXPECTED"
  
  FROM class
  
  INNER JOIN class_type ON class_type.class_type_id = class.class_type_id
  INNER JOIN course ON course.course_id = class.course_id
  
  WHERE
    academic_year_id = (SELECT academic_year_id FROM academic_year WHERE academic_year = YEAR(current date))
    AND
    class.class_type_id = 1
    AND
    (course.code LIKE 'CS%'
    OR
    course.code LIKE 'CR%')
),

lifeskills AS (
  SELECT
    '3' AS "SORT_ORDER",
    class_id,
    class,
    class_type.class_type AS "ACTUAL",
    (SELECT class_type FROM class_type WHERE class_type_id = 10) AS "EXPECTED"
  
  FROM class
  
  INNER JOIN class_type ON class_type.class_type_id = class.class_type_id
  INNER JOIN course ON course.course_id = class.course_id
  
  WHERE
    academic_year_id = (SELECT academic_year_id FROM academic_year WHERE academic_year = YEAR(current date))
    AND
    class.class_type_id = 1
    AND
    class.class LIKE '%Life Skills%'
),

combined AS (
  SELECT * FROM lifeskills
  UNION
  SELECT * FROM cc
  UNION
  SELECT * FROM home_rooms
)

SELECT * FROM (
  SELECT class_id, class, actual, expected FROM combined
  ORDER BY sort_order, class
)