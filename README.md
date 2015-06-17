# Edumate Toolbelt

An API for securely exposing data from Edumate.

## Resources

### Staff

Staff represents a collection of unique users of various types.

URI               | Description
------------------|-------------------------------------
/staff            | Returns all current staff.
/staff/:id        | Returns the specified staff member.
/staff/teachers   | Returns all current teaching staff.
/staff/support    | Returns all current support staff.

### Reports

Reports represents a collection of module reports stored in Edumate.

URI                       | Description
--------------------------|-----------------------------------------------
/reports/all              | Returns all module reports
/reports/module/:module   | Returns all module reports in specified module