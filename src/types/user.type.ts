/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 2:54 PM - 13/08/2024
 * User: lam-nguyen
 **/
import { MyLocation } from "../../assets/data/location/location";

export type User = {
	id: number;
	email: string;
	phoneNumber: string;
	fullName: string;
	role: string;
	permissions: string[];
	address: MyLocation;
};

export type ResponseAuthentication = {
	access_token: string;
	user: User;
};
