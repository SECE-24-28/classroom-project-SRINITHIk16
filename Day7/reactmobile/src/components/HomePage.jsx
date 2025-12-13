export default function HomePage() {
  return (
    <div
      className="h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{
        height: "100vh",
        backgroundImage: "url('https://images.unsplash.com/photo-1571867424488-4565932edb41?fm=jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontSize: "2rem",
        textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
      }}
    >
      <h1 className="text-white text-5xl font-bold drop-shadow-lg mb-6">
        Welcome to Mobile Recharge Portal
      </h1>
    </div>
  );
}
