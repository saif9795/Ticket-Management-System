Ticket Management System


Description

This is a Ticket Management System built using Node.js and MongoDB. The system manages users, buses, and tickets, allowing users to book bus tickets and view available seats.


Features


User Management: User registration and role-based access (Admin/User).

Bus Management: Create, update, and manage bus and ticket details (admin).

Ticket Booking: Users can book tickets for buses and view their booking status.



Tech Stack

Backend: Node.js (Express.js)

Database: MongoDB

Others: JSON Web Token (JWT) for authentication, BcryptJS for hashing password



***.env file is open and upload for inspecting the project(not encouraged to push in github)



API Endpoints


Authentication APIs
- POST /auth/register: User registration.
- POST /auth/login: User login.
- POST /auth/logout: User logout.

Admin APIs
- POST /admin/bus: Add a new bus.
- PUT /admin/bus/:id: Update bus information.
- DELETE /admin/bus/:id: Delete a bus.
- POST /admin/ticket: Upload a new ticket for a specific bus and time.
- PUT /admin/ticket/:id: Update ticket information.
- DELETE /admin/ticket/:id: Delete a ticket.

User APIs
- GET /buses: View all available buses.
- GET /tickets: View available tickets for specific buses and time periods.
- POST /tickets/purchase: Purchase a ticket for a specific bus and time.

