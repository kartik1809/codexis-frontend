"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "../../../lib/utils"
import { Button } from "../../ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../ui/popover"

const languages = [
  {
    value: "cpp",
    label: "C++",
  },
  {
    value: "python",
    label: "Python",
  },
  {
    value: "java",
    label: "Java",
  },
  {
    value: "js",
    label: "JavaScript",
  },
  {
    value: "ts",
    label: "TypeScript",
  },
  {
    value: "ruby",
    label: "Ruby",
  },
  {
    value: "go",
    label: "Go",
  },
  {
    value: "rust",
    label: "Rust",
  },
  {
    value: "php",
    label: "PHP",
  },
  {
    value: "swift",
    label: "Swift",
  },
  {
    value: "kotlin",
    label: "Kotlin",
  },
  {
    value: "r",
    label: "R",
  },
  {
    value: "dart",
    label: "Dart",
  },
];


export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] text-white justify-between border-none focus:border-none"
        >
          {value
            ? languages.find((framework) => framework.value === value)?.label
            : "Select Language..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No Language found.</CommandEmpty>
            <CommandGroup>
              {languages.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
