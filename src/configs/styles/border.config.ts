/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 2:08 PM - 07/08/2024
 * User: lam-nguyen
 **/

type NameRadius = "rounded-1" | "rounded-2" | "rounded-3";

const radius: Record<NameRadius, number> = {
	"rounded-1": 6,
	"rounded-2": 12,
	"rounded-3": 18,
};

export default { radius };
