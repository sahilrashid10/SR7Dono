import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex justify-center flex-col gap-4 items-center text-white h-[44vh] px-5 md:px-0 text-xs md:text-base  ">
        <div className="font-bold flex gap-6 md:gap-20 md:text-5xl justify-center items-center text-3xl "><span>SR7<span className="text-orange-600 text-2xl">DONO</span></span></div>
        <p className="text-center md:text-left">
          Hi, I'm Sahil a full stack developer. I built SR7DONO as a crowdfunding platform for creators to fund their projects and ideas.
        </p>
        <p className="text-center md:text-left">
          Feel free to donate and support! Let your community empower you — get your projects funded directly by your fans.
        </p>

        <div>
          <Link href={"/login"}>

            <button type="button" className="text-white bg-gradient-to-br from-orange-600 to-orange-700 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button>
          </Link>

          <Link href="/about">
            <button type="button" className="text-white bg-gradient-to-br from-orange-600 to-orange-700 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
          </Link>

        </div>
      </div>
      <div className="bg-white h-1 opacity-10">
      </div>

      <div className="text-white container mx-auto pb-32 pt-14 px-10">
        <h2 className="text-3xl font-bold text-center mb-14">Your Fans can support you</h2>
        <div className="flex gap-5 justify-around">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/man.gif" alt="" />
            <p className="font-bold text-center">Fans want to help</p>
            <p className="text-center">Your fans are available to support your journey</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/coin.gif" alt="" />
            <p className="font-bold text-center">Fans want to contribute</p>
            <p className="text-center">Your fans are willing to contribute to your success</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/group.gif" alt="" />
            <p className="font-bold text-center">Fans want to collaborate</p>
            <p className="text-center">Your fans are ready to collaborate and grow with you</p>
          </div>
        </div>
      </div>
      <div className="bg-white h-1 opacity-10">
      </div>

      <div className="text-white container mx-auto pb-32 pt-14 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-center mb-14">Learn more about me</h2>
        <div className="w-[90%] h-[40vh] md:w-[50%] md:h-[40vh] lg:w-[50%] lg:h-[40vh] xl:w-[50%] xl:h-[40vh]">
          <div className="flex justify-center items-center gap-6 h-full">
            <a href="https://github.com/sahilrashid10" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <img src="/github.svg" alt="GitHub" className="invert w-20 h-20 hover:scale-110 transition-transform" />
            </a>
            <a href="mailto:sahilrashidganaie@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
              <img src="/gmail.svg" alt="LeetCode" className="invert w-20 h-20 hover:scale-110 transition-transform" />
            </a>
            <a href="https://linkedin.com/in/sahilrashid10" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <img src="/linkedin.svg" alt="LinkedIn" className="w-20 h-20 hover:scale-110 transition-transform" />
            </a>
            <a href="https://x.com/beast55338" target="_blank" rel="noopener noreferrer" aria-label="X">
              <img src="/x.svg" alt="X" className="invert w-20 h-20 hover:scale-110 transition-transform" />
            </a>
          </div>

        </div>

      </div>
    </>
  );
}

