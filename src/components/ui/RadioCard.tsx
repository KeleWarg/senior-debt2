import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * RadioGroup & RadioCard Components
 * 
 * Card-style radio buttons for selections like debt type
 * Uses LLM theme tokens - selected state uses primary-300 background
 * 
 * @example
 * <RadioGroup value={debtType} onValueChange={setDebtType}>
 *   <RadioCard value="credit-card" icon={<CreditCard />}>
 *     Credit card
 *   </RadioCard>
 *   <RadioCard value="loan" icon={<Banknote />}>
 *     Loan
 *   </RadioCard>
 *   <RadioCard value="both">Both</RadioCard>
 * </RadioGroup>
 */

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn('flex flex-col gap-3', className)}
    {...props}
  />
))
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

interface RadioCardProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  icon?: React.ReactNode
  description?: string
  children: React.ReactNode
}

const RadioCard = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioCardProps
>(({ className, icon, description, children, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      'group flex items-start gap-3 w-full bg-white border border-neutral-200 rounded-[8px]',
      'p-4 cursor-pointer transition-all duration-200',
      'hover:border-primary-700',
      'data-[state=checked]:border-primary-700 data-[state=checked]:bg-primary-300',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  >
    <div className="flex items-start gap-2">
      <div className={cn(
        'flex items-center justify-center w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5',
        'border-neutral-200 transition-colors duration-200',
        'group-data-[state=checked]:border-primary-700 group-data-[state=checked]:bg-primary-700'
      )}>
        <div className={cn(
          'w-2 h-2 rounded-full bg-white scale-0 transition-transform duration-200',
          'group-data-[state=checked]:scale-100'
        )} />
      </div>

      <div className="min-w-0 text-left">
        <div className="text-body font-medium text-neutral-800">
          {children}
        </div>
        {description && (
          <div className="text-body-sm text-neutral-500 mt-0.5">
            {description}
          </div>
        )}
      </div>
    </div>

    {icon && (
      <div className="text-neutral-500 group-data-[state=checked]:text-primary-700 flex-shrink-0 ml-auto">
        {icon}
      </div>
    )}
  </RadioGroupPrimitive.Item>
))
RadioCard.displayName = 'RadioCard'

/**
 * RadioGridCard Component
 * 
 * Compact card for grid layouts with icon and label
 * Used for selections like home size, property type, etc.
 * 
 * @example
 * <RadioGroup value={homeSize} onValueChange={setHomeSize} className="grid grid-cols-3 gap-3">
 *   <RadioGridCard value="studio" icon={<Home />}>Studio</RadioGridCard>
 *   <RadioGridCard value="1-bedroom" icon={<Home />}>1 Bedroom</RadioGridCard>
 * </RadioGroup>
 */

interface RadioGridCardProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  icon?: React.ReactNode
  children: React.ReactNode
}

const RadioGridCard = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGridCardProps
>(({ className, icon, children, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      'group flex flex-col items-center justify-center gap-2 p-3 rounded-lg border',
      'bg-white border-neutral-200 cursor-pointer transition-all duration-200 min-h-[88px]',
      'shadow-card hover:shadow-card-hover hover:border-primary-700',
      'data-[state=checked]:border-primary-700 data-[state=checked]:bg-primary-300 data-[state=checked]:shadow-none',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  >
    {/* Icon */}
    {icon && (
      <div className="text-neutral-500 group-data-[state=checked]:text-primary-700 transition-colors">
        {icon}
      </div>
    )}
    
    {/* Label */}
    <span className="text-sm font-medium text-neutral-800">
      {children}
    </span>
  </RadioGroupPrimitive.Item>
))
RadioGridCard.displayName = 'RadioGridCard'

/**
 * RadioListItem Component
 * 
 * Horizontal list-style radio button with icon, label, and optional tag
 * Used for selections like move date, timeline options, etc.
 * 
 * @example
 * <RadioGroup value={moveDate} onValueChange={setMoveDate}>
 *   <RadioListItem value="2-weeks" icon={<Calendar />} tag="Most popular">
 *     Within 2 weeks
 *   </RadioListItem>
 *   <RadioListItem value="1-month" icon={<Calendar />} tag="Save 10%" tagVariant="success">
 *     2-4 weeks
 *   </RadioListItem>
 * </RadioGroup>
 */

interface RadioListItemProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  icon?: React.ReactNode
  tag?: string
  tagVariant?: 'default' | 'success'
  children: React.ReactNode
}

const RadioListItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioListItemProps
>(({ className, icon, tag, tagVariant = 'default', children, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      'group w-full flex items-center justify-between p-4 rounded-lg border',
      'bg-white border-neutral-200 cursor-pointer transition-all duration-200',
      'shadow-card hover:shadow-card-hover hover:border-primary-700',
      'data-[state=checked]:border-primary-700 data-[state=checked]:bg-primary-300 data-[state=checked]:shadow-none',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  >
    {/* Left side: Icon + Label */}
    <div className="flex items-center gap-3">
      {icon && (
        <div className="text-neutral-500 group-data-[state=checked]:text-primary-700 w-4 h-4 flex items-center justify-center">
          {icon}
        </div>
      )}
      <span className="text-sm font-medium text-neutral-800">
        {children}
      </span>
    </div>
    
    {/* Right side: Tag + Check */}
    <div className="flex items-center gap-2">
      {tag && (
        <span className={cn(
          'text-xs px-2 py-0.5 rounded-full font-medium',
          tagVariant === 'success' 
            ? 'bg-feedback-success/10 text-feedback-success'
            : 'bg-secondary-300 text-secondary-700'
        )}>
          {tag}
        </span>
      )}
      <div className={cn(
        'w-4 h-4 flex items-center justify-center',
        'opacity-0 group-data-[state=checked]:opacity-100 transition-opacity'
      )}>
        <Check className="w-4 h-4 text-primary-700" />
      </div>
    </div>
  </RadioGroupPrimitive.Item>
))
RadioListItem.displayName = 'RadioListItem'

export { RadioGroup, RadioCard, RadioGridCard, RadioListItem }
