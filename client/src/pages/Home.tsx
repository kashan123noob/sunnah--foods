import { useFoods } from "@/hooks/use-foods";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";

export default function Home() {
  const { data: foods, isLoading, error } = useFoods();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background pattern-grid">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-destructive">
        Error loading foods. Please try again.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pattern-grid">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent-foreground text-sm font-semibold mb-6 border border-accent/20">
              Health & Spirituality
            </span>
            <h1 className="text-5xl md:text-7xl font-ornament text-primary mb-6 drop-shadow-sm">
              9 Sunnah Foods
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-heading leading-relaxed">
              Discover the blessed foods mentioned in the Quran and Hadith, linking ancient wisdom with modern health benefits.
            </p>
          </motion.div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      </section>

      {/* Grid Section */}
      <section className="py-16 container mx-auto px-4 mb-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {foods?.map((food, index) => (
            <Link key={food.id} href={`/food/${food.slug}`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
                
                <div className="bg-card border border-border rounded-2xl overflow-hidden h-full shadow-md card-hover-effect flex flex-col">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img 
                      src={food.imageUrl} 
                      alt={food.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-white font-medium flex items-center gap-2">
                        View Details <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow bg-white relative">
                    <div className="absolute -top-6 right-6 w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg text-white font-bold font-serif text-lg border-4 border-white">
                      {index + 1}
                    </div>
                    
                    <div className="mb-2">
                      <h3 className="text-2xl font-heading font-bold text-primary group-hover:text-primary/80 transition-colors">
                        {food.name}
                      </h3>
                      <p className="text-accent-foreground/60 font-arabic text-lg" dir="rtl">
                        {food.arabicName}
                      </p>
                    </div>
                    
                    <p className="text-muted-foreground text-sm line-clamp-2 mt-auto">
                      {food.description.substring(0, 100)}...
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      <div id="about" className="bg-muted/30 py-20 border-t border-border/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-ornament text-primary mb-6">About This Assignment</h2>
          <p className="max-w-3xl mx-auto text-muted-foreground leading-relaxed">
            This website was created as a Computer Science assignment for 8th Grade. 
            Our goal was to design a beautiful, informative platform using modern web technologies 
            to showcase the timeless wisdom found in Islamic traditions regarding nutrition and health.
          </p>
        </div>
      </div>
    </div>
  );
}
