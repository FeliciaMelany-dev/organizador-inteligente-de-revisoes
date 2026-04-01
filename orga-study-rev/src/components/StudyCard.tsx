import type {Study} from "../types/study.ts";

interface StudyCardProps{
    study: Study;
    onDelete: (id:number) => void;
}


function StudyCard({study, onDelete}: StudyCardProps){
    return(
        <div>
            <h2>ID: {study.id}</h2>
            <p>Título: {study.title}</p>
            <p>Assunto: {study.subject}</p>
            <p>Data de criação: {study.date}</p>
            <p>Usuario: {study.userId}</p>

            <button onClick={() => onDelete(study.id)}>Deletar</button>
        </div>
    )
}


export default StudyCard;