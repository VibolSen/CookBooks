-- -- Check if the admin user already exists
-- SELECT @admin_exists := COUNT(*) FROM users WHERE email = 'admin@gmail.com';

-- -- If the admin user doesn't exist, insert it
-- INSERT INTO users (name, email, password, is_admin)
-- SELECT 'Admin', 'admin@gmail.com', '1234', TRUE
-- WHERE @admin_exists = 0;

-- -- If the admin user exists, update their password and ensure they're an admin
-- UPDATE users 
-- SET password = '1234', is_admin = TRUE 
-- WHERE email = 'admin@gmail.com';

