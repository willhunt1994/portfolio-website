import type { JSX } from 'react'

import { ArrowRightIcon } from 'lucide-react'

import StatisticsCard from '@/components/shadcn-studio/blocks/statistics-card-04'
import EarningReportCard from '@/components/shadcn-studio/blocks/chart-earning-report'
import SeoRippleBg from '@/components/shadcn-studio/blocks/features-section-22/seo-ripple-bg'
import SocialMedia from '@/components/shadcn-studio/blocks/features-section-22/social-media'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PrimaryGrowButton, SecondaryGrowButton } from '@/components/ui/grow-button'
import { Marquee } from '@/components/ui/marquee'
import { MotionPreset } from '@/components/ui/motion-preset'

import LogoVector from '@/assets/svg/logo-vector'
import Logo from '@/assets/svg/logo'

type realTimeData = {
  title: string
  badgeContent: string
  value: string
  changePercentage: number
  svg: JSX.Element
}[]

type earningReportData = {
  icon: JSX.Element
  title: string
  department: string
  value: string
  trend: string
  percentage: number
}[]

type EarningReportChartData = {
  day: string
  earning: number
  fill: string
}[]

type socialMediaData = {
  image: string
  name: string
}[]

type featureProps = {
  realTimeData: realTimeData
  earningReportData: earningReportData
  earningReportChartData: EarningReportChartData
  socialMediaData: socialMediaData
}

const Features = ({ realTimeData, earningReportData, earningReportChartData, socialMediaData }: featureProps) => {
  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-16 space-y-4 text-center'>
          <MotionPreset
            className='text-primary text-sm font-medium'
            fade
            slide={{ direction: 'down', offset: 30 }}
            blur
            transition={{ duration: 0.6 }}
          >
            <Badge variant='outline' className='text-sm font-normal'>
              Features
            </Badge>
          </MotionPreset>

          <MotionPreset
            component='h2'
            className='text-2xl font-semibold md:text-3xl lg:text-4xl'
            fade
            slide={{ direction: 'down', offset: 50 }}
            blur
            delay={0.2}
            transition={{ duration: 0.6 }}
          >
            Turn your marketing data into actionable insights
          </MotionPreset>

          <MotionPreset
            component='p'
            className='text-muted-foreground mx-auto max-w-3xl text-xl'
            fade
            blur
            slide={{ direction: 'down', offset: 50 }}
            delay={0.4}
            transition={{ duration: 0.6 }}
          >
            See what drives growth with real-time analytics and easy-to-understand dashboards.
          </MotionPreset>

          <MotionPreset
            className='flex flex-wrap items-center justify-center gap-4 text-center'
            fade
            slide={{ direction: 'down', offset: 30 }}
            blur
            delay={0.6}
            transition={{ duration: 0.6 }}
          >
            <PrimaryGrowButton size='lg' asChild>
              <a href='#'>
                Get Started - Free <LogoVector className='size-6' />{' '}
              </a>
            </PrimaryGrowButton>

            <SecondaryGrowButton size='lg' asChild>
              <a href='#'>
                View Pricing <ArrowRightIcon />
              </a>
            </SecondaryGrowButton>
          </MotionPreset>
        </div>

        {/* Features Grid */}
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3'>
          {/* Column 1 */}
          <div className='flex flex-col gap-6'>
            {/* SEO Card */}
            <MotionPreset fade blur slide={{ offset: 50 }} delay={1} transition={{ duration: 0.6 }}>
              <Card className='shadow-none'>
                <CardContent>
                  <MotionPreset
                    fade
                    slide={{ direction: 'down', offset: 35 }}
                    delay={1.05}
                    transition={{ duration: 0.5 }}
                    className='relative mx-auto flex h-full w-fit justify-center'
                  >
                    <SeoRippleBg className='text-border pointer-events-none size-45 select-none' />

                    <div className='absolute top-1/2 -translate-y-1/2'>
                      <Avatar className='size-16 rounded-full border shadow-lg'>
                        <AvatarFallback className='bg-background text-primary shrink-0 rounded-sm'>
                          <Logo className='size-8' />
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    <MotionPreset
                      fade
                      className='absolute top-8 -left-3 -rotate-5'
                      motionProps={{
                        animate: {
                          y: [0, -10, 0],
                          opacity: 1
                        },
                        transition: {
                          y: {
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeOut'
                          },
                          opacity: {
                            duration: 0.5,
                            delay: 1.2
                          }
                        }
                      }}
                    >
                      <Badge className='bg-background text-foreground border-border gap-2.5 px-3 py-1.5 font-normal transition-shadow duration-200 hover:shadow-sm'>
                        Marketing
                      </Badge>
                    </MotionPreset>

                    <MotionPreset
                      fade
                      className='absolute bottom-15 -left-9 rotate-5'
                      motionProps={{
                        animate: {
                          y: [0, -9, 0],
                          opacity: 1
                        },
                        transition: {
                          y: {
                            duration: 1.9,
                            repeat: Infinity,
                            ease: 'easeOut'
                          },
                          opacity: {
                            duration: 0.5,
                            delay: 1.35
                          }
                        }
                      }}
                    >
                      <Badge className='bg-background text-foreground border-border gap-2.5 px-3 py-1.5 font-normal transition-shadow duration-200 hover:shadow-sm'>
                        Search
                      </Badge>
                    </MotionPreset>

                    <MotionPreset
                      fade
                      className='absolute bottom-3 -left-3 -rotate-2'
                      motionProps={{
                        animate: {
                          y: [0, -9, 0],
                          opacity: 1
                        },
                        transition: {
                          y: {
                            duration: 1.9,
                            repeat: Infinity,
                            ease: 'easeOut'
                          },
                          opacity: {
                            duration: 0.5,
                            delay: 1.35
                          }
                        }
                      }}
                    >
                      <Badge className='bg-background text-foreground border-border gap-2.5 px-3 py-1.5 font-normal transition-shadow duration-200 hover:shadow-sm'>
                        Google
                      </Badge>
                    </MotionPreset>

                    <MotionPreset
                      fade
                      className='absolute top-3 -right-5 -rotate-10'
                      motionProps={{
                        animate: {
                          y: [0, -10, 0],
                          opacity: 1
                        },
                        transition: {
                          y: {
                            duration: 2.1,
                            repeat: Infinity,
                            ease: 'easeOut'
                          },
                          opacity: {
                            duration: 0.5,
                            delay: 1.5
                          }
                        }
                      }}
                    >
                      <Badge className='bg-background text-foreground border-border gap-2.5 px-3 py-1.5 font-normal transition-shadow duration-200 hover:shadow-sm'>
                        Keywords
                      </Badge>
                    </MotionPreset>

                    <MotionPreset
                      fade
                      className='absolute -right-12 bottom-15 rotate-10'
                      motionProps={{
                        animate: {
                          y: [0, -8, 0],
                          opacity: 1
                        },
                        transition: {
                          y: {
                            duration: 1.8,
                            repeat: Infinity,
                            ease: 'easeOut'
                          },
                          opacity: {
                            duration: 0.5,
                            delay: 1.65
                          }
                        }
                      }}
                    >
                      <Badge className='bg-background text-foreground border-border gap-2.5 px-3 py-1.5 font-normal transition-shadow duration-200 hover:shadow-sm'>
                        Analytics
                      </Badge>
                    </MotionPreset>

                    <MotionPreset
                      fade
                      className='absolute right-0 bottom-3 -rotate-10'
                      motionProps={{
                        animate: {
                          y: [0, -8, 0],
                          opacity: 1
                        },
                        transition: {
                          y: {
                            duration: 1.8,
                            repeat: Infinity,
                            ease: 'easeOut'
                          },
                          opacity: {
                            duration: 0.5,
                            delay: 1.65
                          }
                        }
                      }}
                    >
                      <Badge className='bg-background text-foreground border-border gap-2.5 px-3 py-1.5 font-normal transition-shadow duration-200 hover:shadow-sm'>
                        Ranking
                      </Badge>
                    </MotionPreset>
                  </MotionPreset>
                </CardContent>
                <CardHeader className='gap-4'>
                  <CardTitle className='text-2xl'>SEO</CardTitle>
                  <CardDescription className='text-lg'>
                    Optimize your website and content for better visibility, higher traffic, and improved search
                    rankings.
                  </CardDescription>
                </CardHeader>
              </Card>
            </MotionPreset>

            {/* Cross-Platform Integration Card */}
            <MotionPreset
              fade
              blur
              delay={1.2}
              slide={{ direction: 'down', offset: 50 }}
              transition={{ duration: 0.6 }}
              className='flex-1'
            >
              <Card className='h-full shadow-none'>
                <div className='flex flex-1 flex-col justify-center gap-4'>
                  <Marquee pauseOnHover duration={22} gap={1.5} className='py-0'>
                    {socialMediaData.map((socialMedia, index) => (
                      <Badge variant='outline' key={index} className='px-3 py-1.5 font-normal'>
                        <img src={socialMedia.image} alt={socialMedia.name} className='size-5.5' />
                        {socialMedia.name}
                      </Badge>
                    ))}
                  </Marquee>
                  <Marquee pauseOnHover reverse duration={22} gap={1.5} className='py-0'>
                    {socialMediaData.map((socialMedia, index) => (
                      <Badge variant='outline' key={index} className='px-3 py-1.5 font-normal'>
                        <img src={socialMedia.image} alt={socialMedia.name} className='size-5.5' />
                        {socialMedia.name}
                      </Badge>
                    ))}
                  </Marquee>
                </div>
                <CardHeader className='gap-4'>
                  <CardTitle className='text-2xl'>Cross-Platform Integration</CardTitle>
                  <CardDescription className='text-lg'>
                    Seamlessly connect all your marketing channels and data sources for a unified, 360° view of your
                    performance.
                  </CardDescription>
                </CardHeader>
              </Card>
            </MotionPreset>
          </div>

          {/* Column 2 - Customizable Dashboards */}
          <MotionPreset fade blur zoom delay={0.8} transition={{ duration: 0.6 }}>
            <Card className='h-full justify-between pt-3 shadow-none'>
              <CardContent className='px-3'>
                <EarningReportCard
                  title='Earning Report'
                  subTitle='Weekly Earning overview'
                  statData={earningReportData}
                  chartData={earningReportChartData}
                  className='bg-muted w-full shadow-none max-md:*:px-3'
                />
              </CardContent>
              <CardHeader className='gap-4'>
                <CardTitle className='text-2xl'>Customizable Dashboards</CardTitle>
                <CardDescription className='text-lg'>
                  Tailor your dashboard to display the metrics that matter most, giving you actionable insights at a
                  glance.
                </CardDescription>
              </CardHeader>
            </Card>
          </MotionPreset>

          {/* Column 3 */}
          <div className='flex flex-col gap-6 sm:max-xl:col-span-full sm:max-xl:grid sm:max-xl:grid-cols-2'>
            {/* Social Media Marketing Card */}
            <MotionPreset fade blur delay={1} slide={{ direction: 'right', offset: 50 }} transition={{ duration: 0.6 }}>
              <Card className='h-full shadow-none'>
                <CardContent className='flex flex-1 items-center'>
                  <SocialMedia />
                </CardContent>
                <CardHeader className='gap-4'>
                  <CardTitle className='text-2xl'>Social Media Marketing</CardTitle>
                  <CardDescription className='text-lg'>
                    Track and optimize your social media campaigns with detailed insights.
                  </CardDescription>
                </CardHeader>
              </Card>
            </MotionPreset>

            {/* Real-Time Analytics Card */}
            <MotionPreset
              fade
              blur
              slide={{ direction: 'down', offset: 50 }}
              delay={1.2}
              transition={{ duration: 0.6 }}
              className='h-full'
            >
              <Card className='shadow-none'>
                <Marquee pauseOnHover gap={1.5} duration={30} className='py-0'>
                  {realTimeData.map((card, index) => (
                    <StatisticsCard
                      key={index}
                      title={card.title}
                      badgeContent={card.badgeContent}
                      value={card.value}
                      changePercentage={card.changePercentage}
                      svg={card.svg}
                      className='w-67.5 shadow-none'
                    />
                  ))}
                </Marquee>
                <CardHeader className='gap-4'>
                  <CardTitle className='text-2xl'>Real-Time Analytics</CardTitle>
                  <CardDescription className='text-lg'>
                    Access live data and monitor your campaigns in real-time to make informed decisions and react
                    quickly.
                  </CardDescription>
                </CardHeader>
              </Card>
            </MotionPreset>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
