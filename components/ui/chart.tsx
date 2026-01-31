'use client'

import * as React from 'react'
import {
  Tooltip,
  ResponsiveContainer,
  type TooltipProps as RechartsTooltipProps
} from 'recharts'

import { cn } from '@/lib/utils'

export type ChartConfig = Record<
  string,
  {
    label?: string
    color?: string
    icon?: React.ComponentType
    [key: string]: unknown
  }
>

const ChartContext = React.createContext<{ config: ChartConfig } | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />')
  }
  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    config: ChartConfig
    children: React.ReactElement
  }
>(({ id, className, config, children, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart-container
        ref={ref}
        id={chartId}
        className={cn('flex aspect-video justify-center text-xs', className)}
        {...props}
      >
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = 'ChartContainer'

type ChartTooltipProps = RechartsTooltipProps<number, string> & {
  content?: React.ReactNode
}

const ChartTooltip = ({ content, ...props }: ChartTooltipProps) => (
  <Tooltip content={content} {...props} />
)

type ChartTooltipContentProps = React.ComponentProps<'div'> & {
  active?: boolean
  payload?: Array<{ name?: string; value?: number; dataKey?: string; color?: string; payload?: Record<string, unknown> }>
  label?: string
  hideLabel?: boolean
  hideIndicator?: boolean
  indicator?: 'line' | 'dot' | 'dashed'
  nameKey?: string
  labelKey?: string
}

const ChartTooltipContent = React.forwardRef<HTMLDivElement, ChartTooltipContentProps>(
  (
    {
      active,
      payload,
      label,
      hideLabel = false,
      hideIndicator = false,
      indicator = 'dot',
      nameKey,
      labelKey,
      className,
      ...props
    },
    ref
  ) => {
    const { config } = useChart()

    if (!active || !payload?.length) return null

    const name = nameKey && payload[0]?.payload ? (payload[0].payload as Record<string, unknown>)[nameKey] : label
    const value = payload[0]?.value

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg border bg-background px-2.5 py-1.5 text-sm shadow-md',
          className
        )}
        {...props}
      >
        {!hideLabel && name ? (
          <div className="mb-1 font-medium">{String(name)}</div>
        ) : null}
        <div className="flex flex-col gap-1.5">
          {payload.map((item, index) => {
            const key = (labelKey ?? item.dataKey ?? item.name ?? 'value') as string
            const configItem = config[key]
            const itemLabel = configItem?.label ?? key

            return (
              <div key={item.color ?? index} className="flex items-center gap-2">
                {!hideIndicator && (
                  <span
                    className="shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]"
                    style={
                      {
                        '--color-bg': item.color ?? 'var(--color)',
                        '--color-border': item.color ?? 'var(--color)',
                        width: indicator === 'line' ? '12px' : '8px',
                        height: indicator === 'line' ? '2px' : '8px',
                        borderWidth: indicator === 'dashed' ? '2px' : '1px'
                      } as React.CSSProperties
                    }
                  />
                )}
                <span className="text-muted-foreground">{itemLabel}:</span>
                <span className="font-medium">{String(value)}</span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = 'ChartTooltipContent'

export { ChartContainer, ChartTooltip, ChartTooltipContent, useChart }
