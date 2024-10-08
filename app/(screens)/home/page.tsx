import ImageRenderer from "@/app/components/ImageRenderer";
// import { AcademicCapIcon } from "@heroicons/react/solid";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default async function MainPage() {
  const dt = await fetch("https://api.imgflip.com/get_memes", {
    cache: "no-store",
  });
  const respon = await dt.json();

  return (
    <>
      <h1 className="text-4xl font-bold text-center my-8">
        Memes Galore: Unleash Your Laughter! 😂
      </h1>
      <h2 className="text-2xl text-center my-4">My First Next.js Project 🎉</h2>
      
      {/* LinkedIn and GitHub Icons */}
      <div className="flex justify-center space-x-6 my-4">
        {/* LinkedIn Icon */}
        <a
          href="https://www.linkedin.com/in/huzaifa-ahmed-%E2%99%BE%EF%B8%8F-28616324a/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 text-3xl"
        >
          <FaLinkedin />
        </a>

        {/* GitHub Icon */}
        <a
          href="https://github.com/Huzaifa829"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-800 hover:text-gray-600 text-3xl"
        >
          <FaGithub />
        </a>
      </div>

      <div className="flex flex-wrap justify-center">
        {respon.data.memes && <ImageRenderer memes={respon.data} />}
      </div>
    </>
  );
}
