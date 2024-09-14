import {green, neutral, primary} from "../../../configs/colors/color-template.config";

type StatusType = "Active" | "Completed" | "Cancelled"
type StatusProps = {
	title: StatusType,
	color: string
}
type StatusLabelProps = Record<StatusType, StatusProps>
const statusLabel: StatusLabelProps = {
	Active: {
		title: "Active",
		color: primary.getColor("500")
	},
	Completed: {
		title: "Completed",
		color: green.getColor("500")
	},
	Cancelled: {
		title: "Cancelled",
		color: neutral.getColor("500")
	}
}
export default StatusLabelProps
export {StatusType, statusLabel, StatusProps}