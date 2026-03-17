import { motion } from "motion/react";
import { Clock, Tag } from "lucide-react";

interface ServiceProps {
  key?: string | number;
  name: string;
  price: string;
  duration: string;
  category: string;
}

export const ServiceCard = ({ name, price, duration, category }: ServiceProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-dark p-6 rounded-2xl flex flex-col h-full group transition-all duration-300 hover:border-gold/30"
    >
      <div className="mb-4">
        <span className="text-[10px] uppercase tracking-widest text-gold/60 font-bold px-2 py-1 rounded bg-gold/10 border border-gold/20">
          {category}
        </span>
      </div>
      <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-gold transition-colors">
        {name}
      </h3>
      
      <div className="mt-auto space-y-3">
        <div className="flex items-center justify-between text-sm text-white/60">
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-gold/60" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1.5 font-semibold text-white">
            <Tag size={14} className="text-gold/60" />
            <span>{price}</span>
          </div>
        </div>
        
        <button className="w-full py-2.5 rounded-xl border border-white/10 text-sm font-medium hover:bg-white hover:text-salon-black transition-all">
          Book Now
        </button>
      </div>
    </motion.div>
  );
};
