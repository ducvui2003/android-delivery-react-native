/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 7:30 AM - 11/09/2024
 * User: lam-nguyen
 **/

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

export default spacing;
