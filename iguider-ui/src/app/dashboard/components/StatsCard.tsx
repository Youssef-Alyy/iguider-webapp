import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/new-york/ui/avatar"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FontStyleIcon } from "@radix-ui/react-icons"
export  default function StatsCard({ number, description, icon, className }) {
    return (
        <div className={`grid gap-4 grid-flow-col auto-cols-max w-80 h-20 items-center justify-evenly rounded-lg shadow-md border-black border-2 ${className} hover: transform`}>
          <div className="flex items-center justify-center">
                <Avatar className="bg-slate-50">

            <p className="text-xl mt-1 ml-2">
              <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
                  </p>
                </Avatar>
            </div>
            <div className="flex flex-col justify-center item-center border-l-2 border-muted-foreground">
              <p className="text-lg leading-none text-white  ml-3 font-extrabold">{number}</p>
              <p className="text-sm text-white  font-semibold ml-3">{description}</p>
            </div>
        </div>
    )
}