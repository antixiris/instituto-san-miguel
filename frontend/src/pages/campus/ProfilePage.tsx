import { useAuthStore } from '../../store/authStore';

export default function ProfilePage() {
  const { user } = useAuthStore();

  return (
    <div>
      <h1 className="mb-6">Mi Perfil</h1>
      <div className="card card-body max-w-2xl">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Nombre</label>
            <input type="text" defaultValue={user?.firstName} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Apellido</label>
            <input type="text" defaultValue={user?.lastName} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input type="email" defaultValue={user?.email} className="input" disabled />
          </div>
          <button className="btn btn-primary">Guardar Cambios</button>
        </div>
      </div>
    </div>
  );
}
