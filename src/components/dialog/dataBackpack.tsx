/* eslint-disable @next/next/no-img-element */
import DialogBackpack from "./backpack";

const DataBackpack = () => {
  // const [foodTabs, setFoodTabs] = useState<Tabs>({
  //   food: { unlocked: false, goods: [] },
  // });

  // const shopInfo = async () => {
  //   const { data } = await request({
  //     url: "/cat/v1/shop/shop/info",
  //     method: "get",
  //   });

  //   console.log(data);
  //   setFoodTabs(data);
  // };
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       shopInfo();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, []);

  return (
    <DialogBackpack
      // tabs={foodTabs}
      trigger={
        <div className="flex flex-col justify-center items-center">
          <img
            className="dw116 h-auto dmb10"
            src="/img/nav/rightBackpack.min.png"
            alt=""
          />
          <div className="bg-[rgba(41,10,68,0.20)] px-5 py-2 rounded-[130px] text-white dtext22 font-[700] leading-none">
            Backpack
          </div>
        </div>
      }
    ></DialogBackpack>
  );
};
export default DataBackpack;
