# **RBAC Management System**

## **Overview**

The **RBAC Management System** (Role-Based Access Control) is a comprehensive web application designed to facilitate user and role management with dynamic permission assignment. The system is built to empower administrators to manage access control efficiently in any organization or system requiring robust user and role management.

---

## **Features**

### **1. User Management**
- **View Users:** A comprehensive table displays user details (name, email, roles, and status).
- **CRUD Operations:** 
  - Add new users.
  - Edit existing user details.
  - Delete users securely.
- **Role Assignment:** Assign or modify roles for users dynamically.
- **Status Management:** Toggle user statuses between active and inactive for better control.

### **2. Role Management**
- **Create Roles:** Define roles with specific attributes and permissions.
- **Edit Roles:** Modify existing roles to meet evolving requirements.
- **Delete Roles:** Safely remove roles no longer in use.

### **3. Dynamic Permissions**
- **Assign Permissions:** Add or modify permissions for roles.
- **Display Permissions:** Permissions are displayed clearly for ease of understanding.
- **Custom Attributes:** Support for custom attributes in roles, enhancing flexibility.

### **4. Custom API Simulation (Optional)**
- **Mock API Integration:** Simulated API calls for CRUD operations on users and roles.
- **Server Response Simulation:** Validate functionality by mimicking server behavior.

---

## **Technologies Used**

- **Frontend:** React.js, Tailwind CSS
- **Database:**  mocked data via `json-server` for simulation
- **Tooling:** ESLint, Prettier

---

## **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/rbac-management-system.git
   cd rbac-management-system

2. Install Dependencies:
   ```bash
   npm install

3. Start the development server:
   ```bash
   npm start

4. Start the backend server:
   ```bash
   npx json-server --watch src/mock/db.json --port 3001

5. Project started at:
   ```bash
   http://localhost:3000