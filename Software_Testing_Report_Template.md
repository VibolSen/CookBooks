# Software Testing Report (Template)

# **1\. Project Information**

Project Title: *Online Food Ordering System*

Course / Subject: *Software Testing*

Student Name(s): *Group 3*

Instructor: *Mr. Heng Chanarin*

Date: *May 26, 2026*

# **2\. System Overview**

Purpose: *Allow users to order food online from restaurants*

Target Users: *Students, staff, general users*

Main Features:

\- User registration & login

\- Browse menu

\- Place order

\- Payment system

# **3\. Testing Objectives**

\- Validate system functionality

\- Detect bugs in ordering and payment modules

\- Ensure system usability

# **4\. Testing Scope**

In Scope: *Login module, Order module, Payment module*

Out of Scope: *Third-party payment gateway performance*

# **5\. Testing Strategy / Approach**

Types: *Unit testing, Integration testing, System testing*

Methods: *Black-box testing for UI, White-box testing for API*

# **6\. Test Environment**

Hardware: *Laptop (Intel i5, 8GB RAM)*

Software: *Windows 11*

Browser: *Chrome, Edge*

Tools*: Postman, Selenium*

# **7\. Test Cases**

| Test Case ID | Test Scenario | Test Steps | Expected Result | Actual Result | Status | Remarks |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| TC01 | User Login (Valid) | Enter valid username & password | Login successful | Login successful | Pass | \- |
| TC02 | User Login (Invalid) | Enter wrong password | Error message displayed | No message shown | Fail | Bug found |
| TC03 | Place Order | Select item → Checkout | Order confirmed | Order confirmed | Pass | \- |
| TC04 | Payment Failure | Cancel payment | Show payment failed message | App crashes | Fail | Critical bug |

# **8\. Defect Report**

| Defect ID | Description | Severity | Steps to Reproduce | Status |
| :---- | :---- | :---- | :---- | :---- |
| D01 | No error message on invalid login | Medium | Enter wrong password | Open |
| D02 | App crash during payment cancel | Critical | Cancel payment process | Open |

# **9\. Test Results Summary**

Total Test Cases: 4

Passed: 2

Failed: 2

Blocked: 0

Pass Rate: 50%

# **10\. Challenges & Limitations**

\- Limited time for testing

\- Unable to test real payment system

\- Lack of automation tools experience

# **11\. Conclusion & Recommendations**

The system works for basic features but has critical issues in payment.

Recommendations:

\- Fix payment crash immediately

\- Improve error handling

\- Add more test cases