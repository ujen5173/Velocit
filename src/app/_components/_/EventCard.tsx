import { Calendar, Dot, IndianRupee, MapPin, Users } from "lucide-react";
import Image from "next/image";
import { type EventSlide } from "./UpcomingEvent";

type Props = {
  event: EventSlide;
};

const EventCard = ({ event }: Props) => {
  return (
    <div>
      <div className="relative">
        <Image
          width={800}
          height={800}
          className="pointer-events-none aspect-[4/3] h-full rounded-md object-cover"
          src={event.thumbnail}
          alt={`${event.thumbnail}, ${event.meetinglocation}`}
        />
      </div>

      <div className="">
        <h1 className="mb-2 line-clamp-1 text-lg font-medium text-slate-800">
          {event.title}
        </h1>

        <div className="mb-4 flex items-center">
          <div className="flex items-center gap-1">
            <Calendar size={18} className="text-slate-600" />
            <span className="text-sm text-foreground">{event.date}</span>
          </div>
          <Dot size={20} className="text-slate-600" />
          <div className="flex items-center gap-1">
            <MapPin size={18} className="text-slate-600" />
            <span className="line-clamp-1 text-sm text-foreground">
              {event.meetinglocation}
            </span>
          </div>
        </div>

        <div className="mb-4 flex items-center">
          <div className="flex items-center gap-1">
            <Users size={18} className="text-slate-600" />
            <span className="text-sm text-foreground">
              {event.participants}
            </span>
          </div>
          <Dot size={20} className="text-slate-600" />
          <div className="flex items-center gap-1">
            <IndianRupee size={18} className="text-slate-600" />

            <span className="text-sm text-foreground">{event.entryFee}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
