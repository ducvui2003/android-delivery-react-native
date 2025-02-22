/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 2:35 PM - 13/09/2024
 * User: lam-nguyen
 **/
import CardVisaType from "../../../types/cardVisa.type";

type CardVisaProps = CardVisaType & {
	focusCardNumber?: boolean;
	focusName?: boolean;
	focusExpired?: boolean;
	focusCvv?: boolean;
};

export default CardVisaProps;
