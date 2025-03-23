import styles from "./card.module.css";
import Image from "next/image";
import InteractiveCard from "./InteractiveCard";
import Rating from "@mui/material/Rating";
import React from "react";

export default function Card({
  campName,
  imgSrc,
  rating,
  onRatingChange,
}: {
  campName: string;
  imgSrc: string;
  rating?: number;
  onRatingChange?: Function;
}) {
  const ratingId = `${campName} Rating`;

  return (
    <InteractiveCard contentName={campName}>
      <div className="w-full h-[70%] relative rounded-t-lg">
        <Image
          src={imgSrc}
          alt="Product Picture"
          fill={true}
          className="object-cover rounded-t-lg"
        />
      </div>
      <div className="w-full h-[30%] p-[10px] text-pink-500">{campName}</div>
      <div>
      {onRatingChange ? (
        <Rating
          name={ratingId}
          id={ratingId}
          data-testid={ratingId}
          value={rating}
          onClick={(event) => {
            event.stopPropagation();
          }}
          onChange={(event, newValue) => {
            event.stopPropagation();
            onRatingChange(campName, newValue);
          }}
        />
      ) : (
        ""
      )}
      </div>
    </InteractiveCard>
  );
}
