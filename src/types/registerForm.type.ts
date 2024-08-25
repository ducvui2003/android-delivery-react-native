/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:14 PM - 18/08/2024
 * User: lam-nguyen
 **/
import LoginFormType from "./loginForm.type";

type RegisterFormType = LoginFormType & {
	idToken?: string;
	email: string;
	password: string;
	fullName: string;
};

export default RegisterFormType;
