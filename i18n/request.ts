import { routing } from "@/i18n/routing";
import { getRequestConfig } from "next-intl/server";

/**
 * Immutable deep merge to prevent mutation of the base (fallback) messages.
 * * NOTE: Using 'any' here as translation messages are dynamic nested objects
 * from JSON, and complex recursive typing would over-engineer this utility.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepMerge(target: any, source: any): any {
  const output = { ...target };

  for (const key in source) {
    if (source[key] instanceof Object && key in target) {
      output[key] = deepMerge(target[key], source[key]);
    } else {
      output[key] = source[key];
    }
  }
  return output;
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (
    !locale ||
    !routing.locales.includes(locale as (typeof routing.locales)[number])
  ) {
    locale = routing.defaultLocale;
  }

  // Load default (fallback) and current locale messages
  const baseMessages = (
    await import(`../messages/${routing.defaultLocale}.json`)
  ).default;
  const localeMessages = (await import(`../messages/${locale}.json`)).default;

  return {
    locale,
    messages: deepMerge(baseMessages, localeMessages),
  };
});
