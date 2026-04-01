import { useEffect, useState } from "react";
import type { Study } from "./types/study.ts";
import type { User } from "./types/user.ts";
import type { Term } from "./types/term.ts";
import { api } from "./services/api.ts";

import StudyCard from "./components/StudyCard.tsx";
import UserCard from "./components/UserCard.tsx";
import TermCard from "./components/TermCard.tsx";

function App() {
  const [studies, setStudies] = useState<Study[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [terms, setTerms] = useState<Term[]>([]);

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");

  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [dataStudies, dataUser, dataTerm] = await Promise.all([
          api.get<Study[]>("/studies"),
          api.get<User[]>("/users"),
          api.get<Term[]>("/terms"),
        ]);

        setStudies(dataStudies);
        setUsers(dataUser);
        setTerms(dataTerm);
      } catch (err) {
        setError("Não foi possível conectar ao servidor");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteStudy = async (id: number) => {
    try {
      await api.delete(`/studies/${id}`);

      const updatedStudies = studies.filter((study) => study.id !== id);
      setStudies(updatedStudies);
    } catch (err) {
      setError("Erro ao deletar estudo");
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await api.delete(`/users/${id}`);

      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
    } catch (err) {
      setError("Erro ao deletar usuário");
    }
  };

  const handleDeleteTerm = async (id: number) => {
    try {
      await api.delete(`/terms/${id}`);

      const updatedTerms = terms.filter((term) => term.id !== id);
      setTerms(updatedTerms);
    } catch (err) {
      setError("Erro ao deletar termo");
    }
  };

  const handleCreateStudy = async () => {
    try {
      const newStudy = {
        userId: 1,
        title,
        subject,
        date: new Date().toISOString().split("T")[0],
      };

      const createdStudy = await api.post<Study>("/studies", newStudy);

      if (!title || !subject) {
        setError("Preencha todos os campos");
        return;
      }

      setStudies((prev) => [...prev, createdStudy]);
      setTitle("");
      setSubject("");
    } catch (err) {
      setError("Erro ao criar estudo");
    }
  };

  const handleToggleLearned = async (id: number, learned: boolean) => {
  try {
    const updatedTerm = await api.patch<Term>(`/terms/${id}`, {
      learned: !learned,
    });

    setTerms((prev) =>
      prev.map((term) =>
        term.id === id ? updatedTerm : term
      )
    );
  } catch (err) {
    setError("Erro ao atualizar termo");
  }
};


  return (
    <div>
      <h1>Organizador de Estudos</h1>

      <div>
        <h2>Criar Estudo</h2>

        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Assunto"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <button onClick={handleCreateStudy}>Criar Estudo</button>
      </div>

      {loading && <p>Carregando estudos...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && studies.length === 0 && (
        <p>Nenhum estudo encontrado. Comece adicionando um!</p>
      )}

      {studies.map((study) => (
        <StudyCard key={study.id} study={study} onDelete={handleDeleteStudy} />
      ))}

      {users.map((user) => (
        <UserCard key={user.id} user={user} onDelete={handleDeleteUser} />
      ))}

      {terms.map((term) => (
        <TermCard key={term.id} term={term} onDelete={handleDeleteTerm}
         onToggle={handleToggleLearned} />
      ))}
    </div>
  );
}

export default App;
