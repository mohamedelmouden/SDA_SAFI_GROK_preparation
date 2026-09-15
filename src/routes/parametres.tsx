import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProgress } from "@/lib/store";
import { EXAM } from "@/lib/exam";

export const Route = createFileRoute("/parametres")({ component: SettingsPage });

function SettingsPage() {
  const name = useProgress((s) => s.name);
  const setName = useProgress((s) => s.setName);
  const reset = useProgress((s) => s.reset);
  const [draft, setDraft] = useState(name);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    setDraft(name);
  }, [name]);

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Paramètres</h1>
      <section className="rounded-xl border border-line bg-surface p-5 shadow-card">
        <h2 className="text-sm font-semibold">Prénom affiché</h2>
        <p className="mt-1 text-sm text-ink-muted">Utilisé sur l’accueil. Reste sur cet appareil.</p>
        <div className="mt-3 flex gap-2">
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Ton prénom"
            maxLength={32}
          />
          <Button
            onClick={() => {
              setName(draft.trim());
            }}
          >
            Enregistrer
          </Button>
        </div>
      </section>
      <section className="rounded-xl border border-line bg-surface p-5 shadow-card">
        <h2 className="text-sm font-semibold">Épreuve</h2>
        <ul className="mt-2 space-y-1 text-sm text-ink-muted">
          <li>{EXAM.title} ({EXAM.acronym})</li>
          <li>{EXAM.faculty}</li>
          <li>
            {EXAM.room} · samedi 19/09/2026 · 10h00
          </li>
        </ul>
      </section>
      <section className="rounded-xl border border-danger/20 bg-danger-soft p-5">
        <h2 className="text-sm font-semibold text-danger">Réinitialiser la progression</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Efface chapitres lus, quiz, favoris, sessions ajoutées et temps de travail.
        </p>
        {confirm ? (
          <div className="mt-3 flex gap-2">
            <Button variant="danger" onClick={() => { reset(); setConfirm(false); }}>
              Confirmer l’effacement
            </Button>
            <Button variant="ghost" onClick={() => setConfirm(false)}>
              Annuler
            </Button>
          </div>
        ) : (
          <Button variant="danger" className="mt-3" onClick={() => setConfirm(true)}>
            Tout effacer
          </Button>
        )}
      </section>
    </div>
  );
}
