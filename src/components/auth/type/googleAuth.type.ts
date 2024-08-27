/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:50 AM - 16/08/2024
 * User: lam-nguyen
 **/

type ButtonAuthProps = {
	loginSuccess?: (email: string) => void; //để tạm
	errorLogin?: () => void;
	loginFail?: () => void;
	logoutSuccess?: () => void;
	email?: string | undefined; //để tạm
};

export default ButtonAuthProps;
