import Image from "next/image";
import getCamp from "@/libs/getCamp";

export default async function CampDetailPage({
  params,
}: {
  params: { cid: string };
}) {
  const campDetail = await getCamp(params.cid);
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 w-[80%] max-w-3xl text-center">
        <h1 className="text-2xl font-semibold text-black mb-5">Camp Details</h1>
        <div className="flex flex-col items-center">
          <Image
            src={campDetail.data.picture}
            alt="Camp Image"
            width={500}
            height={400}
            className="rounded-lg mb-5"
          />
          <div className="text-md text-gray-700 space-y-1">
            <div className="font-bold text-2xl">{campDetail.data.name}</div>
            <div className="text-xl">
              <span className="inline underline font-light font-serif">ที่ตั้ง: </span>{campDetail.data.address}
            </div>
            <div className="text-xl">
              <span className="inline underline font-light font-serif">อำเภอ: </span>{campDetail.data.district}
            </div>
            <div className="text-xl">
              <span className="inline underline font-light font-serif">จังหวัด: </span>{campDetail.data.province}
            </div>
            <div className="text-xl">
              <span className="inline underline font-light font-serif">รหัสไปรษณีย์: </span>{campDetail.data.postalcode}
            </div>
            <div className="text-xl">
              <span className="inline underline font-light font-serif">เบอร์โทรศัพท์: </span><span className="mt-2 font-semibold">{campDetail.data.tel}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}