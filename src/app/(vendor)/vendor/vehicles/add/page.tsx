import { type GetSingleVehicleType } from "~/server/api/routers/vehicle";
import { api } from "~/trpc/server";
import Wrapper from "./wrapper";

const VehicleCreatePage = async ({
  searchParams,
}: {
  searchParams: { edit: string } | undefined;
}) => {
  let data: GetSingleVehicleType = undefined;
  if (searchParams?.edit) {
    data = await api.vehicle.getSingle({ id: searchParams.edit });
  }

  return <Wrapper editData={data} type={searchParams?.edit ? "edit" : "new"} />;
};

export default VehicleCreatePage;
