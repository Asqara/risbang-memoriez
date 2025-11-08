"use client";

import { Typewriter } from "react-simple-typewriter";

export default function TypewriterText() {
  return (
    <h1 className="text-3xl md:text-5xl font-bold text-center text-pink-500">
      <Typewriter
        words={[
          "Selamat Datang di Rizgankk Memory Lane 🎉",
          "Ini Merupakan Website Rizgankk Kenang Kenangan dan Pesan buat kita semua 💖",
          "Moment yang Tak Terlupakan 🌟",
        ]}
        loop={0} // 0 = infinite loop
        cursor
        cursorStyle="_"
        typeSpeed={70}
        deleteSpeed={50}
        delaySpeed={1500}
      />
    </h1>
  );
}
