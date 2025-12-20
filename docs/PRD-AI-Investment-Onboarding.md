# Product Requirements Document: AI-Powered Investment Onboarding

---

## CLAUDE CODE IMPLEMENTATION INSTRUCTIONS

**IMPORTANT: This PRD is the single source of truth for the AI-powered investment onboarding flow.**

### When implementing, you MUST:

1. **Stick to this plan exactly** - Follow the 6-phase question structure as defined in this document
2. **Update Supabase schema** - Create/modify tables to store all financial data collected:
   - `investor_profiles` - personal info, citizenship, age
   - `investor_financials` - income, expenses, savings, emergency fund status
   - `investor_properties` - real estate owned (primary + investment properties)
   - `investor_debts` - all debt obligations for DTI calculation
   - `investor_preferences` - investment goals, target markets, property types
   - `investor_risk_profile` - experience, risk tolerance, management preference
   - `investment_summaries` - calculated scores, leverage scenarios, recommendations

3. **Implement all calculations** - Use the formulas defined in Section 7 for:
   - Debt-to-Income (DTI) ratio
   - Home equity and available leverage
   - Leverage Capacity Score (0-100)
   - Financial Health Score (0-100)
   - Investment Readiness Level

4. **Build the AI conversation flow** - Follow the question flow in Section 6:
   - Phase 1: Personal Profile (3 questions)
   - Phase 2: Financial Health (5 questions)
   - Phase 3: Leverage Analysis / מינוף (8 questions)
   - Phase 4: Investment Preferences (6 questions)
   - Phase 5: Risk Profile (5 questions)
   - Phase 6: Professional Matching (4 questions)

5. **Create Investment Summary page** - As defined in Section 9, showing:
   - Financial Health Score
   - Investment Capacity range
   - Leverage Analysis with 3 scenarios (Conservative, Balanced, Aggressive)
   - Matched properties
   - Recommended professionals

6. **Apply migrations in order** - Create numbered Supabase migrations for all schema changes

7. **Use existing patterns** - Check existing onboarding code in `/src/app/[locale]/(onboarding)/` and extend it

---

**Product Name:** Ultra Realestate - Intelligent Investor Onboarding
**Version:** 2.0
**Last Updated:** December 20, 2025
**Document Owner:** Product Team
**Status:** APPROVED - Ready for Implementation

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Target Users & Personas](#3-target-users--personas)
4. [Product Vision & Goals](#4-product-vision--goals)
5. [Success Metrics](#5-success-metrics)
6. [Comprehensive Question Framework](#6-comprehensive-question-framework)
7. [Financial Leverage Assessment (מינוף)](#7-financial-leverage-assessment-מינוף)
8. [AI Conversation Architecture](#8-ai-conversation-architecture)
9. [Investment Summary Output](#9-investment-summary-output)
10. [User Stories & Requirements](#10-user-stories--requirements)
11. [Non-Functional Requirements](#11-non-functional-requirements)
12. [UX Guidelines](#12-ux-guidelines)
13. [Technical Considerations](#13-technical-considerations)
14. [Go-to-Market Strategy](#14-go-to-market-strategy)
15. [Risks & Mitigation](#15-risks--mitigation)
16. [Timeline & Milestones](#16-timeline--milestones)

---

## 1. Executive Summary

### 1.1 Vision

Ultra Realestate will deliver the most comprehensive and intelligent real estate investment onboarding experience in the market. By combining AI-powered conversational interfaces with deep financial assessment capabilities, we will help investors make informed decisions about international property investments while building trust through professional-grade financial analysis.

### 1.2 The Opportunity

The global real estate investment market suffers from a fundamental problem: platforms ask superficial questions (budget, location, property type) without understanding the investor's true financial capacity, leverage capability, or investment readiness. This leads to:

- Mismatched property recommendations
- Frustrated investors who can't actually afford recommended properties
- Missed opportunities for investors who could leverage more
- Poor conversion rates due to unrealistic expectations

### 1.3 Our Solution

An AI-powered onboarding questionnaire that:

1. **Understands Financial Reality**: Comprehensive income, expense, debt, and asset analysis
2. **Assesses Leverage Capability**: Deep dive into מינוף (leverage) potential including equity, existing loans, and debt-to-income ratios
3. **Calculates Investment Readiness**: Scientific scoring system that determines what investors can actually afford
4. **Personalizes Intelligently**: AI adapts questions based on previous answers and provides contextual insights
5. **Builds Trust**: Educational approach that helps investors understand their own financial position

### 1.4 Market Differentiation

**What competitors do:**
- Basic budget question: "What's your budget?" → Shows properties at that price
- Surface-level preferences
- One-size-fits-all recommendations

**What we do:**
- Comprehensive financial assessment: "Let's understand your complete financial picture"
- Leverage capability analysis: "Here's how much you can actually leverage"
- Investment readiness scoring: "Based on your profile, here's your optimal investment range"
- Dynamic AI guidance: Contextual insights at every step
- Professional-grade output: Summary that rivals what a financial advisor would create

---

## 2. Problem Statement

### 2.1 Market Context

International real estate investment is complex and involves:
- Cross-border tax implications
- Currency considerations
- Financing challenges (leverage/mortgage availability)
- Legal and regulatory differences
- Market knowledge gaps

Yet, most platforms treat all investors the same, asking basic questions that don't capture financial sophistication or capability.

### 2.2 User Pain Points

**For First-Time Investors:**
- Don't know how much they can actually afford
- Confused about leverage and financing options
- Uncertain about whether they're financially ready
- Overwhelmed by technical jargon

**For Experienced Investors:**
- Frustrated by simplistic questionnaires
- Want platforms to understand their portfolio and equity
- Need sophisticated leverage calculations
- Expect professional-grade analysis

**For All Investors:**
- Waste time viewing properties they can't afford
- Miss opportunities because platforms underestimate their capacity
- Lack confidence in recommendations
- Feel platforms don't "get" their financial situation

### 2.3 Business Problem

For Ultra Realestate:
- Low conversion rates due to poor property matching
- High customer acquisition cost with poor retention
- Inability to differentiate from competitors
- Missed opportunity to build trust early in the journey

---

## 3. Target Users & Personas

### 3.1 Primary Personas

#### Persona 1: "Sarah - The Ambitious First-Timer"
- **Age:** 32
- **Location:** Tel Aviv, Israel
- **Citizenship:** Israeli
- **Occupation:** Tech professional
- **Income:** $120K/year
- **Savings:** $80K
- **Goals:** First investment property abroad for rental income
- **Pain Points:**
  - Doesn't understand leverage options
  - Unsure if she has enough for down payment
  - Confused about international financing
  - Wants guidance but feels overwhelmed
- **Needs:**
  - Educational approach with clear explanations
  - Step-by-step financial assessment
  - Confidence that recommendations fit her budget
  - Understanding of what she can actually afford

#### Persona 2: "Michael - The Seasoned Investor"
- **Age:** 48
- **Location:** New York, USA
- **Citizenship:** American
- **Occupation:** Business owner
- **Income:** $400K/year
- **Real Estate Equity:** $800K in existing properties
- **Existing Mortgages:** $1.2M
- **Goals:** Portfolio diversification into European markets
- **Pain Points:**
  - Frustrated by simplistic questionnaires
  - Platforms don't account for his equity
  - Can leverage significantly but platforms don't understand
  - Wants sophisticated analysis
- **Needs:**
  - Recognition of investment experience
  - Sophisticated leverage calculations
  - Professional-grade recommendations
  - Respect for his financial sophistication

#### Persona 3: "Yael - The Diaspora Investor"
- **Age:** 40
- **Location:** London, UK
- **Citizenship:** Israeli + British
- **Occupation:** Finance executive
- **Income:** £180K/year
- **Goals:** Investment property in Israel for future retirement
- **Pain Points:**
  - Cross-border complexity
  - Currency considerations
  - Tax implications between countries
  - Distance makes due diligence hard
- **Needs:**
  - Platform that understands dual citizenship implications
  - Currency-aware recommendations
  - Trust in recommendations given distance
  - Professional matching with local experts

### 3.2 Secondary Personas

- **Young professionals** (25-35) looking for first investment
- **Retirement planners** (55+) seeking stable rental income
- **Expats** investing in home countries
- **High-net-worth individuals** seeking portfolio diversification

---

## 4. Product Vision & Goals

### 4.1 Product Vision

*"To become the most trusted platform for international real estate investment by providing professional-grade financial assessment and AI-powered personalized guidance that empowers investors to make confident, informed decisions."*

### 4.2 Product Goals

**Primary Goals:**
1. **Build Comprehensive Financial Profiles**: Capture complete financial picture including income, expenses, assets, debts, and leverage capacity
2. **Enable Accurate Property Matching**: Match investors with properties they can realistically afford and that align with their goals
3. **Establish Trust Early**: Demonstrate professionalism and expertise through thorough assessment
4. **Educate While Collecting Data**: Help investors understand their own financial position and investment capacity
5. **Differentiate in Market**: Create onboarding experience competitors cannot easily replicate

**Secondary Goals:**
1. Reduce time-to-first-match by having complete data upfront
2. Increase conversion rates through better matching
3. Build dataset for ML-powered property recommendations
4. Create foundation for personalized investor dashboard

### 4.3 Business Objectives

- **Increase conversion rate** from onboarding to first property view by 40%
- **Improve property match quality** measured by engagement (time on property, inquiries)
- **Reduce bounce rate** during onboarding from 60% to 35%
- **Position as premium platform** commanding higher fees
- **Build competitive moat** through proprietary assessment methodology

---

## 5. Success Metrics

### 5.1 Primary KPIs

| Metric | Current Baseline | Target (3 months) | Target (6 months) | Measurement Method |
|--------|-----------------|-------------------|-------------------|-------------------|
| **Onboarding Completion Rate** | 40% | 55% | 70% | % users completing all questions |
| **Investment Profile Accuracy** | N/A (new) | 75% | 90% | % profiles validated by follow-up calls |
| **Property Match Engagement** | 2.3 min avg | 4.5 min avg | 6 min avg | Avg time spent on matched properties |
| **Inquiry Conversion** | 8% | 12% | 18% | % users who contact about properties |
| **User Satisfaction (NPS)** | N/A (new) | 40 | 60 | Post-onboarding survey |

### 5.2 Secondary Metrics

- **Time to complete onboarding**: Target 8-12 minutes (comprehensive but not exhausting)
- **Question skip rate**: < 5% for required questions
- **AI response quality rating**: > 4.2/5 stars
- **Return rate**: % users who return within 7 days
- **Profile completeness**: > 95% of data fields filled

### 5.3 Quality Metrics

- **Financial calculation accuracy**: 100% (verified by finance team)
- **Leverage assessment precision**: ± 5% of professional advisor calculation
- **Property match relevance**: > 80% rated as "very relevant" or "relevant"

---

## 6. Comprehensive Question Framework

### 6.1 Framework Overview

The onboarding is organized into **6 phases** with **35-40 questions** total, dynamically adjusted based on user responses. The AI guides users through the journey, providing context and education at each step.

**Design Principles:**
- Start broad, get specific
- Build trust before asking sensitive questions
- Educate while collecting data
- Show progress clearly
- Allow skip for non-critical questions with explanation of impact
- Provide immediate value (insights) for data shared

### 6.2 Phase 1: Personal Profile & Context

**Purpose**: Establish baseline context about the user's location, citizenship, and overall situation. This affects tax implications, financing options, and legal considerations.

#### Question 1.1: Current Country of Residence
**Type:** Country selector (single)
**Question (AI):** "Let's start by understanding where you're based. Which country do you currently live in?"

**Purpose:**
- Determines local market familiarity
- Affects currency preference
- Influences financing options
- Tax residency implications

**AI Follow-up:** "Great! Living in [country] means [relevant insight about investing from that location, e.g., currency considerations, common investment destinations for that demographic]."

---

#### Question 1.2: Citizenship
**Type:** Country selector (single or multiple)
**Question (AI):** "What is your citizenship? Select all that apply if you have multiple citizenships."

**Purpose:**
- Tax treaty implications
- Legal restrictions on property ownership in certain countries
- Financing eligibility in different markets
- Visa/residency considerations

**AI Follow-up:** "As a [citizenship] citizen, you'll have [specific advantages/considerations] when investing in different markets. I'll keep this in mind when we match you with properties."

**Conditional Logic:**
- If dual citizenship → Ask which is primary for tax purposes

---

#### Question 1.3: Age Range
**Type:** Single select
**Question (AI):** "To help us understand your investment timeline, which age range do you fall into?"

**Options:**
- Under 25
- 25-34
- 35-44
- 45-54
- 55-64
- 65+

**Purpose:**
- Investment horizon estimation
- Risk tolerance correlation
- Financing term eligibility
- Retirement planning context

**AI Follow-up:** Contextual based on age (e.g., "At [age range], you have a [long/medium/short] investment horizon, which opens up interesting opportunities for [relevant strategy].")

---

### 6.3 Phase 2: Financial Health Assessment

**Purpose**: Build comprehensive picture of income, expenses, savings, and overall financial health. This is critical for determining realistic investment capacity.

**AI Transition:** "Now, let's understand your financial situation. This helps us recommend properties you can comfortably afford and identify the best financing options for you. All information is confidential and encrypted."

---

#### Question 2.1: Employment Status
**Type:** Single select
**Question (AI):** "What's your current employment situation?"

**Options:**
- Employed (full-time)
- Employed (part-time)
- Self-employed / Business owner
- Freelancer / Contractor
- Retired
- Other

**Purpose:**
- Income stability assessment
- Mortgage qualification (lenders treat differently)
- Documentation requirements
- Risk profiling

**Conditional Logic:**
- If self-employed → Additional questions about business age, income stability
- If retired → Ask about pension/retirement income sources

**AI Follow-up:** "[Employment type] investors typically have [specific considerations]. We'll make sure to account for this in our recommendations."

---

#### Question 2.2: Gross Annual Income
**Type:** Currency input with range slider
**Question (AI):** "What's your gross annual income? Include all sources like salary, bonuses, rental income from existing properties, dividends, etc."

**Sub-questions:**
- Currency selector (auto-filled from country)
- Amount (slider + manual input)
- Range: $10K - $10M+

**Purpose:**
- **Critical for affordability calculations**
- Debt-to-income ratio
- Mortgage qualification
- Investment capacity

**Validation:**
- Must be > 0 if employed
- Warning if seems low relative to investment goals

**AI Follow-up:** "With an annual income of [amount], we can calculate your comfortable investment range. Most financial advisors recommend that housing costs (including investment property expenses) don't exceed 35-40% of gross income."

---

#### Question 2.3: Monthly Expenses
**Type:** Currency input
**Question (AI):** "What are your average monthly living expenses? Include rent/mortgage, utilities, food, transportation, insurance, and other regular costs."

**Helper text:** "This helps us understand how much you can comfortably allocate to investment property payments."

**Purpose:**
- Calculate disposable income
- Determine realistic monthly payment capacity
- Assess financial cushion
- Risk assessment

**AI Insight:** Calculate and show:
- "Based on your income of [X] and expenses of [Y], your monthly disposable income is approximately [Z]."
- "This suggests you could comfortably handle a monthly property payment of around [calculated amount] while maintaining a healthy financial cushion."

---

#### Question 2.4: Current Savings & Liquid Assets
**Type:** Currency input
**Question (AI):** "How much do you currently have in savings and easily accessible investments? Include savings accounts, stocks, bonds, and other liquid assets you could use for a down payment."

**Exclude:** Retirement accounts, locked-up investments, emergency fund

**Purpose:**
- **Critical for down payment calculation**
- Investment readiness assessment
- Shows financial discipline
- Emergency buffer evaluation

**Validation:**
- Warning if < 6 months of expenses (suggest building emergency fund first)
- Flag if very high relative to income (possible inheritance, sale - ask in follow-up)

**AI Follow-up:**
- If strong savings: "Excellent financial discipline! With [amount] in liquid assets, you have strong flexibility for down payments. Most international real estate investments require 20-35% down payment."
- If low savings: "I notice your liquid assets are currently [amount]. For international real estate investment, you'll typically need [calculated minimum] for down payment on properties in your target range. We can help you build a savings plan or explore creative financing options."

**Conditional Logic:**
- If savings < typical down payment needed → Ask about timeline to save more
- If savings unusually high → "Did you recently receive a windfall (sale, inheritance)?" (affects financial planning)

---

#### Question 2.5: Emergency Fund Status
**Type:** Single select
**Question (AI):** "Do you currently have an emergency fund covering 6+ months of living expenses, separate from your investment capital?"

**Options:**
- Yes, fully funded (6+ months)
- Partially funded (3-6 months)
- Minimal (1-3 months)
- No emergency fund

**Purpose:**
- Risk assessment
- Investment readiness
- Financial health indicator
- Responsible investing guidance

**AI Follow-up:**
- If Yes: "Excellent! Having a solid emergency fund means you can invest confidently without risking your financial stability."
- If No: "Building an emergency fund is crucial before investing in real estate. We'll factor this into your investment timeline and might recommend starting with a smaller investment or building your fund first."

---

### 6.4 Phase 3: Leverage Capability Analysis (מינוף)

**Purpose**: **This is the critical differentiator**. Deep assessment of leverage capability including existing equity, debt obligations, and maximum borrowing capacity. This section is what competitors don't do.

**AI Transition:** "Now let's explore your leverage capability - or מינוף in Hebrew. This is crucial because leveraging allows you to invest in higher-value properties and potentially achieve better returns. I'll ask about your existing assets, loans, and debt obligations to calculate your optimal leverage capacity."

---

#### Question 3.1: Real Estate Ownership
**Type:** Single select
**Question (AI):** "Do you currently own any real estate properties?"

**Options:**
- No real estate owned
- Own primary residence only
- Own primary + investment properties
- Own investment properties only

**Purpose:**
- Establish real estate experience
- Identify potential equity for leverage
- Portfolio context

**Conditional Logic:**
- If "No" → Skip to Question 3.6 (Other debt)
- If any "Yes" → Continue to property details

**AI Follow-up:**
- If Yes: "Great! Existing real estate ownership gives you potential equity that can be leveraged for new investments. Let's explore this."
- If No: "No problem! As a first-time real estate investor, we'll focus on conventional financing options and optimal entry strategies."

---

#### Question 3.2: Primary Residence Details (if applicable)
**Type:** Multi-part input
**Question (AI):** "Tell me about your primary residence."

**Sub-questions:**
1. **Current market value** (currency input)
2. **Purchase price** (currency input, optional)
3. **Purchase year** (year picker, optional)
4. **Outstanding mortgage balance** (currency input)
   - If 0 → "Fully paid off" checkbox

**Purpose:**
- **Calculate home equity** = Market value - Mortgage balance
- Determine if HELOC (Home Equity Line of Credit) is viable
- Assess wealth building progress
- Portfolio LTV (Loan-to-Value) calculation

**Calculations:**
```
Home Equity = Current Market Value - Outstanding Mortgage
Equity % = (Home Equity / Current Market Value) × 100
Available Leverage from Home = Home Equity × 0.8 (typically can borrow up to 80% of equity)
```

**AI Follow-up:**
"Your primary residence has an estimated equity of [calculated amount]. This means you could potentially access [80% of equity] through a home equity line of credit (HELOC) to use as down payment for investment properties, if you choose to leverage it."

**Warning Logic:**
- If Equity % < 20% → "Your current equity is relatively low. Building more equity first might be wise before leveraging your primary residence."
- If recently purchased (< 2 years) → "Since you recently purchased, your equity is still building. This is normal and we'll factor it into our recommendations."

---

#### Question 3.3: Investment Properties Details (if applicable)
**Type:** Dynamic list (can add multiple)
**Question (AI):** "Tell me about your investment properties. You can add multiple properties."

**For each property:**
1. **Property type** (residential/commercial)
2. **Location** (country + city)
3. **Current market value** (currency input)
4. **Outstanding mortgage** (currency input)
5. **Monthly rental income** (currency input, optional)
6. **Monthly expenses** (mortgage + taxes + maintenance, currency input)

**Purpose:**
- **Calculate total real estate equity across portfolio**
- Assess real estate investment experience
- Understand current leverage usage
- Calculate existing cash flow
- Portfolio diversification analysis

**Calculations:**
```
Per Property:
- Equity = Market Value - Outstanding Mortgage
- Net Cash Flow = Monthly Rental Income - Monthly Expenses
- ROI = (Net Cash Flow × 12) / Equity × 100

Portfolio:
- Total Property Value = Sum of all market values
- Total Debt = Sum of all outstanding mortgages
- Total Equity = Total Property Value - Total Debt
- Portfolio LTV = Total Debt / Total Property Value × 100
- Total Monthly Cash Flow = Sum of all net cash flows
- Available Leverage = Total Equity × 0.6 (conservative estimate for investment properties)
```

**AI Follow-up:**
"Impressive! Your real estate portfolio has:
- Total value: [sum]
- Total equity: [calculated]
- Combined monthly cash flow: [sum]
- Portfolio LTV: [percentage]

This means you could potentially leverage [calculated amount] from your existing portfolio for your next investment, giving you significantly more buying power."

**Insights:**
- If positive cash flow: "Your properties are generating positive cash flow, which is excellent. Lenders view this favorably."
- If negative cash flow: "Some of your properties have negative cash flow. This is common in appreciation-focused markets, but we'll need to ensure your next investment doesn't overextend you."
- If high LTV (>75%): "Your portfolio is quite leveraged. We'll focus on investments that improve your overall portfolio health."

---

#### Question 3.4: Current Mortgage(s) Monthly Payment
**Type:** Currency input (auto-calculated if data provided above, but allow override)
**Question (AI):** "What's your total monthly mortgage payment across all properties? Include principal, interest, taxes, and insurance."

**Purpose:**
- Debt-to-Income (DTI) ratio calculation
- Cash flow analysis
- Affordability assessment

**Validation:**
- Should align roughly with property data provided
- Flag large discrepancies

---

#### Question 3.5: Outstanding Loan Balances Summary
**Type:** Display + confirmation
**Question (AI):** "Based on what you've told me, your total outstanding real estate debt is [calculated sum]. Is this correct?"

**Options:**
- Yes, correct
- No, let me adjust (open text input for actual amount)

**Purpose:**
- Data validation
- User trust building (show we're tracking carefully)
- Ensure accuracy for critical calculations

---

#### Question 3.6: Other Debt Obligations
**Type:** Multi-select with amounts
**Question (AI):** "Do you have any other debt obligations? Select all that apply and enter monthly payments."

**Options** (each with currency input for monthly payment):
- [ ] Auto loans/leases → $___/month
- [ ] Student loans → $___/month
- [ ] Credit card debt (regular balance) → $___/month
- [ ] Business loans → $___/month
- [ ] Personal loans → $___/month
- [ ] Other → $___/month
- [ ] None of the above

**Purpose:**
- **Complete DTI (Debt-to-Income) ratio calculation**
- Total debt burden assessment
- Risk profiling
- Mortgage qualification

**Calculations:**
```
Total Monthly Debt = Mortgage payments + Sum of all other debt payments
Debt-to-Income Ratio (DTI) = (Total Monthly Debt / Gross Monthly Income) × 100

Standard benchmarks:
- DTI < 28%: Excellent, strong borrowing capacity
- DTI 28-36%: Good, moderate borrowing capacity
- DTI 36-43%: Fair, limited borrowing capacity
- DTI > 43%: Poor, may not qualify for additional financing
```

**AI Follow-up:**
"Your total monthly debt obligations are [sum], giving you a Debt-to-Income ratio of [calculated DTI]%.

[Contextual message based on DTI]:
- If < 28%: 'This is excellent! You have strong borrowing capacity and lenders will view you very favorably.'
- If 28-36%: 'This is a healthy ratio. You have good borrowing capacity for your next investment.'
- If 36-43%: 'Your DTI is on the higher end. We'll focus on investments that improve your overall financial position or explore alternative financing.'
- If > 43%: 'Your current debt load is quite high. We recommend either paying down existing debt or considering a smaller initial investment. I can help you create a plan.'"

---

#### Question 3.7: Credit Score Range (Optional but Recommended)
**Type:** Single select
**Question (AI):** "If you know your credit score range, it helps us understand your financing options. This is optional but helpful."

**Options:**
- Excellent (750+)
- Very Good (700-749)
- Good (650-699)
- Fair (600-649)
- Poor (<600)
- I don't know
- Prefer not to say

**Purpose:**
- Mortgage rate estimation
- Financing qualification
- Risk assessment

**AI Follow-up:**
- If Excellent/Very Good: "Excellent credit gives you access to the best interest rates and loan terms."
- If Good: "Good credit opens up most financing options, though interest rates might be slightly higher than top-tier."
- If Fair/Poor: "We'll focus on improving your credit score or exploring alternative financing options like partner investing or larger down payments."
- If don't know: "No problem! I recommend checking your credit score (free services available). It's an important factor in real estate financing."

---

#### Question 3.8: Pre-approval Status
**Type:** Single select
**Question (AI):** "Have you been pre-approved for a mortgage or explored financing options?"

**Options:**
- Yes, pre-approved (with amount)
- Started the process
- Not yet, but planning to
- Not planning to get financing (all cash)
- Unsure about the process

**If "Yes, pre-approved":**
- Sub-question: "What amount were you pre-approved for?" (currency input)

**Purpose:**
- Understand financing readiness
- Validate our calculations
- Identify need for professional referral

**AI Follow-up:**
- If pre-approved: "Great! Being pre-approved shows [amount] in buying power. I'll use this in our calculations."
- If not started: "I'll help you understand how much you can likely borrow based on your financial profile. I can also connect you with mortgage advisors who specialize in international real estate."
- If all cash: "All-cash investors have unique advantages including faster closings and stronger negotiating power. I'll tailor recommendations accordingly."

---

### 6.5 Phase 4: Investment Preferences & Goals

**Purpose**: Understand investment objectives, property preferences, and market interests. This phase uses the financial foundation from previous phases to frame realistic options.

**AI Transition:** "Great! Now that I understand your financial capacity, let's explore what you're looking for. Your financial profile suggests you can comfortably invest in properties ranging from [calculated min] to [calculated max]. Let's refine what you're looking for within this range."

---

#### Question 4.1: Investment Purpose & Goals
**Type:** Multi-select (primary + secondary)
**Question (AI):** "What are your primary investment goals? Select your main goal and any secondary goals."

**Options:**
- Capital appreciation (property value growth)
- Rental income (cash flow)
- Portfolio diversification
- Retirement planning
- Tax benefits / optimization
- Vacation home (personal use + rental)
- Future relocation / retirement destination
- Wealth preservation
- Legacy building (pass to children)

**Selection logic:**
- User picks 1 primary (required)
- Can select up to 3 secondary goals

**Purpose:**
- Property type matching
- Market selection (appreciation vs. cash flow markets)
- Investment strategy alignment
- Time horizon implications

**AI Follow-up:**
Contextual based on selection:
- If capital appreciation primary: "Focusing on capital appreciation, we'll prioritize emerging markets and areas with strong growth fundamentals. These typically have lower initial cash flow but higher long-term value potential."
- If rental income primary: "Prioritizing rental income, we'll focus on established markets with strong rental demand and positive cash flow from day one."
- If vacation home: "Looking for a vacation home with investment potential is smart! We'll find properties in desirable tourist areas that can generate rental income when you're not using them."

**Conditional Logic:**
- If "Retirement planning" or "Future relocation" → Ask for target retirement year
- If "Tax benefits" → Note to recommend tax advisor for their citizenship/residency combo

---

#### Question 4.2: Target Markets & Locations
**Type:** Country multi-select with priority ranking
**Question (AI):** "Which countries or regions interest you for investment? Select all that appeal to you, then we'll discuss priorities."

**Primary selection:**
- User can select multiple countries
- No minimum, but encourage selecting at least 1-3

**After selection:**
"You selected [countries]. Which is your top priority market?"
- User ranks or selects top 3

**Purpose:**
- Geographic preference
- Market familiarity
- Lifestyle preferences
- Potential tax/legal considerations

**For each selected country, show quick insight:**
- Average property prices
- Typical rental yields
- Visa/residency programs
- Key benefits for their citizenship

**AI Follow-up:**
"Interesting choices! Here's why these markets align with your profile:
- [Country 1]: [Specific relevance to their goals and finances]
- [Country 2]: [Specific relevance]

Based on your [citizenship] and [goal], [specific country] offers [specific advantage]."

**Conditional Logic:**
- If user's citizenship matches a selected country → "As a [citizenship] citizen, you'll have [advantages] in [country]"
- If VISA program available → Mention it

---

#### Question 4.3: Property Type Preferences
**Type:** Multi-select
**Question (AI):** "What types of properties interest you? Select all that apply."

**Options:**
- Residential apartment (city)
- Residential apartment (suburban)
- Single-family house
- Multi-family (duplex/triplex)
- Luxury / high-end residential
- Commercial office
- Commercial retail
- Mixed-use (residential + commercial)
- Land (development potential)
- Vacation property (resort area)
- Student housing
- Senior living

**Purpose:**
- Property matching
- Management complexity assessment
- Investment strategy alignment

**AI Follow-up:**
Based on selections:
- If multi-family: "Multi-family properties offer diversified rental income and better cash flow. Great choice for experienced investors!"
- If commercial: "Commercial real estate often offers higher returns but requires different management. I'll note that you're comfortable with this complexity."
- If mix of residential + commercial: "Diversifying across property types is smart strategy! We'll look for opportunities in both categories."

**Conditional Logic:**
- If first-time investor + complex property (commercial, land) → Gentle warning: "These require more experience. We'll include them but also show simpler residential options."
- If luxury properties but moderate budget → Manage expectations

---

#### Question 4.4: Investment Budget Range
**Type:** Range slider with currency
**Question (AI):** "Based on your financial profile, I estimate you can comfortably invest in properties between [calculated minimum] and [calculated maximum]. Does this range feel right to you, or would you like to adjust it?"

**Pre-filled values:**
- Currency: From user's country/preference
- Minimum: Conservative calculation based on:
  - Down payment available (20-30% of savings)
  - Monthly payment capacity based on DTI
  - Mortgage qualification estimate
- Maximum: Aggressive calculation based on:
  - Maximum leverage potential
  - Higher risk tolerance allowance
  - Optimistic mortgage qualification

**User can adjust:** Both minimum and maximum

**Purpose:**
- Set property search parameters
- Validate AI calculations against user's comfort
- Manage expectations
- Show we've done the math

**Calculations shown:**
"Here's how I calculated this:
- Down payment available: [amount] (from your [savings] in liquid assets)
- Estimated monthly payment capacity: [amount] (based on your income and current debts)
- Estimated mortgage qualification: [amount] (based on [DTI], credit score, and income)
- Property price range: [min] - [max]"

**AI Follow-up:**
- If user adjusts higher: "I notice you increased the maximum to [amount]. That's doable but will require [specific strategy: larger down payment / lower DTI / etc.]. Let's make sure we're comfortable with this."
- If user adjusts lower: "Being conservative is wise! Staying within [adjusted range] gives you more financial flexibility and lower stress."

---

#### Question 4.5: Down Payment Capacity
**Type:** Percentage selector + currency display
**Question (AI):** "What percentage down payment are you comfortable with? International real estate typically requires 20-35% down."

**Options:**
- 20% (minimum for most markets)
- 25%
- 30%
- 35%
- 40%
- 50%+
- All cash (100%)

**Display:** As user selects percentage, show actual dollar amount based on property range:
"On a property at [mid-point of their range], [X]% down payment = [calculated amount]"

**Validation:**
- Check against available liquid assets
- Flag if down payment + closing costs (add 3-5%) > liquid assets

**Purpose:**
- Realistic purchase capacity
- Risk tolerance indicator
- Cash reserve planning

**AI Follow-up:**
- If 20-25%: "Starting with a lower down payment maximizes your leverage. You'll have higher monthly payments but preserve cash for other opportunities."
- If 40-50%: "A larger down payment reduces your monthly payments and interest costs. This conservative approach provides stability."
- If all cash: "All-cash purchases eliminate financing risk and often allow for better negotiation. You'll want to ensure you maintain adequate liquidity for other needs."

**Warning Logic:**
- If selected down payment + closing costs > 80% of liquid assets → "This leaves you with limited reserves. We recommend keeping at least [amount] in liquid savings after purchase."

---

#### Question 4.6: Investment Timeline
**Type:** Single select
**Question (AI):** "When are you looking to make this investment?"

**Options:**
- Actively looking (ready to purchase within 1-3 months)
- Soon (3-6 months)
- Planning ahead (6-12 months)
- Long-term planning (1-2 years)
- Just exploring (2+ years)

**Purpose:**
- Urgency assessment
- Service level prioritization
- Market timing advice
- Professional matching

**AI Follow-up:**
- If actively looking: "Since you're ready to move quickly, I'll prioritize properties available now and connect you with professionals who can expedite the process."
- If long-term: "Planning ahead is smart! This gives us time to monitor markets, potentially improve your financial position, and find the perfect opportunity."

**Conditional Logic:**
- If "actively looking" but low credit score or insufficient down payment → Gently suggest: "Based on your financial profile, you might want to allow 3-6 months to [improve credit / save more]. This could save you significantly on interest rates."

---

### 6.6 Phase 5: Risk Profile & Experience

**Purpose**: Assess risk tolerance, investment experience, and emotional readiness for real estate investment.

**AI Transition:** "Just a few more questions to understand your investment experience and risk comfort level. This helps us recommend properties that match not just your finances, but your peace of mind."

---

#### Question 5.1: Real Estate Investment Experience
**Type:** Single select
**Question (AI):** "What's your level of real estate investment experience?"

**Options:**
- Complete beginner (never owned investment property)
- Dabbled (own 1 investment property or have been involved in 1 deal)
- Intermediate (own 2-3 investment properties)
- Experienced (own 4-6 properties or 5+ years experience)
- Professional/Expert (own 7+ properties, this is part of my career)

**Purpose:**
- Support level needed
- Property complexity matching
- Educational content personalization
- Risk assessment

**AI Follow-up:**
- If beginner: "Welcome to real estate investing! I'll make sure to provide extra guidance and connect you with experienced professionals who can support you through your first deal."
- If intermediate: "With some experience under your belt, you know the basics. I'll focus on helping you expand strategically."
- If expert: "As an experienced investor, you know the drill. I'll focus on finding unique opportunities and sophisticated strategies."

---

#### Question 5.2: Other Investment Experience
**Type:** Multi-select
**Question (AI):** "What other types of investments do you have experience with? Select all that apply."

**Options:**
- Stocks / ETFs
- Bonds
- Mutual funds
- Cryptocurrency
- Private equity
- Business ownership
- REITs (Real Estate Investment Trusts)
- Commodities
- None of the above

**Purpose:**
- Overall financial sophistication
- Risk comfort assessment
- Diversification context

**AI Follow-up:**
"Your experience with [selected investments] shows you understand [relevant concept: market volatility, long-term investing, etc.]. Real estate offers [comparison to their experience]."

---

#### Question 5.3: Risk Tolerance Assessment
**Type:** Scenario-based selection
**Question (AI):** "Imagine you invest $500K in a property. One year later, the market drops 15%. How would you react?"

**Options:**
- Very worried - I'd want to sell to prevent further losses
- Concerned - I'd seriously consider selling
- Neutral - I'd wait and see what happens
- Comfortable - Property value fluctuates, I'm focused on long-term
- Excited - This might be an opportunity to buy more at a discount

**Purpose:**
- True risk tolerance (not stated, but revealed)
- Loss aversion assessment
- Investment strategy alignment

**Scoring:**
- Very worried: Conservative risk tolerance
- Concerned: Moderately conservative
- Neutral: Moderate
- Comfortable: Moderately aggressive
- Excited: Aggressive

**AI Follow-up:**
"Your response indicates a [assessed risk level] risk tolerance. This means:
- We'll focus on [corresponding market types: established vs. emerging]
- We'll prioritize [corresponding goals: stability vs. growth]
- You might be comfortable with [corresponding strategies: proven markets vs. development opportunities]"

---

#### Question 5.4: Market Volatility Comfort
**Type:** Slider or single select
**Question (AI):** "Real estate markets can be more stable (slow, steady growth) or more volatile (potential for high growth and higher risk). Where's your comfort zone?"

**Scale:** 1-5
1. I want maximum stability, even if returns are lower
2. I prefer stability with some growth potential
3. Balanced between stability and growth
4. I'm willing to accept volatility for higher returns
5. I want maximum growth potential, comfortable with risk

**Purpose:**
- Market selection (emerging vs. established)
- Property type matching
- Portfolio strategy

**AI Follow-up:**
"Based on your preference for [level], I'll focus on:
- Markets: [corresponding markets]
- Property types: [corresponding types]
- Expected returns: [realistic expectations]"

---

#### Question 5.5: Management Preference
**Type:** Single select
**Question (AI):** "How hands-on do you want to be with your investment property?"

**Options:**
- Fully hands-off (professional property management required)
- Mostly hands-off (I'll approve major decisions)
- Moderately involved (I'll handle some aspects)
- Very hands-on (I want to manage most things myself)
- Depends on the property and location

**Purpose:**
- Property location constraints (remote = need management)
- Cost considerations (management fees)
- Property type suitability
- Lifestyle alignment

**AI Follow-up:**
"Preferring [level] management, I'll:
- [If hands-off]: Factor in property management costs (typically 8-12% of rent) and focus on locations with reputable management companies.
- [If hands-on]: Consider properties within reasonable distance or in very landlord-friendly markets."

---

### 6.7 Phase 6: Special Needs & Professional Matching

**Purpose**: Capture unique requirements and determine what professional support is needed.

**AI Transition:** "We're almost done! Last, I want to understand any special requirements you have and connect you with the right professionals to support your journey."

---

#### Question 6.1: Special Requirements or Priorities
**Type:** Open text (optional, with prompts)
**Question (AI):** "Is there anything specific you're looking for that we haven't covered? For example: proximity to specific cities, cultural/religious considerations, specific amenities, accessibility needs, etc."

**Examples shown:**
- "Near my family in [city]"
- "Must have elevator (elderly parents may visit)"
- "Kosher kitchen"
- "Within 30 min of beach"
- "Green building / eco-friendly"
- "Smart home features"

**Max length:** 500 characters

**Purpose:**
- Capture unique needs
- Build personal connection
- Ensure satisfaction with recommendations

**AI Response:**
- Use Claude API to generate personalized response acknowledging their needs
- Provide relevant insight if applicable

**AI Follow-up:**
"I've noted your requirement for [special needs]. This is important and I'll make sure our recommendations reflect this. [Relevant insight if applicable]."

---

#### Question 6.2: Primary Language Preference
**Type:** Single select
**Question (AI):** "What language do you prefer for communication with real estate professionals?"

**Options:**
- English
- Hebrew
- Spanish
- French
- German
- Mandarin
- Arabic
- Russian
- Portuguese
- Other: [text input]

**Purpose:**
- Professional matching
- Document language
- Communication comfort

---

#### Question 6.3: Professional Support Needed
**Type:** Multi-select
**Question (AI):** "Based on your profile, I think you might benefit from these professionals. Which would you like us to connect you with?"

**Auto-recommended based on profile:**
- [X] Real estate agent (always recommended)
- [X] Mortgage broker (if financing needed)
- [X] Tax advisor (if cross-border or multiple citizenships)
- [ ] Property manager (if hands-off preference)
- [ ] Real estate attorney (always helpful but optional)
- [ ] Currency exchange specialist (if investing abroad)
- [ ] Investment advisor (if complex portfolio)

**Checkboxes pre-selected based on logic:**
- Mortgage broker: If not all cash
- Tax advisor: If citizenship ≠ investment location or dual citizenship
- Property manager: If management preference = hands-off

**Purpose:**
- Professional matching
- Service package creation
- Revenue opportunity (referral fees)

**AI Follow-up:**
"Great! I'll introduce you to top-rated professionals in these areas. They specialize in [user's specific situation] and can provide expert guidance."

---

#### Question 6.4: Preferred Contact Method
**Type:** Single select
**Question (AI):** "How would you prefer we contact you with property matches and updates?"

**Options:**
- Email (I check regularly)
- WhatsApp (fastest for me)
- Phone call (I prefer to discuss)
- SMS (text messages)
- Platform notifications only (I'll check the app)

**Purpose:**
- Communication preferences
- Engagement optimization
- User experience

---

#### Question 6.5: Notification Frequency
**Type:** Single select
**Question (AI):** "How often would you like to receive property matches and market updates?"

**Options:**
- As soon as new matches appear (real-time)
- Daily digest (one email/message per day)
- Weekly summary (every Monday)
- Bi-weekly (every 2 weeks)
- Monthly only

**Purpose:**
- Prevent spam
- Optimize engagement
- Respect user preferences

---

### 6.8 Completion & Validation

**AI Message:**
"Excellent! I have everything I need. Let me analyze your complete financial profile and investment goals. This will take just a moment..."

**[Show loading animation - 2-3 seconds]**

**AI Message:**
"Analysis complete! I've created a comprehensive investment profile for you. Let me show you what I found..."

**[Transition to Investment Summary page]**

---

## 7. Financial Leverage Assessment (מינוף)

### 7.1 Core Leverage Calculations

The leverage assessment is the **crown jewel** of our onboarding. These calculations must be precise, transparent, and educational.

#### 7.1.1 Key Formulas

**1. Total Net Worth**
```
Liquid Assets = User-provided savings + investments
Real Estate Equity = Σ(Property Market Value - Outstanding Mortgage)
Total Net Worth = Liquid Assets + Real Estate Equity + Other Assets
```

**2. Debt-to-Income Ratio (DTI)**
```
Monthly Gross Income = Annual Income / 12
Total Monthly Debt = Σ(All Mortgage Payments + Other Debt Payments)
DTI Ratio = (Total Monthly Debt / Monthly Gross Income) × 100

Classification:
- DTI < 28%: Excellent (Prime borrowing tier)
- DTI 28-36%: Good (Standard borrowing tier)
- DTI 36-43%: Fair (Subprime borrowing tier)
- DTI > 43%: Poor (Limited borrowing capacity)
```

**3. Available Down Payment Capital**
```
Emergency Fund Needed = Monthly Expenses × 6
Down Payment Pool = MAX(0, Liquid Assets - Emergency Fund Needed)

If user has home equity:
  Accessible Home Equity = Home Equity × 0.8 (80% LTV on HELOC)
  Total Down Payment Potential = Down Payment Pool + Accessible Home Equity

If user has investment property equity:
  Accessible Investment Equity = Investment Property Equity × 0.6 (conservative)
  Total Down Payment Potential = Down Payment Pool + Accessible Investment Equity
```

**4. Maximum Comfortable Purchase Price**
```
Front-End Ratio (Housing expense ratio):
  Comfortable Housing Payment = Monthly Gross Income × 0.28
  Available for New Property = Comfortable Housing Payment - Current Housing Payment

Back-End Ratio (Total debt ratio):
  Comfortable Total Debt = Monthly Gross Income × 0.36
  Available for New Debt = Comfortable Total Debt - Total Current Monthly Debt

Maximum Monthly Payment = MIN(Available for New Property, Available for New Debt)

Assuming 30-year mortgage at current avg interest rate (e.g., 7%):
  Mortgage Principal = Maximum Monthly Payment / Monthly Payment Factor
  (Monthly Payment Factor for 7% 30-year ≈ 0.00665)

Maximum Purchase Price = Mortgage Principal / (1 - Down Payment Percentage)

Example:
  If Maximum Monthly Payment = $3,000
  If Interest Rate = 7%
  Mortgage Principal = $3,000 / 0.00665 = $451,128
  If Down Payment = 25%
  Maximum Purchase Price = $451,128 / 0.75 = $601,504
```

**5. Leverage Capacity Score**
```
Leverage Capacity Score (0-100):
  DTI Score (40 points):
    - DTI < 28%: 40 points
    - DTI 28-36%: 30 points
    - DTI 36-43%: 20 points
    - DTI > 43%: 10 points

  Credit Score (30 points):
    - Excellent (750+): 30 points
    - Very Good (700-749): 25 points
    - Good (650-699): 20 points
    - Fair (600-649): 10 points
    - Poor (<600): 5 points

  Down Payment Capacity (20 points):
    - Can do 40%+: 20 points
    - Can do 30-40%: 15 points
    - Can do 25-30%: 12 points
    - Can do 20-25%: 8 points
    - Can do <20%: 3 points

  Income Stability (10 points):
    - W2 employee 2+ years: 10 points
    - Self-employed 3+ years: 10 points
    - Self-employed 1-3 years: 6 points
    - Other: 4 points

Total Score = Sum of above

Classification:
- 90-100: Excellent leverage capacity
- 75-89: Strong leverage capacity
- 60-74: Moderate leverage capacity
- 45-59: Limited leverage capacity
- < 45: Minimal leverage capacity
```

### 7.2 Leverage Strategy Recommendations

Based on the Leverage Capacity Score, provide specific strategies:

**Excellent (90-100):**
- "You have excellent leverage capability. You qualify for premium financing terms."
- "Strategy: Consider using leverage to build a diversified portfolio rather than all-cash single purchase."
- "You could comfortably purchase: [calculated range] with [optimal down payment]%"

**Strong (75-89):**
- "You have strong leverage capability. Most lenders will offer favorable terms."
- "Strategy: Use leverage for your primary investment while maintaining cash reserves for opportunities."
- "You could comfortably purchase: [calculated range] with [optimal down payment]%"

**Moderate (60-74):**
- "You have moderate leverage capability. Financing is available with standard terms."
- "Strategy: Focus on one quality property with conservative leverage. Build equity before expanding."
- "You could comfortably purchase: [calculated range] with [optimal down payment]%"

**Limited (45-59):**
- "Your leverage capacity is currently limited. Let's build a plan to improve it."
- "Recommendations: [specific to their situation - pay down debt, improve credit, save more]"
- "Current comfortable range: [calculated range]"
- "With improvements, potential range in 12 months: [projected range]"

**Minimal (<45):**
- "Based on your current financial profile, we recommend building foundation before leveraging."
- "6-Month Action Plan:"
  - "1. [Specific recommendation: Build emergency fund to $X]"
  - "2. [Pay down high-interest debt, currently $X]"
  - "3. [Improve credit score by addressing: specific items]"
- "After these steps, your estimated purchasing power: [projected range]"

### 7.3 Leverage Risk Warnings

Display appropriate warnings based on user's profile:

**High DTI (>40%) Warning:**
"⚠️ Your current debt-to-income ratio of [X]% is high. Taking on additional debt could strain your finances. We recommend:
- Pay down existing debt by $[amount] to reach comfortable DTI of 36%
- Or consider all-cash or higher down payment investment"

**Low Cash Reserves Warning:**
"⚠️ Your available cash reserves after down payment would be $[X], which is less than 6 months of expenses. Real estate can have unexpected costs. We recommend:
- Keeping $[amount] minimum in reserves
- Consider starting with a smaller investment
- Build savings for 6 more months before purchasing"

**Over-Leveraged Portfolio Warning:**
"⚠️ Your total real estate portfolio is currently [X]% leveraged. Adding more debt could be risky. Consider:
- Paying down existing mortgages before new purchase
- Using equity from existing properties for all-cash deal on next property
- Diversifying into less leverage-intensive investments"

---

## 8. AI Conversation Architecture

### 8.1 AI Personality & Tone

**Core Principles:**
- **Knowledgeable but not condescending**: Professional financial advisor who respects the user
- **Educational without being preachy**: Share insights naturally within conversation
- **Encouraging yet realistic**: Celebrate strengths, honest about challenges
- **Culturally aware**: Adapt language for Hebrew/English, understand Israeli vs. American norms
- **Trustworthy**: Transparent about calculations, admit when recommending caution

**Tone Adjustments by User Profile:**
- First-time investors: More educational, patient, reassuring
- Experienced investors: Concise, sophisticated, collaborative
- High net worth: Professional, respect their time, focus on strategic insights
- Struggling financially: Compassionate, constructive, focus on improvement path

### 8.2 Dynamic Question Adaptation

**Conditional Logic Examples:**

1. **If user has high DTI (>40%):**
   - Add question: "I notice your DTI is quite high. Are you planning to pay down any debts before investing?"
   - Adjust recommendations to emphasize debt reduction

2. **If user has significant home equity:**
   - Add question: "Have you considered using a HELOC on your primary residence to increase your investment capacity?"
   - Explain pros/cons

3. **If user is self-employed:**
   - Add questions about business age, income consistency
   - Explain lender requirements for self-employed

4. **If user selects "All cash":**
   - Skip mortgage-related questions
   - Ask: "What's driving your preference for all-cash? Understanding this helps me serve you better."
   - Discuss opportunity cost of not leveraging

5. **If user's budget seems very high relative to income:**
   - Add question: "Your investment budget is quite high compared to income. Do you have a co-investor or partner?"
   - Validate understanding

6. **If first-time investor + complex property types:**
   - Add: "I notice you're interested in [commercial/land]. These require specialized expertise. Are you planning to work with partners experienced in this area?"

### 8.3 AI Insights & Educational Moments

Throughout the conversation, AI should provide "micro-lessons" at appropriate moments:

**Examples:**

After budget question:
*"💡 Quick insight: Real estate investors often use the '28/36 rule' - housing costs shouldn't exceed 28% of gross income, and total debt shouldn't exceed 36%. I'll use this to help calculate your comfortable range."*

After risk tolerance question:
*"💡 Did you know? Real estate historically has lower volatility than stocks but also lower liquidity. Your risk preference helps me match you with markets that align with your comfort level."*

After leverage questions:
*"💡 Leverage (מינוף) is powerful: With 25% down, a 10% property appreciation actually gives you 40% return on your invested capital. This is why real estate is such an attractive wealth-building tool."*

After DTI calculation:
*"💡 Your DTI of [X]% puts you in the [category] range for lenders. This affects both the interest rate you'll qualify for and the maximum loan amount."*

### 8.4 Conversational Transitions

Smooth transitions between phases:

**Phase 1 → Phase 2:**
"Great! I have a good sense of your background. Now, let's dive into your financial situation. This might feel detailed, but it's crucial for giving you accurate recommendations. All information is confidential and helps me understand what you can comfortably afford. Ready?"

**Phase 2 → Phase 3:**
"Excellent! You're building a solid financial profile. Now comes the interesting part - let's explore your leverage capability, or מינוף. This is where we calculate how to maximize your investment potential using your existing assets and borrowing capacity."

**Phase 3 → Phase 4:**
"Impressive! Based on what you've shared, I can calculate that you have [X] in potential buying power. Now let's talk about what you actually want to buy. What kind of properties excite you?"

**Phase 4 → Phase 5:**
"I love your property preferences! Just a few more questions about your experience and comfort level with risk, then I'll put together your personalized investment profile."

**Phase 5 → Phase 6:**
"Almost there! Last step is to understand any special needs you have and connect you with the right professionals to support you."

---

## 9. Investment Summary Output

### 9.1 Summary Page Architecture

After completing all questions, users see a comprehensive Investment Profile Summary. This is a **critical trust-building moment** and differentiation opportunity.

**Page Structure:**

```
┌─────────────────────────────────────────────────────────┐
│  🎉 Your Investment Profile is Complete!                │
│                                                          │
│  [User Name], based on your comprehensive financial     │
│  assessment, here's your personalized investment         │
│  analysis:                                               │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  📊 FINANCIAL HEALTH SCORE: [85/100] - STRONG           │
│  ───────────────────────────────────────────────────────│
│  Your financial profile shows strong investment          │
│  readiness with excellent leverage capacity.             │
│                                                          │
│  Score Breakdown:                                        │
│  • Income Stability: ⭐⭐⭐⭐⭐ (20/20)                   │
│  • Debt Management: ⭐⭐⭐⭐ (18/20)                      │
│  • Savings & Liquidity: ⭐⭐⭐⭐⭐ (20/20)                │
│  • Credit Profile: ⭐⭐⭐⭐ (17/20)                       │
│  • Leverage Capacity: ⭐⭐⭐⭐ (10/20)                    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  💰 YOUR INVESTMENT CAPACITY                             │
│  ───────────────────────────────────────────────────────│
│  Recommended Purchase Range:                             │
│  $450,000 - $750,000                                     │
│                                                          │
│  Breakdown:                                              │
│  • Available Down Payment: $180,000                      │
│  • Estimated Mortgage Qualification: $570,000            │
│  • Recommended Down Payment: 25-30%                      │
│  • Estimated Monthly Payment: $3,800 - $5,200            │
│                                                          │
│  Financial Ratios:                                       │
│  • Current DTI: 28% ✓ Healthy                           │
│  • Projected DTI (with new property): 35% ✓ Comfortable │
│  • Down Payment / Net Worth: 22% ✓ Balanced             │
│                                                          │
│  [See detailed calculations] →                           │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  🎯 INVESTMENT READINESS: READY TO INVEST                │
│  ───────────────────────────────────────────────────────│
│  ✓ Emergency fund established (8 months coverage)        │
│  ✓ Healthy debt-to-income ratio                         │
│  ✓ Strong credit profile                                │
│  ✓ Sufficient liquid capital for down payment           │
│  ⚠️ Consider: Maintain $30K reserve after purchase       │
│                                                          │
│  Timeline Recommendation: Ready for immediate action     │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  📈 LEVERAGE ANALYSIS (מינוף)                            │
│  ───────────────────────────────────────────────────────│
│  Leverage Capacity Score: 82/100 - STRONG                │
│                                                          │
│  Your Leverage Options:                                  │
│                                                          │
│  Option 1: Conservative (Recommended)                    │
│  • Down Payment: 30% ($210K)                            │
│  • Mortgage: $490K @ 7.0%                               │
│  • Monthly Payment: $3,260                              │
│  • Equity from Day 1: 30%                               │
│  • Risk Level: Low                                      │
│  ✓ Best for: Stability and peace of mind                │
│                                                          │
│  Option 2: Balanced                                      │
│  • Down Payment: 25% ($175K)                            │
│  • Mortgage: $525K @ 7.2%                               │
│  • Monthly Payment: $3,570                              │
│  • Equity from Day 1: 25%                               │
│  • Risk Level: Medium                                   │
│  ✓ Best for: Balancing leverage and stability           │
│                                                          │
│  Option 3: Aggressive                                    │
│  • Down Payment: 20% ($140K)                            │
│  • Mortgage: $560K @ 7.5%                               │
│  • Monthly Payment: $3,920                              │
│  • Equity from Day 1: 20%                               │
│  • Risk Level: Medium-High                              │
│  ✓ Best for: Maximizing leverage and buying power       │
│                                                          │
│  [Detailed leverage scenarios] →                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  🎨 YOUR INVESTMENT PROFILE                              │
│  ───────────────────────────────────────────────────────│
│  Primary Goal: Rental Income + Capital Appreciation      │
│  Target Markets: USA (Florida), Portugal, Israel         │
│  Property Types: Residential Apartments, Multi-family    │
│  Risk Profile: Moderate                                  │
│  Management: Hands-off (professional management)         │
│  Timeline: Ready to invest (3-6 months)                  │
│  Experience: Intermediate (2 properties owned)           │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  🏘️ RECOMMENDED PROPERTIES (Based on your profile)       │
│  ───────────────────────────────────────────────────────│
│  [Property Card 1]                                       │
│  Miami, Florida • $580,000 • 2BR Condo                   │
│  Match Score: 95%                                        │
│  • Rental Yield: 6.2% annual                            │
│  • Strong market fundamentals                           │
│  • Turnkey, fully managed                               │
│  [View Details →]                                        │
│                                                          │
│  [Property Card 2]                                       │
│  Lisbon, Portugal • $520,000 • 3BR Apartment             │
│  Match Score: 92%                                        │
│  • Golden Visa eligible                                 │
│  • Rental Yield: 5.8% annual                            │
│  • High appreciation potential                          │
│  [View Details →]                                        │
│                                                          │
│  [See all 23 matched properties →]                       │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  👨‍💼 RECOMMENDED PROFESSIONALS                            │
│  ───────────────────────────────────────────────────────│
│  Based on your profile, we recommend:                    │
│                                                          │
│  🏦 Mortgage Broker                                      │
│  Sarah Cohen - International Real Estate Financing       │
│  ⭐ 4.9/5 (127 reviews) • Specializes in US/EU markets  │
│  "Sarah helped me secure 6.8% on my Miami property"     │
│  [Connect with Sarah →]                                  │
│                                                          │
│  💼 Tax Advisor                                          │
│  David Miller, CPA - Cross-border Tax Specialist         │
│  ⭐ 4.8/5 (89 reviews) • Israeli/US dual citizens       │
│  "Essential for understanding tax implications"          │
│  [Connect with David →]                                  │
│                                                          │
│  🏠 Property Manager (Florida)                           │
│  SunCoast Property Management                            │
│  ⭐ 4.7/5 (234 reviews) • Full-service management       │
│  [View Profile →]                                        │
│                                                          │
│  [See all recommended professionals →]                   │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  📋 NEXT STEPS                                           │
│  ───────────────────────────────────────────────────────│
│  1. ✓ Complete financial profile                        │
│  2. → Review matched properties                         │
│  3. → Connect with mortgage broker for pre-approval      │
│  4. → Schedule consultations with recommended advisors   │
│  5. → Begin property due diligence                       │
│                                                          │
│  [Start Exploring Properties]  [Talk to Advisor]        │
└─────────────────────────────────────────────────────────┘
```

### 9.2 Detailed Calculations (Expandable Section)

Users can click "See detailed calculations" to see transparency:

```
DETAILED FINANCIAL CALCULATIONS
════════════════════════════════════════════════════════

1. INCOME ANALYSIS
   Gross Annual Income: $150,000
   Gross Monthly Income: $12,500
   Monthly Expenses: $4,200
   Disposable Monthly Income: $8,300

2. DEBT-TO-INCOME RATIOS
   Current Monthly Debt Payments:
   • Primary Mortgage: $2,400
   • Car Loan: $450
   • Credit Cards: $0
   • Total: $2,850

   Current DTI: 22.8% ($2,850 / $12,500)
   ✓ Excellent - Well below 28% threshold

   After New Property Purchase (Conservative Option):
   • Existing Debt: $2,850
   • New Property Payment: $3,260
   • Total: $6,110

   Projected DTI: 48.9% ($6,110 / $12,500)

   Front-End Ratio (Housing only):
   • Total Housing: $5,660 ($2,400 + $3,260)
   • Front-End Ratio: 45.3%
   ⚠️ Above recommended 28% - See recommendation

3. DOWN PAYMENT CAPACITY
   Total Liquid Assets: $220,000
   Emergency Fund Needed: $25,200 (6 months × $4,200)
   Available for Down Payment: $194,800

   Recommended Down Payment: $175,000 (25%)
   Remaining Liquid Reserves: $45,000
   ✓ Healthy reserve maintained

4. MORTGAGE QUALIFICATION ESTIMATE
   Based on:
   • Income: $150,000/year
   • Credit Score: Very Good (720)
   • DTI Target: 36%
   • Interest Rate: 7.2% (current market avg)

   Calculation:
   Max Total Monthly Debt @ 36% DTI = $4,500
   Less Current Debt: -$2,850
   Available for New Mortgage: $1,650/month

   30-year mortgage @ 7.2% = $1,650 / 0.00676 = $244,082
   With 25% down: $244,082 / 0.75 = $325,443 max purchase

   ⚠️ Note: This is conservative bank qualification. Based on
   your full financial picture, you can comfortably go higher
   because:
   • Strong emergency fund
   • No consumer debt
   • Stable employment (8 years)
   • Existing rental income potential

   Comfortable Range (our recommendation): $450K - $750K

5. LEVERAGE CAPACITY SCORE CALCULATION

   DTI Component (40 points):
   • Current DTI: 22.8% → 40 points ✓

   Credit Score Component (30 points):
   • Credit Score: 720 (Very Good) → 25 points ✓

   Down Payment Capacity (20 points):
   • Can do 25-30% comfortably → 15 points ✓

   Income Stability (10 points):
   • W2 employee, 8 years same company → 10 points ✓

   Total Score: 90/100 - EXCELLENT

6. NET WORTH SUMMARY
   Assets:
   • Liquid Savings: $220,000
   • Primary Residence: $650,000
   • Investment Property #1: $380,000
   • Investment Property #2: $420,000
   • Retirement Accounts: $180,000 (not counted for investment)
   Total Assets: $1,850,000

   Liabilities:
   • Primary Mortgage: $385,000
   • Investment Property #1 Mortgage: $280,000
   • Investment Property #2 Mortgage: $310,000
   • Car Loan: $8,500
   Total Liabilities: $983,500

   Net Worth: $866,500
   Real Estate Equity: $475,000
   Real Estate LTV: 64.3% (Healthy - below 75%)

7. CASH FLOW ANALYSIS
   Current Monthly Cash Flow:
   • Income: +$12,500
   • Living Expenses: -$4,200
   • Debt Payments: -$2,850
   • Investment Property #1 (net): +$450
   • Investment Property #2 (net): +$380

   Net Monthly Cash Flow: +$6,280

   After New Property (Conservative Option):
   • New Property Payment: -$3,260
   • Estimated Rent: +$2,800
   • Net: -$460/month

   Total Net Cash Flow: +$5,820/month
   ✓ Still strong positive cash flow

ASSUMPTIONS:
• Interest rates: Current market average (7.0-7.5%)
• Property values: Based on current market data
• Rental income: Conservative estimates (80% occupancy)
• Property management: 10% of rent included in calculations
• Closing costs: 3-5% of purchase price (not shown above)

These calculations are estimates. Actual mortgage qualification
depends on lender policies, credit verification, and appraisal.
```

### 9.3 Investment Readiness Levels

**Level 1: Not Ready**
- **Criteria:** DTI > 50%, no emergency fund, credit score < 600, minimal savings
- **Message:** "Based on your current financial situation, we recommend building a stronger foundation before investing in real estate."
- **Action Plan:** Specific steps with timeline
- **Encouragement:** "Real estate will still be here! Let's create a 12-month plan to get you ready."

**Level 2: Need Preparation**
- **Criteria:** DTI 43-50%, small emergency fund, credit score 600-650, minimal down payment
- **Message:** "You're on the right track! With 6-12 months of focused financial improvement, you'll be ready to invest confidently."
- **Action Plan:** Specific recommendations
- **Show:** Projected capacity in 6 and 12 months

**Level 3: Ready with Caution**
- **Criteria:** DTI 36-43%, adequate emergency fund, credit score 650-700, sufficient down payment
- **Message:** "You're ready to invest! We recommend starting conservatively and building from there."
- **Recommendation:** Smaller properties, higher down payment, single market focus

**Level 4: Strong Position**
- **Criteria:** DTI 28-36%, strong emergency fund, credit score 700-750, strong down payment capacity
- **Message:** "You're in a strong position to invest! You have good flexibility in property selection."
- **Recommendation:** Quality over quantity, build strategic portfolio

**Level 5: Excellent Position**
- **Criteria:** DTI < 28%, excellent emergency fund, credit score 750+, substantial down payment capacity
- **Message:** "You have excellent investment readiness! You have maximum flexibility and can pursue sophisticated strategies."
- **Recommendation:** Diversified portfolio opportunities, leverage optimization

---

## 10. User Stories & Requirements

### 10.1 Functional Requirements

#### FR-1: Multi-Phase Question Flow
**Priority:** MUST HAVE
**Description:** System shall present questions in 6 logical phases with progress indication

**Acceptance Criteria:**
- ✓ User can see current phase and overall progress (e.g., "Phase 2 of 6: Financial Health")
- ✓ User can navigate back to previous questions within a phase
- ✓ Progress bar shows accurate percentage completion
- ✓ System saves responses in real-time (no data loss on page refresh)

---

#### FR-2: Dynamic Question Adaptation
**Priority:** MUST HAVE
**Description:** System shall dynamically adjust questions based on previous answers

**Acceptance Criteria:**
- ✓ If user selects "No real estate owned," skip property detail questions
- ✓ If user selects "All cash," skip mortgage-related questions
- ✓ If user is self-employed, add business stability questions
- ✓ Total question count adapts (range: 28-42 questions depending on profile)

---

#### FR-3: Financial Calculations Engine
**Priority:** MUST HAVE
**Description:** System shall accurately calculate all financial metrics in real-time

**Acceptance Criteria:**
- ✓ DTI calculation accurate to 2 decimal places
- ✓ Down payment capacity accounts for emergency fund
- ✓ Mortgage qualification uses current market interest rates
- ✓ All calculations match manual verification
- ✓ Calculations update instantly as user modifies inputs

---

#### FR-4: Leverage Assessment
**Priority:** MUST HAVE
**Description:** System shall calculate comprehensive leverage capacity including equity analysis

**Acceptance Criteria:**
- ✓ Calculate home equity accurately
- ✓ Calculate investment property equity across multiple properties
- ✓ Determine accessible equity (HELOC potential)
- ✓ Calculate Leverage Capacity Score (0-100)
- ✓ Provide 3 leverage scenarios (conservative, balanced, aggressive)

---

#### FR-5: AI Conversational Responses
**Priority:** MUST HAVE
**Description:** AI shall provide contextual, personalized responses after each question

**Acceptance Criteria:**
- ✓ Response generated within 2 seconds
- ✓ Response references user's specific answer and context
- ✓ Response includes relevant insight or educational tip when applicable
- ✓ Tone adapts to user profile (beginner vs. expert)
- ✓ Supports both English and Hebrew languages

---

#### FR-6: Investment Summary Generation
**Priority:** MUST HAVE
**Description:** System shall generate comprehensive investment profile summary

**Acceptance Criteria:**
- ✓ Financial Health Score calculated and displayed (0-100)
- ✓ Investment Capacity range shown with breakdown
- ✓ Investment Readiness level determined
- ✓ Leverage Analysis with multiple scenarios
- ✓ All calculations shown with "detailed view" option
- ✓ Downloadable PDF version of summary

---

#### FR-7: Property Matching Algorithm
**Priority:** SHOULD HAVE
**Description:** System shall match user profile with relevant properties from database

**Acceptance Criteria:**
- ✓ Properties filtered by user's budget range
- ✓ Properties filtered by target markets
- ✓ Properties filtered by property types
- ✓ Match score calculated based on all preferences (0-100%)
- ✓ Show top 5 matches on summary page
- ✓ Properties ranked by match score + market attractiveness

---

#### FR-8: Professional Recommendations
**Priority:** SHOULD HAVE
**Description:** System shall recommend appropriate professionals based on profile

**Acceptance Criteria:**
- ✓ Mortgage broker recommended if financing needed
- ✓ Tax advisor recommended if cross-border or dual citizenship
- ✓ Property manager recommended if hands-off preference
- ✓ Real estate attorney always offered
- ✓ Professionals filtered by language preference
- ✓ Professionals filtered by expertise in target markets

---

#### FR-9: Data Persistence & Privacy
**Priority:** MUST HAVE
**Description:** All user data shall be securely stored and retrievable

**Acceptance Criteria:**
- ✓ Responses saved to database after each question
- ✓ User can resume onboarding from where they left off
- ✓ User can edit previous answers from summary page
- ✓ All financial data encrypted at rest
- ✓ Compliance with GDPR and data privacy regulations
- ✓ User can delete all data on request

---

#### FR-10: Validation & Error Handling
**Priority:** MUST HAVE
**Description:** System shall validate inputs and handle errors gracefully

**Acceptance Criteria:**
- ✓ Required fields enforced before allowing "Next"
- ✓ Numeric inputs validated (e.g., income > 0)
- ✓ Logical validation (e.g., mortgage < property value)
- ✓ Warning if suspicious values (e.g., very high budget vs. low income)
- ✓ Helpful error messages explaining what's wrong
- ✓ AI fallback responses if Claude API fails

---

### 10.2 Key User Stories

**Story 1: First-Time Investor Sarah**
> "As a first-time investor with limited real estate knowledge, I want clear explanations of financial concepts like DTI and leverage, so that I can make informed decisions confidently."

**Story 2: Experienced Investor Michael**
> "As an experienced investor with existing properties, I want the system to account for my portfolio equity, so that I can see my true buying power using leverage."

**Story 3: Cross-Border Investor Yael**
> "As a dual-citizen investor looking at international properties, I want to be connected with tax advisors familiar with my situation, so that I can navigate complex tax implications."

**Story 4: Budget-Conscious Investor**
> "As someone with limited savings, I want honest feedback about whether I'm ready to invest, so that I don't make financially risky decisions."

**Story 5: Time-Strapped Professional**
> "As a busy professional, I want to complete onboarding in one sitting and have my data saved, so that I don't have to re-enter information if interrupted."

---

## 11. Non-Functional Requirements

### 11.1 Performance

| Requirement | Target | Measurement |
|-------------|--------|-------------|
| **Page Load Time** | < 2 seconds | Initial chat interface load |
| **AI Response Time** | < 3 seconds | From user answer to AI response display |
| **Calculation Time** | < 500ms | All financial calculations |
| **Summary Generation** | < 5 seconds | Complete investment summary page |
| **Database Save** | < 1 second | Response persistence per question |

### 11.2 Scalability

- Support **10,000+ concurrent users** in onboarding without degradation
- Handle **100,000+ completed profiles** in database
- AI API rate limiting and queuing to handle spikes

### 11.3 Security & Privacy

**Must Have:**
- ✓ All financial data encrypted at rest (AES-256)
- ✓ All data transmission over HTTPS (TLS 1.3)
- ✓ Financial data stored in compliance with PCI DSS guidelines
- ✓ User authentication required (no anonymous profiles)
- ✓ Row-level security (users can only access own data)
- ✓ Audit logging of all data access
- ✓ Automatic session timeout after 30 minutes of inactivity
- ✓ No storage of credit card or bank account numbers

**Compliance:**
- GDPR compliant (right to access, right to be forgotten)
- CCPA compliant (California Consumer Privacy Act)
- SOC 2 Type II compliance (planned)

### 11.4 Accessibility

- **WCAG 2.1 Level AA compliance**
- Screen reader compatible
- Keyboard navigation support
- Color contrast ratios meet standards
- Font sizes adjustable
- RTL (Right-to-Left) support for Hebrew

### 11.5 Localization

**Languages:**
- English (US) - Full support
- Hebrew - Full support
- Spanish - Planned Q2 2026
- French - Planned Q3 2026

**Localization Requirements:**
- Currency format by locale
- Number format by locale
- Date format by locale
- All UI text translatable
- AI responses in user's selected language

### 11.6 Browser & Device Support

**Desktop Browsers:**
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

**Mobile:**
- iOS Safari (iOS 15+)
- Chrome Mobile (Android 10+)
- Responsive design for all screen sizes (320px - 2560px)

### 11.7 Reliability & Availability

- **Uptime:** 99.9% (excluding planned maintenance)
- **Data Backup:** Daily automated backups, retained for 30 days
- **Disaster Recovery:** < 4 hour RTO (Recovery Time Objective)
- **Error Rate:** < 0.1% of user sessions encounter errors

---

## 12. UX Guidelines

### 12.1 Design Principles

1. **Progressive Disclosure**: Don't overwhelm users with all questions at once
2. **Trust Through Transparency**: Show calculations, explain why we ask each question
3. **Celebrate Progress**: Positive reinforcement as users complete phases
4. **Educational, Not Interrogative**: Frame as learning journey, not questionnaire
5. **Respect Time**: Show time estimate, save progress, allow skip for optional questions
6. **Visual Hierarchy**: Use cards, spacing, and typography to guide attention
7. **Micro-Interactions**: Smooth animations, loading states, success confirmations

### 12.2 Visual Design

**Color System:**
- **Primary (Nova Amber):** #F59E0B - Trust, warmth, premium feel
- **Secondary (Nova Blue):** #3B82F6 - Professionalism, stability
- **Success:** #10B981 - Positive reinforcement
- **Warning:** #F59E0B - Important notices
- **Error:** #EF4444 - Critical issues
- **Neutral:** Grays for background, text, borders

**Typography:**
- **Headings:** Inter Bold
- **Body:** Inter Regular
- **Numbers/Data:** JetBrains Mono (for financial figures)
- **AI Voice:** Inter Medium (slightly warmer than body)

**Spacing:**
- Generous whitespace between questions
- Comfortable reading width (max 800px)
- Consistent padding (8px grid system)

### 12.3 Interaction Patterns

**Question Types:**

1. **Single Select**
   - Radio buttons with card-style options
   - Icon + label + description
   - Hover state showing selection
   - Selected state with color accent

2. **Multi-Select**
   - Checkboxes with card-style options
   - Show count of selections
   - Visual feedback on each selection

3. **Currency Input**
   - Currency selector dropdown (flags)
   - Large, clear number input
   - Real-time formatting with commas
   - Range slider for quick adjustment (optional)

4. **Country Selector**
   - Searchable dropdown
   - Country flags
   - Popular countries at top

5. **Text Input**
   - Auto-growing text area
   - Character count indicator
   - Helpful placeholder examples

**Navigation:**
- "Back" button always visible (except on first question)
- "Next" button disabled until valid answer provided
- "Skip" button for optional questions with explanation of impact
- Progress bar at top showing % completion

**Feedback:**
- Success animation on question completion
- AI typing indicator before response
- Smooth scroll to new question
- Celebration animation on phase completion

### 12.4 Error States

**Input Errors:**
- Inline validation (red border + message below field)
- Error appears on blur or submit attempt
- Clear explanation of what's wrong
- Suggestion for fixing

**System Errors:**
- Friendly error messages (avoid technical jargon)
- Fallback options (e.g., "AI unavailable, showing standard response")
- Retry mechanisms
- Support contact if persistent

### 12.5 Mobile Optimization

- Touch-friendly targets (minimum 44x44px)
- Simplified layouts (single column)
- Bottom sheet for selectors
- Sticky "Next" button at bottom
- Collapsible progress indicator
- Optimized keyboard inputs (numeric for numbers, etc.)

---

## 13. Technical Considerations

### 13.1 Database Schema Extensions

**New Tables Needed:**

```sql
-- Store detailed leverage analysis
CREATE TABLE leverage_assessments (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),

  -- Equity calculations
  primary_residence_equity DECIMAL(15,2),
  investment_property_equity DECIMAL(15,2),
  total_real_estate_equity DECIMAL(15,2),
  accessible_home_equity DECIMAL(15,2),
  accessible_investment_equity DECIMAL(15,2),

  -- Debt analysis
  total_monthly_debt DECIMAL(10,2),
  mortgage_debt DECIMAL(10,2),
  other_debt DECIMAL(10,2),

  -- Ratios
  dti_ratio DECIMAL(5,2),
  front_end_ratio DECIMAL(5,2),
  portfolio_ltv DECIMAL(5,2),

  -- Capacity
  leverage_capacity_score INTEGER,
  max_comfortable_purchase DECIMAL(15,2),
  recommended_down_payment_pct DECIMAL(5,2),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Store property details for users with real estate
CREATE TABLE user_properties (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  property_type TEXT, -- 'primary_residence' | 'investment'

  location_country TEXT,
  location_city TEXT,

  purchase_price DECIMAL(15,2),
  purchase_year INTEGER,
  current_market_value DECIMAL(15,2),
  outstanding_mortgage DECIMAL(15,2),

  -- For investment properties
  monthly_rental_income DECIMAL(10,2),
  monthly_expenses DECIMAL(10,2),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Store other debt obligations
CREATE TABLE user_debts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  debt_type TEXT, -- 'auto', 'student', 'credit_card', 'business', 'personal', 'other'
  monthly_payment DECIMAL(10,2),
  total_balance DECIMAL(15,2),

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Extended investor_profiles table
ALTER TABLE investor_profiles ADD COLUMN IF NOT EXISTS:
  employment_status TEXT,
  gross_annual_income DECIMAL(15,2),
  income_currency TEXT,
  monthly_expenses DECIMAL(10,2),
  liquid_assets DECIMAL(15,2),
  emergency_fund_months DECIMAL(3,1),
  credit_score_range TEXT,
  mortgage_preapproval_amount DECIMAL(15,2),

  -- Investment capacity (calculated)
  investment_readiness_level TEXT,
  financial_health_score INTEGER,
  recommended_min_price DECIMAL(15,2),
  recommended_max_price DECIMAL(15,2),
  recommended_down_payment DECIMAL(15,2);
```

### 13.2 AI Integration Architecture

**Claude API Integration:**

```typescript
// AI Service for Onboarding
interface OnboardingAIService {
  generateResponse(
    questionId: string,
    userAnswer: any,
    context: OnboardingContext
  ): Promise<AIResponse>;

  generateSummary(
    profile: InvestorProfile,
    calculations: FinancialCalculations
  ): Promise<InvestmentSummary>;
}

// Context includes all previous answers
interface OnboardingContext {
  userId: string;
  locale: 'en' | 'he';
  currentPhase: number;
  allResponses: Record<string, any>;
  calculatedMetrics?: {
    dti: number;
    netWorth: number;
    leverageScore: number;
  };
}
```

**Prompt Engineering Strategy:**

1. **System Prompt**: Define AI personality, knowledge domain, tone
2. **Context Injection**: Include relevant previous answers
3. **Structured Output**: Request specific format for parsing
4. **Fallback Responses**: Hardcoded responses if API fails
5. **Caching**: Cache common response patterns

### 13.3 Calculation Engine

**Dedicated Financial Calculation Service:**

```typescript
class FinancialCalculator {
  // Core calculations
  calculateDTI(monthlyDebt: number, monthlyIncome: number): number;
  calculateNetWorth(assets: Assets, liabilities: Liabilities): number;
  calculateEquity(marketValue: number, mortgage: number): number;

  // Leverage analysis
  calculateLeverageCapacity(profile: FinancialProfile): LeverageAssessment;
  calculateMaxPurchasePrice(profile: FinancialProfile): PurchaseRange;

  // Investment readiness
  assessInvestmentReadiness(profile: FinancialProfile): ReadinessLevel;
  calculateFinancialHealthScore(profile: FinancialProfile): number;

  // Scenarios
  generateLeverageScenarios(profile: FinancialProfile): LeverageScenario[];
}
```

**Testing Requirements:**
- Unit tests for all calculation functions
- Test data covering edge cases (very high/low incomes, multiple properties, etc.)
- Validation against professional financial advisor calculations
- Regular audit of formula accuracy

### 13.4 State Management

**Onboarding State:**
- Store in database after each question (server-side source of truth)
- Local state for UX (React state or Zustand)
- Optimistic updates with rollback on failure
- Resume capability (fetch state on mount)

### 13.5 API Design

**Key Endpoints:**

```typescript
// Save response for a question
POST /api/onboarding/responses
Body: {
  questionId: string;
  value: any;
  category: string;
}
Response: { success: boolean; nextQuestion?: Question }

// Get current onboarding state
GET /api/onboarding/progress
Response: {
  currentStep: number;
  totalSteps: number;
  responses: Record<string, any>;
  calculations?: FinancialMetrics;
}

// Generate investment summary
POST /api/onboarding/complete
Response: {
  summary: InvestmentSummary;
  matchedProperties: Property[];
  recommendedProfessionals: Professional[];
}

// Update specific response (from summary page)
PATCH /api/onboarding/responses/:questionId
Body: { value: any }
```

### 13.6 Third-Party Integrations

**Potential Integrations:**

1. **Credit Score APIs** (Experian, Equifax)
   - Allow users to pull real credit score (with permission)
   - More accurate mortgage qualification

2. **Mortgage Rate APIs**
   - Real-time interest rate data
   - Lender-specific rate estimation

3. **Property Valuation APIs** (Zillow, Redfin)
   - Validate user-provided property values
   - Auto-suggest market value

4. **Currency Exchange APIs**
   - Real-time exchange rates
   - Multi-currency support

---

## 14. Go-to-Market Strategy

### 14.1 Launch Phases

**Phase 1: Closed Beta (Month 1-2)**
- Launch to 100 selected users (mix of profiles)
- Heavy user testing and feedback collection
- Iterate on calculations and UX
- Goal: 70%+ completion rate, 4.0+ satisfaction

**Phase 2: Open Beta (Month 3)**
- Open to all new signups
- A/B test variations of questions
- Collect data on drop-off points
- Goal: 60%+ completion rate

**Phase 3: Full Launch (Month 4)**
- Replace old onboarding entirely
- Marketing campaign highlighting new capabilities
- Press releases emphasizing differentiation
- Goal: 70%+ completion rate, 50+ NPS

### 14.2 User Education

**Before Onboarding:**
- Landing page explaining: "Why we ask these questions"
- Video testimonial from users who benefited
- "This takes 10-12 minutes and gives you a professional-grade investment analysis worth $500+"

**During Onboarding:**
- Tooltips explaining financial terms
- "Why we ask this" links for sensitive questions
- Educational micro-lessons from AI

**After Onboarding:**
- "Understanding Your Investment Profile" guide
- Webinar: "How to use your financial assessment"
- Email series explaining each section of summary

### 14.3 Marketing Messaging

**Key Messages:**

1. **"Know Your True Buying Power"**
   - Tagline: "Most platforms ask your budget. We calculate what you can actually afford."

2. **"Professional-Grade Financial Analysis"**
   - Tagline: "Get the same analysis a financial advisor would charge $500 for - free."

3. **"No More Wasted Time"**
   - Tagline: "Only see properties you can realistically buy."

4. **"Leverage Your Way to Wealth"**
   - Tagline: "Discover how to use מינוף to maximize your investment potential."

### 14.4 Success Stories (Planned)

- **Sarah's Story**: "I thought I could only afford $300K properties. Ultra showed me I could leverage my home equity and comfortably invest in a $550K property that now generates $2,400/month."

- **Michael's Story**: "As an experienced investor, I was frustrated by basic questionnaires. Ultra's comprehensive assessment helped me identify I could leverage $400K from my existing portfolio I didn't realize was available."

---

## 15. Risks & Mitigation

### 15.1 User Drop-Off Risk

**Risk:** Users abandon onboarding due to length/complexity
**Likelihood:** High
**Impact:** High

**Mitigation:**
- Show estimated time remaining
- Allow save and resume
- Provide value early (show preliminary insights mid-flow)
- A/B test question order and length
- Offer "Express Mode" with fewer questions (lower quality results)

### 15.2 Financial Data Sensitivity

**Risk:** Users uncomfortable sharing detailed financial info
**Likelihood:** Medium
**Impact:** High

**Mitigation:**
- Explain privacy and security clearly upfront
- Allow skipping optional questions with explanation of impact
- Transparent about how data is used
- Visible trust signals (encryption, compliance badges)
- Option to use ranges instead of exact numbers
- Never ask for account numbers or passwords

### 15.3 Calculation Accuracy

**Risk:** Financial calculations are incorrect, leading to bad recommendations
**Likelihood:** Low
**Impact:** Critical

**Mitigation:**
- Extensive testing of all formulas
- Validation by financial professionals
- Conservative estimates (better to underestimate than overestimate)
- Disclaimers about estimates
- Regular audits of calculation accuracy
- User feedback loop if they get different numbers from lender

### 15.4 AI Response Quality

**Risk:** AI generates inappropriate or unhelpful responses
**Likelihood:** Medium
**Impact:** Medium

**Mitigation:**
- Careful prompt engineering and testing
- Fallback to curated responses if AI fails
- Content moderation filters
- Human review of sample responses
- A/B test AI vs. static responses
- Collect feedback on AI responses

### 15.5 Regulatory Compliance

**Risk:** Providing financial advice without proper licensing
**Likelihood:** Medium
**Impact:** High

**Mitigation:**
- Clear disclaimers: "Educational estimates, not financial advice"
- Recommend users consult licensed professionals
- Legal review of all content
- Don't guarantee mortgage approval or specific outcomes
- Partner with licensed professionals for actual advice

### 15.6 Over-Promising

**Risk:** Users qualified for less than we estimated
**Likelihood:** Medium
**Impact:** High

**Mitigation:**
- Use conservative calculations
- Show ranges, not exact numbers
- Clear disclaimers about estimates
- Explain variables that could affect actual qualification
- Set expectation: "This is preliminary - get pre-approval for exact amount"

---

## 16. Timeline & Milestones

### 16.1 Development Phases

**Phase 1: Core Infrastructure (Weeks 1-3)**
- Database schema updates
- API endpoints for saving responses
- State management setup
- **Milestone:** Can save and retrieve responses

**Phase 2: Question Flow UI (Weeks 4-6)**
- Build all question type components
- Progress tracking
- Navigation (back/next/skip)
- **Milestone:** Can complete full question flow (without AI)

**Phase 3: Financial Calculation Engine (Weeks 7-9)**
- Implement all calculation formulas
- Leverage assessment logic
- Investment readiness scoring
- Unit testing of calculations
- **Milestone:** Accurate financial calculations verified by finance team

**Phase 4: AI Integration (Weeks 10-11)**
- Claude API integration
- Response generation
- Context building
- Fallback mechanisms
- **Milestone:** AI responses working for all questions

**Phase 5: Summary Page (Weeks 12-13)**
- Investment profile summary UI
- Detailed calculations view
- Property matching (basic version)
- Professional recommendations
- PDF generation
- **Milestone:** Complete summary generated and displayed

**Phase 6: Polish & Optimization (Weeks 14-15)**
- UX refinements based on internal testing
- Performance optimization
- Mobile responsiveness
- Accessibility improvements
- **Milestone:** Beta-ready product

**Phase 7: Beta Testing (Weeks 16-19)**
- Closed beta with 100 users
- Collect feedback
- Iterate on issues
- A/B testing
- **Milestone:** 70%+ completion rate, 4.0+ satisfaction

**Phase 8: Launch Prep (Weeks 20-21)**
- Marketing materials
- User education content
- Support documentation
- Legal review
- **Milestone:** Ready for full launch

**Phase 9: Launch (Week 22)**
- Phased rollout (10% → 50% → 100% of traffic)
- Monitor metrics closely
- Rapid iteration on issues
- **Milestone:** Successful launch with 60%+ completion

**Phase 10: Post-Launch Optimization (Weeks 23-26)**
- Analyze user data
- Optimize question flow
- Improve AI responses
- Add advanced features
- **Milestone:** 80%+ completion rate, 60+ NPS

### 16.2 Success Criteria by Milestone

**MVP Launch (Week 22):**
- ✓ 60% onboarding completion rate
- ✓ All calculations accurate (verified by spot checks)
- ✓ < 0.5% error rate
- ✓ 40+ NPS score
- ✓ Average onboarding time: 10-15 minutes

**3 Months Post-Launch:**
- ✓ 70% onboarding completion rate
- ✓ 50+ NPS score
- ✓ 15% increase in property inquiry rate
- ✓ 1000+ completed profiles

**6 Months Post-Launch:**
- ✓ 80% onboarding completion rate
- ✓ 60+ NPS score
- ✓ 25% increase in conversion to first property view
- ✓ 5000+ completed profiles
- ✓ Property match algorithm live and improving

---

## Appendix A: Question Bank Reference

### Quick Question ID Reference

| ID | Question | Type | Phase | Required | AI |
|----|----------|------|-------|----------|-----|
| `current_country` | Current country of residence | Country select | 1 | Yes | Yes |
| `citizenship` | Citizenship | Country multi-select | 1 | Yes | Yes |
| `age_range` | Age range | Single select | 1 | Yes | Yes |
| `employment_status` | Employment status | Single select | 2 | Yes | Yes |
| `annual_income` | Gross annual income | Currency input | 2 | Yes | Yes |
| `monthly_expenses` | Monthly expenses | Currency input | 2 | Yes | Yes |
| `liquid_assets` | Savings & liquid assets | Currency input | 2 | Yes | Yes |
| `emergency_fund` | Emergency fund status | Single select | 2 | Yes | Yes |
| `owns_real_estate` | Real estate ownership | Single select | 3 | Yes | Yes |
| `primary_residence` | Primary residence details | Multi-part | 3 | Conditional | Yes |
| `investment_properties` | Investment properties | Dynamic list | 3 | Conditional | Yes |
| `mortgage_payments` | Total mortgage payments | Currency | 3 | Conditional | Yes |
| `other_debts` | Other debt obligations | Multi-select + amounts | 3 | Yes | Yes |
| `credit_score` | Credit score range | Single select | 3 | No | Yes |
| `preapproval_status` | Mortgage pre-approval | Single select | 3 | No | Yes |
| `investment_goals` | Primary investment goals | Multi-select | 4 | Yes | Yes |
| `target_markets` | Target markets/locations | Country multi-select | 4 | Yes | Yes |
| `property_types` | Property type preferences | Multi-select | 4 | Yes | Yes |
| `budget_range` | Investment budget range | Range slider | 4 | Yes | Yes |
| `down_payment_pct` | Down payment percentage | Percentage select | 4 | Yes | Yes |
| `timeline` | Investment timeline | Single select | 4 | Yes | Yes |
| `re_experience` | RE investment experience | Single select | 5 | Yes | Yes |
| `other_investments` | Other investment experience | Multi-select | 5 | No | Yes |
| `risk_scenario` | Risk tolerance scenario | Single select | 5 | Yes | Yes |
| `volatility_comfort` | Market volatility comfort | Slider | 5 | Yes | Yes |
| `management_pref` | Management preference | Single select | 5 | Yes | Yes |
| `special_requirements` | Special requirements | Open text | 6 | No | Yes |
| `language_pref` | Language preference | Single select | 6 | Yes | No |
| `professional_support` | Professional support needed | Multi-select | 6 | Yes | Yes |
| `contact_method` | Preferred contact method | Single select | 6 | Yes | No |
| `notification_freq` | Notification frequency | Single select | 6 | Yes | No |

**Total Questions:** 30 core + up to 12 conditional = 30-42 questions depending on user profile

---

## Appendix B: Calculation Formulas Reference

### DTI (Debt-to-Income Ratio)
```
DTI = (Total Monthly Debt Payments / Gross Monthly Income) × 100

Where:
- Total Monthly Debt = Mortgage + Auto + Student + CC + Personal + Other
- Gross Monthly Income = Annual Income / 12
```

### Front-End Ratio
```
Front-End Ratio = (Total Housing Costs / Gross Monthly Income) × 100

Where:
- Total Housing Costs = Mortgage Principal + Interest + Taxes + Insurance + HOA
```

### LTV (Loan-to-Value Ratio)
```
LTV = (Mortgage Amount / Property Value) × 100
```

### Equity
```
Equity = Current Market Value - Outstanding Mortgage Balance
Equity % = (Equity / Current Market Value) × 100
```

### Accessible Equity for Leverage
```
For Primary Residence (via HELOC):
Accessible Equity = (Current Market Value × 0.80) - Outstanding Mortgage

For Investment Properties:
Accessible Equity = (Current Market Value × 0.75) - Outstanding Mortgage
(More conservative due to lender restrictions on investment property HELOCs)
```

### Maximum Mortgage Qualification
```
Using 28/36 Rule:

Front-End Limit:
Max Housing Payment = Gross Monthly Income × 0.28
Available for New Mortgage = Max Housing Payment - Current Housing Payment

Back-End Limit:
Max Total Debt = Gross Monthly Income × 0.36
Available for New Debt = Max Total Debt - Current Total Debt

Conservative Max Payment = MIN(Front-End Available, Back-End Available)

Mortgage Principal = Max Payment / Monthly Payment Factor

Where Monthly Payment Factor depends on interest rate and term:
30-year loan:
- 6.0%: 0.005996
- 6.5%: 0.006321
- 7.0%: 0.006653
- 7.5%: 0.006992
- 8.0%: 0.007338

Max Purchase Price = Mortgage Principal / (1 - Down Payment %)
```

### Financial Health Score (0-100)
```
Component Scores:

1. Income Stability (20 points):
   - W2 employee 5+ years same company: 20
   - W2 employee 2-5 years: 18
   - W2 employee <2 years: 15
   - Self-employed 5+ years: 20
   - Self-employed 3-5 years: 16
   - Self-employed <3 years: 12

2. Debt Management (20 points):
   - DTI < 20%: 20
   - DTI 20-28%: 18
   - DTI 28-36%: 14
   - DTI 36-43%: 8
   - DTI > 43%: 3

3. Savings & Liquidity (20 points):
   - Liquid assets > 12 months expenses: 20
   - 9-12 months: 18
   - 6-9 months: 15
   - 3-6 months: 10
   - < 3 months: 5

4. Credit Profile (20 points):
   - 800+: 20
   - 750-799: 19
   - 700-749: 17
   - 650-699: 13
   - 600-649: 8
   - < 600: 3

5. Leverage Capacity (20 points):
   Based on Leverage Capacity Score (proportional)

Total = Sum of components (max 100)

Rating:
- 90-100: Excellent
- 80-89: Very Good
- 70-79: Good
- 60-69: Fair
- < 60: Needs Improvement
```

### Investment Readiness Level
```
Criteria for each level:

Level 5 - Excellent Position:
- Financial Health Score ≥ 85
- DTI < 30%
- Emergency Fund ≥ 6 months
- Credit Score ≥ 740
- Liquid Assets ≥ 25% of target property price

Level 4 - Strong Position:
- Financial Health Score 70-84
- DTI 30-36%
- Emergency Fund ≥ 6 months
- Credit Score ≥ 700
- Liquid Assets ≥ 20% of target property price

Level 3 - Ready with Caution:
- Financial Health Score 60-69
- DTI 36-43%
- Emergency Fund 3-6 months
- Credit Score ≥ 650
- Liquid Assets ≥ 15% of target property price

Level 2 - Need Preparation:
- Financial Health Score 50-59
- DTI 43-50%
- Emergency Fund < 3 months
- Credit Score 600-650
- Liquid Assets < 15% of target property price

Level 1 - Not Ready:
- Financial Health Score < 50
- DTI > 50%
- No emergency fund
- Credit Score < 600
- Insufficient liquid assets
```

---

## Appendix C: AI Prompt Templates

### System Prompt
```
You are a professional real estate investment advisor for Ultra Realestate,
a premium international property investment platform. Your role is to guide
investors through a comprehensive financial assessment with warmth, expertise,
and cultural sensitivity.

PERSONALITY:
- Knowledgeable but not condescending
- Encouraging yet realistic
- Professional and trustworthy
- Culturally aware (adapt for Israeli vs American norms)
- Educational without being preachy

CAPABILITIES:
- Deep knowledge of real estate investment
- Understanding of international markets
- Expertise in financial analysis (DTI, leverage, etc.)
- Familiarity with cross-border tax and legal considerations
- Bilingual (English and Hebrew)

CONSTRAINTS:
- Keep responses concise (2-3 sentences)
- Don't provide specific financial advice (you're educational, not a licensed advisor)
- Acknowledge user's answer positively
- Provide relevant insights when appropriate
- Reference previous answers to show personalization
- Never ask questions (the structured flow handles that)

CONTEXT:
- Platform serves international investors
- Common markets: USA, Israel, UAE, Portugal, Spain, Greece
- Users range from first-time to professional investors
- Focus on building trust through transparency
```

### Response Generation Prompt Template
```
Current question: {questionId}
User's answer: {userAnswer}

User's profile so far:
{contextSummary}

Language: {locale === "he" ? "Hebrew" : "English"}

Generate a brief, personalized response (2-3 sentences) that:
1. Acknowledges their answer positively
2. Provides a relevant insight or tip related to their answer
3. Optionally references their previous answers to show personalization

{locale === "he" ? "Respond in Hebrew." : "Respond in English."}
```

### Summary Generation Prompt
```
Generate a comprehensive investment summary for the following user profile:

FINANCIAL PROFILE:
- Income: {annualIncome}
- Expenses: {monthlyExpenses}
- Liquid Assets: {liquidAssets}
- Real Estate Equity: {realEstateEquity}
- DTI: {dtiRatio}%
- Credit Score: {creditScore}
- Financial Health Score: {financialHealthScore}/100

PREFERENCES:
- Investment Goals: {investmentGoals}
- Target Markets: {targetMarkets}
- Property Types: {propertyTypes}
- Risk Tolerance: {riskTolerance}
- Experience Level: {experienceLevel}

CALCULATED CAPACITY:
- Recommended Range: {minPrice} - {maxPrice}
- Down Payment Capacity: {downPayment}
- Leverage Capacity Score: {leverageScore}/100

Generate:
1. A warm, personalized opening message (2-3 sentences)
2. Key insights about their financial position
3. Specific recommendations for their investment strategy
4. Any cautions or considerations they should be aware of

Language: {locale}
```

---

## Document Control

**Version History:**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-12-20 | Product Team | Initial comprehensive PRD |

**Approvals Needed:**
- [ ] Product Lead
- [ ] Engineering Lead
- [ ] Finance/Legal Review
- [ ] UX Design Lead
- [ ] Data Privacy Officer

**Related Documents:**
- Technical Architecture Spec (to be created)
- API Documentation (to be created)
- UX/UI Design Spec (to be created)
- Testing Plan (to be created)

---

**End of Document**

This PRD represents the comprehensive vision for Ultra Realestate's AI-powered investment onboarding. It is designed to be the most thorough real estate investment assessment in the market, establishing trust and providing genuine value to investors while building a robust foundation for property matching and personalized recommendations.
