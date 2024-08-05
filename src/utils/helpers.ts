export const urlRegexString = 'https:\/\/www.withgarage.com\/listing\/.*[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}';

// returns the UUID from the end of a URL
export function parseUUID (string: string) {
    return string.slice(string.length - 36);
};

// returns true or false depending on if the supplied string is a valid Garage listing URL:
// https://www.withgarage.com/listing/2003-EOne-Typhoon-1250-GPM-b3b9b28c-be0a-46f9-8a93-d0f96917aca6
export function isValidURL (string: string) {
    const matches = string.match(urlRegexString);
    return (matches === null ? false : true);
};
