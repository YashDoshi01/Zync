import { Button } from "@heroui/button";
import { Gamepad2, Headphones, Users, MessageCircle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Hero Section with Background */}
      <div className="relative w-full px-6 lg:px-12 py-24 flex flex-col items-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center blur-sm brightness-75"
          style={{
            backgroundImage: "url('/herobg.png')", // Replace with your path
          }}
        />

        {/* Overlay to darken image */}
        <div className="absolute inset-0 z-0 bg-black/50" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl w-full grid lg:grid-cols-2 gap-8 lg:gap-16 items-center text-white">
          <div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
              GROUP CHAT <br />
              <span className="text-[#5865F2]">THAT&apos;S ALL FUN & GAMES</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-300">
              Zync is great for playing games and chilling with friends, or even
              building a worldwide community. Customize your own space to talk,
              play, and hang out.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button className="bg-[#5865F2] text-white hover:bg-[#4752C4]">
                <MessageCircle className="mr-2 h-5 w-5" />
                Start Chatting
              </Button>
            </div>
          </div>
          <div className="hidden lg:block" />
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-32 w-full px-6 max-w-7xl mx-auto grid place-items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <FeatureCard
            className="p-6 sm:p-8 text-lg shadow-2xl backdrop-blur-md bg-[#1f1f1f]/80 border border-white/10"
            icon={<Gamepad2 className="h-10 w-10 text-[#5865F2]" />}
            title="Gaming Together"
            description="Low-latency voice and video feels like you&apos;re in the same room"
          />
          <FeatureCard
            className="p-6 sm:p-8 text-lg shadow-2xl backdrop-blur-md bg-[#1f1f1f]/80 border border-white/10"
            icon={<Headphones className="h-10 w-10 text-[#5865F2]" />}
            title="Crystal Clear Voice"
            description="No more robot voices or choppy audio"
          />
          <FeatureCard
            className="p-6 sm:p-8 text-lg shadow-2xl backdrop-blur-md bg-[#1f1f1f]/80 border border-white/10"
            icon={<Users className="h-10 w-10 text-[#5865F2]" />}
            title="Community First"
            description="Create your perfect space for your team or friends"
          />
          <FeatureCard
            className="p-6 sm:p-8 text-lg shadow-2xl backdrop-blur-md bg-[#1f1f1f]/80 border border-white/10"
            icon={<MessageCircle className="h-10 w-10 text-[#5865F2]" />}
            title="Chat Channels"
            description="Organized text channels for all your topics"
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={`bg-[#2F3136]/40 p-6 rounded-xl border border-[#40444B]/30 hover:bg-[#34373C]/60 transition-colors backdrop-blur-lg ${className}`}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  );
}
