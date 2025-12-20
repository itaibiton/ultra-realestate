"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import {
  countries,
  popularCountries,
  type Country,
  detectUserCountry,
} from "@/lib/countries";

interface CountrySelectProps {
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  maxSelections?: number;
  placeholder?: string;
  searchPlaceholder?: string;
  showPopular?: boolean;
  autoDetect?: boolean;
  disabled?: boolean;
  className?: string;
}

export function CountrySelect({
  value,
  onChange,
  multiple = false,
  maxSelections = 5,
  placeholder = "Select country",
  searchPlaceholder = "Search countries...",
  showPopular = true,
  autoDetect = false,
  disabled = false,
  className,
}: CountrySelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  // Auto-detect country on mount
  React.useEffect(() => {
    if (autoDetect && !value) {
      detectUserCountry().then((detectedCode) => {
        if (detectedCode) {
          onChange(multiple ? [detectedCode] : detectedCode);
        }
      });
    }
  }, [autoDetect, value, onChange, multiple]);

  // Normalize value to array for internal handling
  const selectedCodes = React.useMemo(() => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  }, [value]);

  // Get selected countries
  const selectedCountries = React.useMemo(() => {
    return selectedCodes
      .map((code) => countries.find((c) => c.code === code))
      .filter(Boolean) as Country[];
  }, [selectedCodes]);

  // Filter countries based on search
  const filteredCountries = React.useMemo(() => {
    if (!search) return countries;
    const searchLower = search.toLowerCase();
    return countries.filter(
      (country) =>
        country.name.toLowerCase().includes(searchLower) ||
        country.native.toLowerCase().includes(searchLower) ||
        country.code.toLowerCase().includes(searchLower)
    );
  }, [search]);

  // Handle selection
  const handleSelect = (code: string) => {
    if (multiple) {
      const newSelection = selectedCodes.includes(code)
        ? selectedCodes.filter((c) => c !== code)
        : selectedCodes.length >= maxSelections
          ? selectedCodes
          : [...selectedCodes, code];
      onChange(newSelection);
    } else {
      onChange(code);
      setOpen(false);
    }
  };

  // Remove a country (for multi-select)
  const handleRemove = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selectedCodes.filter((c) => c !== code));
  };

  // Render trigger content
  const renderTriggerContent = () => {
    if (selectedCountries.length === 0) {
      return <span className="text-muted-foreground">{placeholder}</span>;
    }

    if (multiple) {
      return (
        <div className="flex flex-wrap gap-1">
          {selectedCountries.map((country) => (
            <Badge
              key={country.code}
              variant="secondary"
              className="flex items-center gap-1 px-2 py-0.5"
            >
              <span className="text-base leading-none">{country.emoji}</span>
              <span className="text-xs">{country.name}</span>
              <button
                type="button"
                onClick={(e) => handleRemove(country.code, e)}
                className="ml-0.5 hover:text-destructive focus:outline-none"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      );
    }

    const country = selectedCountries[0];
    return (
      <div className="flex items-center gap-2">
        <span className="text-xl leading-none">{country.emoji}</span>
        <span>{country.name}</span>
      </div>
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "w-full justify-between font-normal",
            selectedCountries.length === 0 && "text-muted-foreground",
            multiple && "h-auto min-h-10 py-2",
            className
          )}
        >
          {renderTriggerContent()}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={searchPlaceholder}
            value={search}
            onValueChange={setSearch}
          />
          <CommandList className="max-h-[300px]">
            <CommandEmpty>No country found.</CommandEmpty>

            {/* Popular countries */}
            {showPopular && !search && (
              <CommandGroup heading="Popular">
                {popularCountries.map((country) => (
                  <CommandItem
                    key={country.code}
                    value={country.code}
                    onSelect={() => handleSelect(country.code)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <span className="text-xl leading-none">{country.emoji}</span>
                    <span className="flex-1">{country.name}</span>
                    {selectedCodes.includes(country.code) && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {/* All countries (or filtered) */}
            <CommandGroup heading={search ? "Search Results" : "All Countries"}>
              {filteredCountries.map((country) => (
                <CommandItem
                  key={country.code}
                  value={country.code}
                  onSelect={() => handleSelect(country.code)}
                  className="flex items-center gap-2 cursor-pointer"
                  disabled={
                    multiple &&
                    selectedCodes.length >= maxSelections &&
                    !selectedCodes.includes(country.code)
                  }
                >
                  <span className="text-xl leading-none">{country.emoji}</span>
                  <span className="flex-1">{country.name}</span>
                  {selectedCodes.includes(country.code) && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>

        {/* Selection count for multi-select */}
        {multiple && (
          <div className="border-t px-3 py-2 text-xs text-muted-foreground">
            {selectedCodes.length} of {maxSelections} selected
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
