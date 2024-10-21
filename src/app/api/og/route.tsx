import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export async function GET() {
  // Font
  const kalamFont = fetch(new URL("./Kalam-Bold.ttf", import.meta.url)).then(
    (res) => res.arrayBuffer(),
  );

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div tw="w-full h-full bg-pink-500 flex items-center justify-center px-6">
        <div tw="flex-col items-center gap-4 flex">
          <svg
            width="750"
            height="150"
            viewBox="0 0 958 168"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M286.853 38.536L304.147 0.007231H195.566V157.766H304.147L286.853 120.302H238.383V96.6545H281.575L286.853 59.1973H238.383V38.536H286.853Z"
              fill="#f1f1f1"
            />
            <path
              d="M34 0.421108L76.5 157.766L135.5 156.5L177 0.421108H135.5L104.5 114.5L75 0.421108H34Z"
              fill="#f1f1f1"
            />
            <path
              d="M369.961 3.43323e-05H326.263V157.766H421.004L432.394 120.302H369.961V3.43323e-05Z"
              fill="#f1f1f1"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M516.925 0.842353C456.012 0.842353 445.188 39.3711 445.188 81.7435C445.188 123.902 456.012 162.438 516.925 162.438C577.607 162.438 588.423 123.902 588.423 81.7435C588.423 39.3711 577.831 0.842353 516.925 0.842353ZM489.552 83.2367C489.552 109.199 492.871 125.174 516.925 125.174C540.741 125.174 544.067 109.199 544.067 83.2295C544.067 57.4746 540.741 41.5072 516.925 41.5072C492.871 41.5072 489.552 57.4746 489.552 83.2367Z"
              fill="#f1f1f1"
            />
            <path
              d="M602.81 80.9013C602.817 26.1908 620.914 3.43323e-05 677.403 3.43323e-05C697.705 3.43323e-05 715.794 5.10101 728.172 12.7739L704.776 47.9092C697.271 43.8513 688.212 40.6649 675.422 40.6649C658.2 40.6649 645.838 44.7007 645.838 81.7435L603.159 85.485L602.81 80.9013Z"
              fill="#f1f1f1"
            />
            <path
              d="M793.904 0.385673H750.206V158.152H793.904V0.385673Z"
              fill="#f1f1f1"
            />
            <path
              d="M901.3 0.385673H857.602V158.152H901.3V0.385673Z"
              fill="#f1f1f1"
            />
            <path
              d="M947.454 0.385673H812.043L821.497 35.7717H865.195H938.595L947.454 0.385673Z"
              fill="#f1f1f1"
            />
            <path
              d="M602.81 81.2693C606.07 140.209 625.725 167.003 680.529 163.989C700.225 162.905 717.472 156.445 729.025 147.518L704.237 110.915C697.197 115.687 688.598 119.603 676.189 120.286C659.481 121.205 645.838 114.958 645.838 81.2693L602.81 81.2693Z"
              fill="#f1f1f1"
            />
          </svg>
          <h1 tw="text-4xl font-semibold text-slate-200">
            Get your Rental Ride Now!
          </h1>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Kalam",
          data: await kalamFont,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
