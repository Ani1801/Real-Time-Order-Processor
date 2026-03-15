-- Seed Data for Real-Time Order Processing System

-- Optional: clean previous data
TRUNCATE TABLE payments, order_items, orders, inventory, products, users RESTART IDENTITY CASCADE;

---------------------------------------------------
-- USERS
---------------------------------------------------

INSERT INTO users (name, email) VALUES
('John Doe', 'john@example.com'),
('Jane Smith', 'jane@example.com'),
('Alice Brown', 'alice@example.com'),
('Michael Scott', 'michael@dundermifflin.com'),
('Pam Beesly', 'pam@dundermifflin.com');

---------------------------------------------------
-- PRODUCTS
---------------------------------------------------

INSERT INTO products (name, price, category) VALUES
('Quantum Slate Tablet', 899.99, 'Electronics'),
('Neural Link Headset', 299.00, 'Electronics'),
('Vortex Smart Watch', 199.50, 'Accessories'),
('Nebula Gaming Console', 499.00, 'Electronics'),
('Apex Wireless Earbuds', 149.99, 'Accessories'),
('Nova Mechanical Keyboard', 129.99, 'Office Supplies'),
('Orbit Wireless Mouse', 59.99, 'Office Supplies'),
('Zenith 4K Monitor', 399.99, 'Electronics');

---------------------------------------------------
-- INVENTORY
---------------------------------------------------

INSERT INTO inventory (product_id, available_stock, reserved_stock) VALUES
(1, 50, 0),
(2, 100, 0),
(3, 75, 0),
(4, 30, 0),
(5, 120, 0),
(6, 60, 0),
(7, 90, 0),
(8, 25, 0);

---------------------------------------------------
-- ORDERS
---------------------------------------------------

INSERT INTO orders (user_id, total_price, status) VALUES
(1, 1799.98, 'Processing'),
(2, 299.00, 'Pending'),
(3, 399.00, 'Paid');

---------------------------------------------------
-- ORDER ITEMS
---------------------------------------------------

INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES
(1, 1, 2, 899.99),
(2, 2, 1, 299.00),
(3, 3, 2, 199.50);

---------------------------------------------------
-- PAYMENTS
---------------------------------------------------

INSERT INTO payments (order_id, amount, status, transaction_id) VALUES
(1, 1799.98, 'Completed', 'TXN123456'),
(2, 299.00, 'Pending', NULL),
(3, 399.00, 'Completed', 'TXN987654');