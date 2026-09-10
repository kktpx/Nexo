import { ApplicationStatus, StatusChange } from "@/types/application";
import { nowISO } from "@/lib/utils/date";

/**
 * Creates a StatusChange entry.
 */
export function createStatusChange(
  from: ApplicationStatus | null,
  to: ApplicationStatus
): StatusChange {
  return {
    from,
    to,
    changedAt: nowISO(),
  };
}

/**
 * Validates if a status transition is logically allowed.
 * All transitions are allowed in MVP.
 */
export function isValidTransition(
  _from: ApplicationStatus,
  _to: ApplicationStatus
): boolean {
  return true;
}
