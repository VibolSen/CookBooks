# Software Testing Report

# **1. Project Information**

Project Title: *CookBook Recipe Management Platform*

Course / Subject: *Software Testing*

Student Name(s): *Group 3*

Instructor: *Mr. Heng Chanarin*

Date: *May 26, 2026*

# **2. System Overview**

Purpose: *A premium, modern recipe management platform focusing on a vibrant community of chefs and food enthusiasts to manage, share, discover, and review recipes.*

Target Users: *Home cooks, professional chefs, food bloggers, and general food enthusiasts.*

Main Features:
- User registration, authentication, and secure login (Credentials & Google OAuth)
- Recipe CRUD operations (Create, Read, Update, Delete) with multi-image support via Cloudinary
- Recipe categorization and filtering by diet, occasion, or cuisine
- Community interactions (Rating and review system with stars and comments)
- Favorites and Saved Recipes list management
- Events management (Admin scheduling and management of culinary events)
- Interactive Admin Dashboard (Full administrative control over users, recipes, categories, occasions, and events)

# **3. Testing Objectives**

- Validate system functionality across all modules (Recipes, Auth, Reviews, Admin Panel, Events, Occasions, Categories).
- Ensure role-based access controls and permissions are secure (e.g., verifying admin panel redirects for unauthorized users).
- Detect and record bugs, edge cases, and usability improvements.
- Verify data persistence and relationship integrity in MongoDB through Prisma ORM.

# **4. Testing Scope**

In Scope:
- **Authentication**: Registration, Login, logout, profile updates, and password changes.
- **Recipe Management**: Create, read, edit, and delete recipes, including Cloudinary image uploads.
- **Reviews & Ratings**: Submitting reviews, calculating and updating average ratings.
- **Admin Features**: CRUD for categories, occasions, events, user list, and recipe moderation.
- **Saved Recipes**: Adding and removing recipes to/from the favorites list.

Out of Scope:
- **Third-party system uptime & rate limits** (Cloudinary API, Google OAuth provider availability)
- **High-concurrency load testing** and automated stress performance testing
- **External email service integrations**

# **5. Testing Strategy / Approach**

Types: *Functional testing, Integration testing, System testing, Role-based security testing, User Acceptance Testing (UAT)*

Methods: *Black-box testing for user interface functions, White-box testing for Next.js Server Actions and Prisma query handlers*

# **6. Test Environment**

Hardware: *Developer Laptop (Intel Core i7, 16GB RAM)*

Software: *Windows 11, Node.js v18+, MongoDB (Atlas)*

Browser: *Google Chrome, Microsoft Edge, Safari*

Tools: *Next.js Dev Server (Turbopack), Prisma Studio, Chrome DevTools, Postman*

# **7. Test Cases**

| Test Case ID | Test Scenario | Test Steps | Expected Result | Actual Result | Status | Remarks |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| TC01 | User Registration (Valid) | Enter unique email, name, password, submit form | Account created successfully; user redirected to Login | Account created successfully; redirected to Login | Pass | - |
| TC02 | User Registration (Duplicate Email) | Register using an already existing email address | Show error message "User already exists" | Error message "User already exists" displayed | Pass | - |
| TC03 | User Login (Valid Credentials) | Enter correct email and password, submit | Login successful; session active; redirect to home page | Login successful; redirected to home page | Pass | - |
| TC04 | User Login (Invalid Credentials) | Enter incorrect password for existing user | NextAuth error thrown; login blocked; error message shown | Login blocked; "Invalid password" error shown | Pass | - |
| TC05 | Create Recipe (Valid) | Fill fields, upload recipe images, and click submit | Recipe added to database; images hosted on Cloudinary; recipe displays on home page | Recipe added; images shown correctly | Pass | - |
| TC06 | Create Recipe (Missing Required Fields) | Submit form with empty title or ingredients | Form submission prevented; inputs highlight validation error | Client blocks submission; shows validation warnings | Pass | - |
| TC07 | Submit Recipe Review | Select 4 stars, write a comment, and submit | Review successfully saved; average rating updated and shown | Review posted; average rating updated | Pass | - |
| TC08 | Admin Access Security | Regular user attempts to access `/admin/dashboard` | Layout checks role and redirects unauthorized user to `/` | User redirected to `/` home page | Pass | Next.js layout hook blocks access |
| TC09 | Admin Create Category | Enter category details, upload icon, and submit | New category saved and rendered in public lists | Category saved and visible | Pass | - |
| TC10 | Cloudinary upload error recovery | Attempt to upload corrupt file format as recipe image | System rejects invalid format and displays user-friendly error | Application shows error; database entry is rolled back | Fail | Needs improved file-format validation checks on Server Action |

# **8. Defect Report**

| Defect ID | Description | Severity | Steps to Reproduce | Status |
| :---- | :---- | :---- | :---- | :---- |
| D01 | Corrupt file format crashes Server Action | Medium | Upload a non-image file renamed to `.jpg` inside recipe form | Open |
| D02 | Slow Cloudinary response blocks form submission indefinitely | Medium | Throttle network, upload large image, click submit | Open |

# **9. Test Results Summary**

Total Test Cases: 10

Passed: 9

Failed: 1

Blocked: 0

Pass Rate: 90%

# **10. Challenges & Limitations**

- **No automated testing framework**: All tests were executed manually on the local development setup, which limits coverage of regression tests.
- **Third-party dependencies**: Testing and mocking Cloudinary image uploads and Google OAuth responses under offline conditions is difficult.
- **State validation**: Database status is manually monitored using Prisma Studio since there is no test environment hook.

# **11. Conclusion & Recommendations**

The CookBook system functions successfully for the core recipe management, user authentication, and administrator controls. It is responsive, premium, and meets standard user requirements. However, some file validation and error loading state improvements are required.

Recommendations:
- **Integrate Automated Tests**: Add Jest or Vitest for Server Actions, and Playwright for E2E tests.
- **Add Error Boundaries**: Add graceful error boundaries for external API failures (Cloudinary, Auth provider).
- **Environment Isolation**: Configure a separate MongoDB test database for test runs to keep development data intact.
