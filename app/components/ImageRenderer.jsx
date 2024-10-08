"use client";

import Image from "next/image";
import Link from "next/link";

export default function ImageRenderer({ memes}) {
    console.log(memes);
    
  return (
    <>
         {memes.memes.map((item) => (
        <div key={item.id} className="max-w-sm w-full sm:w-1/2 lg:w-1/3 p-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
            <Image
              src={item.url}
              alt={`${item.name}'s Meme`}
              width={500}
              height={500}
              className="w-full h-48 object-cover" // Ensure the image covers the area
            />
            <div className="p-4 flex-grow text-center">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h2>
              <Link href={{
                pathname:'singlememe',
                query:item
              }}>
              <button className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-300">
                Create Meme
              </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
