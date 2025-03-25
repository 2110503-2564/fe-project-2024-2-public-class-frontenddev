import CardPanel from "@/components/CardPanel";
import CampCatalog from "@/components/CampCatalog";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import getCamps from "@/libs/getCamps";

export default function Camp() {
  const camps = getCamps();

  return (
    <main className="text-center p-5">
      <h1 className="text-xl font-medium text-black">Select Your Camp</h1>
      <Suspense
        fallback={
          <p className="text-black">
            Loading... <LinearProgress />
          </p>
        }
      >
        <CampCatalog campsJson={camps} />
      </Suspense>
    </main>
  );
}