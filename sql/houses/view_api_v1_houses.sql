CREATE OR REPLACE VIEW DB2INST1.VIEW_API_V1_HOUSES (
  id,
  house,
  primary_colour,
  freshness
) AS

WITH houses AS (
  SELECT * FROM house
  WHERE status_flag = 0
)

SELECT * FROM (
  SELECT
    INTEGER(house_id) AS "ID",
    REPLACE(house, '&#039;', '''') AS "HOUSE",
    primary_colour,
    (current timestamp) AS "FRESHNESS"
  FROM houses
  
  ORDER BY UPPER(REPLACE(house, '&#039;', '')) ASC
)