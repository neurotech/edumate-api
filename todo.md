# To Do

## June 14, 2015

### Hapi

 - Add routes for /staff/absent, /staff/{id}/absent

---

# Done

### Hapi

 - Modularise API routes to separate lib

### node-edumate

 - Update node-edumate to include the sanitize function

### RethinkDB

 - Remove references to sanitize in rethinkdb lib
 - Rename `var rethinkdb` to `var db`
 - Add `timetable.replaceJob` function to timetable.js that replaces the contents of a table no matter what
 - Review insertTable vs replaceTable