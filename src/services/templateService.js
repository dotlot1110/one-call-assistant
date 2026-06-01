import { templates } from "./templates";

export function classifyInput(text) {
  const lower = text.toLowerCase();

  if (
    lower.includes("hospital") ||
    lower.includes("clinic") ||
    lower.includes("appointment") ||
    lower.includes("reservation")
  ) {
    return { topic: "Hospital Reservation", templateKey: "hospital" };
  }

  if (
    lower.includes("job") ||
    lower.includes("interview") ||
    lower.includes("application") ||
    lower.includes("part-time")
  ) {
    return { topic: "Job Application", templateKey: "job" };
  }

  if (
    lower.includes("event") ||
    lower.includes("schedule") ||
    lower.includes("location")
  ) {
    return { topic: "Event Inquiry", templateKey: "event" };
  }

  return { topic: "Custom Inquiry", templateKey: "generic" };
}

export function getTemplateItems(templateKey) {
  return templates[templateKey] || templates.generic;
}