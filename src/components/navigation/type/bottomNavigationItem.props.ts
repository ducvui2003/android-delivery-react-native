/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:49 PM - 19/08/2024
 * User: lam-nguyen
 **/
import BottomNavigationItemInputProps from "./bottomNavigationItemInput.props";
import BottomNavigationItemType from "./BottomNavigationItem.type";

type BottomNavigationItemProps = BottomNavigationItemInputProps &
	BottomNavigationItemType & {
		index: number;
		status?: boolean;
		onActive: (index: number) => void;
	};

export default BottomNavigationItemProps;
