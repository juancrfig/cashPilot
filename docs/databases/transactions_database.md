# TRANSACTIONS DATABASE DOCUMENTATION

### CATEGORIES Table
Defines transaction categories for organizing income and expenses.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | uuid | PRIMARY KEY | Unique category identifier |
| `user_id` | uuid | NOT NULL | Reference to the category owner |
| `name` | varchar | NOT NULL | Category name (e.g., "Food", "Rent", "Salary") |
| `icon` | varchar | | Icon identifier for UI display |
| `color` | varchar | | Color code for visual identification |
| `type` | CategoryType | ENUM | Category type (income/outcome/both) |
| `is_default` | boolean | | Flag indicating if this is a default system category |
| `created_at` | timestamp | | Category creation timestamp |

### TRANSACTIONS Table
Records individual financial transactions (income and expenses).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | uuid | PRIMARY KEY | Unique transaction identifier |
| `user_id` | uuid | NOT NULL | Reference to the transaction owner |
| `category_id` | uuid | NULLABLE, FK → CATEGORIES.id | Reference to transaction category |
| `payment_method_id` | uuid | NULLABLE, FK → PAYMENT_METHODS.id | Reference to payment method used |
| `type` | TransactionType | ENUM | Transaction type (income/outcome) |
| `amount` | decimal | NOT NULL | Transaction amount |
| `currency` | varchar | | Currency code (e.g., "USD", "EUR", "COP") |
| `description` | text | | Additional transaction details or notes |
| `transaction_date` | date | | Date when transaction occurred |
| `created_at` | timestamp | | Record creation timestamp |
| `updated_at` | timestamp | | Last update timestamp |

### BUDGETS Table
Defines spending budgets for specific categories and time periods.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | uuid | PRIMARY KEY | Unique budget identifier |
| `user_id` | uuid | NOT NULL | Reference to the budget owner |
| `category_id` | uuid | NULLABLE, FK → CATEGORIES.id | Reference to category being budgeted |
| `amount` | decimal | NOT NULL | Budget amount limit |
| `period` | periodType | ENUM | Budget period (weekly/monthly/yearly) |
| `created_at` | timestamp | | Budget creation timestamp |

### RECURRING_TRANSACTIONS Table
Manages automatic recurring transactions (subscriptions, regular bills, salaries).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | uuid | PRIMARY KEY | Unique recurring transaction identifier |
| `user_id` | uuid | NOT NULL | Reference to the transaction owner |
| `category_id` | uuid | NULLABLE, FK → CATEGORIES.id | Reference to transaction category |
| `payment_method_id` | uuid | NULLABLE, FK → PAYMENT_METHODS.id | Reference to payment method |
| `type` | TransactionType | ENUM | Transaction type (income/outcome) |
| `amount` | decimal | NOT NULL | Transaction amount |
| `description` | text | | Transaction description or notes |
| `frequency` | Frequency | ENUM | Recurrence frequency (daily/weekly/monthly/yearly) |
| `start_date` | date | | Date when recurrence begins |
| `end_date` | date | | Optional end date for recurrence (null = indefinite) |
| `is_active` | boolean | | Flag indicating if recurrence is currently active |
| `created_at` | timestamp | | Record creation timestamp |

### PAYMENT_METHODS Table
Stores available payment methods for transactions.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | uuid | PRIMARY KEY | Unique payment method identifier |
| `user_id` | uuid | NOT NULL | Reference to the method owner |
| `name` | varchar | NOT NULL | Payment method name (e.g., "Chase Visa", "Cash", "PayPal") |
| `type` | PaymentType | ENUM | Payment method type (cash/credit_card/debit_card/digital_wallet) |
| `icon` | varchar | | Icon identifier for UI display |
| `color` | varchar | | Color code for visual identification |
| `is_active` | boolean | | Flag indicating if method is currently active |
| `created_at` | timestamp | | Payment method creation timestamp |



## Enums

### CategoryType
Defines the purpose and usage of a category.

| Value | Description |
|-------|-------------|
| `income` | Category for income transactions only |
| `outcome` | Category for expense/outcome transactions only |
| `both` | Category that can be used for both income and expenses |

### TransactionType
Indicates the direction of money flow.

| Value | Description |
|-------|-------------|
| `income` | Money received (positive cash flow) |
| `outcome` | Money spent (negative cash flow) |

### periodType
Defines the time period for budget tracking.

| Value | Description |
|-------|-------------|
| `weekly` | Budget resets every week |
| `monthly` | Budget resets every month |
| `yearly` | Budget resets every year |

### Frequency
Defines how often recurring transactions repeat.

| Value | Description |
|-------|-------------|
| `daily` | Transaction occurs every day |
| `weekly` | Transaction occurs every week |
| `monthly` | Transaction occurs every month |
| `yearly` | Transaction occurs every year |

### PaymentType
Categorizes different payment methods.

| Value | Description |
|-------|-------------|
| `cash` | Physical cash payments |
| `credit_card` | Credit card transactions |
| `debit_card` | Debit card transactions |
| `digital_wallet` | Digital payment platforms (PayPal, Venmo, etc.) |