import type { User } from "../types/user.ts";

interface UserCardProps{
    user: User
    onDelete: (id:number) => void
};



function UserCard({user, onDelete}: UserCardProps){
    return(
        <div>
            <h2>ID: {user.id}</h2>
            <p>Nome: {user.name}</p>
            <p>Email: {user.email}</p>

            <button onClick={() => onDelete(user.id)}>Deletar</button>
        </div>
    )
}


export default UserCard;