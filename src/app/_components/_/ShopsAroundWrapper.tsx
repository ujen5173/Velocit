import { api } from "~/trpc/server";
import ShopsAround from "./ShopsAround";

const ShopsAroundWrapper = async () => {
  const initialData = await api.business.getPopularShops();

  return <ShopsAround initialData={initialData} />;
};

export default ShopsAroundWrapper;
