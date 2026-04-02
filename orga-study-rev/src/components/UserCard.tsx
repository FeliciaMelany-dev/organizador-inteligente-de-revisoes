import type { User } from "../types/user.ts";
import style from "../css/App.module.css"; // Verifique se o caminho está correto

interface UserCardProps {
  user: User;
  onDelete: (id: number) => void;
}

function UserCard({ user, onDelete }: UserCardProps) {
  return (
    <div className={style.userInfo}>
      <h3 className={style.formTitle}>Usuário</h3> {}

      <div className={style.userDetail}>
        <span className={style.userLabel}>Nome: </span>
        <span className={style.userValue}>{user.name}</span>
      </div>

      <div className={style.userDetail}>
        <span className={style.userLabel}>Email: </span>
        <span className={style.userValue}>{user.email}</span>
      </div>

      <button
        className={style.btnDanger}
        onClick={() => onDelete(user.id)}
        style={{ marginTop: '16px' }} 
      >
        Deletar
      </button>
    </div>
  );
}

export default UserCard;