import Image from "next/image";

function Banner() {
  return (
    <div className="mx-auto mt-8 w-full">
      <Image
        className="w-full"
        src="/banner.webp"
        alt="Banner"
        width={1200}
        height={400}
      />
    </div>
  );
}

export default Banner;
