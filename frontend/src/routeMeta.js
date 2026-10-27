/**
 * SEO metadata for every public, indexable route. Shared by the useSEO hook
 * (wired in App) and scripts/prerender-routes.mjs (static HTML, sitemap,
 * serve.json), so keep it plain JS with no JSX or browser-only imports.
 * Signed-in app pages (/employees, /payroll, ...) are deliberately absent.
 */

import { ARTICLES } from './data/blogArticles.js'

export const SITE = {
  name: 'DoAide Payroll',
  baseUrl: 'https://payroll.doaide.com',
  ogImage: 'https://payroll.doaide.com/og-payroll.png',
}

const ORG = { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' }

// Product + FAQ structured data, home page only (moved from index.html,
// where it was stamped on every URL).
const HOME_GRAPH = [
    {
      "@type": "SoftwareApplication",
      "name": "DoAide Payroll",
      "url": "https://payroll.doaide.com",
      "applicationCategory": "BusinessApplication",
      "applicationSubCategory": "Payroll & HR Software",
      "operatingSystem": "Web",
      "countriesSupported": "IN",
      "inLanguage": "en",
      "description": "Automated Indian payroll software with PF, ESI, TDS compliance, payslip generation, leave management, and employee management. Free for up to 10 employees.",
      "offers": [
        {
          "@type": "Offer",
          "name": "Free",
          "price": "0",
          "priceCurrency": "INR",
          "description": "Up to 10 employees with full features"
        },
        {
          "@type": "Offer",
          "name": "Starter",
          "price": "999",
          "priceCurrency": "INR",
          "billingIncrement": "P1M",
          "description": "Up to 100 employees"
        },
        {
          "@type": "Offer",
          "name": "Pro",
          "price": "2499",
          "priceCurrency": "INR",
          "billingIncrement": "P1M",
          "description": "Unlimited employees"
        }
      ],
      "featureList": [
        "Salary computation",
        "PF/ESI/TDS compliance",
        "Payslip generation",
        "Leave management",
        "Attendance tracking",
        "Reports"
      ],
      "author": {
        "@type": "Organization",
        "name": "Apprend Technologies",
        "url": "https://doaide.com"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Does DoAide Payroll handle PF and ESI?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. PF at 12% on basic (capped at ₹15,000) and ESI (0.75% employee + 3.25% employer, for gross up to ₹21,000) are calculated automatically."
          }
        },
        {
          "@type": "Question",
          "name": "How many employees can I manage for free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Free plan supports up to 10 employees with full payroll features including PF, ESI, and TDS calculation."
          }
        },
        {
          "@type": "Question",
          "name": "Can I generate payslips?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Professional PDF payslips with complete earnings and deductions breakdown are generated automatically each pay run."
          }
        }
      ]
    }
  ]

// Fit "<title> | DoAide Payroll" into ~70 chars; long titles go without it.
const withSuffix = (title) => (`${title} | DoAide Payroll`.length <= 70 ? `${title} | DoAide Payroll` : title)

const tool = (path, h1, title, description) => ({ path, h1, title: withSuffix(title), description, kind: 'tool' })

export const routes = [
  {
    path: '/',
    kind: 'home',
    h1: 'Indian Payroll, Made Simple',
    title: 'DoAide Payroll — Payroll Software for Indian SMBs (PF, ESI, TDS)',
    description:
      'Automated salary computation, PF/ESI/TDS compliance and payslip generation for Indian SMBs. Free for up to 10 employees — get started in minutes.',
  },
  {
    path: '/pricing',
    kind: 'page',
    h1: 'Simple, Transparent Pricing',
    title: withSuffix('Pricing — Free, Starter ₹999 & Pro ₹2,499'),
    description:
      'Free for up to 10 employees. Starter (₹999/mo) adds leave and attendance for 100 employees; Pro (₹2,499/mo) is unlimited with bulk payroll.',
  },
  tool(
    '/calculator',
    'Salary Calculator',
    'Salary Calculator India — CTC Breakdown with PF & ESI',
    'Calculate the CTC breakdown with PF, ESI, HRA and deductions for Indian employees. Free salary calculator, no sign-up required.'
  ),
  tool(
    '/payslip-generator',
    'Free Payslip Generator',
    'Free Payslip Generator — Salary Slip PDF',
    'Generate professional salary slips in PDF format from multiple templates. Free payslip generator for Indian businesses, no sign-up.'
  ),
  tool(
    '/batch',
    'Batch Payslip Generator',
    'Batch Payslip Generator — Multiple Months as ZIP',
    'Generate payslips for multiple months at once and download them as a ZIP file. Free, no sign-up required.'
  ),
  tool(
    '/checker',
    'PF & ESI Eligibility Checker',
    'PF & ESI Eligibility Checker for Employers',
    'Check if your business must register for PF and ESI. Enter employee count and wages to see your compliance requirements. Free.'
  ),
  tool(
    '/professional-tax',
    'Professional Tax by State',
    'Professional Tax by State — PT Slab Rates & Calculator',
    'Professional tax rates across Indian states. Select a state to see its slab rates and calculate PT for any salary. Free calculator.'
  ),
  {
    path: '/templates',
    kind: 'page',
    h1: 'Payslip Templates',
    title: withSuffix('Free Payslip Templates for Indian Businesses'),
    description:
      'Free professional payslip templates for Indian businesses. Copy the column headers and customise them for your needs.',
  },
  {
    path: '/embed',
    kind: 'page',
    h1: 'Embed Payroll Tools on Your Website',
    title: withSuffix('Embed a Free Salary Calculator on Your Website'),
    description:
      'Add a free salary calculator or PF/ESI checker to your website with one line of code. No sign-up required.',
  },
  {
    path: '/blog',
    kind: 'blog',
    h1: 'DoAide Payroll Blog',
    title: withSuffix('Payroll Blog — PF, ESI, TDS & Payslip Guides'),
    description:
      'Guides for Indian employers on payroll processing, PF and ESI compliance, EPF calculation, professional tax and payslip formats.',
  },
  ...ARTICLES.map((a) => ({
    path: `/blog/${a.slug}`,
    kind: 'post',
    h1: a.title,
    title: withSuffix(a.title),
    description: a.description,
    published: a.published,
  })),
]

export const canonicalFor = (path) => `${SITE.baseUrl}${path}`

export const metaForPath = (path) => routes.find((r) => r.path === path)

export function jsonLdFor(route) {
  const url = canonicalFor(route.path)
  switch (route.kind) {
    case 'home':
      return { '@context': 'https://schema.org', '@graph': HOME_GRAPH }
    case 'tool':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: route.h1,
        url,
        description: route.description,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        isPartOf: { '@type': 'WebSite', name: SITE.name, url: canonicalFor('/') },
      }
    case 'post':
      return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: route.h1,
        description: route.description,
        url,
        mainEntityOfPage: url,
        datePublished: route.published,
        author: ORG,
        publisher: ORG,
      }
    default:
      return {
        '@context': 'https://schema.org',
        '@type': route.kind === 'blog' ? 'Blog' : 'WebPage',
        name: route.h1,
        url,
        description: route.description,
        isPartOf: { '@type': 'WebSite', name: SITE.name, url: canonicalFor('/') },
      }
  }
}
