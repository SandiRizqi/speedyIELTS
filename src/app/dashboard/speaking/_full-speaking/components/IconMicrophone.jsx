import Image from "next/image";



const IconMicrophone = () => {
  return (
    <>

      <Image
        width={90}
        height={90}
        src={"/images/logo/type/logo_round.png"}
        alt="Logo"
        priority
        className="rounded-full"
      />
    </>

  );
};

export { IconMicrophone };