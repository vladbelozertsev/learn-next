"use client";

import Image from "next/image";
import { FC } from "react";

type Props = {
  src: string;
  width: number;
  height: number;
  imgTw?: string;
  divTw?: string;
};

export const Img: FC<Props> = (props) => {
  const { height, width } = props;
  return (
    <div className={`${styles.rootDiv} ${props.divTw || ""}`}>
      <Image
        src={props.src}
        alt="img"
        width={width}
        height={height}
        style={{ borderRadius: "15%", height, width }}
        className={`rounded-2xl bg-amber-500 ${props.imgTw}`}
      />
    </div>
  );
};

const styles = {
  rootDiv: "flex items-center bg-red-700 h-full justify-center",
};
