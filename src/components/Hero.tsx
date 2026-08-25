import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full bg-light-bg flex flex-col items-center overflow-hidden pb-0">

      {/* Background abstract rings */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] border border-[#06254D] opacity-20 rounded-full" />
        <div className="absolute top-[10%] left-[-20%] w-[800px] h-[800px] border border-[#06254D] opacity-20 rounded-full" />
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] border border-[#06254D] opacity-20 rounded-full" />
        <div className="absolute top-[10%] right-[-20%] w-[800px] h-[800px] border border-[#06254D] opacity-20 rounded-full" />
      </div>

      {/* Container */}
      {/* Container */}
      <div className="max-w-[1360px] w-full mx-auto px-6 xl:px-0 flex flex-col-reverse lg:flex-row items-end lg:items-center justify-between relative z-10">

        {/* Left Content */}
        <div className="w-full lg:w-[55%] flex flex-col mt-8 lg:mt-0 relative z-20 pb-20 lg:pb-32 lg:pr-10">
          <p className="text-2xl md:text-[32px] font-medium text-black mb-4">
            Hello! I'm <span className="font-bold text-deep-blue">Hepsibah Catherine</span>
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-[96px] font-extrabold text-deep-blue leading-[1.1] lg:leading-[110px] mb-8 drop-shadow-sm animate-fade-in-up delay-100 max-w-[900px] tracking-[-0.02em]">
            Multipreneur <br className="hidden lg:block" />& Consultatnt
          </h1>

          <p className="text-xl md:text-[32px] font-medium italic text-text-gray max-w-2xl leading-[1.4] animate-fade-in-up delay-200">
            &ldquo;Building for <span className="text-[#A4715C]">people</span> and planet with<br /> purpose.&rdquo;
          </p>
        </div>

        {/* Right Content / Portrait & Arch */}
        <div className="w-full lg:w-[45%] h-[500px] lg:h-[750px] flex justify-center lg:justify-end relative mt-16 lg:mt-0">

          {/* Arch Background (Frame 254) */}
          <div className="absolute bottom-0 right-[20px] lg:right-[60px] w-[280px] lg:w-[400px] h-[450px] bg-deep-blue rounded-t-full shadow-2xl z-10" />

          {/* Portrait Image (Broken out) */}
          <div className="absolute bottom-0 lg:bottom-0 right-0 lg:right-[-20px] w-[350px] lg:w-[579px] h-[610px] z-20 pointer-events-none">
            <Image
              src="/catherine_portrait.png"
              alt="Hepsibah Catherine"
              fill
              className="object-contain object-bottom"
              priority
              sizes="(max-width: 768px) 350px, (max-width: 1200px) 579px, 579px"
            />
          </div>

        </div>
      </div>


    </section>
  );
}
