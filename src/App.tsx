import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { 
  Instagram, 
  Facebook, 
  Phone, 
  Mail, 
  MapPin, 
  Star, 
  ChevronRight, 
  MessageCircle,
  Scissors,
  Sparkles,
  Heart,
  Calendar
} from "lucide-react";
import { Navbar } from "./components/Navbar";
import { GlassButton } from "./components/GlassButton";
import { ServiceCard } from "./components/ServiceCard";

const SERVICES = {
  "Nails & Hand Care": [
    { name: "Manicure", price: "R250", duration: "2 hours" },
    { name: "Gel Natural Overlay / GelX", price: "R250", duration: "2 hours" },
    { name: "Soak-Off", price: "R50", duration: "45 minutes" },
    { name: "Foot Soak + Scrub", price: "R200", duration: "1h 30m" },
    { name: "Pedicure", price: "R200", duration: "1 hour" },
    { name: "Pedicure (Scrubs & Massage)", price: "R250", duration: "1h 30m" },
  ],
  "Gents Grooming": [
    { name: "Male Manicure + Hand Scrub", price: "R200", duration: "1 hour" },
    { name: "Male Pedicure + Scrub", price: "R250", duration: "1h 15m" },
    { name: "Male Buff & Shine", price: "R150", duration: "30 mins" },
  ],
  "Hair Styling & Braiding": [
    { name: "Tribal Braids", price: "R400", duration: "3-4 hours" },
    { name: "Straight Back Braids", price: "R350", duration: "2-3 hours" },
    { name: "Straight Up Braids", price: "R350", duration: "2-3 hours" },
    { name: "Pondo Braids", price: "R300", duration: "2 hours" },
  ],
  "Knotless Braids": [
    { name: "Jumbo Knotless", price: "R550", duration: "3 hours" },
    { name: "Large Knotless", price: "R650", duration: "4 hours" },
    { name: "Medium Knotless", price: "R750", duration: "5 hours" },
    { name: "Small Knotless", price: "R850", duration: "7 hours" },
  ],
  "Boho Knotless": [
    { name: "Medium with French Curls", price: "R900", duration: "6 hours" },
    { name: "Small with French Curls", price: "R1000", duration: "8 hours" },
    { name: "Bob Goddess Knotless", price: "R400", duration: "3 hours" },
  ],
  "Kids & Special": [
    { name: "Kids Knotless Medium", price: "R600", duration: "4 hours" },
    { name: "Lemonade Braids (Beads)", price: "R450", duration: "3 hours" },
    { name: "Pondo Tribal (French)", price: "R600", duration: "4 hours" },
  ]
};

const GALLERY_IMAGES = [
  { url: "https://scontent-jnb2-1.xx.fbcdn.net/v/t1.6435-9/188090579_146159710859683_4046760401667657362_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_ohc=whbFEBhVtlIQ7kNvwGxvSIE&_nc_oc=AdlDIS-SbQVgA5JMQUh-DXBnF2WHNLwVHNsgjeAg1166L76LnFhlKyTlSQLECV-dJbY&_nc_zt=23&_nc_ht=scontent-jnb2-1.xx&_nc_gid=mAkqjOLeZ-zluKsDH9lbPw&_nc_ss=8&oh=00_AfyuQbXLBHA6ddC-_tm6UHVYko3pmqSOnTikBVjjQPfktw&oe=69E083C0", category: "Nails" },
  { url: "https://scontent-jnb2-1.xx.fbcdn.net/v/t39.30808-6/515304950_1149251370555244_5227380740602232015_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=7b2446&_nc_ohc=sfsNfEqwGV4Q7kNvwEnPZFZ&_nc_oc=Adl3OQtVHZsDRCK5w4IedPQH9o5LJHTcch4tH080zyc2Js_PRrbumLc1H5B0krhQSxs&_nc_zt=23&_nc_ht=scontent-jnb2-1.xx&_nc_gid=OuN6cKXuM2lMYMUXjwx_FQ&_nc_ss=8&oh=00_Afy7oRBmXPT9bEAjrXA7e7GrnyAE6FR39bOMzyeTj7fl5Q&oe=69BEF840", category: "Braids" },
  { url: "https://scontent-jnb2-1.xx.fbcdn.net/v/t39.30808-6/515088995_1149251373888577_7945027658494137191_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_ohc=OsDqjaOHgQQQ7kNvwGEvL5u&_nc_oc=Adlz5sMh9UvGPByPEs0bmPOjVI2_t8fLVw32hBYGmtJDHP-5kTwhQnX4o9T4QIOK8H0&_nc_zt=23&_nc_ht=scontent-jnb2-1.xx&_nc_gid=WIHMOSlNdlRx70SvRW-WvA&_nc_ss=8&oh=00_AfxW02FJ-Y9CB1UisKXtAwtEjY6MdmxV8lIyqfaHVEsvFw&oe=69BEF291", category: "Braids" },
  { url: "https://scontent-jnb2-1.xx.fbcdn.net/v/t39.30808-6/567681850_1239174908229556_2251883908125829702_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_ohc=sWSKjCs3FpEQ7kNvwGgtPfe&_nc_oc=Admu-p_LEWJL6fqG-818BzXV4_xApMrt_iy6IFkxtMrnfHA_7GElt6OYwFfhpBqrs7g&_nc_zt=23&_nc_ht=scontent-jnb2-1.xx&_nc_gid=MnZx476VJgqhV1Zk9RBmkQ&_nc_ss=8&oh=00_Afz5l97YTeb2C4AcvmKZYHsGZr4neQ2gjSi3BEQXZo8dRg&oe=69BEEC6B", category: "Braids" },
  { url: "https://scontent-jnb2-1.xx.fbcdn.net/v/t39.30808-6/567679184_1239174871562893_8175462129869683611_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=7b2446&_nc_ohc=bu81UaHHwogQ7kNvwFUPKe_&_nc_oc=Adl4YBiOaIX3iV9hNiQFJ05y7mMDBZJSy_6fCzIkh--egVjdnU0yDJR70V8h98ZjltA&_nc_zt=23&_nc_ht=scontent-jnb2-1.xx&_nc_gid=jKjB7yMJjsDm9uE46P1uhw&_nc_ss=8&oh=00_AfxxZk1fI2eYoXaIYuY2tlpEVth-0hxxF4WXr3UAHW7H4A&oe=69BEEB55", category: "Braids" },
  { url: "https://scontent-jnb2-1.xx.fbcdn.net/v/t51.82787-15/612958297_18323171017223395_1185444608250278438_n.jpg?stp=dst-jpegr_tt6&_nc_cat=109&ccb=1-7&_nc_sid=13d280&_nc_ohc=uE2C1iYkoOgQ7kNvwFl3CTS&_nc_oc=AdmkUfMai5rirg-SWFdt5E-EV3BPTFlP1o-_Vfc3dmgctcik6Zx9gbwCc3-8nelcpjU&_nc_zt=23&se=-1&_nc_ht=scontent-jnb2-1.xx&_nc_gid=PYvypeYyiUJD10SBgqFQew&_nc_ss=8&oh=00_Afw1_q5DbteKBCoP5Mr0TRADiB4yWEWZzKdebbrA21dsXg&oe=69BEF8C0", category: "Braids" },
  { url: "https://scontent-jnb2-1.xx.fbcdn.net/v/t51.82787-15/639933538_18328996246223395_4497740895303521396_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=13d280&_nc_ohc=m0MfuLtbT6oQ7kNvwGac9cf&_nc_oc=Admj3KP3vFlOXTOqwKMD4KVgXDRwEye9FH4sZwCKZ0cyJrg-oS_XITICB6V_Y9HTXZg&_nc_zt=23&_nc_ht=scontent-jnb2-1.xx&_nc_gid=7kMBco6Nfdl4mr60ENLtMw&_nc_ss=8&oh=00_AfzodQ2se3rj5xvKzv8u69xE__WtJNA56DMvqOXUWv9bqQ&oe=69BEDF9F", category: "Braids" },
  { url: "https://scontent-jnb2-1.xx.fbcdn.net/v/t51.82787-15/640009996_18328996267223395_3910133471956661130_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=13d280&_nc_ohc=Spc8Q-Tj5GkQ7kNvwGHqmaP&_nc_oc=Admz2fPWZDpRJzRdEanz3C3i5CZ4ZFJ1n65IycsCvnbYWIhPCSq00aMas6S-WVPAxK0&_nc_zt=23&_nc_ht=scontent-jnb2-1.xx&_nc_gid=ltepidVn98vLc6F4RtzDjQ&_nc_ss=8&oh=00_AfymnVCnu2A5b-1vSUjS_b8myvo6DHpVJzxDx-TBx_4BcA&oe=69BEF7F1", category: "Braids" },
  { url: "https://scontent-jnb2-1.xx.fbcdn.net/v/t39.30808-6/468855479_991496392992673_3644803935342194383_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_ohc=OBx10ntMx0QQ7kNvwEJvjnp&_nc_oc=Adm2TIWmslx_nhEgfEmn_lH_rAoCVyUGyymUDODvNx13iGXsOnI8-xySfL3WhIhn5Xs&_nc_zt=23&_nc_ht=scontent-jnb2-1.xx&_nc_gid=jySyCGodEHCrXCWve-79oQ&_nc_ss=8&oh=00_Afy_ZDeEIXEGh4il8gfSfP3tnmxJ75yI7448dEFIgKDMqQ&oe=69BF0687", category: "Pedicure" },
  { url: "https://scontent-jnb2-1.xx.fbcdn.net/v/t39.30808-6/470488372_996088105871572_2197913769064625018_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_ohc=IGPdsiZllJ4Q7kNvwFPqEOa&_nc_oc=Adm19k5FPCNMbsL7M_cgmcrEy736HMWaRWWWyVFr08I2Wv7l4SlPSbkmcGxzM5cFWzk&_nc_zt=23&_nc_ht=scontent-jnb2-1.xx&_nc_gid=l_Ks6xh4VfPBJ9vtQoWdNA&_nc_ss=8&oh=00_AfxH_Nrd_pMQ6aVroaENbqGFzdbV-JEOYvwj9bK8EwvE0Q&oe=69BEE296", category: "Kids" },
  { url: "https://scontent-jnb2-1.xx.fbcdn.net/v/t39.30808-6/470230774_996088815871501_6852661999912807125_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_ohc=GiJE8SwyqWEQ7kNvwE5IqMb&_nc_oc=AdmwqoEddCDeFftLXVd2yyxoVNGM9gWT6twgC1ZAijxsHRcfwh5oUSkx9uxayMrQeqE&_nc_zt=23&_nc_ht=scontent-jnb2-1.xx&_nc_gid=W7VJV2iSqsd3n0oY_3UTKw&_nc_ss=8&oh=00_Afy0HsgDx3I6zrQlQFEn3xgA8fvSdE03t7UQARm52e3N9A&oe=69BF04B7", category: "Nails" },
];

export default function App() {
  const [bookingForm, setBookingForm] = useState({
    service: "",
    date: "",
    time: "",
    name: "",
    phone: "",
    email: ""
  });

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Booking submitted:", bookingForm);
    alert("Thank you! Your booking request has been sent. We will contact you shortly.");
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-32 pb-20">
        {/* Background with parallax-like feel */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1920" 
            alt="Salon Background"
            className="w-full h-full object-cover opacity-20 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-pink via-transparent to-pink" />
          <div className="absolute inset-0 bg-gradient-to-r from-pink via-pink/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-wine font-medium tracking-[0.4em] uppercase text-sm mb-4 block"
            >
              Luxury Beauty Studio
            </motion.span>
            <h1 className="text-6xl md:text-8xl font-display font-bold leading-tight mb-6">
              Beauty, Confidence <br />
              <span className="text-gradient-wine italic">& Style</span>
            </h1>
            <p className="text-lg text-wine/70 mb-10 leading-relaxed max-w-lg">
              A professional beauty studio offering premium nail care, hair styling, 
              braiding, and grooming services designed to enhance your confidence 
              and personal style.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <GlassButton onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>
                Book Appointment
              </GlassButton>
              <GlassButton 
                variant="secondary" 
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Services
              </GlassButton>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-20 hidden lg:block"
        >
          <div className="glass p-8 rounded-3xl border-wine/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-wine/10 flex items-center justify-center text-wine">
                <Sparkles size={24} />
              </div>
              <div>
                <p className="text-sm font-bold">Premium Care</p>
                <p className="text-xs text-wine/60">Expert Stylists</p>
              </div>
            </div>
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-pink bg-zinc-800 overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?u=${i}`} alt="User" />
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-pink bg-wine flex items-center justify-center text-[10px] font-bold text-pink">
                +50
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-pink relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-wine/10">
                <img 
                  src="https://scontent-jnb2-1.xx.fbcdn.net/v/t1.6435-9/164822418_120044610137860_6872059727770519010_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=7b2446&_nc_ohc=9R48clgDcZoQ7kNvwERe6Ho&_nc_oc=AdnoR0nzCyspvZQ74AUha8dJMNLAN-BxFhOeMgChbqMTMdntNrl_DaKLeujDaYx4_0g&_nc_zt=23&_nc_ht=scontent-jnb2-1.xx&_nc_gid=fOle9W2LbSCxGv0_toF9WA&_nc_ss=8&oh=00_AfzriLxC6s1qgoR8g9C-yCpg2_oyR-rXUKhNymX9WEMB1Q&oe=69E09B57" 
                  alt="Salon Interior"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 glass p-8 rounded-2xl hidden lg:block">
                <p className="text-4xl font-display font-bold text-wine mb-1">100%</p>
                <p className="text-sm text-wine/60 uppercase tracking-widest">Satisfaction</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
                About <span className="text-wine">Switchesty Beauty</span>
              </h2>
              <div className="space-y-6 text-wine/70 leading-relaxed">
                <p>
                  Switchesty Beauty is a professional beauty studio located in Vanderbijlpark, 
                  offering expert nail care, hair styling, and grooming services for women, 
                  men, and children.
                </p>
                <p>
                  Our goal is to provide a relaxing environment where every client leaves 
                  feeling confident, stylish, and refreshed. We specialize in modern hair 
                  braiding styles, manicures, pedicures, and beauty treatments tailored 
                  to each client’s needs.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-12">
                {[
                  { icon: <Scissors size={20} />, text: "Skilled Stylists" },
                  { icon: <Sparkles size={20} />, text: "Professional Services" },
                  { icon: <Heart size={20} />, text: "Personalized Care" },
                  { icon: <MapPin size={20} />, text: "Clean Environment" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-wine/80">
                    <div className="text-wine">{item.icon}</div>
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-rose/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Our Services</h2>
            <div className="w-24 h-1 bg-wine mx-auto rounded-full mb-6" />
            <p className="text-wine/60 max-w-2xl mx-auto">
              Indulge in our range of premium beauty treatments designed to make you look and feel your absolute best.
            </p>
          </div>

          <div className="space-y-20">
            {Object.entries(SERVICES).map(([category, items], catIdx) => (
              <div key={category}>
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-2xl font-display font-bold mb-8 flex items-center gap-4"
                >
                  <span className="text-wine">0{catIdx + 1}.</span>
                  {category}
                </motion.h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((service) => (
                    <ServiceCard 
                      key={service.name} 
                      name={service.name}
                      price={service.price}
                      duration={service.duration}
                      category={category}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-pink">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">The Gallery</h2>
              <p className="text-wine/60">A glimpse into our world of beauty and style.</p>
            </div>
            <div className="flex gap-4">
              {["All", "Nails", "Braids", "Kids"].map(filter => (
                <button key={filter} className="text-sm font-medium text-wine/40 hover:text-wine transition-colors">
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {GALLERY_IMAGES.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group rounded-3xl overflow-hidden border border-wine/10"
              >
                <img 
                  src={img.url} 
                  alt={img.category} 
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-xs font-bold tracking-widest uppercase text-wine">{img.category}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-wine/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose/10 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="glass-dark p-10 md:p-16 rounded-[40px] border-wine/10">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-display font-bold mb-4">Book Your Appointment</h2>
              <p className="text-wine/60">Choose your service and reserve your time with our professional stylists.</p>
            </div>

            <form onSubmit={handleBookingSubmit} className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-wine/40 mb-2">Select Service</label>
                  <select 
                    required
                    className="w-full bg-pink/50 border border-wine/10 rounded-xl px-4 py-3 text-wine focus:border-wine outline-none transition-colors"
                    value={bookingForm.service}
                    onChange={e => setBookingForm({...bookingForm, service: e.target.value})}
                  >
                    <option value="" className="bg-pink">Choose a service...</option>
                    {Object.values(SERVICES).flat().map(s => (
                      <option key={s.name} value={s.name} className="bg-pink">{s.name}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-wine/40 mb-2">Date</label>
                    <input 
                      type="date" 
                      required
                      className="w-full bg-pink/50 border border-wine/10 rounded-xl px-4 py-3 text-wine focus:border-wine outline-none transition-colors"
                      value={bookingForm.date}
                      onChange={e => setBookingForm({...bookingForm, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-wine/40 mb-2">Time</label>
                    <input 
                      type="time" 
                      required
                      className="w-full bg-pink/50 border border-wine/10 rounded-xl px-4 py-3 text-wine focus:border-wine outline-none transition-colors"
                      value={bookingForm.time}
                      onChange={e => setBookingForm({...bookingForm, time: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-wine/40 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Your name"
                    className="w-full bg-pink/50 border border-wine/10 rounded-xl px-4 py-3 text-wine focus:border-wine outline-none transition-colors"
                    value={bookingForm.name}
                    onChange={e => setBookingForm({...bookingForm, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-wine/40 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="081 553 5444"
                    className="w-full bg-pink/50 border border-wine/10 rounded-xl px-4 py-3 text-wine focus:border-wine outline-none transition-colors"
                    value={bookingForm.phone}
                    onChange={e => setBookingForm({...bookingForm, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="md:col-span-2 mt-4">
                <GlassButton className="w-full py-4">
                  Confirm Booking
                </GlassButton>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-wine/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-display font-bold mb-12">What Our Clients Say</h2>
          <div className="glass-dark p-12 rounded-[40px] max-w-2xl mx-auto border-wine/10">
            <div className="flex justify-center gap-1 mb-6">
              {[1,2,3,4,5].map(i => <Star key={i} size={20} className="fill-wine text-wine" />)}
            </div>
            <p className="text-xl italic text-wine/80 mb-8">
              "Be the first to review our services and share your experience."
            </p>
            <div className="w-12 h-12 rounded-full bg-wine/10 flex items-center justify-center mx-auto text-wine mb-4">
              <Sparkles size={24} />
            </div>
            <p className="font-bold tracking-widest uppercase text-xs text-wine">Switchesty Beauty</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-pink">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Get In Touch</h2>
              <p className="text-wine/60 mb-12 leading-relaxed">
                Have questions or want to book a special session? Reach out to us via any of the channels below.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-wine/10 flex items-center justify-center text-wine shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Our Location</h4>
                    <p className="text-wine/60">434 Hendrik Van Eck Blvd, Vanderbijlpark, Gauteng</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-wine/10 flex items-center justify-center text-wine shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Phone / WhatsApp</h4>
                    <p className="text-wine/60">081 553 5444</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-wine/10 flex items-center justify-center text-wine shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Email Address</h4>
                    <p className="text-wine/60">switchestybeauty@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex gap-4">
                <GlassButton className="!px-6 flex items-center gap-2">
                  <MessageCircle size={18} />
                  WhatsApp Us
                </GlassButton>
              </div>
            </div>

            <div className="glass-dark p-8 rounded-3xl border-wine/10">
              <div className="aspect-video rounded-2xl overflow-hidden mb-8 bg-wine/5 border border-wine/5">
                {/* Map Placeholder */}
                <div className="w-full h-full flex items-center justify-center text-wine/20 flex-col gap-4">
                  <MapPin size={48} />
                  <p className="text-sm">Vanderbijlpark, Gauteng Map View</p>
                </div>
              </div>
              
              <form className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-pink/50 border border-wine/10 rounded-xl px-4 py-3 text-wine focus:border-wine outline-none"
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full bg-pink/50 border border-wine/10 rounded-xl px-4 py-3 text-wine focus:border-wine outline-none"
                />
                <textarea 
                  placeholder="Your Message" 
                  rows={4}
                  className="w-full bg-pink/50 border border-wine/10 rounded-xl px-4 py-3 text-wine focus:border-wine outline-none"
                ></textarea>
                <button className="w-full py-4 rounded-xl bg-wine text-pink font-bold hover:bg-rose hover:text-wine transition-colors">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-wine border-t border-wine/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <img 
                  src="https://res.cloudinary.com/dm7sxhaeb/image/upload/v1773742544/IMG-20260316-WA0006_wefwsm.jpg" 
                  alt="Switchesty Beauty Logo" 
                  className="h-10 w-auto rounded-full border border-pink/30"
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col">
                  <span className="text-xl font-display font-bold tracking-tighter text-pink leading-none">
                    SWITCHESTY
                  </span>
                  <span className="text-[10px] tracking-[0.3em] font-light text-pink/60 mt-1 leading-none">BEAUTY</span>
                </div>
              </div>
              <p className="text-pink/40 text-sm leading-relaxed mb-8">
                Crafting beauty and confidence through expert care and modern styling. Your premium destination for salon excellence.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-pink/60 hover:text-pink transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-pink/60 hover:text-pink transition-colors">
                  <Facebook size={18} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-pink">Quick Links</h4>
              <ul className="space-y-4 text-sm text-pink/50">
                <li><a href="#home" className="hover:text-pink transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-pink transition-colors">About Us</a></li>
                <li><a href="#services" className="hover:text-pink transition-colors">Services</a></li>
                <li><a href="#gallery" className="hover:text-pink transition-colors">Gallery</a></li>
                <li><a href="#booking" className="hover:text-pink transition-colors">Book Now</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-pink">Services</h4>
              <ul className="space-y-4 text-sm text-pink/50">
                <li><a href="#" className="hover:text-pink transition-colors">Nail Care</a></li>
                <li><a href="#" className="hover:text-pink transition-colors">Hair Braiding</a></li>
                <li><a href="#" className="hover:text-pink transition-colors">Gents Grooming</a></li>
                <li><a href="#" className="hover:text-pink transition-colors">Kids Styling</a></li>
                <li><a href="#" className="hover:text-pink transition-colors">Hair Treatments</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-pink">Newsletter</h4>
              <p className="text-sm text-pink/50 mb-4">Subscribe to get special offers and beauty tips.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="bg-pink/5 border border-pink/10 rounded-lg px-3 py-2 text-sm outline-none w-full text-pink"
                />
                <button className="p-2 rounded-lg bg-pink text-wine">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-pink/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-pink/30">
            <p>© 2026 Switchesty Beauty. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-pink">Privacy Policy</a>
              <a href="#" className="hover:text-pink">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
