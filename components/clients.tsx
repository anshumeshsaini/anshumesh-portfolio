import Image from "next/image";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { companies, testimonials } from "@/data";

export const Clients = () => {
  return (
    <section id="testimonials" className="py-20">
      <h1 className="heading">
        Kind words from <span className="text-purple">satisfied clients</span>
      </h1>

      <div className="flex flex-col items-center max-lg:mt-10">
        <div className="relative flex h-[50vh] flex-col items-center justify-center overflow-hidden rounded-md antialiased md:h-[30rem]">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>

        {/* Companies */}
        <div className="flex flex-wrap items-center justify-center gap-6 max-lg:mt-10 md:gap-12">
          {companies.map(({ id, img, name }) => (
            <div
              key={id}
              className="flex items-center gap-3 px-5 py-3 bg-white/5 border border-white/10 rounded-lg backdrop-blur-md hover:border-purple-500 transition"
            >
              <Image
                src={img}
                alt={`${name} logo`}
                width={40}
                height={40}
                className="object-contain"
              />

              <span className="text-sm md:text-base font-medium text-gray-300">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};