export default function Login() {
  return (
    <main className="relative w-screen h-screen flex items-center justify-center text-white text-3xl">
      {/* Vidéo en arrière-plan */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/gojo.mp4" type="video/mp4" />
      </video>

      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-75 -z-5"></div>

      {/* Contenu au-dessus de la vidéo */}
      <div className="relative z-10">
        Bienvenue sur mon site !
      </div>
    </main>
  );
}
