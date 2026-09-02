/**
 * Single source of truth for every piece of copy and every number on the
 * marketing site. Swap these values (and the disclosure block in the footer)
 * before going live — the figures here are illustrative placeholders.
 */

import type { ArtVariant } from "@/components/Art";
import type { IconName } from "@/components/Icon";

/**
 * Canonical origin — no trailing slash. This MUST match the primary domain set
 * in Vercel. If the two disagree, Google is handed two competing versions of
 * every page, which is the one thing to avoid while contesting a brand term.
 */
export const siteUrl = "https://ekdantcapital.in";

export const company = {
  name: "Ekdant",
  legalName: "Ekdant Capital Private Limited",
  suffix: "Capital",
  tagline: "Your growth, our financial solutions",
  phone: "+91 63597 11225",
  phoneHref: "tel:+916359711225",
  email: "ekdantcapital23@gmail.com",
  whatsapp: "+91 63597 11225",
  whatsappHref: "https://wa.me/916359711225",
  address: "GF - 18, Dwarkadhish Chamber, Nr. Bethak Mandir, Kevdabaug, Vadodara.",
  hours: "Mon–Sat · 9:30 to 19:00 IST",
  founded: 2016,
  cities: 42,
} as const;

export const socials = [
  { label: "Facebook", href: "https://www.facebook.com/share/1HSbhz1vgw/", icon: "facebook" },
  { label: "Google", href: "#", icon: "google" },
] as const satisfies readonly { label: string; href: string; icon: IconName }[];

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; hint?: string }[];
};

export const navigation: NavItem[] = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#team" },
  {
    label: "Loans",
    href: "#products",
    children: [
      { label: "Personal loan", href: "#products", hint: "up to ₹50 lakh" },
      { label: "Business loan", href: "#products", hint: "up to ₹10 crore" },
      { label: "Home loan", href: "#products", hint: "up to ₹25 crore" },
      { label: "Loan against property", href: "#products", hint: "up to ₹100 crore" },
      { label: "Working capital", href: "#products", hint: "up to ₹100 crore" },
      { label: "Professional loan", href: "#products", hint: "up to ₹5 crore" },
      { label: "Car loan", href: "#products", hint: "90% on-road" },
      { label: "Education loan", href: "#products", hint: "up to ₹1 crore" },
    ],
  },
  {
    label: "Pages",
    href: "#process",
    children: [
      { label: "How it works", href: "#process" },
      { label: "EMI calculator", href: "#calculator" },
      { label: "Lending partners", href: "#partners" },
    ],
  },
  { label: "Team", href: "#team" },
  {
    label: "Contact",
    href: "#contact",
    children: [
      { label: "Talk to an advisor", href: "#contact" },
      { label: "Visit a branch", href: "#contact" },
      { label: "Chat on WhatsApp", href: "#contact" },
      { label: "Raise a complaint", href: "#contact" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

export const hero = {
  headline: "One application,",
  emphasis: "42 lenders",
  headlineEnd: "competing for it",
  body: "Tell us what you need once. We run it past every bank and NBFC on our panel and bring back the offer that costs you least — with no fee until the money lands.",
} as const;

export const heroMetrics = [
  { value: "4 min", label: "Average application time" },
  { value: "24 hrs", label: "Sanction to disbursal" },
  { value: "₹0", label: "Payable before disbursal" },
] as const;

/* -------------------------------------------------------------------------- */
/* Products                                                                   */
/* -------------------------------------------------------------------------- */

export const products = [
  {
    name: "Personal loan",
    art: "wallet" as ArtVariant,
    ceiling: "Up to ₹50 lakh",
    tenure: "6 to 72 months",
    banks: ["HDFC Bank", "Kotak Mahindra", "Tata Capital"],
    points: ["No collateral", "Prepay after 3 EMIs"],
  },
  {
    name: "Business loan",
    art: "shop" as ArtVariant,
    ceiling: "Up to ₹10 crore",
    tenure: "12 to 120 months",
    banks: ["ICICI Bank", "Axis Bank", "IDFC First"],
    points: ["GST-based underwriting", "Seasonal repayment"],
  },
  {
    name: "Home loan",
    art: "house" as ArtVariant,
    ceiling: "Up to ₹25 crore",
    tenure: "5 to 30 years",
    banks: ["State Bank of India", "HDFC Bank", "LIC Housing"],
    points: ["Balance transfer", "Nil floating prepay fee"],
  },
  {
    name: "Loan against property",
    art: "property" as ArtVariant,
    ceiling: "Up to ₹100 crore",
    tenure: "5 to 20 years",
    banks: ["Axis Bank", "Bajaj Finserv", "PNB Housing"],
    points: ["Residential or commercial", "Keep the property let out"],
  },
  {
    name: "Working capital",
    art: "cashflow" as ArtVariant,
    ceiling: "Limit up to ₹100 crore",
    tenure: "12-month renewable",
    banks: ["State Bank of India", "Bank of Baroda", "Yes Bank"],
    points: ["Consortium funding available", "Interest on usage only"],
  },
  {
    name: "Professional loan",
    art: "briefcase" as ArtVariant,
    ceiling: "Up to ₹5 crore",
    tenure: "12 to 84 months",
    banks: ["Kotak Mahindra", "IDFC First", "Federal Bank"],
    points: ["Doctors, CAs, architects", "Degree in place of collateral"],
  },
  {
    name: "Car loan",
    art: "car" as ArtVariant,
    ceiling: "Up to 90% on-road",
    tenure: "12 to 84 months",
    banks: ["HDFC Bank", "ICICI Bank", "Bank of Baroda"],
    points: ["New and pre-owned", "Insurance rolled in"],
  },
  {
    name: "Education loan",
    art: "graduation" as ArtVariant,
    ceiling: "Up to ₹1 crore",
    tenure: "Up to 15 years",
    banks: ["State Bank of India", "Bank of Baroda", "Union Bank of India"],
    points: ["India and overseas courses", "Repay after the course ends"],
  },
] as const;

/* -------------------------------------------------------------------------- */
/* Process                                                                    */
/* -------------------------------------------------------------------------- */

export const steps = [
  {
    icon: "cursor" as IconName,
    title: "Tell us what you need",
    body: "Four minutes, eleven fields. Choose your amount and tenure and watch the EMI update as you go.",
    meta: "Step 01",
  },
  {
    icon: "upload" as IconName,
    title: "Verify in one sitting",
    body: "Aadhaar-based KYC and a bank statement fetched with your consent. Nothing to print, nothing to courier.",
    meta: "Step 02",
  },
  {
    icon: "bolt" as IconName,
    title: "Money in the account",
    body: "Our credit engine plus a human reviewer sign off, then funds move the same working day.",
    meta: "Step 03",
  },
] as const;

/* -------------------------------------------------------------------------- */
/* Footer                                                                     */
/* -------------------------------------------------------------------------- */

export const footerColumns = [
  {
    heading: "Company",
    links: ["How it works", "Meet the team", "Fair practice code", "Careers"],
  },
  {
    heading: "Borrow",
    links: [
      "Personal loan",
      "Business loan",
      "Home loan",
      "Loan against property",
    ],
  },
  {
    heading: "Support",
    links: [
      "Interest rates & fees",
      "EMI calculator",
      "Foreclosure requests",
      "Raise a complaint",
    ],
  },
] as const;


/* -------------------------------------------------------------------------- */
/* Team                                                                       */
/* -------------------------------------------------------------------------- */

export type Leader = {
  name: string;
  role: string;
  bio: string;
  tenure: string;
  art: ArtVariant;
};

export const leadership: Leader[] = [
  {
    name: "Amit Salunke",
    role: "Founder",
    bio: "Twenty-two years in banking, five of them as a Branch Manager. He has sat on the approving side of the desk, and knows what a file needs before it gets there.",
    tenure: "Since 2004",
    art: "orbit",
  },
];

/* -------------------------------------------------------------------------- */
/* Lending partners                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Panel lenders. Logos live in `public/lenders/`. To swap one for a higher-
 * resolution official asset, drop the new file in and keep the same path.
 */
export type Lender = { name: string; logo?: string };

export const lenders: Lender[] = [
  { name: "HDFC Bank", logo: "/lenders/hdfc-bank.png" },
  { name: "L&T Financial Services", logo: "/lenders/landt-financial-services.png" },
  { name: "Tata Capital", logo: "/lenders/tata-capital.png" },
  { name: "Piramal Finance", logo: "/lenders/piramal-finance.png" },
  { name: "InCred", logo: "/lenders/incred.png" },
  { name: "Hero FinCorp", logo: "/lenders/hero-fincorp.png" },
  { name: "Bhanix Finance", logo: "/lenders/bhanix-finance.png" },
  { name: "FatakPay", logo: "/lenders/fatakpay.png" },
  { name: "Prefr", logo: "/lenders/prefr.png" },
  { name: "Zype", logo: "/lenders/zype.png" },
  { name: "PRIVO", logo: "/lenders/privo.png" },
  { name: "SBI Card", logo: "/lenders/sbi-card.png" },
  { name: "Bank of Baroda", logo: "/lenders/bank-of-baroda.png" },
  { name: "Canara Bank", logo: "/lenders/canara-bank.png" },
  { name: "Punjab & Sind Bank", logo: "/lenders/punjab-and-sind-bank.png" },
  { name: "Bank of Maharashtra", logo: "/lenders/bank-of-maharashtra.png" },
  { name: "Punjab National Bank", logo: "/lenders/punjab-national-bank.png" },
  { name: "Indian Bank", logo: "/lenders/indian-bank.png" },
  { name: "Union Bank of India", logo: "/lenders/union-bank-of-india.png" },
  { name: "Bank of India", logo: "/lenders/bank-of-india.png" },
  { name: "Axis Bank", logo: "/lenders/axis-bank.png" },
  { name: "Kotak Mahindra Bank", logo: "/lenders/kotak.png" },
  { name: "IndusInd Bank", logo: "/lenders/indusind-bank.png" },
  { name: "DCB Bank", logo: "/lenders/dcb-bank.png" },
  { name: "IDFC First Bank", logo: "/lenders/idfc-first-bank.png" },
  { name: "ICICI Bank", logo: "/lenders/icici-bank.png" },
  { name: "Yes Bank", logo: "/lenders/yes-bank.png" },
  { name: "Reliance Capital", logo: "/lenders/reliance-capital.png" },
  { name: "HDFC Sales", logo: "/lenders/hdfc-sales.png" },
  { name: "Citi", logo: "/lenders/citi.png" },
  { name: "RBL Bank", logo: "/lenders/rbl-bank.png" },
  { name: "Federal Bank", logo: "/lenders/federal-bank.png" },
  { name: "Saraswat Bank", logo: "/lenders/saraswat-bank.png" },
  { name: "Unity Small Finance Bank", logo: "/lenders/unity-small-finance.png" },
  { name: "LIC HFL", logo: "/lenders/lic-hfl.png" },
  { name: "HSBC", logo: "/lenders/hsbc.png" },
  { name: "HDFC", logo: "/lenders/hdfc.png" },
  { name: "Karur Vysya Bank", logo: "/lenders/karur-vysya-bank.png" },
  { name: "IDBI Bank", logo: "/lenders/idbi-bank.png" },
  { name: "UGRO Capital", logo: "/lenders/ugro-capital.png" },
  { name: "Karnataka Bank", logo: "/lenders/karnataka-bank.png" },
  { name: "DHFL", logo: "/lenders/dhfl.png" },
];

/* -------------------------------------------------------------------------- */
/* Contact                                                                    */
/* -------------------------------------------------------------------------- */

export const contactChannels = [
  {
    icon: "phone" as IconName,
    label: "Call us",
    value: company.phone,
    href: company.phoneHref,
    note: company.hours,
  },
  {
    icon: "whatsapp" as IconName,
    label: "WhatsApp",
    value: company.whatsapp,
    href: company.whatsappHref,
    note: "Replies within 15 minutes, 9:00 to 21:00",
  },
  {
    icon: "mail" as IconName,
    label: "Email",
    value: company.email,
    href: `mailto:${company.email}`,
    note: "Answered in one working day",
  },
] as const;
