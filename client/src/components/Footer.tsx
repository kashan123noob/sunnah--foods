import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 mt-20 relative overflow-hidden">
      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-ornament text-2xl text-accent">Sunnah Foods</h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              An educational project exploring the nutritional and spiritual benefits of foods mentioned in the Quran and Hadith.
            </p>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <h4 className="font-heading text-xl mb-4 border-b border-white/10 pb-2 inline-block">Project Team</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                <p className="font-bold text-accent">Azan Asad</p>
                <p className="text-xs opacity-75">Home Page + 4 Food Pages</p>
                <p className="text-xs text-white/50 mt-1">Honey, Dates, Olive Oil, Black Seed</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                <p className="font-bold text-accent">Kashan Farooqui</p>
                <p className="text-xs opacity-75">5 Food Pages</p>
                <p className="text-xs text-white/50 mt-1">Milk, Figs, Pomegranate, Grapes, Barley</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-xl mb-4 border-b border-white/10 pb-2 inline-block">Class Info</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li className="flex justify-between"><span>Class:</span> <span className="font-semibold">8th Grade</span></li>
              <li className="flex justify-between"><span>Subject:</span> <span className="font-semibold">Computer Science</span></li>
              <li className="flex justify-between"><span>School:</span> <span className="font-semibold">Project Submission</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-xs opacity-50 flex items-center justify-center gap-2">
          <span>Made with</span>
          <Heart className="w-3 h-3 text-accent fill-accent" />
          <span>for educational purposes</span>
        </div>
      </div>
    </footer>
  );
}
