import { ChevronDownIcon } from "@radix-ui/react-icons";
import StatsCard from "./StatsCard";
import { Button } from "@/registry/new-york/ui/button";
import { stats } from "../data/data";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/registry/new-york/ui/card";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/registry/new-york/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/registry/new-york/ui/popover";

export function AdminStats() {
	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Analytics</CardTitle>
					<CardDescription>Performance Overview.</CardDescription>
				</CardHeader>
				<CardContent className="flex items-center justify-around">
					{stats.map((stat) => (
						<StatsCard
							number={stat.number}
							description={stat.description}
							icon={stat.icon}
							className={stat.color}
						/>
					))}
				</CardContent>
				<div className="flex justify-center p-5">
					<Button className="w-80 rounded-3xl bg-primary hover:bg-primary-hover">
						View Reports
					</Button>
				</div>
			</Card>
		</>
	);
}
