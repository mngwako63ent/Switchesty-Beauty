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
      className="glass-dark p-6 rounded-2xl flex flex-col h-full group transition-all duration-300 hover:border-wine/30"
    >
      <div className="mb-4">
        <span className="text-[10px] uppercase tracking-widest text-wine/60 font-bold px-2 py-1 rounded bg-wine/10 border border-wine/20">
          {category}
        </span>
      </div>
      <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-wine transition-colors">
        {name}
      </h3>
      
      <div className="mt-auto space-y-3">
        <div className="flex items-center justify-between text-sm text-wine/60">
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-wine/60" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1.5 font-semibold text-wine">
            <Tag size={14} className="text-wine/60" />
            <span>{price}</span>
          </div>
        </div>
        
        <button className="w-full py-2.5 rounded-xl border border-wine/10 text-sm font-medium hover:bg-wine hover:text-pink transition-all">
          Book Now
        </button>
      </div>
    </motion.div>
  );
};
