# State Researcher Skill

## Purpose
Research and document the complete business shutdown process for a specific US state. Uses web search and official state websites to gather accurate, current information.

## Trigger
- When a state's data file is missing or incomplete
- When data needs to be refreshed or verified
- When expanding coverage to new entity types

## Inputs
- `state_code`: Two-letter state code
- `state_name`: Full state name

## Process

### 1. Identify Filing Agency
Search: "{state_name} Secretary of State business dissolution"
Verify: correct agency name, website URL

### 2. Research Each Entity Type
For LLC, Corporation, LP, LLP, Nonprofit, Foreign Entity:
- Find dissolution form (name, number, URL)
- Find filing fee
- Check online filing availability
- Document step-by-step process
- Note special requirements

### 3. Research Tax Requirements
Search: "{state_name} tax clearance dissolution"
- Is tax clearance required?
- Which agency handles it?
- What's the process?
- Final return requirements?

### 4. Research Additional Requirements
- Publication requirements
- Creditor notification statutes
- Employee notification (WARN Act)
- Registered agent requirements
- Winding-up period
- Board/member approval requirements

### 5. Record Contact Info
- Agency address
- Phone number
- Email
- Online portal URL
- Processing times

### 6. Output
Write structured JSON to `data/states/{state_code}.json`

## Quality Standard
- Every fact from official .gov or state website
- Fees verified against official fee schedule
- Form names match actual forms
- URLs tested and active
