import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

const joinClasses = (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' ')

function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      className={joinClasses('radio-group', className)}
      {...props}
    />
  )
}

function RadioGroupItem({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      className={joinClasses('radio-group-item', className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="radio-group-indicator">
        <span aria-hidden="true" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
