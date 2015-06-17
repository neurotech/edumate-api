# Edumate Toolbelt

An API for securely exposing data from Edumate.

## Resources

### Staff

A collection of unique users of various types.

URI               | Description
------------------|-------------------------------------
/staff            | Returns all current staff.
/staff/:id        | Returns the specified staff member.
/staff/teachers   | Returns all current teaching staff.
/staff/support    | Returns all current support staff.

### Reports

A collection of module reports stored in Edumate.

URI                       | Description
--------------------------|-----------------------------------------------
/reports/all              | Returns all module reports
/reports/module/:module   | Returns all module reports in specified module

### Periods

A collection of periods that make up the timetable for the current date.

URI                | Description
-------------------|-------------------------------------
/periods           | Returns all periods for current date
/periods/current   | Returns currently active period