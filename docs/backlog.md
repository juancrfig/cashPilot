# Backlog

This document contains all user stories, grouped by epic.

***

## Epic 1: User Authentication System

This epic covers the fundamental requirements for a user to create an account
and access the application securely.

### Story 1: User Signup

**As a new user, I want to sign up with a username, password, and
email, so that I can create my own account.**

**Acceptance Criteria:**

- Given I provide a valid username, email, and password, when I click
  signup, then my account should be created.
- Given I provide invalid data, then the system should display
  validation errors.
- Given my account is created, then I should receive a verification
  email.

***

### Story 2: Confirm Signup

**As a user, I want to confirm my signup with a code sent to my email,
so that my account is verified and secure.**

**Acceptance Criteria:**

- Given I receive a verification email, when I enter the correct code,
  then my account should be marked as verified.
- Given I enter an incorrect or expired code, then I should see an
  error message.

***

### Story 3: Login

**As a registered user, I want to log in with my username and password,
so that I can access my personal data.**

**Acceptance Criteria:**

- Given I have a verified account, when I enter valid credentials, then
  I should be logged in.
- Given I enter invalid credentials, then I should see an error
  message.
- Given I log in successfully, then I should be redirected to my
  dashboard.

***

### Story 4: Password Recovery

**As a user, I want to recover my password via email verification code,
so that I can regain access if I forget my password.**

**Acceptance Criteria:**

- Given I request password recovery, when I enter my registered email,
  then I should receive a recovery code.
- Given I enter a valid recovery code and new password, then my
  password should be updated.
- Given I enter an invalid or expired code, then I should see an error
  message.

***

### Story 5: Google Login/Signup

**As a user, I want to sign up or log in using my Google account, so
that I can access the app without creating new credentials.**

**Acceptance Criteria:**

- Given I am on the signup or login screen, when I select "Continue
  with Google," then I should be redirected to Google’s authentication
  flow.
- Given I authenticate successfully with Google, then my account should
  be created or I should be logged in.
- Given I cancel or deny Google permissions, then I should be returned
  to the login screen with no changes.
- Given I already have an account with the same email, then Google
  login should connect me to my existing account.

***

## Epic 2: Core Financial Tracking

This epic focuses on the primary function of the application: allowing users to
record, categorize, and manage their financial transactions.

### Story 6: Categorize Income and Expenses

**As a user, I want to categorize my income and expenses, so that I
can better understand my spending and earning patterns.**

**Acceptance Criteria:**

- Given I add income or expenses, when I select a category, then the
  system should link the record to that category.
- Given I view my financial records, then I should see the assigned
  categories displayed.
- Given I analyze financial data, then I should see summaries broken
  down by categories.

***

### Story 7: Record Income

**As a user, I want to record my income, so that I can track how much
money I earn.**

**Acceptance Criteria:**

- Given I am logged in, when I navigate to the "Add Income" form and
  enter a valid amount, category, and date, then the system should
  save the income record.
- Given I leave required fields empty, when I try to save, then the
  system should display a validation error.
- Given I have saved income records, when I view my income list, then
  I should see the newly added record.

***

### Story 8: Record Expenses

**As a user, I want to record my expenses, so that I can track how
much money I spend.**

**Acceptance Criteria:**

- Given I am logged in, when I add an expense with a valid amount,
  category, and date, then the expense should be saved.
- Given I leave fields empty or enter invalid data, when I try to save,
  then the system should show an error message.
- Given I have saved expense records, when I view my expenses list,
  then I should see the new record.

***

### Story 9: Edit or Delete Records

**As a user, I want to edit or delete income/expense records, so that
I can correct mistakes or update data.**

**Acceptance Criteria:**

- Given I view my list of records, when I select "Edit" on a record
  and update fields, then the record should be updated.
- Given I view my list of records, when I select "Delete," then the
  system should prompt for confirmation before deleting.
- Given I delete a record, then it should no longer appear in my
  financial records.

***

## Epic 3: Analytical Boards

This epic focuses on presenting the data recorded in the previous epic,
offering insights and visualizations.

### Story 10: View Summaries

**As a user, I want to see summaries (totals, balances, category
distributions), so that I can quickly assess my financial situation.**

**Acceptance Criteria:**

- Given I have income and expenses recorded, then the system should
  display **total income, total expenses, and balance**.
- Given I have categorized data, then the system should display
  category distribution charts.
- Given I add or edit records, then the summaries should update in
  real-time.

***

### Story 11: View Dashboards

**As a user, I want to view my financial data in analytical dashboards,
so that I can visualize my money behavior over time.**

**Acceptance Criteria:**

- Given I have income and expense data, when I access the dashboard,
  then I should see **graphs and charts** of my financial data.
- Given I have no data, then the dashboard should display a placeholder
  or "No data available" message.

***

### Story 12: Filter by Period

**As a user, I want to filter my financial data by period (daily,
weekly, monthly, yearly), so that I can analyze trends in specific
time ranges.**

**Acceptance Criteria:**

- Given I am on the dashboard, when I apply a **date filter**, then the
  charts and summaries should update to reflect the selected range.
- Given I reset the filter, then the system should show all available
  data.

***

## Epic 4: Multi-user & Security (System Integrity)

This epic covers non-functional requirements vital for a robust application,
focused on security and data isolation.

### Story 13: Isolated Financial Data

**As a user, I want my financial data to be isolated from other users,
so that only I can access my information.**

**Acceptance Criteria:**

- Given multiple users exist, then **each user should only see their own
  data** when logged in.
- Given I log out and another user logs in, then they should not see my
  data.

***

### Story 14: Secure Data Storage

**As a user, I want my credentials and sensitive data to be stored
securely, so that my account remains protected.**

**Acceptance Criteria:**

- Given I create or update my credentials, then the system should store
  them using **industry-standard encryption**.
- Given data is stored, then no plain-text sensitive data should exist
  in the database.
- Given unauthorized access is attempted, then the system should deny
  it and log the event.

***

### Story 15: Admin Role (Future)

**As an admin, I want to manage multiple users, so that the application
can scale to support a broader user base.**

**Acceptance Criteria:**

- Given I am an admin, when I view the admin panel, then I should see a
  list of users.
- Given I am an admin, when I deactivate a user, then the user should
  lose access.
- Given I am an admin, when I promote or update user roles, then
  changes should reflect immediately.
