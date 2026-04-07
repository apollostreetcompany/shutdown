# State Research Workflow

## Purpose
Research and document the complete business shutdown process for a specific US state using official sources only.

## Inputs
- `state_code`: Two-letter state code
- `state_name`: Full state name

## Workflow

### Step 1: Identify the Filing Agency
1. Search for "{state_name} Secretary of State business dissolution"
2. Identify the correct agency (may be SoS, Division of Corporations, Corporation Commission, etc.)
3. Record the official website URL

### Step 2: Research LLC Dissolution
1. Navigate to the agency's LLC dissolution page
2. Find the required form (Articles of Dissolution, Certificate of Cancellation, etc.)
3. Record form name, form number, filing fee
4. Check if online filing is available
5. Document the step-by-step process
6. Note any special requirements

### Step 3: Research Corporation Dissolution
1. Navigate to the agency's corporation dissolution page
2. Find the required form (Articles of Dissolution, Certificate of Dissolution, etc.)
3. Record form name, form number, filing fee
4. Check if online filing is available
5. Document the step-by-step process
6. Note any special requirements (shareholder vote thresholds, etc.)

### Step 4: Research Other Entity Types
1. Check for LP, LLP, nonprofit dissolution procedures
2. Check for foreign entity withdrawal procedures
3. Document forms, fees, and steps for each

### Step 5: Research Tax Requirements
1. Search for "{state_name} tax clearance business dissolution"
2. Determine if tax clearance is required before dissolution
3. Identify the state tax agency and contact info
4. Document the tax clearance process
5. Note final return requirements

### Step 6: Research Additional Requirements
1. Check for publication requirements
2. Check creditor notification statutes
3. Check employee notification requirements (WARN Act applicability)
4. Check registered agent requirements during/after dissolution
5. Check for any winding-up period

### Step 7: Record Contact Information
1. Official agency address
2. Phone number
3. Email (if available)
4. Online portal URL
5. Processing times (standard and expedited)

### Step 8: Output
Write structured JSON to `data/states/{state_code}.json` following the StateShutdownInfo schema.

## Quality Checks
- Every fact must come from an official .gov or state website
- Cross-reference fees with the official fee schedule
- Verify form names match what's on the actual form
- Confirm URLs are active and point to the right resources
