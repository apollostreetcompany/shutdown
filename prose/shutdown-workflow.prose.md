# Business Shutdown Workflow

## Purpose
Guide a user through the complete process of shutting down their business in any US state.

## Inputs
- `state_code`: Two-letter state code (e.g., CA, TX, NY)
- `entity_type`: LLC | Corporation | LP | LLP | Nonprofit
- `has_employees`: boolean
- `has_outstanding_debts`: boolean
- `registered_in_other_states`: string[] (list of other state codes)

## Workflow

### Phase 1: Assessment
1. Load state data from `data/states/{state_code}.json`
2. Identify required forms, fees, and timeline
3. Check if tax clearance is required
4. Identify any special requirements (publication, creditor notification)
5. Present summary to user for confirmation

### Phase 2: Internal Actions
1. **Vote to Dissolve**
   - For LLC: Obtain member vote per operating agreement (or majority if no agreement)
   - For Corp: Board resolution + shareholder vote
   - Document the vote in meeting minutes
   
2. **Wind Down Operations**
   - Notify employees (if applicable, check WARN Act if 100+ employees)
   - Stop accepting new business
   - Complete existing contracts or negotiate termination
   - Collect outstanding receivables

### Phase 3: Tax Clearance (if required)
1. File all outstanding state tax returns
2. Pay any taxes, penalties, and interest owed
3. Request tax clearance letter/certificate from state tax agency
4. Wait for clearance (timeline varies by state)

### Phase 4: Creditor Notification
1. Identify all known creditors
2. Send written notification per state statute
3. If publication required: publish notice in approved newspaper
4. Wait for claims period to expire (typically 90-120 days)

### Phase 5: State Filing
1. Download or access dissolution form
2. Complete form with required information:
   - Entity name and ID number
   - Date of dissolution vote
   - Statement that debts are paid or provided for
   - Signature of authorized person
3. Submit form with filing fee
4. If online filing available: use online portal
5. If mail only: send to SoS address with check

### Phase 6: Federal Filings
1. File final federal tax return (check "final return" box)
2. Send IRS letter to close EIN (Letter 147C)
3. File final employment tax returns if had employees
4. File final Form 1099s for the final year

### Phase 7: State Tax Closure
1. File final state income/franchise tax return
2. Close state sales tax account
3. Close state withholding tax account
4. Close any other state tax accounts

### Phase 8: Cleanup
1. Cancel business licenses and permits
2. Cancel DBA/trade name registrations
3. Terminate registered agent service
4. Close business bank accounts
5. Cancel insurance policies
6. Transfer or cancel domain names
7. Cancel SaaS subscriptions and vendor contracts
8. Redirect or close business email
9. Update/remove online directory listings

### Phase 9: Verification
1. Confirm dissolution recorded with state
2. Obtain Certificate of Dissolution
3. If registered in other states: file withdrawal in each
4. Store all dissolution documents permanently

### Phase 10: Post-Dissolution
1. Maintain records for required retention period (typically 7 years)
2. Monitor for any state correspondence
3. Respond to any creditor claims within statutory period
4. File any required post-dissolution tax returns

## Outputs
- Completed checklist with dates
- Filed forms with confirmation numbers
- Certificate of Dissolution
- Post-dissolution monitoring schedule
