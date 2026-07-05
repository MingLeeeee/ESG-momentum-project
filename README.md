# ESG Momentum Engine 2.0

ESG Momentum Engine 2.0 is a school project prototype for an AI-powered ESG decision-support platform focused on ASEAN markets.

The project demonstrates how ESG analysis can move from a static, backward-looking score into a more dynamic investment intelligence workflow. It focuses on Singapore, Malaysia, Thailand, Indonesia, the Philippines, and Vietnam.

## Project Aim

To improve an ESG framework by adding:

- Dynamic ESG score monitoring
- AI-style explanations for score changes
- ESG risk and opportunity insights
- Geopolitical and regional risk indicators
- Peer comparison for investment decision support
- Company search and detail dashboards

## Prototype Scope

This version is a front-end prototype. It uses dummy and simulated data to demonstrate the workflow and user experience.

The AI outputs are simulated using predefined company data and rule-based logic. In a future version, these outputs can be connected to a database, real ESG datasets, news APIs, and an AI model/API.

## Main User Flow

1. User opens the homepage.
2. User learns about the ESG framework and investor factors.
3. User opens the company directory.
4. User selects a company.
5. User views the ESG detail dashboard.
6. User checks AI explanation, AI prediction, geopolitical risk, and peer comparison.
7. User can add the company to a prototype watchlist or set a prototype alert.

## Key Features

### Home Page

- Overview of ESG Momentum Engine 2.0
- Six investor decision factors
- ESG Command Centre preview
- Platform modules
- ASEAN market focus

### Company Directory

- Searchable ASEAN company screener
- Filters by country, sector, and watch status
- Table-style investor layout
- Links to company detail dashboards

### Company Detail Dashboard

- ESG overview and score breakdown
- AI explanation of ESG score
- Financial and debt analysis
- Management quality analysis
- Reputation and controversy tracking
- AI risk and opportunity forecast
- Geopolitical risk section
- Peer comparison matrix
- Prototype watchlist button
- Prototype alert modal
- Simulated AI insight generation button

## File Structure

```text
BIPJ/
  app.html                 Main homepage
  companies.html           Company directory / screener
  detail.html              Company detail dashboard
  risk-intelligence.html   Risk module page
  opportunity.html         Opportunity module page
  intelligence.html        Intelligence module page

  css/
    app2.css               Homepage and company directory styles
    detail.css             Company detail dashboard styles
    overall.css            Shared/additional styles
    ri-styles.css          Risk intelligence styles

  js/
    app2.js                Homepage and company directory interactions
    detail.js              Company detail dashboard logic
    ri-logic.js            Risk intelligence logic
    ri-module.js           Risk module logic
    layout-loader.js       Layout helper
```

## How To Open

This prototype can run directly in the browser.

Open:

```text
app.html
```

Recommended flow:

```text
app.html -> companies.html -> detail.html
```

No server is required for the current static prototype.

## Example Companies

The prototype currently includes sample data for companies such as:

- DBS Group Holdings
- Grab Holdings
- Genting Berhad
- Maybank
- PTT PCL
- SM Prime

## Prototype AI Explanation

The `Generate AI Insight` button simulates how an AI system would explain ESG performance.

Current behaviour:

1. User clicks `Generate AI Insight`.
2. Button shows a loading state.
3. After 1 second, the page displays a simulated company-specific insight.

Future version:

- Connect company data to a database
- Pull real news and ESG signals
- Generate explanations using an AI model or API

## Future Improvements

- Add database storage for company ESG data
- Connect to real ESG, financial, and news data sources
- Add real watchlist storage
- Add real alert rules and notification logic
- Improve AI prediction using historical ESG and event data
- Add portfolio ESG analyzer
- Add stronger data validation and source tracking

## Disclaimer

This is a school project prototype. The data, scores, predictions, alerts, and AI explanations are simulated and should not be used for real investment decisions.
