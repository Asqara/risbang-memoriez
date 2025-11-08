"use client";
import React, { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import {
  Heart,
  Star,
  Music,
  MessageCircle,
  Camera,
  Play,
  Gift,
  Home,
  Clock,
  Image,
  Users,
  GamepadIcon,
  Sparkles,
} from "lucide-react";
import TypewriterText from "@/components/TypeWritter";
import Fireworks from "@/components/FireWorks";
import Link from "next/link";

// Types
interface Memory {
  id: string;
  type: "photo" | "video";
  src: string;
  caption: string;
  date: string;
  category: string;
}

interface Message {
  id: string;
  content: string;
  timestamp: string;
  color: string;
}

interface GameAnswer {
  question: string;
  answer: string;
  secretMessage: string;
}

// Dummy Data
const memories: Memory[] = [
  {
    id: "1",
    type: "photo",
    src: "/images/1.png",
    caption: "Welcome to Home Rizgankk 🏠",
    date: "Lupa Tanggal Berapa Seinget Aku Awal' Banget",
    category:
      "Seru banget ini moment pertama kita main ramean full team nongkrong ampe malem wkwkwk ga nyangka ini udah hampiir 1 taun yang lalu 😍",
  },
  {
    id: "2",
    type: "photo",
    src: "/images/2.png",
    caption: "Welcoming Party 🍝",
    date: "Lupa njr tanggal berapa",
    category:
      "Wkwkwkwkwkw ini kocak banget sih make pancing pancingan kayak orang bego",
  },
  {
    id: "4",
    type: "photo",
    src: "/images/nonton.jpg",
    caption: "Rapat Evaluasi",
    date: "Lupa tanggal berapa ini",
    category:
      "Inget banget disini ngerencanain mateng mateng buat proker risves 3 cuan cuan cuan",
  },
  {
    id: "6",
    type: "photo",
    src: "/images/first.jpg",
    caption: "Buat Video Profile Ekse",
    date: "-",
    category:
      "Yayayaya ini no konsep anjr, terus inget banget pas ditayangin pada diem semua",
  },
  {
    id: "7",
    type: "photo",
    src: "/images/day1.jpg",
    caption: "NJR INI DAY 1 RAPAT",
    date: "06 Agustus 2025",
    category: "Ini rapat pertama bareng kakak kakak risbang 60 gasii??",
  },
  {
    id: "5",
    type: "photo",
    src: "/images/lari.jpg",
    caption: "Risbang 100",
    date: "-",
    category:
      "WKWKWK moment hambur hambur duit dan moment setelah selesai ngelingker sampe sore wkwkw",
  },
];

// Components
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
    }> = [];

    const colors = [
      "#FF6B9D",
      "#4ECDC4",
      "#45B7D1",
      "#FFA07A",
      "#98D8C8",
      "#F7DC6F",
    ];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + "60";
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
  );
};

const MemoryCard = ({
  memory,
  onClick,
}: {
  memory: Memory;
  onClick: () => void;
}) => {
  return (
    <div
      className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-rotate-2 hover:shadow-xl"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-2xl shadow-lg bg-white p-2">
        {memory.type === "photo" ? (
          <img
            src={memory.src}
            alt={memory.caption}
            className="w-full h-48 object-cover rounded-xl transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="relative">
            <video
              src={memory.src}
              className="w-full h-48 object-cover rounded-xl"
              muted
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-xl">
              <Play className="w-12 h-12 text-white opacity-80" />
            </div>
          </div>
        )}

        <div className="p-3">
          <p className="text-[15px] font-bold text-gray-800 mb-1">
            {memory.caption}
          </p>
          <p className="text-xs text-gray-500">{memory.date}</p>
        </div>

        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          {memory.type === "photo" ? (
            <Camera className="w-5 h-5 text-white drop-shadow-lg" />
          ) : (
            <Play className="w-5 h-5 text-white drop-shadow-lg" />
          )}
        </div>
      </div>
    </div>
  );
};

const StickyNote = ({
  message,
  onRemove,
}: {
  message: Message;
  onRemove?: () => void;
}) => {
  return (
    <div
      className={`${message.color} p-4 rounded-lg shadow-lg transform rotate-1 hover:rotate-0 transition-all duration-300 hover:scale-105 cursor-pointer relative animate-fade-in-up`}
      style={{ animationDelay: Math.random() * 0.5 + "s" }}
    >
      <div className="absolute top-2 left-2 w-4 h-4 bg-yellow-400 rounded-full shadow-sm"></div>
      <p className="text-gray-800 font-handwriting text-sm pt-2">
        {message.content}
      </p>
      <div className="text-xs text-gray-600 mt-2 text-right">- Rizgankk</div>
    </div>
  );
};

// Main App Component
const MemoryLaneApp = () => {
  const [currentPage, setCurrentPage] = useState<string>("landing");
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameAnswers, setGameAnswers] = useState<{ [key: number]: string }>({});
  const [unlockedSecrets, setUnlockedSecrets] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  // Ambil pesan awal + aktifkan realtime
  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error(error);
      else setMessages(data as Message[]);
    };

    fetchMessages();

    // Listen pesan baru (INSERT)
    const channel = supabase
      .channel("messages-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((prev) => [payload.new as Message, ...prev]);
        }
      )
      .subscribe();

    // Bersihkan listener saat komponen unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  // Kirim pesan ke Supabase
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const colors = [
      "bg-pink-200",
      "bg-yellow-200",
      "bg-blue-200",
      "bg-green-200",
      "bg-purple-200",
      "bg-orange-200",
    ];

    const color = colors[Math.floor(Math.random() * colors.length)];

    const { error } = await supabase
      .from("messages")
      .insert([{ content: newMessage, color }]);

    if (!error) {
      setNewMessage("");
    }
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  // Navigation
  const navItems = [
    { id: "landing", icon: Home, label: "Home" },
    { id: "timeline", icon: Clock, label: "Memories Rizgankk" },
    { id: "messages", icon: MessageCircle, label: "Buat Rizgankk" },
    { id: "guestbook", icon: Users, label: "Menfess" },
    { id: "closing", icon: Sparkles, label: "Penutup" },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case "landing":
        return (
          <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <ParticleBackground />
            <div className="text-center z-10 px-6">
              <div className="mb-8">
                <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-4">
                  Rizgankk Memory Lane
                </h1>
                <div className="text-xl md:text-2xl text-gray-700 font-light">
                  <TypewriterText />
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setCurrentPage("timeline")}
                  className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Mulai Perjalanan 🚀
                </button>
              </div>
            </div>
          </div>
        );

      case "timeline":
        return (
          <div className="min-h-screen py-20 px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-xl md:text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Kenangan Singkat Moment Moment Kita Sebenernya Ada Banyak Yang
                Mau Request Req Ke Wa Gw ya Nanti Gw Up Kesini
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {memories.map((memory) => (
                  <MemoryCard
                    key={memory.id}
                    memory={memory}
                    onClick={() => setSelectedMemory(memory)}
                  />
                ))}
              </div>
              <div className="mt-20 flex flex-col justify-center px-4">
                <Link
                  href="https://drive.google.com/drive/folders/1ExlpRMrOd-l9a8DzFmk1obYaL_3QpS0K" // ganti dengan link Google Drive kamu
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-center mb-12
                   bg-gradient-to-r from-purple-600 to-blue-600
                   bg-clip-text text-transparent
                   hover:opacity-80 transition-all duration-300
                   text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                >
                  Buka Kenangan Kita Full Memories Disini
                </Link>
                <Link
                  href="https://drive.google.com/drive/folders/1nYIdYzNax36J4PmmRos0zPm1Zs0GklwE" // ganti dengan link Google Drive kamu
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-center mb-12
                   bg-gradient-to-r from-red-600 to-blue-600
                   bg-clip-text text-transparent
                   hover:opacity-80 transition-all duration-300
                   text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                >
                  Atau Disini
                </Link>
              </div>
            </div>
          </div>
        );

      case "messages":
        return (
          <div className="min-h-screen py-20 px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
                Pesan Aku Untuk Kalian
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <div className="lg:col-span-2 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    Untuk Rizgankk
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Makasih ya temen temen udah mau membersamai selama ini, aku
                    tau pasti diantara kalian ada dongkol kesel sama kita para
                    kapten, semangat buat pelayaran selanjutnya kalian!
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Terima kasih sudah menjadi cerita dalam perjalanan kuliah
                    yang singkat ini jangan lupa nanti kalau udah sukses info
                    loker yak!!
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6 shadow-lg">
                  <h4 className="text-xl font-bold mb-4 text-gray-800">
                    Harapan Aku Buat Kalian -
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>Jangan Suka Ngomongin Orang</li>
                    <li>Jangan Suka Telat</li>
                    <li>Agendakan Nge Vila yakk</li>
                    <li className="font-bold">
                      Terpenting, Jangan lupa Rizgankk dan Jangan Asing!!!
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
                  Kata Kata Dari Gw
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <blockquote className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl italic text-gray-700">
                    "Keluarga bukan tentang darah, tapi tentang cinta yang
                    mengalir di antara kita."
                  </blockquote>
                  <blockquote className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl italic text-gray-700">
                    "Jangan Takut Mencoba, Kalau kalian mencoba peluang kalian
                    akan diantara 0-1 dan jika kalian tidak mencoba peluang
                    kalian akan tetap 0"
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        );

      case "guestbook":
        return (
          <div className="min-h-screen py-20 px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">
                Kata kata dong buat Rizgankk dan aku
              </h2>

              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  Hayoo mau ngasih kata kata apaa??
                </h3>
                <div className="flex flex-col gap-4">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Tuliskan pesan kamu di sini..."
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none resize-none"
                    rows={4}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="self-start bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Kirim Pesan 💌
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {messages.map((message) => (
                  <StickyNote key={message.id} message={message} />
                ))}
              </div>
            </div>
          </div>
        );

      case "closing":
        return (
          <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {showConfetti && (
              <div className="fixed inset-0 pointer-events-none z-50">
                <Fireworks duration={5} />
              </div>
            )}

            <div className="text-center px-6 z-10">
              <div className="mb-12">
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-6">
                  Terima Kasih Rizgankk!
                </h1>
                <div className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                  Website ini ya aku buat h- berapa jam jadi wajar kalau jelek
                  dan full gpt wkwkwk semoga suka deh jujur disini gw bingung
                  mau ngasih apa lagi bokek
                </div>
              </div>

              <div className="bg-white bg-opacity-90 rounded-2xl shadow-xl p-8 max-w-2xl mx-auto mb-8">
                <p className="text-lg text-gray-800 mb-6 leading-relaxed">
                  "Keluarga adalah tempat di mana hidup dimulai dan cinta tidak
                  pernah berakhir. Kalian adalah keluarga kami, dan cinta kami
                  untuk kalian akan abadi selamanya."
                </p>
                <p className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
                  - GPT 2025
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={triggerConfetti}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mb-4"
                >
                  Rayakan Pertemuan Kita! 🎉
                </button>

                <button
                  onClick={() => setCurrentPage("landing")}
                  className="block mx-auto bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Kembali ke Awal 🏠
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative">
      {/* Background Music Indicator */}
      {isPlaying && (
        <div className="fixed top-4 right-4 z-50 bg-white bg-opacity-90 rounded-full p-3 shadow-lg">
          <Music className="w-6 h-6 text-green-500 animate-pulse" />
        </div>
      )}

      {/* Navigation Bar */}
      {currentPage !== "landing" && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-95 backdrop-blur-sm border-t border-gray-200 z-40">
          <div className="flex justify-around items-center py-2 px-4 max-w-4xl mx-auto">
            {navItems.slice(0, 4).map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`flex flex-col items-center p-2 rounded-lg transition-all duration-300 ${
                  currentPage === item.id
                    ? "bg-purple-100 text-purple-600 transform scale-110"
                    : "text-gray-600 hover:text-purple-600 hover:bg-gray-100"
                }`}
              >
                <item.icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>
          <div className="flex justify-around items-center py-2 px-4 max-w-4xl mx-auto border-t border-gray-100">
            {navItems.slice(4).map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`flex flex-col items-center p-2 rounded-lg transition-all duration-300 ${
                  currentPage === item.id
                    ? "bg-purple-100 text-purple-600 transform scale-110"
                    : "text-gray-600 hover:text-purple-600 hover:bg-gray-100"
                }`}
              >
                <item.icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className={currentPage !== "landing" ? "pb-32" : ""}>
        {renderPage()}
      </main>

      {/* Memory Detail Modal */}
      {selectedMemory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-4 right-4 z-10 bg-white bg-opacity-90 rounded-full p-2 shadow-lg hover:shadow-xl transition-all"
              >
                ✕
              </button>

              {selectedMemory.type === "photo" ? (
                <img
                  src={selectedMemory.src}
                  alt={selectedMemory.caption}
                  className="w-full h-64 md:h-96 object-cover rounded-t-2xl"
                />
              ) : (
                <video
                  src={selectedMemory.src}
                  controls
                  className="w-full h-64 md:h-96 object-cover rounded-t-2xl"
                />
              )}

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {selectedMemory.caption}
                </h3>
                <p className="text-gray-600 mb-4">{selectedMemory.date}</p>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-700 leading-relaxed">
                    {selectedMemory.category}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        .font-handwriting {
          font-family: "Comic Sans MS", cursive, sans-serif;
        }

        .masonry-layout {
          column-gap: 1rem;
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px) rotate(3deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotate(1deg);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        @media (max-width: 768px) {
          .masonry-layout {
            columns: 1;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .masonry-layout {
            columns: 2;
          }
        }

        @media (min-width: 1025px) {
          .masonry-layout {
            columns: 3;
          }
        }
      `}</style>
    </div>
  );
};

export default MemoryLaneApp;
