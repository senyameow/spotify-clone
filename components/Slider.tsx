'use client' // можем добавлять или снижать громкость = use client

import '../app/globals.css'

// https://www.radix-ui.com/primitives/docs/components/slider

import * as RadixSlider from '@radix-ui/react-slider'

import React from 'react'

interface SliderProps {
  value?: number;
  onChange?: (value: number | undefined) => void;
}

const Slider = ({value = 1, onChange} : SliderProps) => {

  const handleValue = (newValue: number[]) => {
    onChange?.(newValue[0]) // Cannot invoke an object which is possibly 'undefined' - ?. выручает
  }

  return (
    <form>
      <RadixSlider.Root className="SliderRoot" defaultValue={[1]} max={1} step={0.1} value={[value]} onValueChange={handleValue}>
        <RadixSlider.Track className="SliderTrack">
          <RadixSlider.Range className="SliderRange" />
        </RadixSlider.Track>
        <RadixSlider.Thumb className="SliderThumb" aria-label="Volume" />
      </RadixSlider.Root>
    </form>

  )

}


export default Slider