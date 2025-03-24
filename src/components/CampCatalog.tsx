import Link from "next/link";
import Card from "./Card";

export default async function CampCatalog({
  campsJson,
}: {
  campsJson: Promise<CampJson>;
}) {
  const campJsonReady = await campsJson;
  return (
    <>
      Explore {campJsonReady.count} in our catalog
      <div
        className="text-black"
        style={{
          margin: "20px",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignContent: "space-around",
        }}
      >
        {campJsonReady.data.map((campItem: CampItem) => (
          <Link href={`/camp/${campItem.id}`}
          className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%]
          p-2 sm:p-4 md:p-4 lg:p-8">
            <Card campName={campItem.name} imgSrc={campItem.picture} />
          </Link>
        ))}
      </div>
    </>
  );
}