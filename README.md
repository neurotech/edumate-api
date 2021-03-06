# Edumate API

A collection of endpoints that serve various datasets from Edumate.

## Configuration

`edumate-api` requires the following environment variables to be set to function correctly:

Variable               | Default
-----------------------|--------
EDUMATE_API_HTTP_PORT  | `8000`
EDUMATE_HOST           |
EDUMATE_PORT           |
EDUMATE_PATH           |
EDUMATE_USERNAME       |
EDUMATE_PASSWORD       |
RETHINKDB_HOST         |
RETHINKDB_PORT         |
EDUMATE_API_JWT_SECRET |

---

## Resources

### Staff

A collection of unique users of various types.

URI                      | Description
-------------------------|----------------------------------------------------
/api/staff               | Returns all current staff
/api/staff/:id           | Returns the specified staff member
/api/staff/teachers      | Returns all current teaching staff
/api/staff/support       | Returns all current support staff
/api/staff/absent/now    | Returns all staff who are absent right now
/api/staff/absent/soon   | Returns all staff who are absent any time from now
/api/staff/absent/allday | Returns all staff who are absent all day
/api/staff/absent/today  | Returns all staff who are absent today

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

---

## TODO

 - Add checks for `EDUMATE_API_JWT_SECRET` to bootstrap.sh

### Add more resources:

### Staff/Misc

 - Summary for Chart.js - Staff Absent
 - Staff covers (now/soon/today)
 - Events for today (now/soon/today)
 - `/picnic/config` for securely serving Picnic config JSON?
 - Report periods (due date, complete/incomplete stats)

### Students

 - TBD
