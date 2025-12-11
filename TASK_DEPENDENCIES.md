# GlobalNest MVP - Task Dependencies & Critical Path

## Dependency Graph

This document shows which tasks depend on others, helping you plan the optimal build order.

---

## Critical Path: Properties Core

This is the most important path for MVP launch. Complete these first:

```
┌─────────────────────────────────────┐
│  Properties Database Schema         │  P0-Critical | 4-6 hours
│  (Create DB table, RLS policies)    │  Database
└──────────────┬──────────────────────┘
               │
               ├──────────────────────────────┐
               ↓                              ↓
┌──────────────────────────────┐    ┌──────────────────────────────┐
│  Property Listing API        │    │  Image Upload for Properties │  P2-Medium
│  (CRUD, filtering, sorting)  │    │  (Supabase Storage)          │  Backend
│  P0-Critical | 6-8 hours     │    │  4-6 hours                   │
│  Backend                     │    └─────────┬────────────────────┘
└──────────────┬───────────────┘              │
               │                              │
               ↓                              │
┌──────────────────────────────┐              │
│  Property Marketplace Page   │←─────────────┘
│  (Grid/list, search, filter) │
│  P0-Critical | 8-10 hours    │
│  UI                          │
└──────────────┬───────────────┘
               │
               ↓
┌──────────────────────────────┐
│  Property Detail Page        │
│  (Gallery, specs, contact)   │
│  P0-Critical | 6-8 hours     │
│  UI                          │
└──────────────────────────────┘

Total Critical Path Time: 28-38 hours (3.5-5 days)
```

---

## Parallel Path: User & Professional Features

These can be built while properties are in progress:

```
┌─────────────────────────────────────┐
│  User Profile Setup                 │  P1-High | 4-6 hours
│  (Investment goals, preferences)    │  Auth
└──────────────┬──────────────────────┘
               │
               ↓
┌─────────────────────────────────────┐
│  Professionals Database Schema      │  P1-High | 4-6 hours
│  (Lawyers, brokers, accountants)    │  Database
└──────────────┬──────────────────────┘
               │
               ├──────────────────────────────┐
               ↓                              ↓
┌──────────────────────────────┐    ┌──────────────────────────────┐
│  Professional Directory Page │    │  Deals Database Schema       │  P1-High
│  (Search, filter, profile)   │    │  (Deal tracking, status)     │  Database
│  P1-High | 6-8 hours         │    │  4-6 hours                   │
│  UI                          │    └─────────┬────────────────────┘
└──────────────────────────────┘              │
                                              ↓
                                   ┌──────────────────────────────┐
                                   │  Deal Tracking Dashboard     │
                                   │  (Pipeline view, details)    │
                                   │  P1-High | 6-8 hours         │
                                   │  UI                          │
                                   └──────────────────────────────┘

Total Parallel Path Time: 24-34 hours (3-4 days)
```

---

## Supporting Features: No Dependencies

These can be built anytime (recommended for Week 5-6):

```
┌──────────────────────────────┐
│  Search & Filter Component   │  P1-High | 4-6 hours
│  (Reusable across app)       │  UI
└──────────────────────────────┘

┌──────────────────────────────┐
│  Mobile Responsive Fixes     │  P1-High | 6-8 hours
│  (Touch-friendly, layouts)   │  UI
└──────────────────────────────┘

┌──────────────────────────────┐
│  Financing Offers Schema     │  P2-Medium | 3-4 hours
│  (Loan options, rates)       │  Database
└──────────────────────────────┘

┌──────────────────────────────┐
│  Mortgage Calculator         │  P2-Medium | 4-6 hours
│  (Payment calculator)        │  UI
└──────────────────────────────┘

┌──────────────────────────────┐
│  Documents Storage Setup     │  P2-Medium | 4-6 hours
│  (Supabase Storage)          │  Backend
└──────────────────────────────┘

┌──────────────────────────────┐
│  Favorites/Watchlist         │  P2-Medium | 3-4 hours
│  (Save properties)           │  Database
└──────────────────────────────┘

┌──────────────────────────────┐
│  Contact Professional Form   │  P2-Medium | 3-4 hours
│  (Inquiry modal)             │  UI
└──────────────────────────────┘

┌──────────────────────────────┐
│  Notifications System        │  P2-Medium | 6-8 hours
│  (Bell icon, dropdown)       │  Backend
└──────────────────────────────┘

┌──────────────────────────────┐
│  Error Boundary Components   │  P2-Medium | 4-6 hours
│  (404, 500 pages, loading)   │  UI
└──────────────────────────────┘

┌──────────────────────────────┐
│  SEO & Meta Tags             │  P2-Medium | 4-6 hours
│  (Dynamic meta, sitemap)     │  DevOps
└──────────────────────────────┘

┌──────────────────────────────┐
│  Stripe Payment Integration  │  P3-Low | 8-10 hours
│  (Subscriptions, webhooks)   │  Integration
└──────────────────────────────┘
```

---

## Dependency Matrix

| Task | Depends On | Blocks | Category |
|------|------------|--------|----------|
| **Properties Database Schema** | - | Property Listing API, Image Upload | Database |
| **Property Listing API** | Properties Database Schema | Property Marketplace Page | Backend |
| **Property Marketplace Page** | Property Listing API, (Image Upload) | Property Detail Page | UI |
| **Property Detail Page** | Property Marketplace Page | - | UI |
| **Image Upload for Properties** | Properties Database Schema | Property Detail Page | Backend |
| **User Profile Setup** | - | Professionals Database Schema | Auth |
| **Professionals Database Schema** | User Profile Setup | Professional Directory, Deals Schema | Database |
| **Professional Directory Page** | Professionals Database Schema | - | UI |
| **Deals Database Schema** | Professionals Database Schema | Deal Tracking Dashboard | Database |
| **Deal Tracking Dashboard** | Deals Database Schema | - | UI |
| **Search & Filter Component** | - | (Enhances multiple pages) | UI |
| **Mobile Responsive Fixes** | - | - | UI |
| **Financing Offers Schema** | - | Mortgage Calculator | Database |
| **Mortgage Calculator** | (Financing Offers Schema) | - | UI |
| **Documents Storage Setup** | - | - | Backend |
| **Favorites/Watchlist** | Properties Database Schema | - | Database |
| **Contact Professional Form** | Professionals Database Schema | - | UI |
| **Notifications System** | - | - | Backend |
| **Error Boundary Components** | - | - | UI |
| **SEO & Meta Tags** | Property Detail Page | - | DevOps |
| **Stripe Payment Integration** | - | - | Integration |

---

## Build Order Recommendations

### Option A: Sequential (Safest)
Complete each phase fully before moving to the next:

1. **Week 1-2**: Properties core (Critical Path)
   - Day 1-2: Properties Database Schema
   - Day 3-4: Property Listing API
   - Day 5-6: Image Upload for Properties
   - Day 7-8: Property Marketplace Page
   - Day 9-10: Property Detail Page

2. **Week 3-4**: Professional network
   - All tasks from Parallel Path

3. **Week 5-6**: Enhanced features
   - All P2 tasks

4. **Week 7-8**: Polish & payments
   - P3 tasks

### Option B: Parallel (Faster, needs 2+ developers)
Work on multiple paths simultaneously:

**Developer 1 (Backend Focus)**:
- Week 1: Properties Database + API
- Week 2: Image Upload + Documents Storage
- Week 3: Professionals Database + Deals Database
- Week 4: Notifications System
- Week 5-6: Stripe Integration

**Developer 2 (Frontend Focus)**:
- Week 1: Property Marketplace Page
- Week 2: Property Detail Page
- Week 3: User Profile Setup + Professional Directory
- Week 4: Deal Tracking Dashboard
- Week 5-6: Search/Filter, Mobile Fixes, Calculator, Forms

**Developer 3 (Full Stack)**:
- Week 1-2: Support both developers
- Week 3-4: Financing features
- Week 5-6: Error boundaries, SEO, polish

---

## Milestone Markers

### Milestone 1: Property Browsing (End of Week 2)
**Definition of Done**:
- Users can view a grid of properties
- Filtering works (country, price, type)
- Clicking a property shows full details
- Images display correctly

**Tasks Completed**:
- Properties Database Schema
- Property Listing API
- Image Upload for Properties
- Property Marketplace Page
- Property Detail Page

**Demo**: Show property browsing flow

---

### Milestone 2: Professional Network (End of Week 4)
**Definition of Done**:
- Users can set up investment profile
- Directory of professionals is searchable
- Users can view professional profiles
- Deal tracking shows active deals

**Tasks Completed**:
- User Profile Setup
- Professionals Database Schema
- Professional Directory Page
- Deals Database Schema
- Deal Tracking Dashboard
- Search & Filter Component
- Mobile Responsive Fixes

**Demo**: Show end-to-end professional connection flow

---

### Milestone 3: Enhanced Platform (End of Week 6)
**Definition of Done**:
- Mortgage calculator functional
- Document uploads work
- Favorites/watchlist operational
- Contact forms send properly
- Error pages look good
- SEO is configured

**Tasks Completed**:
- Financing Offers Schema
- Mortgage Calculator
- Documents Storage Setup
- Favorites/Watchlist
- Contact Professional Form
- Notifications System
- Error Boundary Components
- SEO & Meta Tags

**Demo**: Show all supporting features

---

### Milestone 4: MVP Launch (End of Week 8)
**Definition of Done**:
- Payment integration complete
- All P0 and P1 tasks done
- Tested on mobile and desktop
- Ready for beta users

**Tasks Completed**:
- Stripe Payment Integration
- All previous tasks

**Demo**: Full platform walkthrough

---

## Risk Assessment

### High Risk Dependencies
These tasks block multiple others. Prioritize them:

1. **Properties Database Schema** (blocks 3 tasks)
   - Risk: Schema design errors could require migration
   - Mitigation: Review schema carefully, test RLS policies

2. **Property Listing API** (blocks 1 task, critical for MVP)
   - Risk: Performance issues with filtering
   - Mitigation: Add database indexes, test with 1000+ properties

3. **Professionals Database Schema** (blocks 2 tasks)
   - Risk: Incomplete professional types
   - Mitigation: Research all professional types upfront

### Low Risk Tasks
These can be done last or skipped for MVP:

1. **Stripe Payment Integration** (P3)
   - Can launch with free tier only

2. **SEO & Meta Tags** (P2)
   - Can be added post-launch

3. **Financing Offers Schema** (P2)
   - Can launch without mortgage features

---

## Suggested Daily Plan (Week 1)

### Monday
- **AM**: Set up Notion board, review all tasks
- **PM**: Start Properties Database Schema

### Tuesday
- **AM**: Finish Properties Database Schema
- **PM**: Write RLS policies, test with dummy data

### Wednesday
- **AM**: Start Property Listing API
- **PM**: Build CRUD operations

### Thursday
- **AM**: Finish Property Listing API
- **PM**: Add filtering and sorting

### Friday
- **AM**: Start Image Upload for Properties
- **PM**: Test image uploads, generate thumbnails

### Weekend (optional)
- Polish and review week's work
- Plan next week's tasks

---

## Quick Reference: What to Build When

### Day 1-2: Database Foundation
Focus: Properties Database Schema
- Create migration file
- Define all columns
- Set up RLS policies
- Create indexes
- Test with sample data

### Day 3-4: API Layer
Focus: Property Listing API
- Create server actions
- Add filtering logic
- Implement sorting
- Add pagination
- Write tests

### Day 5-6: Media Handling
Focus: Image Upload
- Configure Supabase Storage
- Build upload action
- Create thumbnail generation
- Test with large files

### Day 7-8: Marketplace UI
Focus: Property Marketplace Page
- Build grid/list toggle
- Add search bar
- Implement filter UI
- Create property card
- Add loading states

### Day 9-10: Detail View
Focus: Property Detail Page
- Build image gallery
- Display all specs
- Add contact button
- Implement favorites
- Mobile responsive

---

## Parallel Work Opportunities

If you have 2 developers, these can be done simultaneously:

**While building Properties Database Schema** (Day 1-2):
- Other dev: User Profile Setup

**While building Property Listing API** (Day 3-4):
- Other dev: Professionals Database Schema

**While building Property Marketplace Page** (Day 7-8):
- Other dev: Professional Directory Page

**While building Property Detail Page** (Day 9-10):
- Other dev: Deal Tracking Dashboard

---

## Dependency-Free Tasks (Can be done anytime)

These don't depend on anything and don't block anything critical:

1. Search & Filter Component
2. Mobile Responsive Fixes
3. Mortgage Calculator
4. Error Boundary Components
5. Notifications System
6. SEO & Meta Tags

Use these as "buffer tasks" when blocked or waiting for reviews.

---

## Blocker Prevention Checklist

Before starting a task, verify:

- [ ] All dependent tasks are completed
- [ ] Required dependencies are installed
- [ ] Database migrations are run
- [ ] Environment variables are set
- [ ] You have sample data to test with
- [ ] You understand the acceptance criteria

---

## Emergency: What If You Get Blocked?

If blocked on the critical path:

1. **Document the blocker** in Notion
2. **Switch to a parallel path task** (e.g., start Professional Network while waiting on Properties)
3. **Work on dependency-free tasks** (e.g., Error Boundaries, SEO)
4. **Reach out for help** (tag in Notion, post in Slack)
5. **Keep moving** - don't let one blocker stop all progress

---

## Success Metrics Per Milestone

### After Properties Core (Milestone 1)
- [ ] Can create 10+ test properties
- [ ] Filtering returns correct results in <500ms
- [ ] Images load and display properly
- [ ] Detail page shows all property info
- [ ] Works on mobile and desktop

### After Professional Network (Milestone 2)
- [ ] Can onboard 3+ types of professionals
- [ ] Directory search returns relevant results
- [ ] Can create and track deals
- [ ] Mobile experience is smooth

### After Enhanced Platform (Milestone 3)
- [ ] Calculator produces accurate results
- [ ] Documents upload successfully
- [ ] Favorites persist across sessions
- [ ] Error pages display correctly

### Before MVP Launch (Milestone 4)
- [ ] Payment flow completes successfully
- [ ] All critical bugs fixed
- [ ] Performance tested (load time <3s)
- [ ] Security audit passed

---

## Next Steps

1. Open Notion and import the task board
2. Review this dependency graph
3. Assign the first task: Properties Database Schema
4. Set up your development environment
5. Start building!

Remember: The critical path is only 3.5-5 days if you work focused. You've already completed 13/34 tasks. You're well on your way! 🚀

---

Last updated: 2025-12-10
GlobalNest MVP v1.0
