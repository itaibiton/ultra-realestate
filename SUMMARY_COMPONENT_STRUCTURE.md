# Onboarding Summary Component Structure

## Visual Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│                      ONBOARDING CHAT PAGE                           │
├─────────────────────────────────┬───────────────────────────────────┤
│                                 │                                   │
│         CHAT CONTAINER          │      ONBOARDING SUMMARY           │
│         (60% width)             │         (40% width)               │
│                                 │                                   │
│  ┌────────────────────────────┐ │  ┌─────────────────────────────┐ │
│  │  Progress Bar (Step 3/11) │ │  │  Header                     │ │
│  └────────────────────────────┘ │  │  ┌───────────────────────┐ │ │
│                                 │  │  │ Your Investment       │ │ │
│  ┌────────────────────────────┐ │  │  │ Profile               │ │ │
│  │                            │ │  │  │                       │ │ │
│  │  Messages Area             │ │  │  │  Building profile...  │ │ │
│  │  (Scrollable)              │ │  │  │                 [48%] │ │ │
│  │                            │ │  │  └───────────────────────┘ │ │
│  │  - AI: "What's your        │ │  └─────────────────────────────┘ │
│  │    investment budget?"     │ │                                   │
│  │                            │ │  ┌─────────────────────────────┐ │
│  │  - Options/Input           │ │  │  Summary Sections           │ │
│  │    [Budget Slider]         │ │  │  (Scrollable)               │ │
│  │                            │ │  │                             │ │
│  │                            │ │  │  ┌─ Location ✓ ──────────┐ │ │
│  │                            │ │  │  │ 📍 Location            │ │ │
│  │                            │ │  │  │  Current: United States│ │ │
│  │                            │ │  │  │  Citizenship: Israel   │ │ │
│  │                            │ │  │  │  Targets: Greece, ...  │ │ │
│  │                            │ │  │  └────────────────────────┘ │ │
│  │                            │ │  │                             │ │
│  │                            │ │  │  ┌─ Budget (Active) ─────┐ │ │
│  │                            │ │  │  │ 💰 Investment Budget   │ │ │
│  └────────────────────────────┘ │  │  │  Amount: $500,000     │ │ │
│                                 │  │  └────────────────────────┘ │ │
│  ┌────────────────────────────┐ │  │                             │ │
│  │  Navigation                │ │  │  ┌─ Goals ───────────────┐ │ │
│  │  [← Back]      [Next →]   │ │  │  │ 🎯 Investment Goals    │ │ │
│  └────────────────────────────┘ │  │  │  Purpose: Investment   │ │ │
│                                 │  │  │  Types: Not specified  │ │ │
└─────────────────────────────────┴  │  └────────────────────────┘ │ │
                                     │                             │ │
                                     │  ┌─ Timeline ─────────────┐ │ │
                                     │  │ 📅 Timeline            │ │ │
                                     │  │  Purchase: Not specified│ │ │
                                     │  └────────────────────────┘ │ │
                                     │                             │ │
                                     │  ┌─ Profile ──────────────┐ │ │
                                     │  │ 👤 Investor Profile    │ │ │
                                     │  │  Experience: Not spec. │ │ │
                                     │  │  Risk: Not specified   │ │ │
                                     │  └────────────────────────┘ │ │
                                     │                             │ │
                                     │  [...more sections...]      │ │
                                     └─────────────────────────────┘ │
                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
ChatPage
├── Grid Container (lg:grid-cols-5)
│   ├── Chat Column (lg:col-span-3)
│   │   └── Card
│   │       └── ChatContainer
│   │           ├── ProgressBar
│   │           ├── Messages Area (scrollable)
│   │           │   ├── ChatMessage[]
│   │           │   ├── ChatOptions/ChatOptionCards
│   │           │   ├── CurrencyInput
│   │           │   ├── CountrySelect
│   │           │   └── ...other inputs
│   │           └── Navigation (fixed bottom)
│   │               ├── Back Button
│   │               └── Next Button
│   │
│   └── Summary Column (lg:col-span-2)
│       └── OnboardingSummary
│           ├── Header (fixed top)
│           │   ├── Title + Subtitle
│           │   └── CircularProgress
│           └── Sections Container (scrollable)
│               ├── SummarySection (Location)
│               │   └── SummaryItem[]
│               ├── SummarySection (Budget)
│               │   └── SummaryItem[]
│               ├── SummarySection (Finances)
│               │   └── SummaryItem[]
│               ├── SummarySection (Goals)
│               │   └── SummaryItem[]
│               ├── SummarySection (Timeline)
│               │   └── SummaryItem[]
│               ├── SummarySection (Profile)
│               │   └── SummaryItem[]
│               ├── SummarySection (Contact)
│               │   └── SummaryItem[]
│               └── SummarySection (Requirements)
│                   └── SummaryItem[]
```

## Data Flow

```
┌─────────────────────────┐
│   ChatPage (State)      │
│                         │
│  - currentStep          │
│  - answers              │
│  - budgetAmount         │
│  - budgetCurrency       │
│  - monthlyIncome        │
│  - monthlyExpenses      │
│  - currentCountry       │
│  - citizenship          │
│  - targetLocations      │
│  - specialRequirements  │
│  - locale               │
└────────┬────────────────┘
         │
         ├──────────────────┬───────────────────┐
         │                  │                   │
         ▼                  ▼                   ▼
┌─────────────────┐  ┌──────────────────┐  ┌─────────────────┐
│ ChatContainer   │  │ OnboardingSummary│  │ Helper Functions│
│                 │  │                  │  │                 │
│ - Displays UI   │  │ - Displays       │  │ - formatCurrency│
│ - Captures input│  │   summary        │  │ - getCountryName│
│ - Updates state │  │ - Shows progress │  │ - getAnswerLabel│
│   in parent     │  │ - Highlights     │  │ - calculateProg │
└─────────────────┘  │   active section │  └─────────────────┘
                     │ - Animates       │
                     │   updates        │
                     └──────────────────┘
```

## State Updates & Animations

### When User Answers a Question:

1. **User Action** → Clicks option/enters value
2. **Chat Container** → Calls `onNext()` handler
3. **Chat Page** → Updates state:
   - `answers[questionId] = [value]`
   - `currentStep++`
   - Other specific state (budget, country, etc.)
4. **OnboardingSummary** → Receives new props
5. **Summary Sections** → Re-render with new data
6. **Animations Trigger**:
   - Progress circle animates to new percentage
   - Completed section gets checkmark (scale animation)
   - New active section gets highlighted
   - Updated items fade in with new values

### Animation Sequence:

```
Question Answered
       ↓
State Updates (immediate)
       ↓
Component Re-renders
       ↓
┌──────────────────────────────┐
│ Animations (framer-motion):  │
│                              │
│ 1. Progress circle fills     │ ← 500ms ease-in-out
│ 2. Checkmark scales in       │ ← Spring animation
│ 3. Section highlight shifts  │ ← Color transition
│ 4. Values fade in            │ ← 300ms fade + slide
└──────────────────────────────┘
       ↓
User sees updated summary
```

## Responsive Behavior

### Desktop (lg: 1024px+)
```
┌─────────────────────────────────────────┐
│  ┌─────────────────┬─────────────────┐  │
│  │                 │                 │  │
│  │  Chat (60%)     │  Summary (40%)  │  │
│  │  h-[700px]      │  h-[700px]      │  │
│  │                 │                 │  │
│  └─────────────────┴─────────────────┘  │
└─────────────────────────────────────────┘
```

### Mobile (< 1024px)
```
┌─────────────────────┐
│                     │
│  Chat               │
│  h-[600px]          │
│                     │
├─────────────────────┤
│                     │
│  Summary            │
│  h-[600px]          │
│                     │
└─────────────────────┘
```

## Section Status Logic

Each section's status is determined by:

```typescript
const sections = {
  location: {
    complete: hasValue(currentCountry) &&
              hasValue(citizenship) &&
              hasValue(targetLocations),
    active: currentStep in [1, 2, 5] // current_country, citizenship, location
  },
  budget: {
    complete: budgetAmount > 0,
    active: currentStep === 3 // budget
  },
  // ... etc
}
```

**Visual States:**
- ✅ **Complete**: Shows checkmark, full opacity, data displayed
- 🔵 **Active**: Highlighted border, light background
- ⚪ **Pending**: Gray text, "Not specified yet" placeholder

## Key Features

### 1. Circular Progress
- Calculates: `Math.round((completedSteps / totalSteps) * 100)`
- Animates smoothly between values
- Shows percentage in center
- Uses primary color for ring

### 2. Section Highlighting
- Detects current question category
- Applies active styling to matching section
- Helps user understand context
- Smooth transition between sections

### 3. Data Formatting
- Currency: `formatCurrency(amount, currency, locale)`
- Countries: `getCountryName(code, locale)` with i18n
- Arrays: Joins with ", " separator
- Translations: Uses `getAnswerLabel()` for option values

### 4. Conditional Rendering
- Finances section only shows if data exists
- Requirements section only shows from step 10+
- Empty sections show placeholders
- Completed sections show actual data

## Styling Details

### Colors & Themes
```css
/* Card Background */
bg-card/50 backdrop-blur border-muted

/* Section States */
Active:   border-primary/50 bg-primary/5
Complete: text-green-500 (checkmark)
Pending:  text-muted-foreground/50

/* Dark Mode */
All colors use semantic tokens
Automatically adapt to theme
```

### Spacing & Layout
```css
/* Container */
h-[600px] lg:h-[700px]  /* Responsive height */
overflow-hidden          /* Prevent overflow */

/* Grid */
grid-cols-1 lg:grid-cols-5  /* Responsive columns */
gap-4 lg:gap-6               /* Responsive gap */

/* Sections */
space-y-3                /* Vertical spacing */
p-3                      /* Section padding */
```

### Typography
```css
/* Header */
font-semibold text-sm    /* Title */
text-xs text-muted       /* Subtitle */

/* Items */
text-xs text-muted       /* Label */
text-sm font-medium      /* Value */
```

## Accessibility

- ✅ Semantic HTML structure
- ✅ Proper heading hierarchy
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Screen reader friendly
- ✅ High contrast ratios
- ✅ Focus indicators

## Performance Optimizations

1. **Memoization**
   ```typescript
   const progressPercent = useMemo(
     () => calculateSummaryProgress(answers, currentStep, totalSteps),
     [answers, currentStep, totalSteps]
   );
   ```

2. **Conditional Rendering**
   - Only render sections when needed
   - Use `AnimatePresence` for efficient animations
   - Lazy load country names

3. **Efficient Updates**
   - Only re-render changed sections
   - Use keys for list rendering
   - Debounce expensive calculations

## Testing Checklist

- [ ] Summary updates when answering each question
- [ ] Progress percentage increases correctly
- [ ] Section highlighting follows current step
- [ ] Checkmarks appear when sections complete
- [ ] Currency formatting works for all currencies
- [ ] Country names display correctly in both locales
- [ ] Animations are smooth (60fps)
- [ ] Mobile layout stacks correctly
- [ ] RTL layout works in Hebrew
- [ ] Dark mode styling correct
- [ ] Scroll works independently in both panels
- [ ] No padding issues at bottom of chat
- [ ] All translations display correctly
