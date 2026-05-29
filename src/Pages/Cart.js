function Cart() {
  const handleWhatsApp = () => {
    const message = `Hello, I want to buy this gaming account from Lil M Store.`;
    
    window.open(
      `https://wa.me/234XXXXXXXXXX?text=${encodeURIComponent(message)}`
    );
  };

  return (
    <div className="pt-24 px-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">Cart</h1>

      <div className="mt-6 bg-white/5 border border-white/10 p-4 rounded-xl">
        <p>Free Fire Account - ₦35,000</p>
      </div>

      <button
        onClick={handleWhatsApp}
        className="mt-6 bg-green-600 px-6 py-3 rounded-xl"
      >
        Checkout on WhatsApp
      </button>
    </div>
  );
}

export default Cart;