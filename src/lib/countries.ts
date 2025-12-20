import { countries as countriesData } from "countries-list";

export interface Country {
  code: string;
  name: string;
  native: string;
  emoji: string;
  currency: string[];
  languages: string[];
  continent: string;
}

// Convert country code to emoji flag
function countryCodeToEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

// Convert countries-list data to our format
const countriesArray: Country[] = Object.entries(countriesData).map(
  ([code, data]) => ({
    code,
    name: data.name,
    native: data.native,
    emoji: countryCodeToEmoji(code),
    currency: data.currency,
    languages: data.languages,
    continent: data.continent,
  })
);

// Sort alphabetically by name
export const countries = countriesArray.sort((a, b) =>
  a.name.localeCompare(b.name)
);

// Popular countries for quick access (real estate investment hotspots)
export const popularCountries = [
  "US", // United States
  "IL", // Israel
  "AE", // United Arab Emirates
  "GB", // United Kingdom
  "DE", // Germany
  "ES", // Spain
  "PT", // Portugal
  "GR", // Greece
  "CY", // Cyprus
  "FR", // France
].map((code) => countries.find((c) => c.code === code)!).filter(Boolean);

// Get country by code
export function getCountryByCode(code: string): Country | undefined {
  return countries.find((c) => c.code === code);
}

// Get default currency for a country
export function getCountryCurrency(code: string): string {
  const country = getCountryByCode(code);
  if (!country || !country.currency.length) return "USD";
  return country.currency[0];
}

// Currency symbol mapping
export const currencySymbols: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  ILS: "₪",
  AED: "د.إ",
  JPY: "¥",
  CNY: "¥",
  INR: "₹",
  AUD: "A$",
  CAD: "C$",
  CHF: "CHF",
  BRL: "R$",
  MXN: "$",
};

// Get currency symbol
export function getCurrencySymbol(currency: string): string {
  return currencySymbols[currency] || currency;
}

// Detect user's country from browser
export async function detectUserCountry(): Promise<string | null> {
  try {
    // Try to get from browser's language/locale first
    const locale = navigator.language || navigator.languages?.[0];
    if (locale) {
      const parts = locale.split("-");
      if (parts.length > 1) {
        const countryCode = parts[parts.length - 1].toUpperCase();
        if (getCountryByCode(countryCode)) {
          return countryCode;
        }
      }
    }

    // Fallback to IP-based detection using free API
    const response = await fetch("https://ipapi.co/json/", {
      signal: AbortSignal.timeout(3000),
    });
    if (response.ok) {
      const data = await response.json();
      if (data.country_code && getCountryByCode(data.country_code)) {
        return data.country_code;
      }
    }
  } catch {
    // Silently fail and return null
  }
  return null;
}
