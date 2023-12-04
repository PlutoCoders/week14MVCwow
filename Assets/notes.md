<!-- to do -->
- table of users
- each users has a user id (unique)
- (sql auto increment id can be a simple method to do that)

- seperate table of posts
- each post will have a unique id
- unique author id which will be the user id (foreign key = primary key of the user) (relational key)

- array.filter (from all the posts, filter it down to the posts that are unique to your account/user id) (to see all the posts you authored)
- login form for adding new users (post method)
- new post form (title + description)
- date created of the post will be captured (on submit, will be put into the post)