import { ChartPieIcon, DollarSignIcon, WalletIcon } from 'lucide-react'

import RatingsCardSvg from '@/assets/svg/ratings-card-svg'
import SessionCardSvg from '@/assets/svg/session-card-svg'
import CustomersCardSvg from '@/assets/svg/customers-card-svg'
import TotalOrdersCardSvg from '@/assets/svg/total-orders-card-svg'

import Features from '@/components/shadcn-studio/blocks/features-section-22/features-section-22'

// Statistics card data
const realTimeData = [
  {
    title: 'Ratings',
    badgeContent: 'Last 6 months',
    value: '8.14k',
    changePercentage: 18.2,
    svg: <RatingsCardSvg />
  },
  {
    title: 'Sessions',
    badgeContent: 'Last month',
    value: '12.2k',
    changePercentage: -25.5,
    svg: <SessionCardSvg />
  },
  {
    title: 'Customers',
    badgeContent: 'Daily customers',
    value: '42.4k',
    changePercentage: 9.2,
    svg: <CustomersCardSvg />
  },
  {
    title: 'Total orders',
    badgeContent: 'Last Week',
    value: '42.5k',
    changePercentage: 10.8,
    svg: <TotalOrdersCardSvg />
  }
]

const earningReportData = [
  {
    icon: <ChartPieIcon />,
    title: 'Net profit',
    department: 'Sales',
    value: '$1,623',
    trend: 'up',
    percentage: 20.3
  },
  {
    icon: <DollarSignIcon />,
    title: 'Total income',
    department: 'Sales, Affiliation',
    value: '$5,600',
    trend: 'up',
    percentage: 16.2
  },
  {
    icon: <WalletIcon />,
    title: 'Total expense',
    department: 'ADVT, Marketing',
    value: '$3,200',
    trend: 'up',
    percentage: 10.5
  }
]

// Chart data
const earningReportChartData = [
  { day: 'Monday', earning: 48, fill: 'color-mix(in oklab, var(--primary) 10%, transparent)' },
  { day: 'Tuesday', earning: 147, fill: 'color-mix(in oklab, var(--primary) 10%, transparent)' },
  { day: 'Wednesday', earning: 106, fill: 'color-mix(in oklab, var(--primary) 10%, transparent)' },
  { day: 'Thursday', earning: 180, fill: 'var(--primary)' },
  { day: 'Friday', earning: 75, fill: 'color-mix(in oklab, var(--primary) 10%, transparent)' },
  { day: 'Saturday', earning: 60, fill: 'color-mix(in oklab, var(--primary) 10%, transparent)' },
  { day: 'Sunday', earning: 128, fill: 'color-mix(in oklab, var(--primary) 10%, transparent)' }
]

const socialMedia = [
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/facebook-icon.png',
    name: 'Facebook'
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/twitter-icon.png',
    name: 'Twitter'
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/instagram-icon.png',
    name: 'Instagram'
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/linkdin-icon.png',
    name: 'LinkedIn'
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/github-white.png',
    name: 'Github'
  }
]

const FeaturesPage = () => {
  return (
    <Features
      realTimeData={realTimeData}
      earningReportData={earningReportData}
      earningReportChartData={earningReportChartData}
      socialMediaData={socialMedia}
    />
  )
}

export default FeaturesPage
