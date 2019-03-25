# Issue tracker application: Java -- Web engineering

The final version of the issue tracker application can be found amoung the files in Canvas. Beside the features implemented on the practice lessons, it contains the followings:

- Many-to-many relationship between issues and labels. The labels can be set during issue creation and issue editing with a checkbox list. Analyze the Issue and Label entities for creating the many-to-many connection, and the IssueController class to use this relation.
- Finalized the authentication process with a custom login form and against our own user entity. Just follow the steps in the corresponding tutorial and check the code how it was realized.
- Connected the issues to users with a many-to-one relationship. Now on issue creation we need to put the authenticated user into the issue, and select only those issues which are connected to this user. On issue editing the same has to be done. Check the entities and the IssueController for the implementation details.
- Introduced roles. Users with ROLE_ADMIN has the privilege to edit issues. This protection is done in the Thymeleaf tenplates during rendering and in the controller methods with the help of method security. See details in the controller!
- Finally, I seeded the database with some user information, and encrypted them on application startup. In import.sql file I used plain passwords, but on application startup I encrypted them with the bcrypt algorithm. I used application events to solve this.
