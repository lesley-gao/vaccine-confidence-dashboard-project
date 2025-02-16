/**
 * This component allows the user to select a vaccine type from a list of available options.
 * It is displayed on the dashboard page.
 */
import * as React from "react"
import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useVaccine } from "@/hooks/useVaccine";

export default function VaccineSelection({ selectedVaccine, setSelectedVaccine }) {
    const [open, setOpen] = useState(false)
    const {vaccineTypes, isLoading, error } = useVaccine();

    return (
        <div className="flex items-center gap-4">
            <div className=" font-semibold max-sm:text-sm md:text-lg">
                <p>Choose Vaccine Type :</p>
            </div>

            <div>
                {isLoading ? (
                    <div className="text-gray-500">Loading vaccines...</div>
                ) : error ? (
                    <div className="text-red-500">Error: {error}</div>
                ) : (
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className={cn(
                                    "w-[300px] justify-between text-indigo-900 border-0 max-sm:w-[180px] h-10 dark:text-slate-800 dark:bg-white",
                                    !selectedVaccine && "text-gray-500"
                                )}
                            >
                                {selectedVaccine?.vaccineType || "Choose vaccine type..."}
                                <ChevronsUpDown className="opacity-50" />
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-[300px] p-0 max-sm:w-[180px]">
                            <Command>
                                <CommandInput placeholder="Search vaccine..." className="h-12" />
                                <CommandList>
                                    <CommandEmpty>No vaccine found.</CommandEmpty>
                                    <CommandGroup>
                                        {vaccineTypes.map((vaccine) => (
                                            <CommandItem
                                                key={vaccine.vaccineId}
                                                value={vaccine.vaccineType}
                                                onSelect={() => {
                                                    setSelectedVaccine(vaccine)
                                                    setOpen(false)
                                                }}
                                            >
                                                {vaccine.vaccineType}
                                                <Check
                                                    className={cn(
                                                        "ml-auto",
                                                        selectedVaccine?.vaccineType === vaccine.vaccineType ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                )}
            </div>
        </div>
    )
}