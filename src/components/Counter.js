import React, { useEffect, useRef, useState } from "react";

const useCounter = (endValue, duration = 1000) => {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = document.getElementById(`counter-${endValue}`);
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;

          let start = 0;
          const increment = endValue / (duration / 16);

          const timer = setInterval(() => {
            start += increment;
            if (start >= endValue) {
              start = endValue;
              clearInterval(timer);
            }
            setValue(Math.floor(start));
          }, 16);
        }
      },
      { threshold: 0.7 } // triggers when 70% of the element is visible
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [endValue, duration]);

  return value;
};

export default function Counter({ value, label, Icon }) {
  const count = useCounter(value);

  return (
    <div
      id={`counter-${value}`}
      className="p-8 bg-[#0F0E47]/5 rounded-xl border text-center shadow"
    >
      <div className="w-14 h-14 mx-auto rounded-xl bg-[#0F0E47]/10 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-[#0F0E47]" />
      </div>

      <h3 className="text-3xl font-extrabold">{count}+</h3>

      <p className="text-[#0F0E47]/60 mt-1">{label}</p>
    </div>
  );
}
