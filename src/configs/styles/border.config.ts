/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 2:08 PM - 07/08/2024
 * User: lam-nguyen
 **/

type NameRadius = "rounded-1" | "rounded-2" | "rounded-3";
type NameSpacing =
	| "spaced-1"
	| "spaced-2"
	| "spaced-3"
	| "spaced-4"
	| "spaced-5"
	| "spaced-6"
	| "spaced-7"
	| "spaced-8"
	| "spaced-9";

const radius: Record<NameRadius, number> = {
	"rounded-1": 6,
	"rounded-2": 12,
	"rounded-3": 18,
};

const spacing: Record<NameSpacing, number> = {
	"spaced-1": 4,
	"spaced-2": 8,
	"spaced-3": 12,
	"spaced-4": 16,
	"spaced-5": 24,
	"spaced-6": 32,
	"spaced-7": 40,
	"spaced-8": 48,
	"spaced-9": 56,
};

export { spacing, radius };
