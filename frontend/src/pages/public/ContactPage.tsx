export default function ContactPage() {
  return (
    <div className="container-custom section">
      <h1 className="mb-6">Contacto</h1>
      <div className="max-w-2xl">
        <p className="text-gray-600 mb-8">
          ¿Tienes alguna pregunta? Estamos aquí para ayudarte.
        </p>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Nombre</label>
            <input type="text" className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input type="email" className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Mensaje</label>
            <textarea className="input" rows={5}></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Enviar Mensaje</button>
        </form>
      </div>
    </div>
  );
}
