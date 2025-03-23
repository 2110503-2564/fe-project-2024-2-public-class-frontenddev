import Image from "next/image";
import getCamp from "@/libs/getCamp";

export default async function CampDetailPage({
  params,
}: {
  params: { cid: string };
}) {
  const campDetail = await getCamp(params.cid);
  return (
    <main>
      <h1 className="text-large font-medium text-black content-center ">
        <div className="flex flex-row my-5">
          <Image
            src={campDetail.data.picture}
            alt="Card Image"
            width={0}
            height={0}
            sizes="100vw"
            className="rounded-lg w-[30%]"
          ></Image>
          <div>
            <div className="text-md mx-5">{campDetail.data.name}</div>
            <div className="text-md mx-5">{campDetail.data.address}</div>
            <div className="text-md mx-5">{campDetail.data.district}</div>
            <div className="text-md mx-5">{campDetail.data.province}</div>
            <div className="text-md mx-5">{campDetail.data.postalcode}</div>
            <div className="text-md mx-5">{campDetail.data.tel}</div>
          </div>
        </div>
      </h1>
    </main>
  );
}