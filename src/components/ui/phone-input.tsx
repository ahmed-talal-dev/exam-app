"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils/tailwind-merge";

type PhoneInputProps = Omit<
    React.ComponentProps<"input">,
    "onChange" | "value" | "ref"
> &
    Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
        onChange?: (value: RPNInput.Value) => void;
    };

const PhoneInput = React.forwardRef<
    React.ElementRef<typeof RPNInput.default>,
    PhoneInputProps
>(({ className, onChange, value, ...props }, ref) => {
    return (
        <RPNInput.default
            ref={ref}
            className={cn(
                "flex h-11.5 w-86.75 items-center border border-(--gray-200) px-2.5 bg-white",
                className
            )}
            flagComponent={FlagComponent}
            countrySelectComponent={CountrySelect}
            inputComponent={InputComponent}
            smartCaret={false}
            value={value || undefined}
            onChange={(value) =>
                onChange?.(value || ("" as RPNInput.Value))
            }
            {...props}
        />
    );
});

PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<
    HTMLInputElement,
    React.ComponentProps<"input">
>(({ className, ...props }, ref) => (
    <Input
        ref={ref}
        className={cn(
            "ml-3 h-4.5 border-0 bg-transparent p-0 font-mono text-[14px] text-(--gray-400) shadow-none focus-visible:ring-0",
            className
        )}
        {...props}
    />
));

InputComponent.displayName = "InputComponent";

type CountryEntry = {
    label: string;
    value: RPNInput.Country | undefined;
};

type CountrySelectProps = {
    disabled?: boolean;
    value: RPNInput.Country;
    options: CountryEntry[];
    onChange: (country: RPNInput.Country) => void;
};

const CountrySelect = ({
    disabled,
    value: selectedCountry,
    options: countryList,
    onChange,
}: CountrySelectProps) => {
    const scrollAreaRef = React.useRef<HTMLDivElement>(null);
    const [searchValue, setSearchValue] = React.useState("");
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <Popover
            open={isOpen}
            modal
            onOpenChange={(open) => {
                setIsOpen(open);
                open && setSearchValue("");
            }}
        >
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="ghost"
                    disabled={disabled}
                    className="flex h-5.25 w-26.5 items-center gap-2 border-0 bg-transparent p-0 hover:bg-transparent shadow-none"
                >
                    <FlagComponent
                        country={selectedCountry}
                        countryName={selectedCountry}
                    />
                    <span className="font-mono text-[14px] font-medium text-(--gray-950)">
                        {selectedCountry}(+{RPNInput.getCountryCallingCode(selectedCountry)})
                    </span>
                    <ChevronsUpDown className="h-2.5 w-1.5" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-75 p-0">
                <Command>
                    <CommandInput
                        placeholder="Search country..."
                        value={searchValue}
                        onValueChange={(value) => {
                            setSearchValue(value);
                            setTimeout(() => {
                                const viewportElement =
                                    scrollAreaRef.current?.querySelector(
                                        "[data-radix-scroll-area-viewport]"
                                    );

                                if (viewportElement) {
                                    (viewportElement as HTMLElement).scrollTop = 0;
                                }
                            }, 0);
                        }}
                    />

                    <CommandList>
                        <ScrollArea ref={scrollAreaRef} className="h-72">
                            <CommandEmpty>No country found.</CommandEmpty>

                            <CommandGroup>
                                {countryList.map(({ value, label }) =>
                                    value ? (
                                        <CountrySelectOption
                                            key={value}
                                            country={value}
                                            countryName={label}
                                            selectedCountry={selectedCountry}
                                            onChange={onChange}
                                            onSelectComplete={() =>
                                                setIsOpen(false)
                                            }
                                        />
                                    ) : null
                                )}
                            </CommandGroup>
                        </ScrollArea>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

interface CountrySelectOptionProps
    extends RPNInput.FlagProps {
    selectedCountry: RPNInput.Country;
    onChange: (country: RPNInput.Country) => void;
    onSelectComplete: () => void;
}

const CountrySelectOption = ({
    country,
    countryName,
    selectedCountry,
    onChange,
    onSelectComplete,
}: CountrySelectOptionProps) => {
    const handleSelect = () => {
        onChange(country);
        onSelectComplete();
    };

    return (
        <CommandItem className="gap-2" onSelect={handleSelect}>
            <FlagComponent
                country={country}
                countryName={countryName}
            />

            <span className="flex-1 text-sm">
                {countryName}
            </span>

            <span className="text-sm text-foreground/50">
                +{RPNInput.getCountryCallingCode(country)}
            </span>

            <CheckIcon
                className={cn(
                    "ml-auto size-4",
                    country === selectedCountry
                        ? "opacity-100"
                        : "opacity-0"
                )}
            />
        </CommandItem>
    );
};

const FlagComponent = ({
    country,
    countryName,
}: RPNInput.FlagProps) => {
    const Flag = flags[country];

    return (
        <span className="flex h-4 w-5.75 overflow-hidden">
            {Flag && <Flag title={countryName} />}
        </span>
    );
};

export { PhoneInput };