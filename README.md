# Node-Rest-Shop
This is a simple Node Project to illustrate the building of Restful API using Node.JS and ExpressJS alongside with MongoDB as Back-end database.

### End Points
| No | Method | End Point | Description |
|--|--|--| -- |
| 1 | GET | /products/ | Get All Products from Database
| 2 | GET | /products/:productId |Get the Product Specified By the ID
| 3 | PATCH | /products/:productId |Update Product by ID.
| 4 | POST | /products/|Add New Product to Database.
| 5 | DELETE | /products/:productId | Delete Product by ID
| 6 | GET | /orders/ | Get All Orders from Database
| 7 | POST | /orders/ | Add New Order to Database.
| 8 | GET | /orders/:orderId | Get specific Order by Order ID.
| 9 | DELETE | /orders/:orderId | Delete Order By Id.
| 10 | POST | /user/signup | Sign Up a New User.
| 11 | POST | /user/login | Login the User and Get Token Back.
| 12 | DELETE | /user/:userId | Delete Specific User Based on the User ID.

The project uses the Nodemon to eliminate the need of the constant reload of the project.

