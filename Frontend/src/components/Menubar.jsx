// This is the compoment that displays the menubar of the dashboard page.
// The menubar contains the breadcrumb, vaccine search, and user information sections.

import * as React from "react"
import { Slash } from "lucide-react"
import { GoHome } from "react-icons/go";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const vaccineTypes = [
    { value: "MMR vaccine", label: "MMR vaccine", },
    { value: "Flu vaccine", label: "Flu vaccine", },
    { value: "Meningococcal vaccine", label: "Meningococcal vaccine", },
    { value: "Chickenpox vaccine", label: "Chickenpox vaccine", },
    { value: "Whooping cough vaccine", label: "Whooping cough vaccine", },
]

export default function Menubar({ activeItem }) {

    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    return (
        <div className="p-4 bg-gray-50 border-2 border-white rounded-xl flex items-center justify-between">
            <Breadcrumb>
                <BreadcrumbList  >
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/" className="text-lg"><GoHome /></BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>

                    <BreadcrumbLink href={`/${activeItem.toLowerCase()}`}>
                        {activeItem}
                    </BreadcrumbLink>

                    {/* <BreadcrumbSeparator>
                    <Slash />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                    <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                </BreadcrumbItem> */}

                </BreadcrumbList>
            </Breadcrumb>

            {/* vaccine search section in the middle */}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn(
                            "w-[400px] justify-between text-indigo-900  border-0",
                            !value && "text-gray-500"  // if value is empty, set text color to gray
                        )}
                    >
                        {value
                            ? vaccineTypes.find((vaccineType) => vaccineType.value === value)?.label
                            : "Select vaccine type..."}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0">
                    <Command>
                        <CommandInput placeholder="Search vaccine..." className="h-9" />
                        <CommandList>
                            <CommandEmpty>No vaccine found.</CommandEmpty>
                            <CommandGroup>
                                {vaccineTypes.map((vaccineType) => (
                                    <CommandItem
                                        key={vaccineType.value}
                                        value={vaccineType.value}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue)
                                            setOpen(false)
                                        }}
                                    >
                                        {vaccineType.label}
                                        <Check
                                            className={cn(
                                                "ml-auto",
                                                value === vaccineType.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            {/* avatar and user information section on the right */}
            <div className="flex gap-4">
                <Avatar className="hover:scale-110" >
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="text-sm text-center">Oliver<br></br><span className="text-gray-600">Admin</span></p>
            </div>
        </div>
    )
}