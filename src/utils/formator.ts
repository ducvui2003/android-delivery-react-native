/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 2:37 PM - 24/08/2024
 * User: lam-nguyen
 **/

const formator = Intl.NumberFormat("vi-VN", {
	style: "currency",
	currency: "VND",
});

const formatHiddenPhoneNumber = (phoneNumber: string) => {
	const length = phoneNumber.length;
	const lengthShow = 3;
	const lengthHidden = length - lengthShow * 2;
	return (
		phoneNumber.slice(0, lengthShow) +
		"*".repeat(length - lengthHidden) +
		phoneNumber.slice(length - lengthShow, length)
	);
};

const formatCurrency = (value: number) => {
	return formator.format(value);
};

export { formatHiddenPhoneNumber, formatCurrency };
