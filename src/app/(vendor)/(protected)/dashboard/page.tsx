import { TrendingDown, TrendingUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { cn } from "~/lib/utils";
import { Chart } from "./Chart";
import OrdersTable from "./OrdersTable";

const Dashboard = async () => {
  return (
    <main className={cn("w-full bg-white")}>
      <div className="px-4 py-6">
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-end">
            <div className="flex-1">
              <h1 className={cn("text-2xl font-semibold md:text-3xl")}>
                Epic Mountain Bike Rental
              </h1>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <div className="w-28">
                <Select value={"today"}>
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className="" value="today">
                      Today
                    </SelectItem>
                    <SelectItem className="" value="week">
                      This week
                    </SelectItem>
                    <SelectItem className="" value="month">
                      This month
                    </SelectItem>
                    <SelectItem className="" value="year">
                      This year
                    </SelectItem>
                    <SelectItem className="" value="all">
                      All
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div
            className={cn("grid gap-4")}
            style={{
              gridTemplateColumns: "repeat(auto-fit,minmax(225px,1fr))",
            }}
          >
            <div className="relative rounded-xl border border-slate-200 p-4 hover:shadow-md">
              <div>
                <p className="mb-2 text-base font-medium text-slate-500">
                  Orders Today
                </p>
                <h1 className="text-3xl font-semibold text-slate-800">5 -</h1>
              </div>
            </div>
            <div className="hover: relative rounded-xl border border-slate-200 p-4 hover:shadow-md">
              <p className="mb-2 text-base font-medium text-slate-500">
                Store Views
              </p>
              <h1 className="mb-2 text-3xl font-semibold text-slate-800">
                50k -
              </h1>
              <div className="relative z-30 flex items-center gap-2 font-medium text-slate-500">
                <TrendingDown size={16} className="text-red-600" />
                <span>12% last week</span>
              </div>
              <div className="chart-container absolute bottom-4 right-0 w-1/2 min-w-36">
                <div className="chart-blur-bottom absolute bottom-0 z-20 h-6 w-full"></div>
                <div className="chart-blur-right absolute right-2 z-20 h-12 w-6"></div>
                <Chart
                  chartColor="hsl(var(--color-2))"
                  chartData={[
                    { date: "2024-01-01", cd: 100 },
                    { date: "2024-01-14", cd: 220 },
                    { date: "2024-01-28", cd: 210 },
                    { date: "2024-02-10", cd: 190 },
                    { date: "2024-02-24", cd: 230 },
                    { date: "2024-03-09", cd: 240 },
                    { date: "2024-03-23", cd: 250 },
                    { date: "2024-04-06", cd: 215 },
                    { date: "2024-04-20", cd: 205 },
                    { date: "2024-05-04", cd: 180 },
                    { date: "2024-05-18", cd: 220 },
                    { date: "2024-06-01", cd: 210 },
                    { date: "2024-06-15", cd: 225 },
                    { date: "2024-06-29", cd: 240 },
                  ]}
                />
              </div>
            </div>
            <div className="chart-wrapper relative rounded-xl border border-slate-200 p-4 hover:shadow-md">
              <p className="mb-2 text-base font-medium text-slate-500">
                Total Revenue
              </p>
              <h1 className="mb-2 text-3xl font-semibold text-slate-800">
                रु 48.5k -
              </h1>
              <div className="relative z-30 flex items-center gap-2 font-medium text-slate-500">
                <TrendingUp size={16} className="text-green-600" />
                <span>12.5% last week</span>
              </div>
              <div className="chart-container absolute bottom-4 right-0 w-1/2 min-w-36">
                <div className="chart-blur-bottom absolute bottom-0 z-20 h-6 w-full"></div>
                <div className="chart-blur-right absolute right-2 z-20 h-12 w-6"></div>
                <Chart
                  chartColor="hsl(var(--color-3))"
                  chartData={[
                    { date: "2024-01-01", cd: 2100 },
                    { date: "2024-01-14", cd: 2250 },
                    { date: "2024-01-28", cd: 2400 },
                    { date: "2024-02-10", cd: 2350 },
                    { date: "2024-02-24", cd: 2500 },
                    { date: "2024-03-09", cd: 2650 },
                    { date: "2024-03-23", cd: 2700 },
                    { date: "2024-04-06", cd: 2550 },
                    { date: "2024-04-20", cd: 2400 },
                    { date: "2024-05-04", cd: 2300 },
                    { date: "2024-05-18", cd: 2450 },
                    { date: "2024-06-01", cd: 2600 },
                    { date: "2024-06-15", cd: 2550 },
                    { date: "2024-06-29", cd: 2700 },
                  ]}
                />
              </div>
            </div>
            <div className="chart-wrapper relative rounded-xl border border-slate-200 p-4 hover:shadow-md">
              <p className="mb-2 text-base font-medium text-slate-500">
                Total Orders
              </p>
              <h1 className="mb-2 text-3xl font-semibold text-slate-800">
                6.2k -
              </h1>
              <div className="relative z-30 flex items-center gap-2 font-medium text-slate-500">
                <TrendingUp size={16} className="text-green-600" />
                <span>32% last week</span>
              </div>
              <div className="chart-container absolute bottom-4 right-0 w-1/2 min-w-36">
                <div className="chart-blur-bottom absolute bottom-0 z-20 h-6 w-full"></div>
                <div className="chart-blur-right absolute right-2 z-20 h-12 w-6"></div>
                <Chart
                  chartColor="hsl(var(--color-4))"
                  chartData={[
                    { date: "2024-01-01", cd: 12500 },
                    { date: "2024-01-14", cd: 13500 },
                    { date: "2024-01-28", cd: 14000 },
                    { date: "2024-02-10", cd: 13800 },
                    { date: "2024-02-24", cd: 14500 },
                    { date: "2024-03-09", cd: 15500 },
                    { date: "2024-03-23", cd: 16000 },
                    { date: "2024-04-06", cd: 15000 },
                    { date: "2024-04-20", cd: 14500 },
                    { date: "2024-05-04", cd: 14000 },
                    { date: "2024-05-18", cd: 15000 },
                    { date: "2024-06-01", cd: 15500 },
                    { date: "2024-06-15", cd: 15800 },
                    { date: "2024-06-29", cd: 16500 },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
        <OrdersTable />
      </div>
    </main>
  );
};

export default Dashboard;
