# Shutdown Navigator Skill

## Purpose
Interactive agent that guides users through the complete business shutdown process for any US state. Reads from the state data registry to provide accurate, state-specific guidance.

## Trigger
- User says "shut down my business" or "dissolve my LLC/corporation"
- User mentions a specific state + dissolution
- User asks about forms, fees, or steps for business closure

## Inputs Required
1. **State** — which state is the business registered in?
2. **Entity type** — LLC, Corporation, LP, LLP, or Nonprofit?
3. **Current status** — is the business in good standing?

## Behavior

### Step 1: Intake
```
Ask: What state is your business registered in?
Ask: What type of entity? (LLC, Corporation, LP, LLP, Nonprofit)
Ask: Is the business in good standing with the state?
Ask: Does the business have employees?
Ask: Does the business have outstanding debts or liabilities?
Ask: Is the business registered in any other states?
```

### Step 2: Load State Data
- Read `data/states/{state_code}.json`
- Present a summary of what's required

### Step 3: Generate Custom Checklist
Based on the state data and user answers, generate a personalized shutdown checklist:

1. **Pre-Filing**
   - [ ] Vote to dissolve (per operating agreement/bylaws)
   - [ ] Document the vote
   - [ ] Wind down operations
   - [ ] Notify employees (if applicable)

2. **Tax Clearance** (if required by state)
   - [ ] File all outstanding state tax returns
   - [ ] Pay any taxes owed
   - [ ] Request tax clearance from {tax_agency}
   - [ ] Receive tax clearance letter

3. **Creditor Notification**
   - [ ] Identify all known creditors
   - [ ] Send written notice to each creditor
   - [ ] Publish notice (if required by state)
   - [ ] Wait for claims period ({state_specific_period})

4. **State Filing**
   - [ ] Download/access {form_name}
   - [ ] Complete the form
   - [ ] Pay ${fee} filing fee
   - [ ] Submit via {online_portal / mail_address}
   - [ ] Receive confirmation

5. **Federal Filings**
   - [ ] File final federal tax return (check "final return" box)
   - [ ] Close EIN with IRS
   - [ ] File final employment tax returns (if had employees)

6. **Cleanup**
   - [ ] Close state tax accounts
   - [ ] Cancel business licenses
   - [ ] Terminate registered agent
   - [ ] Close bank accounts
   - [ ] Cancel insurance
   - [ ] Transfer/cancel domains
   - [ ] Cancel subscriptions

7. **Verification**
   - [ ] Confirm dissolution with state
   - [ ] Obtain Certificate of Dissolution
   - [ ] File foreign entity withdrawals (if registered elsewhere)
   - [ ] Store documents permanently

### Step 4: Provide Resources
- Direct links to required forms
- SoS contact information
- Tax agency contact information
- Estimated timeline
- Total estimated cost

### Step 5: Offer Upgrade
- Suggest detailed paid guide ($49) for templates and form instructions
- Suggest shutdown agent service ($1,000) for full handling

## Output
A complete, personalized shutdown checklist with all state-specific requirements, forms, fees, links, and timelines.
