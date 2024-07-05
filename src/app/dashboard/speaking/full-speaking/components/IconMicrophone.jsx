import Image from "next/image";



const IconMicrophone = () => {
  return (
    <>

      <Image
        width={50}
        height={80}
        src={"/images/logo/type/logo_transparent_only.png"}
        alt="Logo"
        priority
        className="rounded-full"
      />
    </>

  );
};

export { IconMicrophone };