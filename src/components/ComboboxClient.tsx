"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import Client from "@/types/client"

interface IProps {
    clients: Client[]
    setClient: React.Dispatch<React.SetStateAction<Client>>
}

export default function ComboboxClient({ clients, setClient }: IProps) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="default"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? value
                        : "Selecciona rut cliente..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Busca rut..." />
                    <CommandEmpty>Rut inexistente.</CommandEmpty>
                    <CommandGroup>
                        {clients.map((client) => (
                            <CommandItem
                                key={client.rut}
                                value={client.rut}
                                onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue)
                                    setClient(currentValue === value ? {} as Client : clients.find(client => client.rut == currentValue) as Client)
                                    setOpen(false)
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === client.rut ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {client.rut}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
