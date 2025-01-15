/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:39 PM - 13/09/2024
 * User: lam-nguyen
 **/
import { ReactNode } from "react";
import PaymentEnum from "../utils/payment.enum";

type PaymentMethodType = {
	icon: ReactNode;
	type: PaymentEnum;
};

export default PaymentMethodType;
