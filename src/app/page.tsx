import TemporalTwistApp from "@/components/temporal-twist-app";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 sm:p-8 md:p-12 bg-background">
      <div className="w-full max-w-3xl space-y-8">
        <header className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-primary tracking-tighter animate-in fade-in duration-700">
            Navaneeth's Temporal Twist
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-muted-foreground font-body animate-in fade-in-50 duration-700 delay-200">
            Here, time runs differently.
          </p>
        </header>
        <TemporalTwistApp />
      </div>
    </main>
  );
}
