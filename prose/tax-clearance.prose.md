# Tax Clearance Workflow

## Purpose
Guide a user through obtaining tax clearance from their state before filing dissolution.

## When to Use
When `state.tax.clearanceRequired === true`.

## States Requiring Tax Clearance
AR, CA, DE, HI, IA, IL, IN, KS, KY, LA, MA, MD, NJ, NM, NY, OH, PA, RI, TN, TX, WA

## Workflow

### Step 1: Identify Outstanding Obligations
1. Load state tax agency info from `data/states/{state_code}.json`
2. Check for outstanding:
   - Income/franchise tax returns
   - Sales tax returns
   - Withholding tax returns
   - Annual reports with fees
   - Penalties and interest

### Step 2: File All Outstanding Returns
1. File all delinquent tax returns
2. For each tax type registered:
   - Income/franchise tax
   - Sales and use tax
   - Employer withholding tax
3. Mark each return as "final"

### Step 3: Pay All Taxes Owed
1. Calculate total owed including penalties and interest
2. Pay via state's online portal or check
3. Request receipt/confirmation of payment

### Step 4: Request Tax Clearance
Each state has a different process:

**California**: FTB issues Certificate of Tax Clearance
- Request online or via Form FTB 3557
- Include entity name, EIN, SoS file number
- Allow 2-3 weeks processing

**New York**: Dept of Taxation & Finance issues Consent to Dissolution
- Request via Form DTF-95
- Must be filed with dissolution papers
- Allow 2-4 weeks processing

**New Jersey**: Division of Taxation
- Request Tax Clearance Certificate online
- Required before filing dissolution with DORES
- Allow 3-5 business days

**Texas**: Comptroller issues Tax Clearance
- Request via Comptroller's office
- Required for franchise tax
- Allow 2-4 weeks

*For other states, contact the state tax agency directly. See `data/states/{code}.json` for contact info.*

### Step 5: Verify Clearance
1. Confirm clearance letter/certificate received
2. Verify it covers all tax types
3. Note any expiration date (some clearances expire in 30-90 days)
4. File dissolution with SoS before clearance expires

## Common Issues
- Clearance denied: Usually means outstanding returns or balances exist
- Expired clearance: Must re-request if not filed with SoS in time
- Multiple tax types: Must clear ALL tax types, not just income
- Processing delays: Start this process early - it's often the longest step
