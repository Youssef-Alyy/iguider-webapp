import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"
import {
  faBug,
  faUsers,
  faFile
  
 } from "@fortawesome/free-solid-svg-icons"
export const labels = [
  {
    value: true,
    label: "Verified",
    color: "bg-green-500",
  },
  {
    value: false,
    label: "Unverified",
    color: "bg-red-500",
  },
]

export const activeStatus = [
  {
    value: true,
    label: "Active",
    icon: CheckCircledIcon,
  },
  {
    value: false,
    label: "Inactive",
    icon: CrossCircledIcon,
  },
]

export const verificationStatus = [
  {
    value: true,
    label: "Verified",
    icon: CheckCircledIcon,
  },
  {
    value: false,
    label: "Unverified",
    icon: CrossCircledIcon,
  },
]
export const stats = [
  {
    number: 32,
    description: "Users",
    icon: "👤",
    color: "bg-accent"
  },
  {
    number: 323,
    description: "Reports",
    icon: "📑",
    color: "bg-accent"
  },
  {
    number: 50,
    description: "Errors",
    icon: faBug,
    color: "bg-accent"
  }
]