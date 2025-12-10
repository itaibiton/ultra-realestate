# 🧭 GlobalNest – Product Requirements Document (PRD)

## 1. Product Overview

**GlobalNest** is an AI-powered, end-to-end real-estate and financing platform initially focused on **Israeli buyers and investors**.
It enables users with *zero knowledge or connections* to find, finance, and close real-estate deals—locally and globally—in one secure, guided environment.

The platform connects:

* Buyers & investors
* Sellers & developers
* Professionals (lawyers, mortgage advisors, brokers, tax specialists)
* Lenders & financial institutions

**Tagline:** “From zero knowledge to your first property — with one AI-powered platform.”

---

## 2. Vision & Mission

**Vision:** Democratize global real-estate investment by removing the friction, confusion, and fragmentation that keep ordinary people from investing beyond their borders.

**Mission:** Build a trusted AI-driven ecosystem that provides investors with all the tools, data, and professionals they need—from search and financing to legal closure and post-purchase management.

---

## 3. Goals & Success Metrics

| Goal                                                  | Metric                         | Target                        |
| ----------------------------------------------------- | ------------------------------ | ----------------------------- |
| Simplify the cross-border property investment process | Avg. onboarding time           | < 10 minutes                  |
| Enable users to find matching properties & financing  | Conversion to deal initiation  | ≥ 15% of active users         |
| Monetize from day one                                 | Paid subscriptions             | ≥ 10% of monthly active users |
| Build professional ecosystem                          | Active professionals onboarded | ≥ 100 in 3 months             |
| Ensure trust and compliance                           | Verified professionals         | 100% vetted                   |

---

## 4. Target Users

| Segment                   | Description                      | Key Needs                   |
| ------------------------- | -------------------------------- | --------------------------- |
| **First-time investors**  | Israelis with limited knowledge  | Education, guidance, trust  |
| **Experienced investors** | Expand portfolio abroad          | Speed, data, analysis       |
| **Professionals**         | Brokers, lawyers, advisors       | Lead generation, visibility |
| **Lenders**               | Banks, fintechs, private lenders | Verified leads, automation  |

---

## 5. Core Value Proposition

* **All-in-One Platform:** Search → Financing → Legal → Closing → Tracking
* **AI Guidance:** Conversational onboarding, personalized matching
* **Verified Ecosystem:** Work only with trusted professionals
* **Secure Workflow:** Built-in docs, signatures, and compliance
* **Transparent Monetization:** Subscription, not hidden fees

---

## 6. Product Scope

### MVP Scope (Phase 1)

| Area                     | Features                | Description                                              |
| ------------------------ | ----------------------- | -------------------------------------------------------- |
| **AI Onboarding**        | Conversational form     | Gathers user goals, capital, risk level, and preferences |
| **Property Marketplace** | Listings & search       | Local (Israel) + selected global markets                 |
| **Financing Hub**        | Loan matching           | Connects users with lenders and displays offers          |
| **Professional Network** | Directory & matchmaking | Suggests verified professionals per user need            |
| **Deal Workflow**        | Track & manage          | Status tracking, documents, e-signatures                 |
| **Payments**             | Subscriptions           | Stripe integration for premium plans                     |
| **Security & Auth**      | Supabase Auth + RLS     | User roles, secure data segregation                      |

### Future Scope (Phase 2+)

* AI yield predictions & market insights
* Portfolio analytics dashboard
* Multi-language (Hebrew/English)
* Expanded regions (Europe, U.S., Asia)
* Community & investor network

---

## 7. Feature Details

### 7.1 Onboarding & Profiles

* Guided by an AI chat interface.
* Collects investment intent, budget, citizenship, risk tolerance, preferred markets.
* Builds a **user profile vector** for personalized recommendations.

### 7.2 Property Marketplace

* CRUD listings (agents/sellers).
* Filters: country, city, price, type, yield.
* AI-generated insights per property: area growth, regulations, taxes.
* “Save for Later” & “Request Financing” CTAs.

### 7.3 Financing Hub

* Dynamic form collects loan data.
* Integrates with partner lenders via API/email bridge.
* Displays multiple offers (rate, term, LTV).
* “Apply” triggers document submission workflow.

### 7.4 Professional Marketplace

* List of vetted experts.
* Ratings, reviews, pricing hints, contact forms.
* Auto-recommendations based on user stage (e.g., legal, mortgage).

### 7.5 Deal Workflow

* Unified timeline view: Search → Offer → Financing → Legal → Closing.
* Upload & sign documents.
* Notifications for pending actions.
* Secure storage (Supabase Storage).

### 7.6 Payments & Subscription

* Stripe Checkout & Billing.
* Plans:

  * **Free:** Explore listings, limited AI insights
  * **Premium ($29/mo):** Full AI reports, portfolio tracking, pro access
  * **Partner Pro ($49/mo):** For professionals/lenders

---

## 8. Technical Architecture

| Layer        | Technology                  | Purpose                              |
| ------------ | --------------------------- | ------------------------------------ |
| **Frontend** | Next.js (React)             | Responsive UI, server-side rendering |
| **Backend**  | Supabase                    | Postgres DB, Auth, Storage, Realtime |
| **AI Layer** | Edge Functions / OpenAI API | Recommendation & chat logic          |
| **Payments** | Stripe                      | Subscriptions & checkout             |
| **E-Sign**   | DocuSign API                | Legal document workflow              |
| **Hosting**  | Vercel + Supabase Cloud     | Scalable, low-ops deployment         |

**Database Highlights**

* `users`, `profiles`, `properties`, `professionals`, `deals`, `documents`, `financing_offers`, `subscriptions`
* Row-Level Security ensures user data isolation.

---

## 9. UX Flow Summary

1. **User lands** → Hero chat invites them to “Find your first property with AI.”
2. **AI Onboarding** → Simple questions, builds profile.
3. **Matching Screen** → Suggested properties + financing options.
4. **Select Property** → View details, start deal.
5. **AI recommends experts** → Lawyer, broker, lender.
6. **Documents & Tasks** → Track progress until closing.
7. **Post-deal Dashboard** → Track portfolio, yields, upcoming payments.

---

## 10. Monetization Model

| Source                  | Description                           |
| ----------------------- | ------------------------------------- |
| **Subscriptions**       | Monthly recurring via Stripe          |
| **Professional Access** | Paid partner plan (leads + dashboard) |
| **Commissions**         | % on closed deals or financing        |
| **Advertising**         | Optional featured listings (later)    |

---

## 11. Timeline (MVP → Launch)

| Phase             | Duration    | Deliverables                        |
| ----------------- | ----------- | ----------------------------------- |
| **Sprint 1**      | Weeks 1–4   | Auth, DB schema, onboarding UI      |
| **Sprint 2**      | Weeks 5–8   | Listings, search, AI matching       |
| **Sprint 3**      | Weeks 9–12  | Financing hub, professional network |
| **Sprint 4**      | Weeks 13–16 | Deal workflow, documents, Stripe    |
| **Beta**          | Weeks 17–20 | Polish, QA, limited release         |
| **Public Launch** | Week 21+    | Paid subscriptions live             |

---

## 12. Success Criteria

* 100+ active users within 3 months
* ≥10 paid subscriptions
* ≥3 financing partners integrated
* ≥80% satisfaction (survey)
* First full transaction closed end-to-end via GlobalNest

---

## 13. Risks & Mitigation

| Risk                            | Mitigation                                |
| ------------------------------- | ----------------------------------------- |
| Legal complexity (cross-border) | Limit markets per phase; local partners   |
| Data security                   | Supabase RLS, encryption, GDPR compliance |
| Partner onboarding              | Early MOUs with 2–3 pilot lenders/pros    |
| User trust                      | Verified profiles, transparent ratings    |
| Scope creep                     | Strict MVP feature lock per sprint        |

---

## 14. Future Vision

* Transform GlobalNest into a **global investment operating system** where anyone can:

  * Discover markets
  * Simulate financing & tax
  * Execute transactions
  * Manage portfolio post-deal
* Eventually add tokenized property shares, AI valuation engines, and full multilingual support.

---

**Prepared by:** Founding Product Team
**Version:** PRD v1.0 (MVP Scope)
**Date:** December 2025
