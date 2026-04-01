import type { User } from "../types/user.ts";

interface UserCardProps {
  user: User;
  onDelete: (id: number) => void;
}

function UserCard({ user, onDelete }: UserCardProps) {
  return (
    <div className="user-info">
      <h3>Usuário</h3>

      <div className="user-detail">
        <span className="user-label">Nome</span>
        <span className="user-value">{user.name}</span>
      </div>

      <div className="user-detail">
        <span className="user-label">Email</span>
        <span className="user-value">{user.email}</span>
      </div>

      <button onClick={() => onDelete(user.id)} className="btn-danger">
        Deletar
      </button>
    </div>
  );
}

export default UserCard;
