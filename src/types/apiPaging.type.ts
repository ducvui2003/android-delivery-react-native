/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 11:45 AM - 05/09/2024
 * User: lam-nguyen
 **/

type ApiPagingType<T> = {
	content: T[];
	current: number;
	size: number;
	totalPage: number;
};

export default ApiPagingType;
