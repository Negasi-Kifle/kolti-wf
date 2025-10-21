-- This script seeds sample data for demonstration purposes
-- Note: Replace the user_id with actual user IDs after signup

-- Sample linked accounts (update user_id after user creation)
-- INSERT INTO public.linked_accounts (user_id, account_name, account_number, account_type, provider_name, balance, currency, is_primary)
-- VALUES 
--   ('USER_ID_HERE', 'My Savings', '1000123456', 'bank', 'Commercial Bank of Ethiopia', 15234.50, 'ETB', true),
--   ('USER_ID_HERE', 'Checking Account', '2000234567', 'bank', 'Dashen Bank', 8500.00, 'ETB', false),
--   ('USER_ID_HERE', 'Telebirr Wallet', '0912345678', 'mobile_money', 'Telebirr', 1200.75, 'ETB', false);

-- Sample transactions (update user_id and account_id after creation)
-- INSERT INTO public.transactions (user_id, account_id, transaction_type, amount, currency, category, description, recipient_name, status, transaction_date)
-- VALUES 
--   ('USER_ID_HERE', 'ACCOUNT_ID_HERE', 'debit', 250.00, 'ETB', 'groceries', 'Sheger Supermarket', NULL, 'completed', NOW() - INTERVAL '1 hour'),
--   ('USER_ID_HERE', 'ACCOUNT_ID_HERE', 'credit', 2000.00, 'ETB', NULL, 'Transfer from Hana', 'Hana Bekele', 'completed', NOW() - INTERVAL '1 day'),
--   ('USER_ID_HERE', 'ACCOUNT_ID_HERE', 'debit', 150.00, 'ETB', 'dining', 'Kaldi''s Coffee', NULL, 'completed', NOW() - INTERVAL '2 days'),
--   ('USER_ID_HERE', 'ACCOUNT_ID_HERE', 'debit', 500.00, 'ETB', 'bills', 'Ethio Telecom Bill', NULL, 'completed', NOW() - INTERVAL '3 days'),
--   ('USER_ID_HERE', 'ACCOUNT_ID_HERE', 'debit', 1200.00, 'ETB', 'transport', 'Total Gas Station', NULL, 'completed', NOW() - INTERVAL '4 days'),
--   ('USER_ID_HERE', 'ACCOUNT_ID_HERE', 'transfer', 1000.00, 'ETB', NULL, 'Sent to Abebe K.', 'Abebe K.', 'completed', NOW() - INTERVAL '5 days');

-- Sample budgets (update user_id after creation)
-- INSERT INTO public.budgets (user_id, category, amount, spent, period, start_date, end_date)
-- VALUES 
--   ('USER_ID_HERE', 'groceries', 1000.00, 800.00, 'monthly', DATE_TRUNC('month', CURRENT_DATE), DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'),
--   ('USER_ID_HERE', 'transport', 800.00, 500.00, 'monthly', DATE_TRUNC('month', CURRENT_DATE), DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'),
--   ('USER_ID_HERE', 'bills', 1200.00, 1200.00, 'monthly', DATE_TRUNC('month', CURRENT_DATE), DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month');

-- Sample goals (update user_id after creation)
-- INSERT INTO public.goals (user_id, title, target_amount, current_amount, currency, deadline, icon, color)
-- VALUES 
--   ('USER_ID_HERE', 'Emergency Fund', 10000.00, 7500.00, 'ETB', CURRENT_DATE + INTERVAL '6 months', 'emergency', '#10b981'),
--   ('USER_ID_HERE', 'New Car', 50000.00, 12000.00, 'ETB', CURRENT_DATE + INTERVAL '2 years', 'car', '#f59e0b');

-- Sample insights (update user_id after creation)
-- INSERT INTO public.insights (user_id, insight_type, title, description, action_text, action_url, icon, priority)
-- VALUES 
--   ('USER_ID_HERE', 'savings', 'Savings Recommendation', 'You are close to your Emergency Fund goal. Consider setting up a recurring transfer.', 'See Details', '/goals', 'piggy-bank', 'high'),
--   ('USER_ID_HERE', 'market_trend', 'Market Trend: Inflation Watch', 'The Birr has weakened against the dollar. Here''s what that means for you.', 'Learn More', '/insights/market', 'trending-up', 'normal'),
--   ('USER_ID_HERE', 'educational', 'Educational Content', 'Learn more about budgeting basics and understanding inflation in Ethiopia.', 'Start Learning', '/learn', 'graduation-cap', 'normal'),
--   ('USER_ID_HERE', 'bill_reminder', 'Upcoming Bill', 'Ethio Telecom bill due on Oct 25th.', 'Pay Now', '/bills', 'file-text', 'high');
