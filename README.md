# **LaptopUtopia: E-Commerce for Computer Components**  

## **Project Overview**  
LaptopUtopia is a fully functional e-commerce platform for purchasing and assembling computer components. The project features a dynamic front-end built with Angular and a robust back-end developed using PHP, API endpoints, and MySQL for data storage and management.

---

## **Project Features**  

### **Frontend (Angular)**  
- Interactive user interface for browsing and purchasing computer components.  
- Dynamic cart and wishlist management.  
- User authentication and authorization system.  
- Dashboard for admin and user activities.  
- Real-time search and filters for products.  

### **Backend (PHP)**  
- RESTful API endpoints for front-end communication.  
- CRUD operations for product management, user accounts, and orders.  
- Secure authentication and session management.  
- MySQL database for data persistence.  

---

## **Folder Structure**  

- **Cart:** Handles cart operations, including add, update, and remove functionality.  
- **Complaints:** Manages user complaints and feedback submissions.  
- **Order:** Handles order processing and status tracking.  
- **Product:** Manages product catalog operations.  
- **Reviews:** Handles user reviews and ratings for products.  
- **User:** User account management, including authentication and profile updates.  
- **Wishlist:** Manages wishlist operations.  
- **dashboard:** Admin functionalities for managing users and products.  
- **filters:** Product filtering and sorting logic.  
- **search:** Search functionalities for quick product lookups.  
- **signlogs:** User authentication and logging activities.  

---

## **Installation Instructions**  

### **Frontend (Angular)**  

```
https://github.com/MoAdelEzz/Laptopia
```

### **Backend (PHP)**  

1. Set up a local server environment (e.g., XAMPP or WAMP).  
2. Clone the repository into the server's root directory:
   ```
   git clone https://github.com/AhmedZahran02/LaptopUtopia.git
   ```
3. Import the MySQL database:
   - Create a database named `laptop_utopia`.  
   - Import the provided SQL dump file from the `database` folder.

4. Update API configuration in `config.php` to match your database credentials:
   ```php
   define('DB_HOST', 'localhost');
   define('DB_USER', 'your_username');
   define('DB_PASS', 'your_password');
   define('DB_NAME', 'laptop_utopia');
   ```
5. Start the PHP server and ensure API endpoints are accessible.

---

## **Usage**  

1. **Browse Products:** Explore a variety of computer components.  
2. **Add to Cart/Wishlist:** Manage your selections.  
3. **Place Orders:** Complete the checkout process seamlessly.  
4. **User Dashboard:** Manage profile and order history.  
5. **Admin Dashboard:** Oversee product and user management.  

---

## **Contributing**  
Feel free to fork this repository, create feature branches, and submit pull requests for improvements.  

---

## **License**  
This project is open-source and available under the MIT License.

---
