# Edumate API

A collection of endpoints that serve various datasets from Edumate.

## Configuration

`edumate-api` requires the following environment variables to be set to function correctly:

Variable              | Default
----------------------|--------
EDUMATE_API_HTTP_HOST | `localhost`
EDUMATE_API_HTTP_PORT | `8000`
EDUMATE_HOST          |
EDUMATE_PORT          |
EDUMATE_PATH          |
EDUMATE_USERNAME      |
EDUMATE_PASSWORD      |

---

## Resources

### Staff

A collection of unique users of various types.

URI                   | Description
----------------------|----------------------------------------------------
/api/staff            | Returns all current staff.
/api/staff/:id        | Returns the specified staff member.
/api/staff/teachers   | Returns all current teaching staff.
/api/staff/support    | Returns all current support staff.
/api/staff/absent     | Returns all staff who are away for the current date

### Reports

A collection of module reports stored in Edumate.

URI                           | Description
------------------------------|-----------------------------------------------
/api/reports/all              | Returns all module reports
/api/reports/module/:module   | Returns all module reports in specified module

### Periods

A collection of periods that make up the timetable for the current date.

URI                    | Description
-----------------------|-------------------------------------
/api/periods           | Returns all periods for current date
/api/periods/current   | Returns currently active period
