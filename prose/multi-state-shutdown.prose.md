# Multi-State Business Shutdown Workflow

## Purpose
Guide a user through shutting down a business that is registered in multiple states (home state + foreign registrations).

## Inputs
- `home_state`: Primary state of incorporation/formation
- `foreign_states`: List of states where registered as foreign entity
- `entity_type`: LLC | Corporation
- `has_employees_in`: List of states where employees are located

## Workflow

### Phase 1: Assessment
1. Load data for all states from `data/states/`
2. Identify which states require tax clearance
3. Determine total fees across all states
4. Create a consolidated timeline
5. Identify the optimal filing order

### Phase 2: Filing Order Strategy
The correct order for multi-state shutdown:

1. **Wind down operations in all states**
2. **File final tax returns in all states** (start with states requiring clearance)
3. **Obtain tax clearance** where required (these take the longest - start first)
4. **File foreign entity withdrawals** in all non-home states
5. **File dissolution in home state** (do this last)

Why this order matters:
- You can't withdraw from a foreign state while you still owe taxes
- Some home states require proof of foreign withdrawals before dissolution
- Tax clearance processing times vary widely by state

### Phase 3: Foreign State Withdrawals
For each foreign state:
1. File final state tax returns
2. Obtain tax clearance (if required)
3. File Application for Withdrawal (or Certificate of Withdrawal)
4. Pay withdrawal filing fee
5. Obtain confirmation of withdrawal

### Phase 4: Home State Dissolution
1. Confirm all foreign withdrawals are complete
2. File final state tax returns in home state
3. Obtain tax clearance (if required)
4. File Articles of Dissolution
5. Pay dissolution filing fee
6. Obtain Certificate of Dissolution

### Phase 5: Federal Cleanup
1. File final federal tax return
2. Close EIN with IRS
3. File final employment tax returns for all states

### Phase 6: Verification
1. Confirm withdrawal in each foreign state
2. Confirm dissolution in home state
3. Verify all tax accounts are closed
4. Store all documents

## Outputs
- Multi-state shutdown checklist
- State-by-state fee breakdown
- Optimal timeline with parallel tracks
- Total estimated cost
- Critical path (longest items that gate completion)
