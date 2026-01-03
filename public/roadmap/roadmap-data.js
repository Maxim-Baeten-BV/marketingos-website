/**
 * marketingOS Product Roadmap Data
 *
 * Vision: Every performance marketer operates at 10x efficiency, with AI handling 80%
 * of administrative work, allowing them to focus purely on strategy and creativity.
 *
 * Strategy: Become the single source of truth for performance marketing operations by
 * deeply integrating with all major ad platforms and providing automation that eliminates
 * manual reporting.
 *
 * Last Updated: January 2026
 */

const ROADMAP_DATA = {
  // Meta information
  meta: {
    version: "1.0",
    lastUpdated: "2026-01-03",
    planningHorizon: 24, // months
    currentQuarter: "Q1 2026"
  },

  // Vision and Strategy
  vision: {
    statement: "Every performance marketer operates at 10x efficiency, with AI handling 80% of administrative work, allowing them to focus purely on strategy and creativity.",
    tagline: "Automate the admin. Reclaim your focus.",
    northStar: "Hours saved per marketer per week"
  },

  // Strategic themes for roadmap organization
  themes: [
    {
      id: "performance-marketing",
      name: "Performance Marketing",
      description: "Core apps for paid advertising across Google, Meta, and LinkedIn",
      icon: "📈",
      color: "#3E7BBE"
    },
    {
      id: "tracking",
      name: "Tracking & Analytics",
      description: "Tools for conversion tracking, UTM management, and analytics reporting",
      icon: "🎯",
      color: "#22C55E"
    },
    {
      id: "monitoring",
      name: "Monitoring & Alerts",
      description: "Stay ahead of algorithm changes and competitor movements",
      icon: "🔔",
      color: "#8B5CF6"
    },
    {
      id: "reporting",
      name: "Reporting",
      description: "Professional reports for stakeholders and clients",
      icon: "📊",
      color: "#EF4444"
    },
    {
      id: "social-media",
      name: "Social Media Marketing",
      description: "Organic social content planning, scheduling, and performance tracking",
      icon: "📱",
      color: "#F59E0B"
    }
  ],

  // Roadmap items organized by time horizon
  items: [
    // ==========================================
    // NOW - Q1 2026 (High confidence, committed)
    // ==========================================

    // Budget Checker
    {
      id: "budget-checker",
      title: "Budget Checker",
      description: "Real-time budget monitoring across Google Ads and Meta Ads with daily pacing alerts. Know exactly where you stand mid-month.",
      status: "in-progress",
      horizon: "now",
      quarter: "Q1 2026",
      theme: "performance-marketing",
      confidence: "high",
      problemStatement: "Marketers often discover budget issues too late—at the end of the month when overspend has already happened or opportunities have been missed.",
      targetOutcome: "Reduce time spent on budget tracking from 4 hours/week to 30 minutes",
      successMetrics: [
        { metric: "Budget check time reduction", target: "85%", current: null },
        { metric: "Overspend incidents prevented", target: "90%", current: null }
      ],
      features: [
        "Multi-account budget aggregation",
        "Daily spend pacing vs. target",
        "Overspend risk alerts",
        "Month-end projection"
      ],
      votes: 142,
      effort: "M",
      impact: "XL"
    },

    // Google Ads Performance Manager
    {
      id: "google-ads-performance-manager",
      title: "Google Ads Performance Manager",
      description: "Monitor Google Ads performance with clear, actionable insights. See campaign health at a glance and identify issues before they impact results.",
      status: "in-progress",
      horizon: "now",
      quarter: "Q1 2026",
      theme: "performance-marketing",
      confidence: "high",
      problemStatement: "Performance marketers spend hours navigating Google Ads UI to compile basic performance insights that should be instantly available.",
      targetOutcome: "Reduce time to identify performance issues from hours to minutes",
      successMetrics: [
        { metric: "Issue detection time", target: "<5 min", current: null },
        { metric: "Daily review time", target: "<10 min", current: null }
      ],
      features: [
        "Campaign health scores",
        "Key metric trends",
        "Anomaly highlighting",
        "Performance vs. goals"
      ],
      votes: 234,
      effort: "L",
      impact: "XL"
    },

    // Algorithm Monitor
    {
      id: "algorithm-monitor",
      title: "Algorithm Monitor",
      description: "Stay informed when Google, Meta, or other platforms change their algorithms. Understand what updates could impact your campaigns.",
      status: "planned",
      horizon: "now",
      quarter: "Q1 2026",
      theme: "monitoring",
      confidence: "high",
      problemStatement: "Algorithm changes often catch marketers off guard, leading to sudden performance drops they struggle to explain.",
      targetOutcome: "Never be surprised by a platform update again",
      successMetrics: [
        { metric: "Update awareness time", target: "<24 hours", current: null },
        { metric: "Impact assessment accuracy", target: "85%+", current: null }
      ],
      features: [
        "Platform update tracking",
        "Impact assessment",
        "Historical change log",
        "Community insights"
      ],
      votes: 134,
      effort: "M",
      impact: "M"
    },

    // Google Search Console Specialist
    {
      id: "gsc-specialist",
      title: "Google Search Console Specialist",
      description: "Monitor SEO performance alongside paid channels. Spot optimization opportunities and track organic visibility improvements.",
      status: "planned",
      horizon: "now",
      quarter: "Q1 2026",
      theme: "tracking",
      confidence: "high",
      problemStatement: "Performance marketers need visibility into organic performance but GSC data is siloed and hard to action.",
      targetOutcome: "Unified view of paid and organic search performance",
      successMetrics: [
        { metric: "Organic visibility tracking", target: "Daily", current: null }
      ],
      features: [
        "Keyword ranking tracking",
        "Organic traffic trends",
        "Technical SEO alerts",
        "SERP position changes"
      ],
      votes: 89,
      effort: "M",
      impact: "M"
    },

    // Pixel & Conversion Organizer
    {
      id: "pixel-organizer",
      title: "Pixel & Conversion Organizer",
      description: "Ensure tracking is set up correctly across all platforms. Detect broken pixels, missing conversion events, and data gaps automatically.",
      status: "planned",
      horizon: "now",
      quarter: "Q1 2026",
      theme: "tracking",
      confidence: "high",
      problemStatement: "Broken tracking often goes unnoticed for days or weeks, leading to data gaps and poor optimization decisions.",
      targetOutcome: "Zero tracking gaps or broken pixels going undetected",
      successMetrics: [
        { metric: "Tracking issue detection time", target: "<1 hour", current: null },
        { metric: "Data accuracy improvement", target: "99%+", current: null }
      ],
      features: [
        "Pixel health monitoring",
        "Conversion event validation",
        "Cross-platform tracking audit",
        "Alert on tracking failures"
      ],
      votes: 156,
      effort: "L",
      impact: "L"
    },

    // ==========================================
    // NEXT - Q2 2026 (Medium confidence, planned)
    // Finalise the performance marketing apps stack
    // ==========================================

    // Meta Ads Performance Manager
    {
      id: "meta-ads-performance-manager",
      title: "Meta Ads Performance Manager",
      description: "Understand Meta (Facebook & Instagram) campaign performance with simplified reporting. Cut through the noise to see what matters.",
      status: "planned",
      horizon: "next",
      quarter: "Q2 2026",
      theme: "performance-marketing",
      confidence: "medium",
      problemStatement: "Meta's complex attribution and constantly changing interface make it hard to get consistent, reliable performance insights.",
      targetOutcome: "Standardized Meta performance view that updates automatically",
      successMetrics: [
        { metric: "Report generation time", target: "Instant", current: null },
        { metric: "Attribution confusion reduction", target: "80%", current: null }
      ],
      features: [
        "Simplified performance dashboard",
        "Cross-campaign comparison",
        "Audience performance insights",
        "Creative performance trends"
      ],
      votes: 189,
      effort: "L",
      impact: "XL"
    },

    // LinkedIn Ads Performance Manager
    {
      id: "linkedin-ads-performance-manager",
      title: "LinkedIn Ads Performance Manager",
      description: "Track LinkedIn Ads performance and optimize campaigns for professional audiences. Understand what content and targeting drives results.",
      status: "planned",
      horizon: "next",
      quarter: "Q2 2026",
      theme: "performance-marketing",
      confidence: "medium",
      problemStatement: "LinkedIn Ads reporting is fragmented and expensive. Marketers need a clearer view of B2B campaign performance.",
      targetOutcome: "Unified LinkedIn performance insights alongside other paid channels",
      successMetrics: [
        { metric: "Cross-platform reporting time", target: "<15 min", current: null }
      ],
      features: [
        "Campaign performance dashboard",
        "Audience insights",
        "Lead quality tracking",
        "Cost per lead optimization"
      ],
      votes: 67,
      effort: "L",
      impact: "L"
    },

    // UTM Tag Organizer
    {
      id: "utm-tag-organizer",
      title: "UTM Tag Organizer",
      description: "Keep your UTM tags clean and consistent. Track all UTMs in use, spot duplicates or misspellings, and know which tags actually drive traffic.",
      status: "planned",
      horizon: "next",
      quarter: "Q2 2026",
      theme: "tracking",
      confidence: "medium",
      problemStatement: "Inconsistent UTM tagging creates messy analytics data, making it hard to attribute performance accurately.",
      targetOutcome: "Zero UTM inconsistencies across all campaigns",
      successMetrics: [
        { metric: "UTM error rate", target: "0%", current: null },
        { metric: "Tagging time reduction", target: "70%", current: null }
      ],
      features: [
        "UTM library & templates",
        "Duplicate detection",
        "Spelling error alerts",
        "Usage tracking"
      ],
      votes: 98,
      effort: "S",
      impact: "M"
    },

    // Analytics Reporter
    {
      id: "analytics-reporter",
      title: "Analytics Reporter",
      description: "Unified analytics reporting with custom dashboard builder. Create personalized views that show exactly what you need to see.",
      status: "planned",
      horizon: "next",
      quarter: "Q2 2026",
      theme: "reporting",
      confidence: "medium",
      problemStatement: "One-size-fits-all dashboards don't work. Every marketer needs different views for their specific KPIs.",
      targetOutcome: "Fully customizable dashboards built in minutes, not hours",
      successMetrics: [
        { metric: "Dashboard creation time", target: "<10 min", current: null },
        { metric: "Custom view usage", target: "80%+ of users", current: null }
      ],
      features: [
        "Drag-and-drop dashboard builder",
        "Custom widget library",
        "Data source mixing",
        "Shareable views"
      ],
      votes: 178,
      effort: "L",
      impact: "L"
    },

    // Competitor Changelog
    {
      id: "competitor-changelog",
      title: "Competitor Changelog",
      description: "Automatically track changes on competitors' websites. Know when they add pages, update messaging, or change their strategy.",
      status: "planned",
      horizon: "next",
      quarter: "Q2 2026",
      theme: "monitoring",
      confidence: "medium",
      problemStatement: "Keeping track of competitor movements manually is time-consuming and inconsistent.",
      targetOutcome: "Automated competitor intelligence without manual monitoring",
      successMetrics: [
        { metric: "Competitor changes detected", target: "100%", current: null }
      ],
      features: [
        "Website change detection",
        "Page addition/removal alerts",
        "Content change tracking",
        "Impact quantification"
      ],
      votes: 112,
      effort: "L",
      impact: "M"
    },

    // Performance Reporter
    {
      id: "performance-reporter",
      title: "Performance Reporter",
      description: "Create clear, consistent performance reports in minutes. Show stakeholders how campaigns drive growth without manual work.",
      status: "planned",
      horizon: "next",
      quarter: "Q2 2026",
      theme: "reporting",
      confidence: "medium",
      problemStatement: "Creating weekly and monthly reports takes hours of manual work, pulling data from multiple sources.",
      targetOutcome: "Automated reports that generate themselves and look professional",
      successMetrics: [
        { metric: "Report creation time", target: "<5 min", current: null },
        { metric: "Stakeholder satisfaction", target: "90%+", current: null }
      ],
      features: [
        "Customizable report templates",
        "Automated data population",
        "Executive summary generation",
        "Scheduled report delivery"
      ],
      votes: 287,
      effort: "L",
      impact: "XL"
    },

    // ==========================================
    // LATER - Q3 & Q4 2026 (Lower confidence, exploring)
    // Moving into Social Media Marketing
    // ==========================================

    // Social Media Marketing Roadmap
    {
      id: "social-media-roadmap",
      title: "Social Media Marketing Roadmap",
      description: "Full roadmap reveal for Social Media Marketing apps. Expanding marketingOS beyond performance marketing into organic social.",
      status: "exploring",
      horizon: "later",
      quarter: "Q3 2026",
      theme: "social-media",
      confidence: "medium",
      problemStatement: "Social media managers lack the same level of tooling and automation that performance marketers have.",
      targetOutcome: "Complete visibility into what's coming for social media marketers",
      successMetrics: [
        { metric: "Community feedback collected", target: "500+ responses", current: null }
      ],
      features: [
        "Full feature roadmap publication",
        "Community voting on priorities",
        "Beta tester signup",
        "Early access program"
      ],
      votes: 203,
      effort: "S",
      impact: "M"
    },

    // First 3 Social Media Apps
    {
      id: "social-media-apps-wave-1",
      title: "Social Media Apps - Wave 1",
      description: "Launch of the first 3 social media marketing apps. Starting the journey to help social media managers work more efficiently.",
      status: "exploring",
      horizon: "later",
      quarter: "Q3 2026",
      theme: "social-media",
      confidence: "medium",
      problemStatement: "Social media managers spend too much time on repetitive tasks instead of creating engaging content.",
      targetOutcome: "Social media managers save 5+ hours per week on admin tasks",
      successMetrics: [
        { metric: "Time saved per week", target: "5+ hours", current: null },
        { metric: "User adoption", target: "1000+ users", current: null }
      ],
      features: [
        "Content calendar",
        "Post scheduling",
        "Engagement tracking",
        "Performance analytics"
      ],
      votes: 156,
      effort: "XL",
      impact: "XL"
    },

    // Finalise Social Media Apps
    {
      id: "social-media-apps-complete",
      title: "Complete Social Media Apps Suite",
      description: "Finalise the social media manager apps with full feature set. Complete toolkit for organic social management.",
      status: "exploring",
      horizon: "later",
      quarter: "Q4 2026",
      theme: "social-media",
      confidence: "low",
      problemStatement: "Social media managers need a complete toolkit, not just individual point solutions.",
      targetOutcome: "Full social media management suite integrated with performance marketing tools",
      successMetrics: [
        { metric: "Feature completeness", target: "100%", current: null },
        { metric: "Cross-tool integration", target: "Full", current: null }
      ],
      features: [
        "Complete app suite",
        "Cross-platform publishing",
        "Advanced analytics",
        "Team collaboration"
      ],
      votes: 134,
      effort: "XL",
      impact: "XL"
    },

    // 2027-2028 Roadmap
    {
      id: "future-roadmap-reveal",
      title: "2027-2028 Roadmap Reveal",
      description: "Full roadmap and feature set publication for everything coming in 2027 and 2028. Complete visibility into the future of marketingOS.",
      status: "exploring",
      horizon: "later",
      quarter: "Q4 2026",
      theme: "social-media",
      confidence: "low",
      problemStatement: "Users want to know the long-term vision before committing to a platform.",
      targetOutcome: "Clear 2-year roadmap that builds confidence in the platform's future",
      successMetrics: [
        { metric: "Roadmap clarity score", target: "90%+", current: null }
      ],
      features: [
        "2027 quarterly plans",
        "2028 strategic themes",
        "New marketing roles coverage",
        "Integration roadmap"
      ],
      votes: 89,
      effort: "S",
      impact: "M"
    }
  ],

  // Recently shipped items (changelog)
  shipped: [
    {
      id: "waitlist-launch",
      title: "Public Waitlist Launch",
      description: "marketingOS waitlist opened to the public with initial feature previews.",
      shippedDate: "2025-12-15",
      theme: "performance-marketing",
      impact: "First 500+ marketers joined the waitlist"
    },
    {
      id: "brand-website",
      title: "Brand Website & Positioning",
      description: "Complete website redesign with clear product messaging and feature pages.",
      shippedDate: "2025-11-20",
      theme: "performance-marketing",
      impact: "Established clear market positioning"
    }
  ],

  // Future phases (strategic roadmap beyond current scope)
  futurePhases: [
    {
      id: "social-media-marketing",
      name: "Social Media Marketing",
      description: "Analyze and improve your social media strategy across all major platforms.",
      estimatedStart: "2026",
      status: "vision"
    },
    {
      id: "email-marketing",
      name: "Email Marketing",
      description: "Learn what email campaigns perform better and replicate success.",
      estimatedStart: "2027",
      status: "vision"
    },
    {
      id: "marketing-automation-crm",
      name: "Marketing Automation, Data & CRM",
      description: "Get insight into your CRM operation and understand how you can work your database better.",
      estimatedStart: "2027",
      status: "vision"
    },
    {
      id: "marketing-intelligence",
      name: "Marketing Intelligence",
      description: "Track your KPIs, spot trends, and get insights that actually move the needle.",
      estimatedStart: "2027",
      status: "vision"
    },
    {
      id: "ab-testing",
      name: "A/B Testing",
      description: "Identify key areas on your website and quickly gain new ideas to improve conversions.",
      estimatedStart: "2027",
      status: "vision"
    },
    {
      id: "messaging-positioning",
      name: "Messaging & Positioning",
      description: "Craft sharper messaging and positioning that resonates with your audience.",
      estimatedStart: "2028",
      status: "vision"
    }
  ]
};

// Export for use in roadmap page
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ROADMAP_DATA;
}
