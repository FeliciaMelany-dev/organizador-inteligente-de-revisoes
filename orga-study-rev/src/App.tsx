import { useEffect, useState } from "react";
import type { Study } from "./types/study.ts";
import type { User } from "./types/user.ts";
import type { Term } from "./types/term.ts";
import { api } from "./services/api.ts";
import style from "./css/App.module.css"
import "./css/global.css"
import { useMemo } from "react";
import StudyCard from "./components/StudyCard.tsx";
import UserCard from "./components/UserCard.tsx";
import TermCard from "./components/TermCard.tsx";

function App() {
  const [studies, setStudies] = useState<Study[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [terms, setTerms] = useState<Term[]>([]);

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState<number | null>(null);

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

  const handleSaveStudy = async () => {
    if (!title || !subject) {
      setError("Preencha todos os campos");
      return;
    }

    try {
      if (editingId) {
        const updatedStudy = {
          id: editingId,
          userId: 1,
          title,
          subject,
          date: new Date().toISOString().split("T")[0],
        };

        const newStudy = await api.put<Study>(
          `/studies/${editingId}`,
          updatedStudy,
        );

        setStudies((prev) =>
          prev.map((s) => (s.id === editingId ? newStudy : s)),
        );

        setEditingId(null);
      } else {
        const newStudy = {
          userId: 1,
          title,
          subject,
          date: new Date().toISOString().split("T")[0],
        };

        const createdStudy = await api.post<Study>("/studies", newStudy);

        setStudies((prev) => [...prev, createdStudy]);
      }

      setTitle("");
      setSubject("");
    } catch (err) {
      setError("Erro ao salvar estudo");
    }
  };

  const handleToggleLearned = async (id: number, learned: boolean) => {
    try {
      const updatedTerm = await api.patch<Term>(`/terms/${id}`, {
        learned: !learned,
      });

      setTerms((prev) =>
        prev.map((term) => (term.id === id ? updatedTerm : term)),
      );
    } catch (err) {
      setError("Erro ao atualizar termo");
    }
  };

  const filteredTerms = useMemo(() => {
  return terms.filter((term) => {
    if (filter === "learned") return term.learned;
    if (filter === "notLearned") return !term.learned;
    return true;
  });
}, [terms, filter]);

  return (
    <main className={style.container}>
      <header>
        <h1 className={style.mainTitle}>Organizador de Estudos</h1>
      </header>

      {}
      <section className={style.formCard}>
        <h2 className={style.formTitle}>Criar Estudo</h2>

        <div className={style.formRow}>
          <div className={style.inputGroup}>
            <label htmlFor="title" className={style.label}>Título</label>
            <input
              id="title"
              className={style.input}
              type="text"
              placeholder="Ex: Node.js"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className={style.inputGroup}>
            <label htmlFor="subject" className={style.label}>Assunto</label>
            <input
              id="subject"
              className={style.input}
              type="text"
              placeholder="Ex: Programação-Backend"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
        </div>

        <button className={style.btnPrimary} onClick={handleSaveStudy}>
          {editingId ? "Salvar edição" : "Criar estudo"}
        </button>
      </section>

      {}
      {loading && <p className={style.statusMsg}>Carregando estudos...</p>}
      {error && <p className={style.errorMsg}>{error}</p>}
      {!loading && !error && studies.length === 0 && (
        <p className={style.statusMsg}>Nenhum estudo encontrado. Comece adicionando um!</p>
      )}

      {}
      <section className={style.section}>
        <div className={style.grid}>
          {studies.map((study) => (
            <StudyCard
              key={study.id}
              study={study}
              onDelete={handleDeleteStudy}
              onEdit={(study) => {
                setTitle(study.title);
                setSubject(study.subject);
                setEditingId(study.id);
              }}
            />
          ))}
        </div>
      </section>

      {}
      <section className={style.section}>
        {users.map((user) => (
          <UserCard key={user.id} user={user} onDelete={handleDeleteUser} />
        ))}
      </section>

      {}
      <section className={style.section}>
        <div className={style.filterTabs}>
          <button
            className={`${style.filterTab} ${filter === "all" ? style.active : ""}`}
            onClick={() => setFilter("all")}
          >
            Todos
          </button>
          <button
            className={`${style.filterTab} ${filter === "learned" ? style.active : ""}`}
            onClick={() => setFilter("learned")}
          >
            Aprendidos
          </button>
          <button
            className={`${style.filterTab} ${filter === "notLearned" ? style.active : ""}`}
            onClick={() => setFilter("notLearned")}
          >
            Não aprendidos
          </button>
        </div>

        <h2 className={style.sectionTitle}>Termos</h2>
        <div className={style.grid}>
          {filteredTerms.map((term) => (
            <TermCard
              key={term.id}
              term={term}
              onDelete={handleDeleteTerm}
              onToggle={handleToggleLearned}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
