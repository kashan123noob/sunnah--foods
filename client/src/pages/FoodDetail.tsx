import { useFood } from "@/hooks/use-foods";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft, BookOpen, Heart, Activity } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FoodDetail() {
  const [match, params] = useRoute("/food/:slug");
  const slug = params?.slug || "";
  const { data: food, isLoading, error } = useFood(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background pattern-grid">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !food) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <p className="text-destructive font-medium">Food not found</p>
        <Link href="/" className="text-primary hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-background pattern-grid pb-20">
      {/* Header Image Area */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src={food.imageUrl} 
          alt={food.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="container px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-ornament text-white mb-4 drop-shadow-lg">
                {food.name}
              </h1>
              <h2 className="text-3xl md:text-4xl font-arabic text-accent drop-shadow-md mb-8">
                {food.arabicName}
              </h2>
              <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all hover:scale-105">
                <ArrowLeft className="w-4 h-4" /> Back to List
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-30">
        <motion.div 
          className="bg-card rounded-3xl shadow-xl border border-border p-6 md:p-10 mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column: Description & References */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="text-2xl font-heading font-bold text-primary mb-4 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-accent" />
                  Description
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {food.description}
                </p>
              </div>

              <div className="space-y-6">
                {food.quranReference && (
                  <div className="bg-primary/5 rounded-xl p-6 border-l-4 border-primary">
                    <h4 className="font-bold text-primary mb-2 text-sm uppercase tracking-wider">Quranic Reference</h4>
                    <p className="italic text-foreground/80 font-heading text-lg">"{food.quranReference}"</p>
                  </div>
                )}
                
                {food.hadithReference && (
                  <div className="bg-accent/10 rounded-xl p-6 border-l-4 border-accent">
                    <h4 className="font-bold text-accent-foreground/80 mb-2 text-sm uppercase tracking-wider">Hadith Reference</h4>
                    <p className="italic text-foreground/80 font-heading text-lg">"{food.hadithReference}"</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Nutrition */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm h-full">
                <h3 className="text-xl font-heading font-bold text-primary mb-6 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-accent" />
                  Nutritional Value
                </h3>
                <div className="space-y-0 divide-y divide-border">
                  {Object.entries(food.nutritionalInfo as Record<string, string>).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-3">
                      <span className="font-medium capitalize text-muted-foreground">{key}</span>
                      <span className="font-bold text-foreground">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Health Benefits Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-heading font-bold text-primary mb-8 text-center flex items-center justify-center gap-3">
            <Heart className="w-8 h-8 text-destructive fill-destructive/20" />
            Health Benefits
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(food.healthBenefits as string[]).map((benefit, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow hover:border-accent/50 group"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors text-primary font-bold">
                  {index + 1}
                </div>
                <p className="text-foreground font-medium leading-relaxed">
                  {benefit}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
