import type { Profile } from "./types";

const ACTOR_ID = "apify~instagram-profile-scraper";

// fetches profiles based on usernames from the web
export async function fetchProfiles(usernames: string[]) {
  const res = await fetch(
    `https://api.apify.com/v2/acts/${ACTOR_ID}` +
      `/run-sync-get-dataset-items?token=${process.env.APIFY_TOKEN}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usernames }),
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Apify request failed (${res.status}): ${errorText}`);
  }

  const data = await res.json();
  return data;
}

// extracts username from profile url
function extractUsername(profileUrl: string): string {
  try {
    const url = new URL(profileUrl);
    const lastSegment = url.pathname.split("/").filter(Boolean).pop();
    return lastSegment ? lastSegment.replace(/^@/, "") : profileUrl.replace(/^@/, "");
  } catch {
    return profileUrl.replace(/^@/, "");
  }
}

// fetches profile info from urls that were inputted using the json
export async function fetchProfilesFromUrls(profileUrls: string[]): Promise<Profile[]> {
  const usernames = profileUrls.map(extractUsername).filter(Boolean);
  if (usernames.length === 0) {
    return [];
  }

  const data = await fetchProfiles(usernames);
  return Array.isArray(data)
    ? data.map((item) => ({
        username: item.username,
        fullName: item.fullName,
        profilePicUrl: item.profilePicUrl,
      }))
    : [];
}
